import Children from './children';
import * as tsx from "vue-tsx-support";
import { useEffect, useRef } from '../plugins/vue-hooks';
import {VueEditor} from '..';
import { IS_FOCUSED, EDITOR_TO_ELEMENT, NODE_TO_ELEMENT, ELEMENT_TO_NODE, IS_READ_ONLY, PLACEHOLDER_SYMBOL, VUE_COMPONENT } from '../utils/weak-maps';
import {DOMNode,isDOMNode, DOMRange, isDOMElement, isDOMText, isPlainTextOnlyPaste} from '../utils/dom';
import {Transforms, Range,Editor, Element, Node} from 'slate';
import {DOMStaticRange} from '../utils/dom';
import { IS_FIREFOX, IS_SAFARI, IS_EDGE_LEGACY } from '../utils/environment'
import {SlateMixin, gvm} from '..';
import { vueRuntime } from '../plugins/vue-runtime';
import Hotkeys from '../utils/hotkeys'

// COMPAT: Firefox/Edge Legacy don't support the `beforeinput` event
const HAS_BEFORE_INPUT_SUPPORT = !(IS_FIREFOX || IS_EDGE_LEGACY)

/**
 * Check if an event is overrided by a handler.
 */

const isEventHandled = (
  event: any,
  handler?: (event: any) => void
) => {
  if (!handler) {
    return false
  }
  handler(event)
  return event.defaultPrevented || event.cancelBubble
}

/**
 * Check if the target is editable and in the editor.
 */
const hasEditableTarget = (
  editor: VueEditor,
  target: EventTarget | null
): target is DOMNode => {
  return (
    isDOMNode(target) &&
    VueEditor.hasDOMNode(editor, target, { editable: true })
  )
};

/**
 * Check if two DOM range objects are equal.
 */

const isRangeEqual = (a: DOMRange, b: DOMRange) => {
  return (
    (a.startContainer === b.startContainer &&
      a.startOffset === b.startOffset &&
      a.endContainer === b.endContainer &&
      a.endOffset === b.endOffset) ||
    (a.startContainer === b.endContainer &&
      a.startOffset === b.endOffset &&
      a.endContainer === b.startContainer &&
      a.endOffset === b.startOffset)
  )
};

/**
 * Check if the target is in the editor.
 */

const hasTarget = (
  editor: VueEditor,
  target: EventTarget | null
): target is DOMNode => {
  return isDOMNode(target) && VueEditor.hasDOMNode(editor, target)
};
/**
 * A default memoized decorate function.
 */
const defaultDecorate = () => []

/**
 * Get a plaintext representation of the content of a node, accounting for block
 * elements which get a newline appended.
 *
 * The domNode must be attached to the DOM.
 */

const getPlainText = (domNode: DOMNode) => {
  let text = ''

  if (isDOMText(domNode) && domNode.nodeValue) {
    return domNode.nodeValue
  }

  if (isDOMElement(domNode)) {
    for (const childNode of Array.from(domNode.childNodes)) {
      text += getPlainText(childNode)
    }

    const display = getComputedStyle(domNode).getPropertyValue('display')

    if (display === 'block' || display === 'list' || domNode.tagName === 'BR') {
      text += '\n'
    }
  }

  return text
}

/**
 * Set the currently selected fragment to the clipboard.
 */

const setFragmentData = (
  dataTransfer: DataTransfer,
  editor: VueEditor
): void => {
  const { selection } = editor

  if (!selection) {
    return
  }

  const [start, end] = Range.edges(selection)
  const startVoid = vueRuntime(()=>{
    return Editor.void(editor, { at: start.path })
  })
  const endVoid = vueRuntime(()=>{
    return Editor.void(editor, { at: end.path })
  })

  if (Range.isCollapsed(selection) && !startVoid) {
    return
  }

  // Create a fake selection so that we can add a Base64-encoded copy of the
  // fragment to the HTML, to decode on future pastes.
  const domRange = VueEditor.toDOMRange(editor, selection)
  let contents = domRange.cloneContents()
  let attach = contents.childNodes[0] as HTMLElement

  // Make sure attach is non-empty, since empty nodes will not get copied.
  contents.childNodes.forEach(node => {
    if (node.textContent && node.textContent.trim() !== '') {
      attach = node as HTMLElement
    }
  })

  // COMPAT: If the end node is a void node, we need to move the end of the
  // range from the void node's spacer span, to the end of the void node's
  // content, since the spacer is before void's content in the DOM.
  if (endVoid) {
    const [voidNode] = endVoid
    const r = domRange.cloneRange()
    const domNode = VueEditor.toDOMNode(editor, voidNode)
    r.setEndAfter(domNode)
    contents = r.cloneContents()
  }

  // COMPAT: If the start node is a void node, we need to attach the encoded
  // fragment to the void node's content node instead of the spacer, because
  // attaching it to empty `<div>/<span>` nodes will end up having it erased by
  // most browsers. (2018/04/27)
  if (startVoid) {
    attach = contents.querySelector('[data-slate-spacer]')! as HTMLElement
  }

  // Remove any zero-width space spans from the cloned DOM so that they don't
  // show up elsewhere when pasted.
  Array.from(contents.querySelectorAll('[data-slate-zero-width]')).forEach(
    zw => {
      const isNewline = zw.getAttribute('data-slate-zero-width') === 'n'
      zw.textContent = isNewline ? '\n' : ''
    }
  )

  // Set a `data-slate-fragment` attribute on a non-empty node, so it shows up
  // in the HTML, and can be used for intra-Slate pasting. If it's a text
  // node, wrap it in a `<span>` so we have something to set an attribute on.
  if (isDOMText(attach)) {
    const span = document.createElement('span')
    // COMPAT: In Chrome and Safari, if we don't add the `white-space` style
    // then leading and trailing spaces will be ignored. (2017/09/21)
    span.style.whiteSpace = 'pre'
    span.appendChild(attach)
    contents.appendChild(span)
    attach = span
  }

  const fragment = Node.fragment(editor, selection)
  const string = JSON.stringify(fragment)
  const encoded = window.btoa(encodeURIComponent(string))
  attach.setAttribute('data-slate-fragment', encoded)
  dataTransfer.setData('application/x-slate-fragment', encoded)

  // Add the content to a <div> so that we can get its inner HTML.
  const div = document.createElement('div')
  div.appendChild(contents)
  div.setAttribute('hidden', 'true')
  document.body.appendChild(div)
  dataTransfer.setData('text/html', div.innerHTML)
  dataTransfer.setData('text/plain', getPlainText(div))
  document.body.removeChild(div)
}

let initPlaceholder = false

// the contentEditable div
export const Editable = tsx.component({
  // some global props will provide for child component
  props: {
    autoFocus: Boolean,
    renderLeaf: Function,
    renderElement: Function,
    readOnly: Boolean,
    decorate: {
      type: Function,
      default: defaultDecorate
    },
    placeholder: String,
    // user event
    onBeforeInput: Function,
    onKeyDown: Function,
    onClick: Function,
    onCompositionEnd: Function,
    onCompositionStart: Function,
    onCut: Function,
    onCopy: Function,
    onDragOver: Function,
    onDragStart: Function,
    onDragStop: Function,
    onPaste: Function,
    onFocus: Function,
    onBlur: Function
  },
  components: {
    Children
  },
  mixins: [SlateMixin],
  provide() {
    return {
      'renderLeaf': this.renderLeaf,
      'renderElement': this.renderElement,
      'decorate': this.decorate,
      'readOnly': this.readOnly,
      'placeholder': this.placeholder
    }
  },
  data() {
    return {
      latestElement: null,
      isComposing: false,
      isUpdatingSelection: false
    }
  },
  methods: {
    _onClick(event) {
      const editor = this.$editor
      if (
        !this.readOnly &&
        hasTarget(editor, event.target) &&
        isDOMNode(event.target) &&
        !isEventHandled(event, this.onClick)
      ) {
        const node = VueEditor.toSlateNode(editor, event.target)
        const path = VueEditor.findPath(editor, node)
        const start = Editor.start(editor, path)

        if (Editor.void(editor, { at: start })) {
          const range = Editor.range(editor, start)
          Transforms.select(editor, range)
        }
      }
    },
    onSelectionchange(e) {
      const { readOnly } = this;
      const editor = this.$editor
      if (!readOnly && !this.isComposing && !this.isUpdatingSelection) {
        const { activeElement } = window.document
        const el = VueEditor.toDOMNode(editor, editor)
        const domSelection = window.getSelection()
        const domRange =
          domSelection &&
          domSelection.rangeCount > 0 &&
          domSelection.getRangeAt(0)

        if (activeElement === el) {
          this.latestElement = activeElement
          IS_FOCUSED.set(editor, true)
        } else {
          IS_FOCUSED.delete(editor)
        }

        if (
          domRange &&
          hasEditableTarget(editor, domRange.startContainer) &&
          hasEditableTarget(editor, domRange.endContainer)
        ) {
          const range = VueEditor.toSlateRange(editor, domRange)
          Transforms.select(editor, range)
        } else {
          Transforms.deselect(editor)
        }
      }
    },
    _onBeforeInput(event: Event & {
      data: string | null
      dataTransfer: DataTransfer | null
      getTargetRanges(): DOMStaticRange[]
      inputType: string
      isComposing: boolean
    }) {
      const editor = this.$editor;
      if (
        !this.readOnly &&
        hasEditableTarget(editor, event.target) &&
        !isEventHandled(event, this.onBeforeInput)
      ) {
        const { selection } = editor
        const { inputType: type } = event
        const data = event.dataTransfer || event.data || undefined

        // These two types occur while a user is composing text and can't be
        // cancelled. Let them through and wait for the composition to end.
        if (
          type === 'insertCompositionText' ||
          type === 'deleteCompositionText'
        ) {
          return
        }

        event.preventDefault()

        // COMPAT: For the deleting forward/backward input types we don't want
        // to change the selection because it is the range that will be deleted,
        // and those commands determine that for themselves.
        if (!type.startsWith('delete') || type.startsWith('deleteBy')) {
          const [targetRange] = event.getTargetRanges()

          if (targetRange) {
            const range = VueEditor.toSlateRange(editor, targetRange)

            if (!selection || !Range.equals(selection, range)) {
              Transforms.select(editor, range)
            }
          }
        }

        // COMPAT: If the selection is expanded, even if the command seems like
        // a delete forward/backward command it should delete the selection.
        if (
          selection &&
          Range.isExpanded(selection) &&
          type.startsWith('delete')
        ) {
          Editor.deleteFragment(editor)
          return
        }

        switch (type) {
          case 'deleteByComposition':
          case 'deleteByCut':
          case 'deleteByDrag': {
            Editor.deleteFragment(editor)
            break
          }

          case 'deleteContent':
          case 'deleteContentForward': {
            Editor.deleteForward(editor)
            break
          }

          case 'deleteContentBackward': {
            Editor.deleteBackward(editor)
            break
          }

          case 'deleteEntireSoftLine': {
            Editor.deleteBackward(editor, { unit: 'line' })
            Editor.deleteForward(editor, { unit: 'line' })
            break
          }

          case 'deleteHardLineBackward': {
            Editor.deleteBackward(editor, { unit: 'block' })
            break
          }

          case 'deleteSoftLineBackward': {
            Editor.deleteBackward(editor, { unit: 'line' })
            break
          }

          case 'deleteHardLineForward': {
            Editor.deleteForward(editor, { unit: 'block' })
            break
          }

          case 'deleteSoftLineForward': {
            Editor.deleteForward(editor, { unit: 'line' })
            break
          }

          case 'deleteWordBackward': {
            Editor.deleteBackward(editor, { unit: 'word' })
            break
          }

          case 'deleteWordForward': {
            Editor.deleteForward(editor, { unit: 'word' })
            break
          }

          case 'insertLineBreak':
          case 'insertParagraph': {
            Editor.insertBreak(editor)
            break
          }

          case 'insertFromComposition':
          case 'insertFromDrop':
          case 'insertFromPaste':
          case 'insertFromYank':
          case 'insertReplacementText':
          case 'insertText': {
            if (data instanceof DataTransfer) {
              VueEditor.insertData(editor, data)
            } else if (typeof data === 'string') {
              Editor.insertText(editor, data)
            }

            break
          }
        }
      }
    },
    _onCompositionEnd(event) {
      const editor = this.$editor;
      if (
        hasEditableTarget(editor, event.target) &&
        !isEventHandled(event, this.onCompositionEnd)
      ) {
        this.isComposing = false

        // COMPAT: In Chrome, `beforeinput` events for compositions
        // aren't correct and never fire the "insertFromComposition"
        // type that we need. So instead, insert whenever a composition
        // ends since it will already have been committed to the DOM.
        if (!IS_SAFARI && !IS_FIREFOX && event.data) {
          Editor.insertText(editor, event.data)
        }
      }
    },
    _onCompositionStart(event) {
      const editor = this.$editor
      if (
        hasEditableTarget(editor, event.target) &&
        !isEventHandled(event, this.onCompositionStart)
      ) {
        this.isComposing = true
      }
    },
    _onKeyDown(event) {
      const editor = this.$editor
      if (
        !this.readOnly &&
        hasEditableTarget(editor, event.target) &&
        !isEventHandled(event, this.onKeyDown)
      ) {
        const nativeEvent = event
        const { selection } = editor

        // COMPAT: Since we prevent the default behavior on
        // `beforeinput` events, the browser doesn't think there's ever
        // any history stack to undo or redo, so we have to manage these
        // hotkeys ourselves. (2019/11/06)
        if (Hotkeys.isRedo(nativeEvent)) {
          event.preventDefault()

          if (editor.redo) {
            editor.redo()
          }

          return
        }

        if (Hotkeys.isUndo(nativeEvent)) {
          event.preventDefault()

          if (editor.undo) {
            editor.undo()
          }

          return
        }

        // COMPAT: Certain browsers don't handle the selection updates
        // properly. In Chrome, the selection isn't properly extended.
        // And in Firefox, the selection isn't properly collapsed.
        // (2017/10/17)
        if (Hotkeys.isMoveLineBackward(nativeEvent)) {
          event.preventDefault()
          Transforms.move(editor, { unit: 'line', reverse: true })
          return
        }

        if (Hotkeys.isMoveLineForward(nativeEvent)) {
          event.preventDefault()
          Transforms.move(editor, { unit: 'line' })
          return
        }

        if (Hotkeys.isExtendLineBackward(nativeEvent)) {
          event.preventDefault()
          Transforms.move(editor, {
            unit: 'line',
            edge: 'focus',
            reverse: true,
          })
          return
        }

        if (Hotkeys.isExtendLineForward(nativeEvent)) {
          event.preventDefault()
          Transforms.move(editor, { unit: 'line', edge: 'focus' })
          return
        }

        // COMPAT: If a void node is selected, or a zero-width text node
        // adjacent to an inline is selected, we need to handle these
        // hotkeys manually because browsers won't be able to skip over
        // the void node with the zero-width space not being an empty
        // string.
        if (Hotkeys.isMoveBackward(nativeEvent)) {
          event.preventDefault()

          if (selection && Range.isCollapsed(selection)) {
            Transforms.move(editor, { reverse: true })
          } else {
            Transforms.collapse(editor, { edge: 'start' })
          }

          return
        }

        if (Hotkeys.isMoveForward(nativeEvent)) {
          event.preventDefault()

          if (selection && Range.isCollapsed(selection)) {
            Transforms.move(editor)
          } else {
            Transforms.collapse(editor, { edge: 'end' })
          }

          return
        }

        if (Hotkeys.isMoveWordBackward(nativeEvent)) {
          event.preventDefault()
          Transforms.move(editor, { unit: 'word', reverse: true })
          return
        }

        if (Hotkeys.isMoveWordForward(nativeEvent)) {
          event.preventDefault()
          Transforms.move(editor, { unit: 'word' })
          return
        }

        // COMPAT: Certain browsers don't support the `beforeinput` event, so we
        // fall back to guessing at the input intention for hotkeys.
        // COMPAT: In iOS, some of these hotkeys are handled in the
        if (!HAS_BEFORE_INPUT_SUPPORT) {
          // We don't have a core behavior for these, but they change the
          // DOM if we don't prevent them, so we have to.
          if (
            Hotkeys.isBold(nativeEvent) ||
            Hotkeys.isItalic(nativeEvent) ||
            Hotkeys.isTransposeCharacter(nativeEvent)
          ) {
            event.preventDefault()
            return
          }

          if (Hotkeys.isSplitBlock(nativeEvent)) {
            event.preventDefault()
            Editor.insertBreak(editor)
            return
          }

          if (Hotkeys.isDeleteBackward(nativeEvent)) {
            event.preventDefault()

            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor)
            } else {
              Editor.deleteBackward(editor)
            }

            return
          }

          if (Hotkeys.isDeleteForward(nativeEvent)) {
            event.preventDefault()

            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor)
            } else {
              Editor.deleteForward(editor)
            }

            return
          }

          if (Hotkeys.isDeleteLineBackward(nativeEvent)) {
            event.preventDefault()

            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor)
            } else {
              Editor.deleteBackward(editor, { unit: 'line' })
            }

            return
          }

          if (Hotkeys.isDeleteLineForward(nativeEvent)) {
            event.preventDefault()

            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor)
            } else {
              Editor.deleteForward(editor, { unit: 'line' })
            }

            return
          }

          if (Hotkeys.isDeleteWordBackward(nativeEvent)) {
            event.preventDefault()

            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor)
            } else {
              Editor.deleteBackward(editor, { unit: 'word' })
            }

            return
          }

          if (Hotkeys.isDeleteWordForward(nativeEvent)) {
            event.preventDefault()

            if (selection && Range.isExpanded(selection)) {
              Editor.deleteFragment(editor)
            } else {
              Editor.deleteForward(editor, { unit: 'word' })
            }

            return
          }
        }
      }
    },
    _onFocus(event) {
      const editor = this.$editor
      if (
        !this.readOnly &&
        !this.isUpdatingSelection &&
        hasEditableTarget(editor, event.target) &&
        isEventHandled(event, this.onFocus)
      ) {
        const el = VueEditor.toDOMNode(editor, editor)
        this.latestElement = window.document.activeElement

        // COMPAT: If the editor has nested editable elements, the focus
        // can go to them. In Firefox, this must be prevented because it
        // results in issues with keyboard navigation. (2017/03/30)
        if (IS_FIREFOX && event.target !== el) {
          el.focus()
          return
        }

        IS_FOCUSED.set(editor, true)
      }
    },
    _onBlur(event) {
      const editor = this.$editor
      if (
        this.readOnly ||
        this.isUpdatingSelection ||
        !hasEditableTarget(editor, event.target) ||
        isEventHandled(event, this.onBlur)
      ) {
        return
      }

      // COMPAT: If the current `activeElement` is still the previous
      // one, this is due to the window being blurred when the tab
      // itself becomes unfocused, so we want to abort early to allow to
      // editor to stay focused when the tab becomes focused again.
      if (this.latestElement === window.document.activeElement) {
        return
      }

      const { relatedTarget } = event
      const el = VueEditor.toDOMNode(editor, editor)

      // COMPAT: The event should be ignored if the focus is returning
      // to the editor from an embedded editable element (eg. an <input>
      // element inside a void node).
      if (relatedTarget === el) {
        return
      }

      // COMPAT: The event should be ignored if the focus is moving from
      // the editor to inside a void node's spacer element.
      if (
        isDOMElement(relatedTarget) &&
        relatedTarget.hasAttribute('data-slate-spacer')
      ) {
        return
      }

      // COMPAT: The event should be ignored if the focus is moving to a
      // non- editable section of an element that isn't a void node (eg.
      // a list item of the check list example).
      if (
        relatedTarget != null &&
        isDOMNode(relatedTarget) &&
        VueEditor.hasDOMNode(editor, relatedTarget)
      ) {
        const node = VueEditor.toSlateNode(editor, relatedTarget)

        if (Element.isElement(node) && !editor.isVoid(node)) {
          return
        }
      }

      IS_FOCUSED.delete(editor)
    },
    _onCopy(event) {
      const editor = this.$editor
      if (
        hasEditableTarget(editor, event.target) &&
        !isEventHandled(event, this.onCopy)
      ) {
        event.preventDefault()
        setFragmentData(event.clipboardData, editor)
      }
    },
    _onPaste(event) {
      const editor = this.$editor
      const {readOnly} = this
      if (
        (!HAS_BEFORE_INPUT_SUPPORT ||
          isPlainTextOnlyPaste(event.nativeEvent)) &&
        !readOnly &&
        hasEditableTarget(editor, event.target) &&
        !isEventHandled(event, this.onPaste)
      ) {
        event.preventDefault()
        VueEditor.insertData(editor, event.clipboardData)
      }
    },
    _onCut(event) {
      const editor = this.$editor
      const {readOnly} = this
      if (
        !readOnly &&
        hasEditableTarget(editor, event.target) &&
        !isEventHandled(event, this.onCut)
      ) {
        event.preventDefault()
        setFragmentData(event.clipboardData, editor)
        const { selection } = editor

        if (selection && Range.isExpanded(selection)) {
          Editor.deleteFragment(editor)
        }
      }
    },
    _onDragOver(event) {
      const editor = this.$editor
      if (
        hasTarget(editor, event.target) &&
        !isEventHandled(event, this.onDragOver)
      ) {
        // Only when the target is void, call `preventDefault` to signal
        // that drops are allowed. Editable content is droppable by
        // default, and calling `preventDefault` hides the cursor.
        const node = VueEditor.toSlateNode(editor, event.target)

        if (Editor.isVoid(editor, node)) {
          event.preventDefault()
        }
      }
    },
    _onDragStart(event) {
      const editor = this.$editor
      if (
        hasTarget(editor, event.target) &&
        !isEventHandled(event, this.onDragStart)
      ) {
        const node = VueEditor.toSlateNode(editor, event.target)
        const path = VueEditor.findPath(editor, node)
        const voidMatch = Editor.void(editor, { at: path })

        // If starting a drag on a void node, make sure it is selected
        // so that it shows up in the selection's fragment.
        if (voidMatch) {
          const range = Editor.range(editor, path)
          Transforms.select(editor, range)
        }

        setFragmentData(event.dataTransfer, editor)
      }
    },
    _onDrop(event) {
      const editor = this.$editor
      if (
        hasTarget(editor, event.target) &&
        !this.readOnly &&
        !isEventHandled(event, this.onDrop)
      ) {
        // COMPAT: Certain browsers don't fire `beforeinput` events at all, and
        // Chromium browsers don't properly fire them for files being
        // dropped into a `contenteditable`. (2019/11/26)
        // https://bugs.chromium.org/p/chromium/issues/detail?id=1028668
        if (
          !HAS_BEFORE_INPUT_SUPPORT ||
          (!IS_SAFARI && event.dataTransfer.files.length > 0)
        ) {
          event.preventDefault()
          const range = VueEditor.findEventRange(editor, event)
          const data = event.dataTransfer
          Transforms.select(editor, range)
          VueEditor.insertData(editor, data)
        }
      }
    }
  },
  hooks() {
    const ref = this.ref = useRef(null);
    const editor = this.$editor;
    IS_READ_ONLY.set(editor, this.readOnly)

    const initListener = ()=>{
      // Attach a native DOM event handler for `selectionchange`
      useEffect(()=>{
        document.addEventListener('selectionchange', this.onSelectionchange)
        return () => {
          document.removeEventListener('selectionchange', this.onSelectionchange)
        }
      });
    };
    const updateAutoFocus = () => {
      useEffect(() => {
        if (ref.current && this.autoFocus) {
          // can't focus in current event loop?
          setTimeout(()=>{
            ref.current.focus()
          }, 0)
        }
      }, [this.autoFocus])
    }
    const updateRef = () => {
      // Update element-related weak maps with the DOM element ref.
      useEffect(() => {
        if (ref.current) {
          EDITOR_TO_ELEMENT.set(editor, ref.current)
          NODE_TO_ELEMENT.set(editor, ref.current)
          ELEMENT_TO_NODE.set(ref.current, editor)
        } else {
          NODE_TO_ELEMENT.delete(editor)
        }
      })
    };
    const updateSelection = ()=> {
      useEffect(() => {
        const { selection } = editor
        const domSelection = window.getSelection()

        if (this.isComposing || !domSelection || !VueEditor.isFocused(editor)) {
          return
        }

        const hasDomSelection = domSelection.type !== 'None'

        // If the DOM selection is properly unset, we're done.
        if (!selection && !hasDomSelection) {
          return
        }

        const newDomRange = selection && VueEditor.toDOMRange(editor, selection)

        // If the DOM selection is already correct, we're done.
        if (
          hasDomSelection &&
          newDomRange &&
          isRangeEqual(domSelection.getRangeAt(0), newDomRange)
        ) {
          return
        }

        // Otherwise the DOM selection is out of sync, so update it.
        const el = VueEditor.toDOMNode(editor, editor)
        this.isUpdatingSelection = true
        domSelection.removeAllRanges()

        if (newDomRange) {
          domSelection.addRange(newDomRange)
          // const leafEl = newDomRange.startContainer.parentElement!
          // scrollIntoView(leafEl, { scrollMode: 'if-needed' })
        }

        setTimeout(() => {
          // COMPAT: In Firefox, it's not enough to create a range, you also need
          // to focus the contenteditable element too. (2016/11/16)
          if (newDomRange && IS_FIREFOX) {
            el.focus()
          }

          this.isUpdatingSelection = false
        })
      })
    }

    // init selectionchange
    initListener();
    // Update element-related weak maps with the DOM element ref.
    updateRef();
    // The autoFocus TextareaHTMLAttribute doesn't do anything on a div, so it
    // needs to be manually focused.
    updateAutoFocus();
    // Whenever the editor updates, make sure the DOM selection state is in sync.
    updateSelection();
  },
  render() {
    const editor = this.$editor;
    const {ref} = this;
    // name must be corresponded with standard
    const on = {
      click: this._onClick,
      keydown: this._onKeyDown,
      focus: this._onFocus,
      blur: this._onBlur,
      beforeinput: this._onBeforeInput,
      copy: this._onCopy,
      cut: this._onCut,
      compositionend: this._onCompositionEnd,
      compositionstart: this._onCompositionStart,
      dragover: this._onDragOver,
      dragstart: this._onDragStart,
      drop: this._onDrop,
      paste: this._onPaste
    };
    return (
      <div
        ref = {ref.id}
        contenteditable={this.readOnly ? false : true}
        data-slate-editor
        data-slate-node="value"
        style={{
         // Prevent the default outline styles.
         outline: 'none',
         // Preserve adjacent whitespace and new lines.
         whiteSpace: 'pre-wrap',
         // Allow words to break if they are too long.
         wordWrap: 'break-word',
         // Allow for passed-in styles to override anything.
         // ...style,
        }}
        {...{on}}
        >
        <Children
          node={editor}
          selection={editor.selection}
        />
      </div>
    )
  }
})

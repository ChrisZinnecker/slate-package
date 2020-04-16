// @ts-nocheck
import { Text, Element } from 'slate'
import * as tsx from 'vue-tsx-support'

import string from './string'
import { PLACEHOLDER_SYMBOL } from '../utils/weak-maps'
import { RenderLeafProps } from './editable'

/**
 * Individual leaves in a text node with unique formatting.
 */

const Leaf = tsx.component({
  props: {
    renderLeaf: Function,
    text: Object,
    leaf: Object
  },
  components: {
    string
  },
  render(h) {
    const { renderLeaf = DefaultLeaf, text, leaf} = this;
    const children =  (
      <string text={text} editor={this.$editor} leaf={leaf}/>
      );
    const attributes: {
     'data-slate-leaf': true
    } = {
     'data-slate-leaf': true,
    };
    const renderChildren = renderLeaf({
      children,
      attributes
    })
    return h(renderChildren)
  }
});
// const Leaf = (props: {
//   isLast: boolean
//   leaf: Text
//   parent: Element
//   renderLeaf?: (props: RenderLeafProps) => JSX.Element
//   text: Text
// }) => {
//   const {
//     leaf,
//     isLast,
//     text,
//     parent,
//     renderLeaf = (props: RenderLeafProps) => <DefaultLeaf {...props} />,
//   } = props
//
//   let children = (
//     <String isLast={isLast} leaf={leaf} parent={parent} text={text} />
//   )
//
//   if (leaf[PLACEHOLDER_SYMBOL]) {
//     children = (
//       <React.Fragment>
//         <span
//           contentEditable={false}
//           style={{
//             pointerEvents: 'none',
//             display: 'inline-block',
//             verticalAlign: 'text-top',
//             width: '0',
//             maxWidth: '100%',
//             whiteSpace: 'nowrap',
//             opacity: '0.333',
//           }}
//         >
//           {leaf.placeholder}
//         </span>
//         {children}
//       </React.Fragment>
//     )
//   }
//
//   // COMPAT: Having the `data-` attributes on these leaf elements ensures that
//   // in certain misbehaving browsers they aren't weirdly cloned/destroyed by
//   // contenteditable behaviors. (2019/05/08)
//   const attributes: {
//     'data-slate-leaf': true
//   } = {
//     'data-slate-leaf': true,
//   }
//
//   return renderLeaf({ attributes, children, leaf, text })
// }

// const MemoizedLeaf = React.memo(Leaf, (prev, next) => {
//   return (
//     next.parent === prev.parent &&
//     next.isLast === prev.isLast &&
//     next.renderLeaf === prev.renderLeaf &&
//     next.text === prev.text &&
//     Text.matches(next.leaf, prev.leaf)
//   )
// })

/**
 * The default custom leaf renderer.
 */

const DefaultLeaf = (props) => {
  return tsx.component({
    functional: true,
    render(h, ctx) {
      const { attributes, children } = props
      return <span {...{attrs: attributes}}>{children}</span>
    }
  })
}

export default Leaf

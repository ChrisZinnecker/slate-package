/**
 * A wrapper around the provider to handle `onChange` events, because the editor
 * is a mutable singleton so it won't ever register as "changed" otherwise.
 */
import * as tsx from 'vue-tsx-support'
import {EDITOR_TO_ON_CHANGE} from '../utils/weak-maps';
import Vue from 'vue';
import {gvm} from '../plugins/slate-plugin'
import { VueEditor } from '..';

export const Slate = tsx.component({
  props: {
    value: String
  },
  created() {
    // This method is forked from Vuex, but is not an efficient methods, still need to be improved
    // prepare two objects, one for immer, the other for vue
    // when we get immer result, patch it to vue
    this.$editor.children = JSON.parse(this.value);
    const $$data = JSON.parse(this.value);
    this.$editor._state= Vue.observable($$data)
    // some global variable only for vue render
    this.$editor._vue = {}
  },
  render() {
    EDITOR_TO_ON_CHANGE.set(this.$editor,()=>{
      // patch to update all use
      // update editable manual
      // notify all update
      this.$editor._state.__ob__.dep.notify()
      // update focus manual
      gvm.focused = VueEditor.isFocused(this.$editor)
      let op = this.$editor._operation
      if(op && op.type === 'set_selection') {
        gvm.updateSelected()
      }
      // emit onchange event
      this.$emit('onChange')
    })
    return (
      <fragment>
        {this.$scopedSlots.default()}
      </fragment>
    )
  }
})

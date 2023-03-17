/**
 * a copy of slate-react
 */
import { VueEditor } from 'kessel-slate-vue-shared';
import { vueRuntimeFunc } from './vue-runtime';

VueEditor.toDOMRange = vueRuntimeFunc(VueEditor.toDOMRange);

export { VueEditor };

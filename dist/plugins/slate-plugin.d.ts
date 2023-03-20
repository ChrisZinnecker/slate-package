import * as tsx from 'vue-tsx-support';
import Vue from 'vue';
import { VueEditor } from './vue-editor';
export declare const getGvm: (editor: VueEditor) => any;
export declare const elementWatcherPlugin: (vm: any, type: string) => void;
export declare const SlateMixin: tsx._TsxComponentV3<Vue, {}, {} & {}, {}, {}, {}>;
export declare const SelectedMixin: tsx._TsxComponentV3<Vue & {
    selected: any;
}, {}, {} & {}, {}, {}, {}>;
export declare const ReadOnlyMixin: tsx._TsxComponentV3<Vue & {
    readOnly: boolean;
}, {}, {} & {}, {}, {}, {}>;
export declare const FocusedMixin: tsx._TsxComponentV3<Vue & {
    focused: any;
}, {}, {} & {}, {}, {}, {}>;
export declare const createEditorInstance: () => import("slate").BaseEditor & VueEditor;
interface SlatePluginOptions {
    editorCreated?: (editor: VueEditor) => any;
}
export declare const SlatePlugin: {
    install(Vue: any, options?: SlatePluginOptions | undefined): void;
};
export {};

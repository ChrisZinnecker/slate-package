import { Editor } from 'slate';
import { VueEditor } from './vue-editor';
export declare const getGvm: (editor: VueEditor) => any;
export declare const elementWatcherPlugin: (vm: any, type: string) => void;
export declare const SlateMixin: {
    mounted(): void;
};
export declare const SelectedMixin: {
    created(): void;
    computed: {
        selected(): any;
    };
};
export declare const ReadOnlyMixin: {
    computed: {
        readOnly(): any;
    };
};
export declare const FocusedMixin: {
    computed: {
        focused(): any;
    };
};
export declare const createEditorInstance: () => Editor & VueEditor;
export declare const SlatePlugin: {
    install(Vue: any, options: any): void;
};

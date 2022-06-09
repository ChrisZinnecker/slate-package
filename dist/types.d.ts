import "vue-tsx-support/enable-check";
import Vue, { RenderContext } from 'vue';
declare module 'vue/types/options' {
    interface ComponentOptions<V extends Vue> {
        hooks?: Function;
        abstract?: Boolean;
    }
}
export interface RenderElementProps {
    children: any;
    element: Element;
    attributes: {
        'data-slate-node': 'element';
        'data-slate-inline'?: true;
        'data-slate-void'?: true;
        dir?: 'rtl';
        ref: any;
    };
}
export interface RenderLeafProps {
    children: any;
    leaf: Text;
    text: Text;
    attributes: {
        'data-slate-leaf': true;
    };
}
declare type Maybe<T> = T | undefined | null;
export declare type TsxComponent<Props> = (args: Partial<RenderContext<Props>> & {
    [k in keyof Props]: Maybe<Props[k]>;
}) => VueTsxSupport.JSX.Element;
export {};

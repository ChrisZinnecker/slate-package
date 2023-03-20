/**
 * A wrapper around the provider to handle `onChange` events, because the $editor
 * is a mutable singleton so it won't ever register as "changed" otherwise.
 */
import * as tsx from 'vue-tsx-support';
import Vue from 'vue';
interface SlateData {
    name: string | null;
}
export declare const Slate: tsx._TsxComponentV3<Vue & SlateData & {
    genUid(): string;
    /**
     * force slate render by change fragment name
     * @param newVal
     */
    renderSlate(newVal?: any): void;
    clearEditor(): void;
} & {
    value: string;
}, {}, {} & {
    value?: string | undefined;
}, {}, {}, {}>;
export {};

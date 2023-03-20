/**
 * interface Element {
 *  children: Node[]
 * }
 */
import * as tsx from "vue-tsx-support";
import { RenderElementProps } from 'kessel-slate-vue-shared';
import { providedByEditable, UseRef } from '../types';
/**
 * Element
 */
export declare const Element: tsx._TsxComponentV3<import("vue").default & Pick<providedByEditable, "readOnly" | "renderElement"> & UseRef & {
    element: import("slate").BaseElement;
}, {}, {} & {
    element?: import("slate").BaseElement | undefined;
}, {}, {}, {}>;
/**
 * The default element renderer.
 */
export declare const DefaultElement: (props: RenderElementProps) => tsx._TsxComponentV3<import("vue").default, {}, {} & {}, {}, {}, {}>;

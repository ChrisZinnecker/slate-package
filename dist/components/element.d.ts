/**
 * interface Element {
 *  children: Node[]
 * }
 */
import * as tsx from "vue-tsx-support";
import { RenderElementProps } from '../types';
/**
 * Element.
 */
export declare const Element: tsx._TsxComponentV3<import("vue").default & {
    element: any;
}, {}, {} & {
    element?: any;
}, {}, {}, {}>;
/**
 * The default element renderer.
 */
export declare const DefaultElement: (props: RenderElementProps) => tsx._TsxComponentV3<import("vue").default, {}, {} & {}, {}, {}, {}>;
export default Element;

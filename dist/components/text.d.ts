import * as tsx from 'vue-tsx-support';
import { providedByEditable, UseRef } from '../types';
/**
 * Text.
 */
declare const Text: tsx._TsxComponentV3<import("vue").default & Pick<providedByEditable, "placeholder" | "decorate"> & UseRef & {
    text: import("slate").BaseText;
    isLast: boolean;
    parent: import("slate").BaseElement;
    decorations: import("slate").BaseRange[];
}, {}, {} & {
    text?: import("slate").BaseText | undefined;
    isLast?: boolean | undefined;
    parent?: import("slate").BaseElement | undefined;
    decorations?: import("slate").BaseRange[] | undefined;
}, {}, {}, {}>;
export default Text;

import * as tsx from 'vue-tsx-support';
import { providedByEditable } from '../types';
/**
 * Individual leaves in a text node with unique formatting.
 */
declare const Leaf: tsx._TsxComponentV3<import("vue").default & Pick<providedByEditable, "renderLeaf"> & {
    text: import("slate").BaseText;
    leaf: import("slate").BaseText;
}, {}, {} & {
    text?: import("slate").BaseText | undefined;
    leaf?: import("slate").BaseText | undefined;
}, {}, {}, {}>;
export default Leaf;

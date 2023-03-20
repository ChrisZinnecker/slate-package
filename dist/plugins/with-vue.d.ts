import { VueEditor } from './vue-editor';
/**
 * `withReact` adds React and DOM specific behaviors to the editor.
 */
export declare const withVue: <T extends import("slate").BaseEditor>(editor: T) => T & VueEditor;

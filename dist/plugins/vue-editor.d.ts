/**
 * a copy of slate-react
 */
import { Editor, Node, Operation, Path, Point, Range } from 'slate';
import { Key } from '../utils/key';
import { DOMNode, DOMPoint, DOMRange, DOMSelection, DOMStaticRange } from '../utils/dom';
/**
 * A React and DOM-specific version of the `Editor` interface.
 */
export interface VueEditor extends Editor {
    insertData: (data: DataTransfer) => void;
    setFragmentData: (data: DataTransfer) => void;
    _operation: Operation | null;
}
export declare const VueEditor: {
    /**
     * Find a key for a Slate node.
     */
    findKey(editor: VueEditor, node: Node): Key;
    /**
     * Find the path of Slate node.
     */
    findPath(editor: VueEditor, node: Node): Path;
    /**
     * Check if the editor is focused.
     */
    isFocused(editor: VueEditor): boolean;
    /**
     * Check if the editor is in read-only mode.
     */
    isReadOnly(editor: VueEditor): boolean;
    /**
     * Blur the editor.
     */
    blur(editor: VueEditor): void;
    /**
     * Focus the editor.
     */
    focus(editor: VueEditor): void;
    /**
     * Deselect the editor.
     */
    deselect(editor: VueEditor): void;
    /**
     * Check if a DOM node is within the editor.
     */
    hasDOMNode(editor: VueEditor, target: DOMNode, options?: {
        editable?: boolean;
    }): boolean;
    /**
     * Insert data from a `DataTransfer` into the editor.
     */
    insertData(editor: VueEditor, data: DataTransfer): void;
    /**
     * Sets data from the currently selected fragment on a `DataTransfer`.
     */
    setFragmentData(editor: VueEditor, data: DataTransfer): void;
    /**
     * Find the native DOM element from a Slate node.
     */
    toDOMNode(editor: VueEditor, node: Node): HTMLElement;
    /**
     * Find a native DOM selection point from a Slate point.
     */
    toDOMPoint(editor: VueEditor, point: Point): DOMPoint;
    /**
     * Find a native DOM range from a Slate `range`.
     *
     * Notice: the returned range will always be ordinal regardless of the direction of Slate `range` due to DOM API limit.
     *
     * there is no way to create a reverse DOM Range using Range.setStart/setEnd
     * according to https://dom.spec.whatwg.org/#concept-range-bp-set.
     */
    toDOMRange(editor: VueEditor, range: Range): DOMRange;
    /**
     * Find a Slate node from a native DOM `element`.
     */
    toSlateNode(editor: VueEditor, domNode: DOMNode): Node;
    /**
     * Get the target range from a DOM `event`.
     */
    findEventRange(editor: VueEditor, event: any): Range;
    /**
     * Find a Slate point from a DOM selection's `domNode` and `domOffset`.
     */
    toSlatePoint(editor: VueEditor, domPoint: DOMPoint): Point;
    /**
     * Find a Slate range from a DOM range or selection.
     */
    toSlateRange(editor: VueEditor, domRange: DOMRange | DOMStaticRange | DOMSelection): Range;
};

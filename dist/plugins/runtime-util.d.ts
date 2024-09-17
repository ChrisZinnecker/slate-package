import { Editor, Operation, Node, Path, Text, Descendant, NodeEntry, Location } from 'slate';
export declare const getChildren: (node: Node) => any;
export declare const clone: (node: any) => any;
export declare const transform: (editor: Editor, op: Operation) => void;
export declare const runtimeNode: {
    child(root: Node, index: number): Descendant;
    has(root: Node, path: Path): boolean;
    get(root: Node, path: Path): Node;
    first(root: Node, path: Path): NodeEntry<Node>;
    last(root: Node, path: Path): NodeEntry<Node>;
    nodes(root: Node, options?: {
        from?: Path | undefined;
        to?: Path | undefined;
        reverse?: boolean | undefined;
        pass?: ((entry: NodeEntry<Node>) => boolean) | undefined;
    }): Generator<NodeEntry>;
};
export declare const isVueObject: (obj: any) => any;
export declare const Transforms: {
    delete(editor: Editor, options?: {
        at?: Path | import("slate").Range | import("slate").Point | undefined;
        distance?: number | undefined;
        unit?: "character" | "word" | "line" | "block" | undefined;
        reverse?: boolean | undefined;
        hanging?: boolean | undefined;
        voids?: boolean | undefined;
    } | undefined): void;
    insertFragment(editor: Editor, fragment: Node[], options?: {
        at?: Path | import("slate").Range | import("slate").Point | undefined;
        hanging?: boolean | undefined;
        voids?: boolean | undefined;
    } | undefined): void;
    insertText(editor: Editor, text: string, options?: {
        at?: Path | import("slate").Range | import("slate").Point | undefined;
        voids?: boolean | undefined;
    } | undefined): void;
    collapse(editor: Editor, options?: {
        edge?: "anchor" | "focus" | "start" | "end" | undefined;
    } | undefined): void;
    deselect(editor: Editor): void;
    move(editor: Editor, options?: {
        distance?: number | undefined;
        unit?: "offset" | "character" | "word" | "line" | undefined;
        reverse?: boolean | undefined;
        edge?: "anchor" | "focus" | "start" | "end" | undefined;
    } | undefined): void;
    select(editor: Editor, target: Location): void;
    setPoint(editor: Editor, props: Partial<import("slate").Point>, options: {
        edge?: "anchor" | "focus" | "start" | "end" | undefined;
    }): void;
    setSelection(editor: Editor, props: Partial<import("slate").Range>): void;
    insertNodes(editor: Editor, nodes: Editor | import("slate").Element | Text | Node[], options?: {
        at?: Path | import("slate").Range | import("slate").Point | undefined;
        match?: ((node: Node) => boolean) | undefined;
        mode?: "highest" | "lowest" | undefined;
        hanging?: boolean | undefined;
        select?: boolean | undefined;
        voids?: boolean | undefined;
    } | undefined): void;
    liftNodes(editor: Editor, options?: {
        at?: Path | import("slate").Range | import("slate").Point | undefined;
        match?: ((node: Node) => boolean) | undefined;
        mode?: "highest" | "lowest" | "all" | undefined;
        voids?: boolean | undefined;
    } | undefined): void;
    mergeNodes(editor: Editor, options?: {
        at?: Path | import("slate").Range | import("slate").Point | undefined;
        match?: ((node: Node) => boolean) | undefined;
        mode?: "highest" | "lowest" | undefined;
        hanging?: boolean | undefined;
        voids?: boolean | undefined;
    } | undefined): void;
    moveNodes(editor: Editor, options: {
        at?: Path | import("slate").Range | import("slate").Point | undefined;
        match?: ((node: Node) => boolean) | undefined;
        mode?: "highest" | "lowest" | "all" | undefined;
        to: Path;
        voids?: boolean | undefined;
    }): void;
    removeNodes(editor: Editor, options?: {
        at?: Path | import("slate").Range | import("slate").Point | undefined;
        match?: ((node: Node) => boolean) | undefined;
        mode?: "highest" | "lowest" | undefined;
        hanging?: boolean | undefined;
        voids?: boolean | undefined;
    } | undefined): void;
    setNodes(editor: Editor, props: Partial<Text> | Partial<Editor> | Partial<import("slate").Element>, options?: {
        at?: Path | import("slate").Range | import("slate").Point | undefined;
        match?: ((node: Node) => boolean) | undefined;
        mode?: "highest" | "lowest" | "all" | undefined;
        hanging?: boolean | undefined;
        split?: boolean | undefined;
        voids?: boolean | undefined;
    } | undefined): void;
    splitNodes(editor: Editor, options?: {
        at?: Path | import("slate").Range | import("slate").Point | undefined;
        match?: ((node: Node) => boolean) | undefined;
        mode?: "highest" | "lowest" | undefined;
        always?: boolean | undefined;
        height?: number | undefined;
        voids?: boolean | undefined;
    } | undefined): void;
    unsetNodes(editor: Editor, props: string | string[], options?: {
        at?: Path | import("slate").Range | import("slate").Point | undefined;
        match?: ((node: Node) => boolean) | undefined;
        mode?: "highest" | "lowest" | "all" | undefined;
        split?: boolean | undefined;
        voids?: boolean | undefined;
    } | undefined): void;
    unwrapNodes(editor: Editor, options: {
        at?: Path | import("slate").Range | import("slate").Point | undefined;
        match?: ((node: Node) => boolean) | undefined;
        mode?: "highest" | "lowest" | "all" | undefined;
        split?: boolean | undefined;
        voids?: boolean | undefined;
    }): void;
    wrapNodes(editor: Editor, element: import("slate").Element, options?: {
        at?: Path | import("slate").Range | import("slate").Point | undefined;
        match?: ((node: Node) => boolean) | undefined;
        mode?: "highest" | "lowest" | "all" | undefined;
        split?: boolean | undefined;
        voids?: boolean | undefined;
    } | undefined): void;
    transform(editor: Editor, op: Operation): void;
};

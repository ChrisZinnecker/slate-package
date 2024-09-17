import { Editor, Operation, Node, Path, Descendant, NodeEntry } from 'slate';
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
export declare const Transforms: import("slate/dist/transforms/general").GeneralTransforms & import("slate/dist/transforms/node").NodeTransforms & import("slate/dist/transforms/selection").SelectionTransforms & import("slate/dist/transforms/text").TextTransforms;

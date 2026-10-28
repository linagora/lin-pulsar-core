/**
 * Represents a node in the tree structure.
 */
export type TreeNode<T> = {
    /**
     * The type of the node.
     */
    type: string;
    /**
     * Unique key identifying the node within the tree.
     */
    key: string;
    /**
     * The value associated with the node.
     */
    value: T;
    /**
     * Child nodes nested under this node.
     */
    nodes: TreeNode<T>[];
    /**
     * Additional actions specific to this node instance, merged with the
     * default actions defined by the matching `TreeNodeType`.
     */
    extraActions?: string[];
};
/**
 * Describes a node-type definition: an identifier and the default
 * actions available to every node of this type.
 */
export type TreeNodeType = {
    /**
     * The type of the node.
     */
    type: string;
    /**
     * Default actions associated with this node type.
     */
    actions?: string[];
    /**
     * Whether the nodes of this type can be selected. Defaults to true; when
     * false, the nodes are still rendered and expandable, but not selectable.
     */
    selectable?: boolean;
};

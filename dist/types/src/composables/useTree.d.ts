import type { QTreeNode } from 'quasar';
import type { TreeNode } from '../types/linPulsarTree';
/**
 * Composable providing utility functions to work with the tree component.
 *
 * This helper acts as a translation layer between:
 * - the `TreeNode` structure used by the application layer, and
 * - the `QTreeNode` structure expected by Quasar's `q-tree` component.
 *
 * It ensures consistent node mapping, key handling, and recursive children
 * conversion across the application.
 * @returns An object exposing tree conversion helpers.
 */
export declare function useTree(): {
    toQTreeNodes: <T>(nodes: TreeNode<T>[]) => QTreeNode[];
};

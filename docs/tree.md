# 🌳 useTree Composable

This document explains how to use the `useTree` composable to convert between the LinPulsar tree model and the Quasar
`q-tree` component format.

---

## 1. Overview

The `useTree` composable provides utility functions to translate between:

- The `TreeNode<T>` structure used by the application layer
- The `QTreeNode` structure expected by Quasar's `q-tree` component

`TreeNode<T>` is a generic type where `T` represents the type of the `value` field carried by each node.

It ensures consistent node mapping, key handling, and recursive children conversion across the application.

---

## 2. Usage

### 2.1 Import and Initialization

```ts
import { useTree } from '@linagora/lin-pulsar-core';

const { toQTreeNodes } = useTree();
```

### 2.2 Available Methods

| Method         | Description                                                   |
| -------------- | ------------------------------------------------------------- |
| `toQTreeNodes` | Converts an array of `TreeNode<T>` to Quasar-compatible nodes |

---

## 3. Type Details

### 3.1 TreeNode\<T\>

Represents a node in the tree structure. The generic parameter `T` defines the type of the `value` field.

```ts
type TreeNode<T> = {
  type: string;
  key: string;
  value: T;
  nodes: TreeNode<T>[];
  extraActions?: string[];
};
```

| Field          | Type            | Description                                       |
| -------------- | --------------- | ------------------------------------------------- |
| `type`         | `string`        | The type of the node (matches a `TreeNodeType`)   |
| `key`          | `string`        | Unique identifier within the tree                 |
| `value`        | `T`             | The value carried by the node                     |
| `nodes`        | `TreeNode<T>[]` | Child nodes                                       |
| `extraActions` | `string[]?`     | Optional additional actions specific to this node |

### 3.2 TreeNodeType

Describes a node type: its identifier and the default actions available to every node of this type.

```ts
type TreeNodeType = {
  type: string;
  actions?: string[];
  selectable?: boolean;
};
```

| Field        | Type        | Description                                                                 |
| ------------ | ----------- | --------------------------------------------------------------------------- |
| `type`       | `string`    | The type of the node                                                        |
| `actions`    | `string[]?` | Default actions of the nodes of this type, merged with their `extraActions` |
| `selectable` | `boolean?`  | Whether the nodes of this type can be selected (`true` by default)          |

---

## 4. Method Details

### 4.1 toQTreeNodes

Converts an array of `TreeNode<T>` to an array of Quasar-compatible `QTreeNode`.

```ts
function toQTreeNodes<T>(nodes: TreeNode<T>[]): QTreeNode[];
```

**Example with string values:**

```ts
import type { TreeNode } from '@linagora/lin-pulsar-core';

const nodes: TreeNode<string>[] = [
  { type: 'one', key: 'a', value: 'Element A', nodes: [], extraActions: [] },
  {
    type: 'two',
    key: 'b',
    value: 'Element B',
    nodes: [],
    extraActions: ['import'],
  },
];

const qNodes = toQTreeNodes<string>(nodes);
// Result:
// [
//   { key: 'a', value: 'Element A', type: 'one', children: [] },
//   { key: 'b', value: 'Element B', type: 'two', children: [] },
// ]
```

**Example with object values:**

```ts
import type { TreeNode } from '@linagora/lin-pulsar-core';

type User = { id: number; name: string };

const nodes: TreeNode<User>[] = [
  {
    type: 'user',
    key: 'u-1',
    value: { id: 1, name: 'Alice' },
    nodes: [],
    extraActions: ['edit'],
  },
];

const qNodes = toQTreeNodes<User>(nodes);
// Result:
// [
//   { key: 'u-1', value: { id: 1, name: 'Alice' }, type: 'user', children: [] },
// ]
```

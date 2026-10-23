import { useTree } from 'src/composables/useTree';
import { describe, expect, it } from 'vitest';

describe('Test composable: useTree', () => {
  const { toQTreeNodes } = useTree();

  describe('Test function: toQTreeNodes', () => {
    it('should return an empty array when given an empty array', () => {
      expect(toQTreeNodes([])).toEqual([]);
    });

    it('should convert a single flat node to a QTreeNode', () => {
      const nodes = [
        {
          type: 'user',
          key: 'user-1',
          value: 'Alice',
          extraActions: [],
          nodes: [],
        },
      ];

      const result = toQTreeNodes(nodes);

      expect(result).toHaveLength(1);
      expect(result[0]).toMatchObject({
        type: 'user',
        key: 'user-1',
        value: 'Alice',
        children: [],
      });
    });

    it('should recursively convert nested nodes', () => {
      const nodes = [
        {
          type: 'group',
          key: 'group-1',
          value: 'Group 1',
          nodes: [
            {
              type: 'user',
              key: 'user-1',
              value: { label: 'Alice' },
              extraActions: ['view'],
              nodes: [],
            },
            {
              type: 'user',
              key: 'user-2',
              value: { label: 'Bob' },
              extraActions: [],
              nodes: [],
            },
          ],
          extraActions: [],
        },
      ];

      const result = toQTreeNodes(nodes);

      expect(result).toHaveLength(1);
      expect(result[0].key).toBe('group-1');
      expect(result[0].type).toBe('group');
      expect(result[0].value).toBe('Group 1');
      expect(result[0].children).toHaveLength(2);
      expect(result[0].children[0]).toMatchObject({
        type: 'user',
        key: 'user-1',
        value: { label: 'Alice' },
        children: [],
      });
      expect(result[0].children[1]).toMatchObject({
        type: 'user',
        key: 'user-2',
        value: { label: 'Bob' },
        children: [],
      });
    });
  });
});

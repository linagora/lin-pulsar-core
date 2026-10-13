import { useUiDesign } from 'src/composables/useUiDesign.ts';
import * as uiDesignService from 'src/services/uiDesignService.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/uiDesignService', () => ({
  getUiDesign: vi.fn(),
  setUiDesign: vi.fn(),
}));

describe('Test composable: useUiDesign', () => {
  describe('Test function: ui', () => {
    const configuration = {
      default: {
        'q-btn': {
          flat: true,
          textColor: 'accent',
          color: 'primary',
        },
        draggable: {
          animation: 200,
          ghostClass: 'sortable-ghost',
        },
      },
      custom: {
        'q-btn': {
          flat: false,
        },
        other: {
          'q-btn': {
            color: 'secondary',
          },
        },
        draggable: {
          animation: 300,
        },
      },
    };
    beforeEach(() => {
      vi.clearAllMocks();
      vi.mocked(uiDesignService.getUiDesign).mockReturnValue(configuration);
    });

    it('should retrieve default value', () => {
      const { ui } = useUiDesign();

      expect(ui('unknown', 'q-btn').flat).toEqual(true);
      expect(ui('custom.other', 'q-btn').textColor).toEqual('accent');
    });

    it('should retrieve overcharge value', () => {
      const { ui } = useUiDesign();

      expect(ui('custom', 'q-btn').flat).toEqual(false);
      expect(ui('custom.other', 'q-btn').color).toEqual('secondary');
    });

    it('should retrieve value with override', () => {
      const { ui } = useUiDesign();

      const result = ui('custom', 'q-btn', {
        flat: true,
        size: 'lg',
      });

      expect(result.flat).toEqual(true);
      expect(result.size).toEqual('lg');
      expect(result.color).toEqual('primary');
    });

    it('should throw if component is not supported', () => {
      const { ui } = useUiDesign();

      expect(() => ui('custom', 'q-falsy')).toThrowError(
        "[UiDesign] The component 'q-falsy' is not supported for UI design retrieval."
      );

      expect(() => ui('custom', '')).toThrowError(
        "[UiDesign] The component '' is not supported for UI design retrieval."
      );
    });

    it.each(['label', 'fab'])('should not return %s', (prop) => {
      const { ui } = useUiDesign();

      const result = ui('custom', 'q-btn');
      expect(prop in result).toBe(false);
    });

    it.each([null, { nested: false }])('should throw for %o', (flat) => {
      vi.mocked(uiDesignService.getUiDesign).mockReturnValue({
        ...configuration,
        custom: {
          ...configuration.custom,
          'q-btn': { flat },
        },
      });

      const { ui } = useUiDesign();

      expect(() => ui('custom', 'q-btn')).toThrowError(
        "[UiDesign] Value for 'custom.q-btn.flat' is a nested object or null, expected a primitive."
      );
    });

    it('should retrieve default value for a third-party component', () => {
      const { ui } = useUiDesign();

      expect(ui('unknown', 'draggable').ghostClass).toEqual('sortable-ghost');
      expect(ui('custom', 'draggable').ghostClass).toEqual('sortable-ghost');
    });

    it('should retrieve overridden value for a third-party component', () => {
      const { ui } = useUiDesign();

      expect(ui('custom', 'draggable').animation).toEqual(300);
    });

    it('should retrieve value with override for a third-party component', () => {
      const { ui } = useUiDesign();

      const result = ui('custom', 'draggable', { animation: 500 });

      expect(result.animation).toEqual(500);
      expect(result.ghostClass).toEqual('sortable-ghost');
    });

    it('should ignore non-configurable properties for a third-party component', () => {
      const { ui } = useUiDesign();
      const result = ui('custom', 'draggable');

      expect('dragoverBubble' in result).toBe(false);
    });

    it('should ignore configurable properties if no default fallback for a third-party component', () => {
      const { ui } = useUiDesign();
      const result = ui('custom', 'draggable');

      expect('sort' in result).toBe(false);
    });
  });
});

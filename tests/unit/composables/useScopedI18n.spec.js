import { useLinPulsarUserPreference } from 'src/composables/useLinPulsarUserPreference.ts';
import {
  changeLocale,
  resolveLocale,
  syncLocale,
  useScopedI18n,
} from 'src/composables/useScopedI18n.ts';
import { getI18nInstance, setI18nInstance } from 'src/services/i18nService.ts';
import { useLinPulsarUiStore } from 'src/stores/linPulsarUiStore.ts';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('vue-i18n', () => ({
  useI18n: () => getI18nInstance(),
}));

vi.mock('src/stores/linPulsarUiStore.ts', () => ({
  useLinPulsarUiStore: vi.fn(),
}));

vi.mock('src/composables/useLinPulsarUserPreference.ts', () => ({
  useLinPulsarUserPreference: vi.fn(),
}));

describe('Test composable: useScopedI18n', () => {
  setI18nInstance({
    global: { locale: { value: 'fr-FR' } },
    t: (a, b, c) => `${a} ${b} ${c}`,
    te: (key) => key !== 'test.missing',
    tm: (key) => (key === 'test.exists' ? 'raw message' : undefined),
  });

  describe('Test function: t', () => {
    it('should retrieve default value', () => {
      const { t } = useScopedI18n('test');

      expect(t('1', 1)).toEqual('test.1 1 undefined');
      expect(t('custom', 'value')).toEqual('test.custom value undefined');
    });
  });

  describe('Test function: te', () => {
    it('should return true for existing keys', () => {
      const { te } = useScopedI18n('test');

      expect(te('1')).toBe(true);
      expect(te('custom')).toBe(true);
    });

    it('should return false for missing keys', () => {
      const { te } = useScopedI18n('test');

      expect(te('missing')).toBe(false);
    });
  });

  describe('Test function: tm', () => {
    it('should return raw message if key exists', () => {
      const { tm } = useScopedI18n('test');

      expect(tm('exists')).toBe('raw message');
    });

    it('should return undefined if key does not exist', () => {
      const { tm } = useScopedI18n('test');

      expect(tm('missing')).toBeUndefined();
    });
  });

  describe('Test function: translateOrDefault', () => {
    it('should return translated value if key exists', () => {
      const { translateOrDefault } = useScopedI18n('test');

      expect(translateOrDefault('fallback', '1', 1)).toEqual(
        'test.1 1 undefined'
      );
    });

    it('should return default value if key does not exist', () => {
      const { translateOrDefault } = useScopedI18n('test');

      expect(translateOrDefault('fallback', 'missing', 1)).toEqual('fallback');
    });
  });

  describe('Test function: resolveLocale', () => {
    beforeEach(() => {
      vi.mocked(useLinPulsarUiStore).mockReturnValue({
        i18n: { locale: 'fr-FR', languages: ['fr-FR', 'en-US'] },
      });
      localStorage.clear();
    });

    it('should return the user preference when supported', () => {
      vi.mocked(useLinPulsarUserPreference).mockReturnValue({
        userPreferenceStore: { userPreferences: { language: 'en-US' } },
      });

      expect(resolveLocale()).toBe('en-US');
    });

    it('should fall back to localStorage when no preference', () => {
      vi.mocked(useLinPulsarUserPreference).mockReturnValue({
        userPreferenceStore: { userPreferences: {} },
      });
      localStorage.setItem('language', 'en-US');

      expect(resolveLocale()).toBe('en-US');
    });

    it('should fall back to the store locale when nothing is supported', () => {
      vi.mocked(useLinPulsarUserPreference).mockReturnValue({
        userPreferenceStore: { userPreferences: {} },
      });

      expect(resolveLocale()).toBe('fr-FR');
    });
  });

  describe('Test function: syncLocale', () => {
    let saveUserPreference;

    beforeEach(() => {
      saveUserPreference = vi.fn();
      localStorage.clear();
    });

    it('should persist the preference when it differs', async () => {
      vi.mocked(useLinPulsarUserPreference).mockReturnValue({
        userPreferenceStore: { userPreferences: { language: 'fr-FR' } },
        saveUserPreference,
      });

      await syncLocale('en-US');

      expect(localStorage.getItem('language')).toBe('en-US');
      expect(saveUserPreference).toHaveBeenCalledWith('language', 'en-US');
    });

    it('should write localStorage without saving when value equals stored preference (boot path)', async () => {
      vi.mocked(useLinPulsarUserPreference).mockReturnValue({
        userPreferenceStore: { userPreferences: { language: 'en-US' } },
        saveUserPreference,
      });

      await syncLocale('en-US');

      expect(localStorage.getItem('language')).toBe('en-US');
      expect(saveUserPreference).not.toHaveBeenCalled();
    });
  });

  describe('Test function: changeLocale', () => {
    it('should apply the locale to the store and persist it', async () => {
      const setLocale = vi.fn();
      const saveUserPreference = vi.fn();

      vi.mocked(useLinPulsarUiStore).mockReturnValue({
        i18n: { locale: 'fr-FR', languages: ['fr-FR', 'en-US'] },
        setLocale,
      });
      vi.mocked(useLinPulsarUserPreference).mockReturnValue({
        userPreferenceStore: { userPreferences: { language: 'fr-FR' } },
        saveUserPreference,
      });
      const i18n = getI18nInstance();

      await changeLocale('en-US');

      expect(i18n.global.locale.value).toBe('en-US');
      expect(setLocale).toHaveBeenCalledWith('en-US');
      expect(saveUserPreference).toHaveBeenCalledWith('language', 'en-US');
    });
  });
});

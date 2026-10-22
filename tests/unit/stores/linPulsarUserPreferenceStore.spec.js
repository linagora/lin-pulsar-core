import { createPinia, setActivePinia } from 'pinia';
import * as piniaStoreService from 'src/services/piniaStoreService';
import { useLinPulsarUserPreferenceStore } from 'src/stores/linPulsarUserPreferenceStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/piniaStoreService', () => ({
  getPiniaStore: vi.fn(),
  setPiniaStore: vi.fn(),
}));

describe('Test store: linPulsarUserPreferenceStore', () => {
  let store;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);

    vi.mocked(piniaStoreService.getPiniaStore).mockReturnValue(pinia);

    store = useLinPulsarUserPreferenceStore();

    vi.clearAllMocks();
  });

  describe('Test initial state', () => {
    it('should initialize with empty userPreferences', () => {
      expect(store.userPreferences).toEqual({});
    });
  });

  describe('Test action: setUserPreferences', () => {
    it('should replace all user preferences', () => {
      store.setUserPreferences({
        theme: 'dark',
        language: 'en',
      });

      expect(store.userPreferences).toEqual({
        theme: 'dark',
        language: 'en',
      });
    });

    it('should override previous preferences completely', () => {
      store.setUserPreferences({
        theme: 'dark',
      });

      store.setUserPreferences({
        language: 'fr',
      });

      expect(store.userPreferences).toEqual({
        language: 'fr',
      });
    });
  });

  describe('Test action: setUserPreference', () => {
    it('should add a new preference', () => {
      store.setUserPreference('theme', 'dark');

      expect(store.userPreferences).toEqual({
        theme: 'dark',
      });
    });

    it('should update an existing preference', () => {
      store.setUserPreference('theme', 'dark');
      store.setUserPreference('theme', 'light');

      expect(store.userPreferences.theme).toBe('light');
    });
  });

  describe('Test action: removeUserPreference', () => {
    it('should remove an existing preference', () => {
      store.setUserPreferences({
        theme: 'dark',
        language: 'en',
      });

      store.removeUserPreference('theme');

      expect(store.userPreferences).toEqual({
        language: 'en',
      });
    });

    it('should not fail when removing non-existing key', () => {
      store.setUserPreferences({
        theme: 'dark',
      });

      store.removeUserPreference('nonExistingKey');

      expect(store.userPreferences).toEqual({
        theme: 'dark',
      });
    });
  });
});

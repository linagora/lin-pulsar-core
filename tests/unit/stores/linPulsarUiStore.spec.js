import { createPinia, setActivePinia } from 'pinia';
import * as piniaStoreService from 'src/services/piniaStoreService.ts';
import { useLinPulsarUiStore } from 'src/stores/linPulsarUiStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/piniaStoreService', () => ({
  getPiniaStore: vi.fn(),
  setPiniaStore: vi.fn(),
}));

describe('Test store: linPulsarUiStore', () => {
  let store;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    vi.mocked(piniaStoreService.getPiniaStore).mockReturnValue(pinia);
    store = useLinPulsarUiStore();
    vi.clearAllMocks();
  });

  describe('Test initial state', () => {
    it('should have empty initial state', () => {
      expect(store.mainNavigationItems).toEqual([]);
      expect(store.i18n).toEqual({ locale: '', languages: [] });
    });
  });

  describe('Test action: addMainNavigationMenuItems', () => {
    it('should add items to the main navigation menu', async () => {
      const items = [
        { id: 'home', labelKey: 'nav.home', path: '/' },
        { id: 'about', labelKey: 'nav.about', path: '/about' },
      ];
      store.addMainNavigationMenuItems(...items);
      expect(store.mainNavigationItems).toEqual(items);
    });
  });

  describe('Test action: setLocale', () => {
    it('should set the active locale', () => {
      store.setLocale('fr-FR');
      expect(store.i18n.locale).toBe('fr-FR');
    });
  });

  describe('Test action: setAvailableLanguages', () => {
    it('should set the available languages', () => {
      const languages = ['fr-FR', 'en-US'];
      store.setAvailableLanguages(languages);
      expect(store.i18n.languages).toEqual(languages);
    });
  });
});

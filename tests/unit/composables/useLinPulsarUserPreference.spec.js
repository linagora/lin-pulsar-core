import { useLinPulsarUserPreference } from 'src/composables/useLinPulsarUserPreference';
import * as httpClientService from 'src/services/httpClientService';
import { useLinPulsarUserPreferenceStore } from 'src/stores/linPulsarUserPreferenceStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/httpClientService', () => ({
  getHttpClient: vi.fn(),
}));

vi.mock('src/stores/linPulsarUserPreferenceStore', () => ({
  useLinPulsarUserPreferenceStore: vi.fn(),
}));

describe('Test composable: useLinPulsarUserPreference', () => {
  let storeMock;

  beforeEach(() => {
    vi.clearAllMocks();

    storeMock = {
      setUserPreferences: vi.fn(),
      setUserPreference: vi.fn(),
      removeUserPreference: vi.fn(),
    };

    vi.mocked(useLinPulsarUserPreferenceStore).mockReturnValue(storeMock);
  });

  describe('Test function: init', () => {
    it('should fetch preferences and populate store', async () => {
      vi.mocked(httpClientService.getHttpClient).mockReturnValue({
        get: vi.fn().mockResolvedValue({
          data: {
            theme: 'dark',
            language: 'en',
          },
        }),
      });

      const { init } = useLinPulsarUserPreference();

      await init();

      expect(storeMock.setUserPreferences).toHaveBeenCalledWith({
        theme: 'dark',
        language: 'en',
      });
    });
  });

  describe('Test function: saveUserPreference', () => {
    it('should persist preference and update store', async () => {
      vi.mocked(httpClientService.getHttpClient).mockReturnValue({
        post: vi.fn().mockResolvedValue({
          data: {
            key: 'theme',
            value: 'dark',
          },
        }),
      });

      const { saveUserPreference } = useLinPulsarUserPreference();

      await saveUserPreference('theme', 'dark');

      expect(storeMock.setUserPreference).toHaveBeenCalledWith('theme', 'dark');
    });
  });

  describe('Test function: deleteUserPreference', () => {
    it('should delete preference and update store', async () => {
      vi.mocked(httpClientService.getHttpClient).mockReturnValue({
        delete: vi.fn().mockResolvedValue(undefined),
      });

      const { deleteUserPreference } = useLinPulsarUserPreference();

      await deleteUserPreference('theme');

      expect(storeMock.removeUserPreference).toHaveBeenCalledWith('theme');
    });
  });

  describe('Test integration flow', () => {
    it('should expose store instance', () => {
      vi.mocked(httpClientService.getHttpClient).mockReturnValue({});

      const { userPreferenceStore } = useLinPulsarUserPreference();

      expect(userPreferenceStore).toBe(storeMock);
    });
  });
});

import { createPinia, setActivePinia } from 'pinia';
import * as piniaStoreService from 'src/services/piniaStoreService';
import { useLinPulsarUserStore } from 'src/stores/linPulsarUserStore';
import { beforeEach, describe, expect, it, vi } from 'vitest';

vi.mock('src/services/piniaStoreService', () => ({
  getPiniaStore: vi.fn(),
  setPiniaStore: vi.fn(),
}));

describe('Test store: linPulsarUserStore', () => {
  let store;
  let pinia;

  beforeEach(() => {
    pinia = createPinia();
    setActivePinia(pinia);
    vi.mocked(piniaStoreService.getPiniaStore).mockReturnValue(pinia);
    store = useLinPulsarUserStore();
    vi.clearAllMocks();
  });

  describe('Test initial state', () => {
    it('should have empty user details and not be authenticated', () => {
      expect(store.user).toEqual({
        email: '',
        fullName: '',
        roles: [],
        username: '',
      });
      expect(store.isAuthenticated).toBe(false);
    });
  });

  describe('Test action: setUserFromClaims', () => {
    it('should set user fields from valid claims and mark as authenticated', () => {
      const claims = {
        sub: 'user-123',
        email: 'alice@example.com',
        name: 'Alice Dupont',
        roles: ['admin', 'user'],
      };

      store.setUserFromClaims(claims);

      expect(store.user).toEqual({
        username: 'user-123',
        email: 'alice@example.com',
        fullName: 'Alice Dupont',
        roles: ['admin', 'user'],
      });
      expect(store.isAuthenticated).toBe(true);
    });

    it('should set email to empty string when claim is not a string', () => {
      const claims = {
        sub: 'user-456',
        email: undefined,
        name: 'Bob',
        roles: [],
      };

      store.setUserFromClaims(claims);

      expect(store.user.email).toBe('');
    });

    it('should set fullName to empty string when name claim is not a string', () => {
      const claims = {
        sub: 'user-789',
        email: 'bob@example.com',
        name: undefined,
        roles: [],
      };

      store.setUserFromClaims(claims);

      expect(store.user.fullName).toBe('');
    });

    it('should set roles to empty array when roles claim is not an array', () => {
      const claims = {
        sub: 'user-000',
        email: 'carol@example.com',
        name: 'Carol',
        roles: 'admin',
      };

      store.setUserFromClaims(claims);

      expect(store.user.roles).toEqual([]);
    });

    it('should filter out non-string values from roles array', () => {
      const claims = {
        sub: 'user-111',
        email: 'dave@example.com',
        name: 'Dave',
        roles: ['admin', 42, null, 'user', true],
      };

      store.setUserFromClaims(claims);

      expect(store.user.roles).toEqual(['admin', 'user']);
    });

    it('should set roles to empty array when roles claim is undefined', () => {
      const claims = {
        sub: 'user-222',
        email: 'eve@example.com',
        name: 'Eve',
      };

      store.setUserFromClaims(claims);

      expect(store.user.roles).toEqual([]);
    });

    it('should map sub to username', () => {
      const claims = {
        sub: 'unique-sub-value',
        email: 'frank@example.com',
        name: 'Frank',
        roles: [],
      };

      store.setUserFromClaims(claims);

      expect(store.user.username).toBe('unique-sub-value');
    });
  });
});

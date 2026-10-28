import type { IdTokenClaims } from 'oidc-client-ts';
import type { LinPulsarUser } from '../types/linPulsarUser';
/**
 * State interface for the LinPulsar User Store.
 */
interface LinPulsarUserState {
    /** The current user information. */
    user: LinPulsarUser;
    /** Flag indicating whether the user is authenticated. */
    isAuthenticated: boolean;
}
/**
 * Returns the LinPulsar User Store instance.
 * @returns The LinPulsar User Store instance.
 */
export declare const useLinPulsarUserStore: () => import("pinia").Store<"LinPulsarUserStore", LinPulsarUserState, {}, {
    /**
     * Populates the store from the claims of an OIDC ID token.
     * Maps `sub` → username, `email`, `name` → fullName, `roles` → roles,
     * and flips `isAuthenticated` to true.
     * @param claims The decoded ID token claims provided by oidc-client-ts.
     */
    setUserFromClaims(claims: IdTokenClaims): void;
}>;
export {};

/**
 * State interface for the LinPulsar User Preference Store.
 */
export interface LinPulsarUserPreferenceState {
    /** Collection of user preferences indexed by key. */
    userPreferences: Record<string, string>;
}
/**
 * Returns the LinPulsar User Preference Store instance.
 * @returns The LinPulsar User Preference Store instance.
 */
export declare const useLinPulsarUserPreferenceStore: () => import("pinia").Store<"LinPulsarUserPreferenceStore", LinPulsarUserPreferenceState, {}, {
    /**
     * Replaces all user preferences with the provided collection.
     * @param values The complete set of user preferences.
     */
    setUserPreferences(values: Record<string, string>): void;
    /**
     * Creates or updates a user preference.
     * @param key The user preference key.
     * @param value The user preference value.
     */
    setUserPreference(key: string, value: string): void;
    /**
     * Removes a user preference by its key.
     * @param key The user preference key to remove.
     */
    removeUserPreference(key: string): void;
}>;

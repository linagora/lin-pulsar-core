import { type ComposerTranslation } from 'vue-i18n';
/**
 * Creates a scoped i18n translator bound to a specific translation namespace.
 *
 * The provided `scope` is automatically prefixed to all translation keys, allowing the same module to be reused in
 * different functional contexts (e.g. "user.person", "user.account") without duplicating component code.
 * @param scope - Translation namespace prefix to apply to all keys.
 * @returns An object exposing a scoped `t` function.
 */
export declare function useScopedI18n(scope: string): {
    /**
     * Scoped translation function that mirrors all overloads of vue-i18n's `t` function.
     *
     * It automatically prefixes all translation keys with the provided `scope`.
     * Supports key-only, pluralization, named interpolation, and options overloads.
     */
    t: ComposerTranslation;
    /**
     * Checks whether a translation key exists within the scoped namespace.
     * @param key - Translation key (string or number) relative to the scoped namespace.
     * @returns `true` if the key exists, `false` otherwise.
     */
    te: (key: string, locale?: string | undefined) => boolean;
    /**
     * Retrieves the raw translation message for a scoped key without formatting.
     * @param key - Translation key (string or number) relative to the scoped namespace.
     * @returns The raw message associated with the key, or `undefined` if the key does not exist.
     */
    tm: (key: string | number) => ReturnType<ComposerTranslation>;
    /**
     * Returns the translation for a scoped key if it exists, otherwise returns the provided default value.
     * @param defaultValue - Value to return if the translation key does not exist.
     * @param args - Arguments passed to the translation function (`t`), including key, pluralization, named parameters, or options.
     * @returns The translated string if the key exists, otherwise `defaultValue`.
     */
    translateOrDefault: (defaultValue: string, ...args: unknown[]) => ReturnType<ComposerTranslation>;
};
/**
 * Resolves the effective locale to apply, without any side effect.
 *
 * The locale is resolved by priority: the stored user preference first, then the locally persisted language.
 * If neither the stored preference nor the localStorage value is a supported language, the UI store locale is used as the fallback.
 * @returns The locale code the caller should apply to its i18n target.
 */
export declare function resolveLocale(): string;
/**
 * Synchronises the persisted state with the given locale.
 *
 * The locale is always written to localStorage. The server-side user preference is updated only when it differs from
 * the currently stored one.
 * @param locale - The locale to persist.
 * @returns A promise that resolves once the persisted state has been synchronised.
 */
export declare function syncLocale(locale: string): Promise<void>;
/**
 * Applies the given locale to the application and persists the choice.
 *
 * Updates the active i18n locale, reflects it in the UI store, and synchronises the persisted state. This assumes the
 * shared i18n instance runs in Composition mode (legacy: false), as guaranteed by the lin-pulsar-core `LinPulsarI18n` convention;
 * on a legacy instance the locale assignment would be a silent no-op at runtime.
 * @param locale - The locale code to apply (e.g. "fr-FR").
 * @returns A promise that resolves once the locale has been applied and persisted.
 */
export declare function changeLocale(locale: string): Promise<void>;

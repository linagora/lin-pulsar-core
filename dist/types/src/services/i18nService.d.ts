import { type I18n } from 'vue-i18n';
/**
 * Type alias for the shared LinPulsar i18n instance.
 *
 * This type represents the Vue I18n instance used across all LinPulsar modules.
 * The instance is configured in Composition API mode (`legacy: false`) and
 * exposes the global composer API for translations.
 *
 * Using a dedicated alias prevents consumers from falling back to the default
 * `I18n` generic parameters, which may expose both legacy and composition
 * translation signatures and cause TypeScript overload conflicts.
 */
type LinPulsarI18n = I18n<Record<string, never>, Record<string, never>>;
/**
 * Initializes the shared i18n instance.
 * Should be called once by the host application during boot.
 * @param instance - The i18n instance to use as the shared store.
 */
export declare function setI18nInstance(instance: LinPulsarI18n): void;
/**
 * Returns the shared i18n instance.
 * Must be called after initialization via `setI18nInstance()`.
 * @returns The shared i18n instance.
 */
export declare function getI18nInstance(): LinPulsarI18n;
export {};

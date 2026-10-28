import type { ValidationRule } from 'quasar/dist/types/api/validation.js';
import type { LinPulsarAttributeConfiguration, ValidatorName } from '..';
/**
 * Generates Quasar validation rules based on configuration.
 * @param instanceId - The unique identifier of the module instance.
 * @param attributeConfig - The configuration of the attribute being validated.
 * @param validatorsNames - Array of validator names to include.
 * @param i18nScope - The scope for internationalization.
 * @returns An array of validation functions compatible with Quasar.
 */
export declare function useQuasarRules<T extends Record<string, unknown>>(instanceId: string, attributeConfig: LinPulsarAttributeConfiguration<T>, validatorsNames: ValidatorName[], i18nScope: string): ValidationRule[];

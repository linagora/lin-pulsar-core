/**
 * Available validator names that require configuration parameters.
 * These validators read their parameters from the `inputSettings` property
 * of `LinPulsarAttributeConfiguration`.
 */
export type ValidatorName = 'email' | 'min' | 'max' | 'minLength' | 'maxLength' | 'pattern' | 'unique' | 'maxFileSize' | 'allowedExtensions';

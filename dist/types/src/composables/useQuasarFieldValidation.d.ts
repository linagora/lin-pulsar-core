/**
 * Composable for field validation compatible with Quasar framework.
 * @param i18nScope The i18n scope for translation keys used in validation messages.
 * @returns An object containing validation methods formatted for Quasar.
 */
export declare function useQuasarFieldValidation(i18nScope: string): {
    validateFromApi: (instanceId: string, fieldName: string) => (value: string) => Promise<true | string>;
    required: (value: unknown) => true | string;
    email: (value: unknown) => true | string;
    min: (minValue: number) => (value: string | number) => string | true;
    max: (maxValue: number) => (value: string | number) => string | true;
    minLength: (minValue: number) => (value: string) => string | true;
    maxLength: (maxValue: number) => (value: string) => string | true;
    pattern: (patternValue: string) => (value: string) => string | true;
    unique: (items: unknown[]) => (value: unknown) => string | true;
    maxFileSize: (maxSize: number) => (value: File | File[] | null | undefined) => string | true;
    allowedExtensions: (extensions: string[]) => (value: File | File[] | null | undefined) => string | true;
    validDate: (format?: string) => (value: unknown) => string | true;
    afterDate: (compareTo: string, format?: string) => (value: unknown) => string | true;
    beforeDate: (compareTo: string, format?: string) => (value: unknown) => string | true;
    fromDate: (compareTo: string, format?: string) => (value: unknown) => string | true;
    upToDate: (compareTo: string, format?: string) => (value: unknown) => string | true;
};

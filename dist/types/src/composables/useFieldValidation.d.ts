/**
 * Composable for field validation. It exposes various validation methods
 * that can be used to validate form fields.
 * @param i18nScope - I18n scope for localizing the validators.
 * @returns An object containing validation methods.
 */
export declare function useFieldValidation(i18nScope: string): {
    validateFromApi: (instanceId: string, fieldName: string, value: unknown) => Promise<true | string>;
    required: (value: unknown) => true | string;
    email: (value: unknown) => true | string;
    minLength: (value: string | null | undefined, minValue: number) => true | string;
    maxLength: (value: string | null | undefined, maxValue: number) => true | string;
    min: (value: number, minValue: number) => true | string;
    max: (value: number, maxValue: number) => true | string;
    pattern: (value: string, pattern: string) => true | string;
    unique: (value: unknown, items: unknown[]) => true | string;
    maxFileSize: (value: File | File[] | null | undefined, maxSize: number) => true | string;
    allowedExtensions: (value: File | File[] | null | undefined, extensions: string[]) => true | string;
    validDate: (value: unknown, format?: string) => true | string;
    afterDate: (value: unknown, compareTo: unknown, format?: string) => true | string;
    beforeDate: (value: unknown, compareTo: unknown, format?: string) => true | string;
    fromDate: (value: unknown, compareTo: unknown, format?: string) => true | string;
    upToDate: (value: unknown, compareTo: unknown, format?: string) => true | string;
};

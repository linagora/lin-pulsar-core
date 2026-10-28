/** Formatter signature. Returns the value untouched when it cannot handle the given input. */
export type ValueFormatter = (value: unknown, options?: Record<string, unknown>) => unknown;
/**
 * Formatting properties mixed into the field and column definitions of generic components. Formatters are referenced
 * by name so configurations stay serialisable in plain JSON module options.
 */
export interface FormatterConfiguration {
    /** Formatter applied to the value before display. An unknown name displays the raw value. */
    formatter?: string;
    /** Options forwarded to the formatter. `toDate` requires a `formatKey` string. */
    formatOptions?: Record<string, unknown>;
}

import { type LinPulsarFilterOperator } from '../types/linPulsarFilter';
/**
 * Represents a single applied value of a `LinPulsarFilter`, converted to a string expression
 * combining an optional negation, a comparison operator and a raw value
 * (e.g. `not_lk_paris`, `gt_18`, `paris`).
 */
export declare class LinPulsarFilterValue {
    /**
     * Whether the comparison must be negated.
     */
    isNegation: boolean;
    /**
     * The comparison operator applied to the value.
     */
    operator: LinPulsarFilterOperator;
    /**
     * The raw filter value, with the negation marker and operator prefix stripped.
     */
    value: string;
    /**
     * Item resolved from the dynamic label request, as configured by
     * `LinPulsarFilter.dynamicLabelOptions`. Display information only: it is never part of the value
     * expression produced by {@link LinPulsarFilterValue.toString}.
     */
    item?: Record<string, unknown>;
    /**
     * Creates a new filter value.
     * @param isNegation - Whether the comparison must be negated.
     * @param operator - The comparison operator applied to the value.
     * @param value - The raw filter value.
     * @param item - Item resolved from the dynamic label request.
     */
    constructor(isNegation: boolean, operator: LinPulsarFilterOperator, value: string, item?: Record<string, unknown>);
    /**
     * Parses a filter value expression (e.g. `not_lk_paris`) into a {@link LinPulsarFilterValue}.
     *
     * If `input` is not actually a string at runtime (this class is exported across Module
     * Federation boundaries, where TypeScript cannot enforce the contract), the negation marker and
     * operator prefix can't be looked up, so this returns the same neutral result as for an empty
     * string: no negation, no operator, empty value.
     * @param input - The filter value expression to parse.
     * @returns The parsed filter value.
     */
    static fromString(input: string): LinPulsarFilterValue;
    /**
     * Reconstructs the filter value expression from its negation, operator and value. `item` is
     * display information only and is never serialized.
     * @returns The filter value expression (e.g. `not_lk_paris`).
     */
    toString(): string;
}

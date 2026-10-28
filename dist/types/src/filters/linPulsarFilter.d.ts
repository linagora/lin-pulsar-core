import { type LinPulsarFilterDynamicLabelOptions, type LinPulsarFilterType } from '../types/linPulsarFilter';
import { LinPulsarFilterValue } from './linPulsarFilterValue';
/**
 * Represents a filter that can be applied to a list of entities.
 * The generic parameter `T` allows consumers to define their own options structure
 * for maximum flexibility.
 * @template T - The type of options, defaults to Record<string, unknown>.
 */
export declare class LinPulsarFilter<T = Record<string, unknown>> {
    /**
     *  Auto generated unique identifier of the filter.
     */
    id: string;
    /**
     * Identifier of the filter.
     */
    name: string;
    /**
     * Defines the filter category and expected behavior.
     */
    type: LinPulsarFilterType;
    /**
     * Configuration object of the filter, defined by the consumer.
     */
    options: T;
    /**
     * List of applied filter values.
     */
    values: LinPulsarFilterValue[];
    /**
     * Configuration used to resolve the `item` of each value whose label can't be rendered from the
     * raw value alone, such as an identifier. Performing the requests it describes is up to the
     * consuming layer: this class only carries the configuration.
     */
    dynamicLabelOptions?: LinPulsarFilterDynamicLabelOptions;
    /**
     * Create a new filter.
     * @param name - Identifier of the filter.
     * @param type - Defines the filter category and expected behavior.
     * @param options - Configuration object of the filter, defined by the consumer.
     * @param values - List of applied filter values.
     * @param dynamicLabelOptions - Configuration used to resolve the item of each value.
     */
    constructor(name: string, type: LinPulsarFilterType, options: T, values: LinPulsarFilterValue[], dynamicLabelOptions?: LinPulsarFilterDynamicLabelOptions);
    /**
     * Parses a value expression (e.g. `paris|not_lk_lyon`, as produced by
     * {@link LinPulsarFilterValue.toString}) into a new {@link LinPulsarFilter} instance — `input` is the
     * bare value expression only, never the `name=` query parameter prefix produced by
     * {@link LinPulsarFilter.toString}.
     *
     * `type`, `options` and `dynamicLabelOptions` aren't derivable from `input`: pass the filter
     * `definition` declared in the configuration to carry them over, so that a filter restored from
     * a URL or from a saved filter set behaves like the one the user applied — without it, dynamic
     * labels can't be resolved and the values are rendered raw. When no `definition` is given, the
     * result falls back to a placeholder `'text'` `type`, empty `options` and no
     * `dynamicLabelOptions`. `name` is the query parameter key and always wins over
     * `definition.name`; `id` is auto generated as for any instance.
     *
     * A non-string `input` at runtime (this class is exported across Module Federation boundaries,
     * where TypeScript cannot enforce the contract) is treated like an empty string: an empty
     * `values` array, rather than throwing.
     * @param name - Identifier of the filter.
     * @param input - The value expression, with values separated by `|`.
     * @param definition - Filter definition to restore `type`, `options` and `dynamicLabelOptions` from.
     * @returns The parsed filter instance.
     * @template T - The type of options, defaults to Record<string, unknown>.
     */
    static fromString<T = Record<string, unknown>>(name: string, input: string, definition?: LinPulsarFilter<T>): LinPulsarFilter<T>;
    /**
     * Reconstructs the filter as an HTTP query parameter value, ready to use with
     * APIs powered by `spring-query-filter`. Items resolved through `dynamicLabelOptions` are
     * display information only and never appear in the result.
     * @returns The query parameter string representation of the filter, e.g. `paris|not_lk_lyon`.
     */
    toString(): string;
}

/**
 * Separator used between value expressions combined with OR in a filter's string representation.
 */
export declare const LIN_PULSAR_FILTER_OR_SEPARATOR = "|";
/**
 * Prefix used to mark a filter value as negated.
 */
export declare const LIN_PULSAR_FILTER_NEGATION_PREFIX = "not_";
/**
 * Supported filter categories. Defines the filter behavior and the UI input used to edit it.
 */
export type LinPulsarFilterType = 'date' | 'text' | 'number' | 'list' | 'tree';
/**
 * Supported comparison operators for a filter value.
 * - `lk_` matches a "like / contains" comparison.
 * - `` (empty string) matches a strict equality comparison.
 * - `gt_` matches a "greater than" comparison.
 * - `lt_` matches a "lower than" comparison.
 */
export type LinPulsarFilterOperator = 'lk_' | '' | 'gt_' | 'lt_';
/**
 * Configuration used to dynamically resolve the item associated with each value of a
 * `LinPulsarFilter`, for filters whose values are identifiers (e.g. UUIDs) and need additional
 * information to be rendered in a human-readable way.
 *
 * It only describes *how* to retrieve the items: performing the requests is the responsibility of
 * the consuming layer (such as the component displaying the filter values), never of `LinPulsarFilter`
 * or `LinPulsarFilterValue`.
 */
export interface LinPulsarFilterDynamicLabelOptions {
    /**
     * Whether to perform one request per filter value.
     *
     * Defaults to false, meaning that a single request is made for all values.
     */
    multipleRequests?: boolean;
    /**
     * URL template used to retrieve items.
     *
     * `{{value}}` is available when multipleRequests is true.
     * `{{values}}` is available when multipleRequests is false.
     */
    url: string;
    /**
     * Path to the collection containing the returned items.
     *
     * Only used when multipleRequests is false.
     */
    responseItemsPath?: string;
    /**
     * Path to the value attribute within each returned item.
     *
     * Only used when multipleRequests is false.
     */
    valuePath?: string;
}
/**
 * Represents a user preference entry for a saved filter set in LinPulsar.
 *
 * This object stores the minimal metadata required to identify and reconstruct
 * a filter set from persisted user preferences, including its unique identifier,
 * display label, and serialized filter value.
 */
export interface LinPulsarFilterSetUserPreference {
    /**
     * Unique identifier of the saved filter set.
     * Typically used as a stable key for persistence and retrieval.
     */
    id: string;
    /**
     * Human-readable label for the filter set.
     * Used for display purposes in the UI (e.g., dropdowns, saved views list).
     */
    label: string;
    /**
     * Serialized representation of the filter configuration.
     */
    value: string;
}

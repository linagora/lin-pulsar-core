import { LinPulsarFilter } from './linPulsarFilter';
/**
 * Represents a saved filter set (favorite search), combining a user-defined label with the list
 * of `LinPulsarFilter` it is made of. It converts to and parses from a `&`-separated list of
 * `name=value` query parameter pairs — the same URL filter representation produced by
 * `LinPulsarFilter.toString` — so it can be stored as-is in user preferences and reused directly as
 * a query string against APIs powered by
 * [`spring-query-filter`](https://github.com/Zorin95670/spring-query-filter).
 */
export declare class LinPulsarFilterSet {
    /**
     * Unique identifier of the filter set.
     */
    id: string;
    /**
     * User-friendly name of the favorite search (e.g. "My Active Projects").
     */
    label: string;
    /**
     * Collection of filters composing the favorite search.
     */
    filters: LinPulsarFilter[];
    /**
     * Creates a new filter set.
     * @param id - Unique identifier of the filter set.
     * @param label - User-friendly name of the favorite search.
     * @param filters - Collection of filters composing the favorite search.
     */
    constructor(id: string, label: string, filters: LinPulsarFilter[]);
    /**
     * Parses a string representation of a filter set, as produced by {@link LinPulsarFilterSet.toString},
     * into a new {@link LinPulsarFilterSet} instance.
     *
     * Each `&`-separated segment containing the `=` separator is parsed as a `name=value` pair via
     * {@link LinPulsarFilter.fromString} (which in turn uses `LinPulsarFilterValue.fromString`); segments
     * without `=` are silently dropped instead of producing a filter with a guessed name.
     *
     * `type`, `options` and `dynamicLabelOptions` aren't derivable from the string: pass the filter
     * `definitions` declared in the configuration and each parsed filter is matched to the one
     * carrying the same `name`, so that a restored favorite resolves its dynamic labels like a
     * freshly applied filter. A parsed filter matching no definition keeps placeholder values.
     *
     * `value` tolerates `null`/`undefined`/any non-string at runtime (e.g. `localStorage.getItem(...)`,
     * or across a Module Federation boundary): like an empty string, it produces an empty `filters`
     * array instead of throwing.
     * @param id - Unique identifier of the filter set.
     * @param label - User-friendly name of the favorite search.
     * @param value - The `&`-separated string of `name=value` pairs, as produced by `toString()`.
     * @param definitions - Filter definitions the parsed filters are matched against, by `name`.
     * @returns The parsed filter set.
     */
    static fromString(id: string, label: string, value: string | null | undefined, definitions?: LinPulsarFilter[]): LinPulsarFilterSet;
    /**
     * Reconstructs the filter set as a `&`-separated string of `name=value` pairs, one per filter,
     * ready to use with APIs powered by `spring-query-filter` or to store in user preferences.
     * @returns The string representation of the filter set, e.g.
     * `status=active|pending&createdAt=gt_2026-01-01`.
     */
    toString(): string;
}

import type { Page, Pagination, QuasarPagination } from '../types/page';
/**
 * Composable providing utility functions to convert between backend pagination
 * models and Quasar QTable pagination formats.
 *
 * This helper acts as a translation layer between:
 * - the generic `Pagination` structure used by the API layer, and
 * - the `QuasarPagination` structure expected by Quasar components.
 *
 * It ensures consistent page indexing, sorting, and sizing conventions
 * across the application.
 * @returns An object exposing pagination conversion helpers.
 */
export declare function usePagination(): {
    toPagination: (pagination: QuasarPagination) => Pagination;
    toQuasarPagination: <T>(page: Page<T>, current: QuasarPagination) => QuasarPagination;
};

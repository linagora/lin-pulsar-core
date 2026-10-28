import type { RouteLocationNormalizedLoaded, Router } from 'vue-router';
import { LinPulsarFilter } from '../filters/linPulsarFilter';
/**
 * Composable that synchronizes a list of LinPulsar filters with the query
 * params of the current URL.
 * @param router - Vue router instance, used to update the URL.
 * @param route - Current normalized route, used to read query params.
 * @returns An object exposing `setFiltersInUrl` and `getFiltersFromUrl`.
 */
export declare function useLinPulsarFilterUrl(router: Router, route: RouteLocationNormalizedLoaded): {
    setFiltersInUrl: (filters: LinPulsarFilter[], keeps: string[]) => void;
    getFiltersFromUrl: (filters: LinPulsarFilter[]) => LinPulsarFilter[];
};

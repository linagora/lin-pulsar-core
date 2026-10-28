import type { ModuleComponentRef } from './module';
/**
 * Represents a route exposed by a remote module, supporting recursive children for nested routing.
 * This mirrors Vue Router’s route structure, except that `component`
 * refers to a remote module federation component identifier rather
 * than a local Vue component. The host will dynamically load the
 * remote component and register the route in the Vue Router instance.
 *
 * Children are recursively defined as an array of LinPulsarRoute, allowing for multi-level nesting.
 */
export type LinPulsarRoutes = LinPulsarRoute[];
/**
 * Defines a route exposed by a remote module via Module Federation.
 */
export interface LinPulsarRoute {
    /** Optional unique route name, used by Vue Router for deterministic override. */
    name?: string;
    /** Absolute or nested route path (e.g. "/admin" or "settings"). */
    path: string;
    /**
     * Component reference: a remote component name resolved through Module Federation (e.g. "remoteA/ComponentX"), or
     * a zone entry referencing a federated or locally registered component. A string may be a Nunjucks template; when
     * the template is a single expression resolving to a zone entry in the host configuration (e.g.
     * "{{ config.options.page }}"), the entry itself is used as the reference.
     */
    component: ModuleComponentRef;
    /** Optional list of child routes for nested routing. */
    children?: LinPulsarRoutes;
    /** Optional metadata associated with the route. */
    meta?: Record<string, unknown>;
}

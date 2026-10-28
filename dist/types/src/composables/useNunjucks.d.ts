/** Result of rendering a string: either the Nunjucks output, or a plain object for a direct dotted lookup. */
type StringRenderResult = string | Record<string, unknown>;
/** Result of rendering an array: each element mapped through {@link RenderResult}. */
type ArrayRenderResult<U> = RenderResult<U>[];
/** Result of rendering a plain object: same shape with each property value mapped through {@link RenderResult}. */
type ObjectRenderResult<T extends Record<string, unknown>> = {
    [K in keyof T]: RenderResult<T[K]>;
};
/**
 * The return type of {@link render}, computed recursively from the input type `T`.
 * - `string`                   → `StringRenderResult` (rendered output or a plain object)
 * - `ReadonlyArray<U>`         → `ArrayRenderResult<U>` (elements mapped recursively)
 * - `Record<string, unknown>`  → `ObjectRenderResult<T>` (same shape, values mapped)
 * - anything else              → `T` unchanged.
 */
export type RenderResult<T> = T extends string ? StringRenderResult : T extends ReadonlyArray<infer U> ? ArrayRenderResult<U> : T extends Record<string, unknown> ? ObjectRenderResult<T> : T;
/**
 * Composable exposing utility functions for working with Nunjucks templates.
 * It provides a method to recursively render all string properties of an object as Nunjucks templates using a shared Nunjucks environment.
 * A string that is a single dotted property lookup resolving to a plain object yields that object instead of a string.
 * The Nunjucks environment must be initialized and set in the `nunjucksService` before using this composable.
 *
 * **Security note:** XSS safety of the rendered output depends entirely on the Nunjucks environment
 * provided by the caller. If the output is injected into the DOM as raw HTML (e.g. Via `v-html`),
 * ensure the environment is configured with `autoescape: true`. Template strings (`value`) must be
 * developer-controlled; passing user-supplied strings as templates is not supported and may introduce
 * template injection risks.
 * @returns An object containing utility methods for rendering Nunjucks templates within objects.
 */
export declare function useNunjucks(): {
    render: <T>(value: T, context: Record<string, unknown>) => RenderResult<T>;
    renderString: (template: string, context: Record<string, unknown>) => string;
};
export {};

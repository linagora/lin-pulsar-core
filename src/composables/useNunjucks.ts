/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for LinOpenFactory software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "LinOpenFactory™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of LinOpenFactory™, powered by
 * Linagora © 2009–2026. Contribute to LinOpenFactory R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the LinOpenFactory user interface, (ii) retain all hypertext links between LinOpenFactory
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * LinOpenFactory along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * LinOpenFactory software.
 */

import { isRef, toRaw } from 'vue';
import { getNunjucksEnv } from '../services/nunjucksService';

/**
 * Matches a template made of a single Nunjucks expression and captures that expression.
 */
const SINGLE_EXPRESSION = /^\s*\{\{\s*([^\s{}]+?)\s*\}\}\s*$/;

/**
 * Matches a path segment that is safe to resolve, that is a plain identifier.
 */
const SAFE_SEGMENT = /^[A-Za-z_$][\w$]*$/;

/**
 * Lists the path segments that must never be resolved, to avoid walking up the prototype chain.
 */
const FORBIDDEN_SEGMENTS = new Set(['__proto__', 'constructor', 'prototype']);

/**
 * Determines whether a value is a plain object, that is an object whose prototype is `Object.prototype`.
 * @param value - The value to test.
 * @returns `true` if the value is a plain object, otherwise `false`.
 */
function isPlainObject(value: unknown): value is Record<string, unknown> {
  if (value === null || typeof value !== 'object') {
    return false;
  }
  return Object.getPrototypeOf(toRaw(value as object)) === Object.prototype;
}

/**
 * Unwraps the Vue proxies and refs of a value at every level of its arrays and plain objects, which `structuredClone`
 * cannot clone: a reactive array or object may hold proxies, such as the entries a form field re-emits. A value met
 * again, through a cycle or a shared reference, gets the copy made the first time, so cycles and sharing are kept.
 * The children are read through the value itself, the Vue proxy when there is one, so that a `computed` or a watcher
 * rendering the value tracks them (an item pushed to a reactive array, a nested property changed); the raw value only
 * identifies what was already copied.
 * @template T - The type of the value, kept by the unwrapping.
 * @param value - The value to unwrap.
 * @param copies - The copies already made, by raw value.
 * @returns The value with raw arrays and plain objects, any other value as-is.
 */
function toRawDeep<T>(value: T, copies = new WeakMap<object, unknown>()): T {
  const raw: unknown = toRaw(value);

  if (isRef(raw)) {
    return toRawDeep(raw.value, copies) as T;
  }
  if (!Array.isArray(raw) && !isPlainObject(raw)) {
    return raw as T;
  }
  if (copies.has(raw)) {
    return copies.get(raw) as T;
  }

  const copy: Record<string, unknown> | unknown[] = Array.isArray(raw)
    ? new Array(raw.length)
    : {};

  copies.set(raw, copy);
  for (const key of Object.keys(value as object)) {
    // A key such as `__proto__` stays an own property, as `structuredClone` keeps it.
    Object.defineProperty(copy, key, {
      value: toRawDeep((value as Record<string, unknown>)[key], copies),
      enumerable: true,
      writable: true,
      configurable: true,
    });
  }
  return copy as T;
}

/**
 * Clones a resolved value, unwrapping its Vue proxies and refs first.
 * @param value - The resolved plain object or array.
 * @returns A deep clone of the value, or `null` when it holds a value `structuredClone` cannot clone, such as a
 * function or a proxy inside a `Map`, a `Set` or a class instance.
 */
function cloneResolvedValue(
  value: Record<string, unknown> | unknown[]
): Record<string, unknown> | unknown[] | null {
  try {
    return structuredClone(toRawDeep(value));
  } catch {
    return null;
  }
}

/**
 * Extracts the path segments of a template made of a single property lookup (e.g. `{{ entity }}` or `{{ entity.details }}`).
 * @param template - The template string to inspect.
 * @returns The resolved path segments, or `null` when the template is not a plain property lookup.
 */
function toPathSegments(template: string): string[] | null {
  const match = SINGLE_EXPRESSION.exec(template);
  const expression = match?.[1];

  if (expression === undefined) {
    return null;
  }

  const segments = expression.split('.');

  const isSafe = segments.every(
    (segment) => SAFE_SEGMENT.test(segment) && !FORBIDDEN_SEGMENTS.has(segment)
  );

  return isSafe ? segments : null;
}

/**
 * Resolves a single-expression template directly against the context, bypassing the Nunjucks render.
 * @param template - The template string to resolve.
 * @param context - The context object the path is resolved against.
 * @returns A deep clone of the resolved plain object or array, or `null` when the template is not a plain property lookup, does not resolve to a plain object or an array, or resolves to a value that cannot be cloned.
 */
function resolveObjectExpression(
  template: string,
  context: Record<string, unknown>
): Record<string, unknown> | unknown[] | null {
  const segments = toPathSegments(template);

  if (segments === null) {
    return null;
  }

  let current: unknown = context;

  for (const segment of segments) {
    if (!isPlainObject(current) || !Object.hasOwn(current, segment)) {
      return null;
    }
    current = current[segment];
  }
  return isPlainObject(current) || Array.isArray(current)
    ? cloneResolvedValue(current)
    : null;
}

/**
 * Maps the strings of a value, recursing into arrays and plain objects. Any other value is returned as-is.
 * @param value - The value to map.
 * @param map - The function mapping each string.
 * @returns The mapped value.
 */
function mapStrings(
  value: unknown,
  map: (template: string) => unknown
): unknown {
  if (typeof value === 'string') {
    return map(value);
  }
  if (Array.isArray(value)) {
    return value.map((item) => mapStrings(item, map));
  }
  if (isPlainObject(value)) {
    return Object.fromEntries(
      Object.entries(value).map(([k, v]) => [k, mapStrings(v, map)])
    );
  }
  return value;
}

/**
 * Parses a rendered string as JSON.
 * @param output - The rendered string.
 * @returns `null` for an empty string, the parsed value for valid JSON, otherwise the string itself.
 * @throws {Error} When the output holds a stringified object, which would otherwise be sent silently.
 */
function parseJson(output: string): unknown {
  if (output === '') {
    return null;
  }
  if (output.includes('[object Object]')) {
    throw new Error(
      `[LinPulsar Core] Cannot render an object as JSON: "${output}". Use a single lookup (\`{{ form.tags }}\`) on a value structuredClone can copy (no function), or the \`dump\` filter.`
    );
  }
  try {
    return JSON.parse(output);
  } catch {
    return output;
  }
}

/** The Nunjucks environment with its runtime options, missing from its typings. */
type EnvironmentWithOptions = {
  /** The runtime options of the environment. */
  opts: {
    /** Whether the output is HTML-escaped. */
    autoescape: boolean;
  };
};

/** Result of rendering a string: either the Nunjucks output, or a plain object or an array for a direct dotted lookup. */
type StringRenderResult = string | Record<string, unknown> | unknown[];

/** Result of rendering an array: each element mapped through {@link RenderResult}. */
type ArrayRenderResult<U> = RenderResult<U>[];

/** Result of rendering a plain object: same shape with each property value mapped through {@link RenderResult}. */
type ObjectRenderResult<T extends Record<string, unknown>> = {
  [K in keyof T]: RenderResult<T[K]>;
};

/**
 * The return type of {@link render}, computed recursively from the input type `T`.
 * - `string`                   → `StringRenderResult` (rendered output, a plain object or an array)
 * - `ReadonlyArray<U>`         → `ArrayRenderResult<U>` (elements mapped recursively)
 * - `Record<string, unknown>`  → `ObjectRenderResult<T>` (same shape, values mapped)
 * - anything else              → `T` unchanged.
 */
export type RenderResult<T> = T extends string
  ? StringRenderResult
  : T extends ReadonlyArray<infer U>
    ? ArrayRenderResult<U>
    : T extends Record<string, unknown>
      ? ObjectRenderResult<T>
      : T;

/**
 * Composable exposing utility functions for working with Nunjucks templates.
 * It provides a method to recursively render all string properties of an object as Nunjucks templates using a shared Nunjucks environment.
 * A string that is a single dotted property lookup resolving to a plain object or an array yields that value instead of a string.
 * It also provides a method to render a JSON value, such as a request body, whose rendered strings are parsed as JSON.
 * The Nunjucks environment must be initialized and set in the `nunjucksService` before using this composable.
 *
 * **Security note:** XSS safety of the rendered output depends entirely on the Nunjucks environment
 * provided by the caller. If the output is injected into the DOM as raw HTML (e.g. Via `v-html`),
 * ensure the environment is configured with `autoescape: true`. A single dotted lookup resolving to a plain object or
 * an array returns that value as is, never escaped whatever `autoescape`: its strings must not be injected as raw HTML.
 * Template strings (`value`) must be
 * developer-controlled; passing user-supplied strings as templates is not supported and may introduce
 * template injection risks.
 * @returns An object containing utility methods for rendering Nunjucks templates within objects.
 */
export function useNunjucks() {
  const nunjucksEnv = getNunjucksEnv();

  /**
   * Recursively renders all string properties of a value using the Nunjucks environment and the provided context.
   * @template T - The type of the input value, which can be an array, an object, or any other type.
   * @param value - The value to be processed.
   * @param context - The context object to be used when rendering string properties as Nunjucks templates.
   * @returns The rendered value; see {@link RenderResult} for how each type is mapped.
   */
  function render<T>(
    value: T,
    context: Record<string, unknown>
  ): RenderResult<T>;
  function render<T>(value: T, context: Record<string, unknown>): unknown {
    return mapStrings(
      value,
      (template) =>
        resolveObjectExpression(template, context) ??
        nunjucksEnv.renderString(template, context)
    );
  }

  /**
   * Renders a single template string, always returning a string.
   * Unlike `render`, a single dotted lookup resolving to a plain object or an array is not short-circuited: it goes through Nunjucks like any other expression.
   * Use it for values that must stay strings, such as URLs or any typed string property.
   * @param template - The template string to render.
   * @param context - The context object to be used when rendering the template.
   * @returns The rendered string.
   */
  function renderString(
    template: string,
    context: Record<string, unknown>
  ): string {
    return nunjucksEnv.renderString(template, context);
  }

  /**
   * Recursively renders a JSON value whose strings are Nunjucks templates, such as a request body.
   * Each string is rendered like with `render`, then turned into JSON: an empty output gives `null`, a valid JSON output
   * gives its parsed value (number, boolean, `null`, array, object, quoted string), any other output stays a string.
   * The output is never HTML-escaped, even when the environment sets `autoescape`. Non-string values are returned as-is.
   * An output holding `[object Object]` throws, since an object or an array must be rendered by a single dotted lookup
   * (`{{ form.tags }}`) on a value `structuredClone` can copy (no function), or with the `dump` filter.
   * @param value - The JSON value to render.
   * @param context - The context object to be used when rendering the templates.
   * @returns The rendered JSON value.
   * @throws {Error} When a template renders an object other than by a single dotted lookup on a value `structuredClone`
   * can copy, or the `dump` filter.
   */
  function renderJson(
    value: unknown,
    context: Record<string, unknown>
  ): unknown {
    const { opts } = nunjucksEnv as unknown as EnvironmentWithOptions;
    const autoescape = opts.autoescape;

    opts.autoescape = false;
    try {
      return mapStrings(
        value,
        (template) =>
          resolveObjectExpression(template, context) ??
          parseJson(nunjucksEnv.renderString(template, context))
      );
    } finally {
      opts.autoescape = autoescape;
    }
  }

  return {
    render,
    renderJson,
    renderString,
  };
}

/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for linOpenFactory software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "linOpenFactory™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of linOpenFactory™, powered by
 * Linagora © 2009–2026. Contribute to linOpenFactory R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the linOpenFactory user interface, (ii) retain all hypertext links between linOpenFactory
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * linOpenFactory along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * linOpenFactory software.
 */

/**
 * Represents a plain object with string keys and unknown values.
 *
 * This type is used as a generic container for JSON-like objects
 * whose structure is not known at compile time.
 */
type PlainObject = Record<string, unknown>;

/**
 * Performs a deep merge of two objects.
 *
 * The function recursively merges the `source` object into the `target` object.
 * - If both values at a given key are objects, they are merged recursively.
 * - If either value is not an object, the value from `source` overwrites the one in `target`.
 * - The original `target` object is not mutated; a new object is returned.
 * @param target - The base object to merge into.
 * @param source - The object whose properties will be merged into the target.
 * @returns A new object representing the deep merge of `target` and `source`.
 */
export function merge<T extends PlainObject, S extends PlainObject>(
  target: T,
  source: S
): T & S {
  if (!isObject(target) || !isObject(source)) {
    return source as T & S;
  }

  const result: PlainObject = { ...target };

  for (const key of Object.keys(source)) {
    result[key] = merge(target[key] as PlainObject, source[key] as PlainObject);
  }

  return result as T & S;
}

/**
 * Converts an object using dot-notation keys into a nested object structure.
 *
 * Each key in the input object is interpreted as a path, where segments are
 * separated by dots (`.`). The function expands these paths into nested objects.
 *
 * Example:
 * `{ "a.b.c": "value" }` becomes `{ a: { b: { c: "value" } } }`.
 * @param obj - An object whose keys use dot notation to represent nested paths.
 * @returns A new object with the dot-notation keys expanded into nested objects.
 */
export function fromDot(obj: PlainObject): PlainObject {
  const result: PlainObject = {};

  for (const [path, value] of Object.entries(obj)) {
    const keys = path.split('.');
    let current: PlainObject = result;

    keys.forEach((key, index) => {
      if (index === keys.length - 1) {
        current[key] = value;
      } else {
        if (!isObject(current[key])) {
          current[key] = {};
        }
        current = current[key] as PlainObject;
      }
    });
  }

  return result;
}

/**
 * Reads the value located at a dot-notation path inside an object.
 *
 * Each segment of the path is interpreted as a property name of a nested
 * object. If any intermediate value is missing or is not an object, the
 * function returns `undefined`.
 *
 * Example:
 * `getNestedValue({ a: { b: { c: 'x' } } }, 'a.b.c')` returns `'x'`.
 * @param obj - The object to read from.
 * @param path - The dot-notation path of the value (e.g. `'a.b.c'`).
 * @returns The value at the given path, or `undefined` if the path cannot be resolved.
 */
export function getNestedValue(obj: PlainObject, path: string): unknown {
  return path
    .split('.')
    .reduce<unknown>(
      (current, key) => (isObject(current) ? current[key] : undefined),
      obj
    );
}

/**
 * Sets the value located at a dot-notation path inside an object.
 *
 * The original object is not mutated; a new object is returned where only the
 * objects along the path are recreated, preserving the rest of the structure.
 * Missing intermediate objects are created, and intermediate values that are
 * not objects are replaced by objects.
 *
 * Example:
 * `setNestedValue({ a: { b: 'x', d: 'y' } }, 'a.b', 'z')` returns `{ a: { b: 'z', d: 'y' } }`.
 * @param obj - The object to update.
 * @param path - The dot-notation path of the value (e.g. `'a.b.c'`).
 * @param value - The value to set at the given path.
 * @returns A new object with the value set at the given path.
 */
export function setNestedValue(
  obj: PlainObject,
  path: string,
  value: unknown
): PlainObject {
  const [key, ...rest] = path.split('.');
  const result: PlainObject = { ...obj };

  if (rest.length === 0) {
    result[key] = value;
  } else {
    const child = isObject(result[key]) ? (result[key] as PlainObject) : {};
    result[key] = setNestedValue(child, rest.join('.'), value);
  }

  return result;
}

/**
 * Determines whether a value is a non-null plain object.
 * @param value - The value to test.
 * @returns `true` if the value is an object, otherwise `false`.
 */
export function isObject(value: unknown): value is PlainObject {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Recursively renames the keys of a plain object using a provided key modifier function.
 *
 * - Traverses nested objects and applies the `keyModifier` to each key.
 * - Arrays and non-object values are preserved.
 * - Returns a new object; the original object is not mutated.
 * @param obj - The object whose keys will be renamed.
 * @param keyModifier - A function that receives a key and returns the new key.
 * @returns A new object with keys renamed according to `keyModifier`.
 */
export function renameKeys(
  obj: object,
  keyModifier: (key: string) => string
): object {
  if (typeof obj !== 'object' || obj === null) {
    return obj;
  }

  return Object.fromEntries(
    Object.entries(obj).map(([key, value]) => {
      const newKey = keyModifier(key);
      const newValue = isObject(value) ? renameKeys(value, keyModifier) : value;

      return [newKey, newValue];
    })
  );
}

/**
 * Performs a deep equality check between two plain objects or arrays.
 *
 * This function is designed to compare plain JavaScript objects (key/value pairs)
 * and arrays. It does NOT handle special object types like Date, RegExp, Map, Set,
 * or class instances, which will be compared by reference only.
 *
 * - Compares primitive values directly.
 * - Recursively compares plain objects and their properties.
 * - Recursively compares arrays and their elements.
 * - Returns `true` if both values are deeply equal, otherwise `false`.
 *
 * **Limitations:**
 * - Special object types (Date, RegExp, Map, Set, etc.) are compared by reference.
 * - Class instances are compared by reference, not by their properties.
 * - For comparing these types, use specialized comparison functions.
 * @param a The first value to compare.
 * @param b The second value to compare.
 * @returns `true` if the values are deeply equal, otherwise `false`.
 */
export function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) {
    return true;
  }

  if (
    typeof a === 'number' &&
    typeof b === 'number' &&
    Number.isNaN(a) &&
    Number.isNaN(b)
  ) {
    return true;
  }

  if (a == null || b == null) {
    return false;
  }

  if (typeof a !== 'object' || typeof b !== 'object') {
    return false;
  }

  if (Array.isArray(a) !== Array.isArray(b)) {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) {
    return false;
  }

  const recordA = a as Record<string, unknown>;
  const recordB = b as Record<string, unknown>;

  return keysA.every(
    (key) =>
      Object.prototype.hasOwnProperty.call(recordB, key) &&
      deepEqual(recordA[key], recordB[key])
  );
}

/**
 * Performs a deep equality check between two values, ignoring the order of array elements.
 *
 * - For arrays, checks that both contain the same elements regardless of order.
 * - For plain objects, recursively compares properties (also ignoring array order).
 * - For primitives, uses strict equality.
 * @param a The first value to compare.
 * @param b The second value to compare.
 * @returns `true` if the values are deeply equal (ignoring array order), otherwise `false`.
 */
export function deepEqualUnordered(a: unknown, b: unknown): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) {
      return false;
    }
    const matchedIndices = new Set<number>();
    return a.every((itemA) => {
      const idx = b.findIndex(
        (itemB, i) => !matchedIndices.has(i) && deepEqualUnordered(itemA, itemB)
      );
      if (idx === -1) {
        return false;
      }
      matchedIndices.add(idx);
      return true;
    });
  }

  if (isObject(a) && isObject(b)) {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    if (keysA.length !== keysB.length) {
      return false;
    }
    return keysA.every(
      (key) =>
        Object.prototype.hasOwnProperty.call(b, key) &&
        deepEqualUnordered(a[key], b[key])
    );
  }

  return deepEqual(a, b);
}

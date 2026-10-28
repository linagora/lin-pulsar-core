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
export declare function merge<T extends PlainObject, S extends PlainObject>(target: T, source: S): T & S;
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
export declare function fromDot(obj: PlainObject): PlainObject;
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
export declare function getNestedValue(obj: PlainObject, path: string): unknown;
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
export declare function setNestedValue(obj: PlainObject, path: string, value: unknown): PlainObject;
/**
 * Determines whether a value is a non-null plain object.
 * @param value - The value to test.
 * @returns `true` if the value is an object, otherwise `false`.
 */
export declare function isObject(value: unknown): value is PlainObject;
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
export declare function renameKeys(obj: object, keyModifier: (key: string) => string): object;
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
export declare function deepEqual(a: unknown, b: unknown): boolean;
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
export declare function deepEqualUnordered(a: unknown, b: unknown): boolean;
export {};

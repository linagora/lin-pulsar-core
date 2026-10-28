/**
 * Shape of a single entry passed to the federated DropdownButton component.
 *
 * `TKey` lets consumers narrow the accepted keys to a finite union (typically
 * derived from a `const`-tuple via `typeof X[number]`) so both the entry key
 * and any nested children share the same identifier domain.
 * @template TKey Identifier domain accepted for the entry and its children. Defaults to `string` to keep open-ended menus.
 */
export interface MenuItem<TKey extends string = string> {
    /**
     * Unique identifier of the menu item, used as an i18n key and as the base
     * of the emitted action key.
     */
    key: TKey;
    /**
     * Whether the menu item triggers a click event when activated.
     */
    clickable: boolean;
    /**
     * Optional list of child keys rendered as a sub-menu. Each child key is
     * combined with the parent `key` (e.g. `"<key>.<child>"`) when the user
     * activates a child entry.
     */
    children?: TKey[];
}
/**
 * Payload emitted by the federated DropdownButton when the user activates an
 * entry.
 *
 * For a root entry, `key` equals the entry's own key (e.g. `"edit"`). For a
 * child entry, `key` is the dot-separated composite of the parent key and the
 * child key (e.g. `"export.csv"`).
 *
 * `TKey` lets consumers strongly type the keys they expect to receive; when
 * left to the default `string`, the payload accepts any key emitted by the
 * dropdown.
 * @template TKey Domain of keys (root or `parent.child`) the listener expects to receive.
 */
export interface DropdownClickPayload<TKey extends string = string> {
    /**
     * Dotted action key emitted by the dropdown.
     */
    key: TKey;
}

# 🔍 Filters (`LinPulsarFilter`, `LinPulsarFilterSet` & `LinPulsarFilterValue`)

This document explains how to use the `LinPulsarFilter` and `LinPulsarFilterValue` classes to build filters and to
convert/parse the filter value expressions applied to them, and how `LinPulsarFilterSet` groups filters into a
saved favorite search (see [`docs/types-and-interfaces.md`](types-and-interfaces.md) for the `LinPulsarFilterType`
and `LinPulsarFilterOperator` type definitions).

---

## 1. Overview

A `LinPulsarFilter` describes a filterable attribute (name, category, options) and holds the list of values
currently applied to it. Each applied value is converted to a single string expression combining:

- an optional **negation** marker (`not_`)
- a **comparison operator** prefix (`lk_`, `gt_`, `lt_`, or none for equality)
- the **raw value**

`LinPulsarFilterValue` is the class responsible for parsing such an expression into a structured object, and for
reconstructing the expression back from that object. `LinPulsarFilter` does the same at the filter level: it parses
a `|`-separated list of value expressions into `LinPulsarFilterValue` instances, and reconstructs the filter as an
HTTP query parameter value, compatible with APIs powered by
[`spring-query-filter`](https://github.com/Zorin95670/spring-query-filter).

Both are defined as regular (value) exports — not type-only exports — since consumers need to call their
constructors and methods at runtime: `LinPulsarFilter` in `src/filters/linPulsarFilter.ts`, `LinPulsarFilterValue` in
`src/filters/linPulsarFilterValue.ts`.

---

## 2. Expression format

```
[not_]<operator><value>
```

| Segment      | Optional | Description                                                    |
| ------------ | -------- | -------------------------------------------------------------- |
| `not_`       | Yes      | Negates the comparison                                         |
| `<operator>` | Yes      | One of `lk_`, `gt_`, `lt_`. Omitted for an equality comparison |
| `<value>`    | No       | The raw value being compared                                   |

| Operator | Meaning         | Example        | Parsed                                                   |
| -------- | --------------- | -------------- | -------------------------------------------------------- |
| `lk_`    | Like / contains | `lk_paris`     | `{ isNegation: false, operator: 'lk_', value: 'paris' }` |
| `''`     | Equality        | `paris`        | `{ isNegation: false, operator: '', value: 'paris' }`    |
| `gt_`    | Greater than    | `gt_18`        | `{ isNegation: false, operator: 'gt_', value: '18' }`    |
| `lt_`    | Lower than      | `lt_18`        | `{ isNegation: false, operator: 'lt_', value: '18' }`    |
| any      | Negated         | `not_lk_paris` | `{ isNegation: true, operator: 'lk_', value: 'paris' }`  |

The operator is only recognized as a prefix of the remaining string after the optional `not_` has been stripped.
A value that merely contains an operator-like substring elsewhere (e.g. `paris_lk_paris`) is **not** affected —
it is kept as-is with an empty operator.

Multiple values applied to the same filter are combined with `|` (OR), handled by `LinPulsarFilter` — see
[section 6](#6-linpulsarfilter-class).

Both separators are exported as runtime constants — `LIN_PULSAR_FILTER_OR_SEPARATOR` (`'|'`) and
`LIN_PULSAR_FILTER_NEGATION_PREFIX` (`'not_'`) — defined in `src/types/linPulsarFilter.ts` and documented in
[`docs/types-and-interfaces.md`](types-and-interfaces.md#lin_pulsar_filter_or_separator--lin_pulsar_filter_negation_prefix).
Use them instead of hard-coding the literal characters when building expressions programmatically.

---

## 3. API

### 3.1 Properties

```ts
class LinPulsarFilterValue {
  isNegation: boolean;
  operator: LinPulsarFilterOperator; // 'lk_' | '' | 'gt_' | 'lt_'
  value: string;
  item?: Record<string, unknown>;
}
```

| Property     | Type                      | Description                                                          |
| ------------ | ------------------------- | -------------------------------------------------------------------- |
| `isNegation` | `boolean`                 | Whether the comparison must be negated                               |
| `operator`   | `LinPulsarFilterOperator` | The comparison operator applied to the value                         |
| `value`      | `string`                  | The raw value, with the negation marker and operator prefix stripped |
| `item`       | `Record<string, unknown>` | Item resolved from the dynamic label request — display only          |

`item` is only relevant for filters carrying `dynamicLabelOptions` — see
[section 6.5](#65-dynamic-item-resolution-dynamiclabeloptions). It is **display information only**: it is
never part of the value expression produced by `toString()`.

### 3.2 constructor

```ts
new LinPulsarFilterValue(
  isNegation: boolean,
  operator: LinPulsarFilterOperator,
  value: string,
  item?: Record<string, unknown>
);
```

Builds a `LinPulsarFilterValue` directly from its already-parsed parts. `item` is optional: it is left
`undefined` for values that don't need — or have not yet gone through — dynamic item resolution.

### 3.3 fromString (static)

```ts
static fromString(input: string): LinPulsarFilterValue;
```

Parses a filter value expression into a `LinPulsarFilterValue` instance.

If `input` is not actually a string at runtime — this class is exported across Module Federation
boundaries, where TypeScript cannot enforce the contract on a remote module — `fromString` does not throw.
It returns the same neutral result as for an empty string: `{ isNegation: false, operator: '', value: '' }`.

### 3.4 toString

```ts
toString(): string;
```

Reconstructs the filter value expression from `isNegation`, `operator` and `value`. `item` is never
serialized, so a resolved item never changes the query parameter sent to the API. `fromString` and `toString`
round-trip: `LinPulsarFilterValue.fromString(expr).toString() === expr`.

```ts
const value = new LinPulsarFilterValue(false, '', '123', {
  id: 123,
  name: 'Paris',
});

value.toString(); // '123'
value.item?.name; // 'Paris'
```

---

## 4. Usage

### 4.1 Import

```ts
import { LinPulsarFilterValue } from '@linagora/lin-pulsar-core';
```

### 4.2 Parsing a value coming from a query string

```ts
const value = LinPulsarFilterValue.fromString('not_lk_paris');

value.isNegation; // true
value.operator; // 'lk_'
value.value; // 'paris'
```

### 4.3 Building a value programmatically

```ts
const value = new LinPulsarFilterValue(false, 'gt_', '18');

value.toString(); // 'gt_18'
```

### 4.4 Applying values to a `LinPulsarFilter`

```ts
import {
  LinPulsarFilter,
  LinPulsarFilterValue,
} from '@linagora/lin-pulsar-core';

const cityFilter = new LinPulsarFilter<{ placeholder: string }>(
  'city',
  'text',
  { placeholder: 'City' },
  [
    LinPulsarFilterValue.fromString('lk_paris'),
    LinPulsarFilterValue.fromString('not_lk_lyon'),
  ]
);

cityFilter.toString();
// 'lk_paris|not_lk_lyon'
```

---

## 5. Extending operators

New operators can be added by extending the `LinPulsarFilterOperator` union (in `src/types/linPulsarFilter.ts`) and the
internal prefix list in `src/filters/linPulsarFilterValue.ts`. Since parsing relies on prefix matching rather than a
fixed format string, adding an operator does not break expressions converted with the existing ones.

---

## 6. `LinPulsarFilter` class

`LinPulsarFilter<T>` represents a filterable attribute together with the list of values currently applied to it. Its
`toString()` reconstructs the filter as a query parameter value (values combined with OR via `|`); it does not
include the `name=` prefix — see [`LinPulsarFilterSet`](#7-linpulsarfilterset-class) for the `name=value` HTTP query
parameter pair representation, ready to use with APIs powered by
[`spring-query-filter`](https://github.com/Zorin95670/spring-query-filter).

### 6.1 Properties

```ts
class LinPulsarFilter<T = Record<string, unknown>> {
  id: string;
  name: string;
  type: LinPulsarFilterType;
  options: T;
  values: LinPulsarFilterValue[];
  dynamicLabelOptions?: LinPulsarFilterDynamicLabelOptions;
}
```

| Property              | Type                                 | Description                                                             |
| --------------------- | ------------------------------------ | ----------------------------------------------------------------------- |
| `id`                  | `string`                             | Auto generated unique identifier of the filter (set by the constructor) |
| `name`                | `string`                             | Identifier of the filter                                                |
| `type`                | `LinPulsarFilterType`                | Defines the filter category and expected behavior                       |
| `options`             | `T`                                  | Configuration object of the filter, defined by the consumer             |
| `values`              | `LinPulsarFilterValue[]`             | List of applied filter values                                           |
| `dynamicLabelOptions` | `LinPulsarFilterDynamicLabelOptions` | Dynamic item resolution configuration (see section 6.5)                 |

### 6.2 constructor

```ts
new LinPulsarFilter<T>(
  name: string,
  type: LinPulsarFilterType,
  options: T,
  values: LinPulsarFilterValue[],
  dynamicLabelOptions?: LinPulsarFilterDynamicLabelOptions
);
```

Builds a `LinPulsarFilter` directly from its already-parsed parts. `id` is not a constructor parameter — it is
auto generated (via `crypto.randomUUID()`) for every instance. `dynamicLabelOptions` is optional: filters
without it keep their current behavior.

### 6.3 fromString (static)

```ts
static fromString<T = Record<string, unknown>>(
  name: string,
  input: string,
  definition?: LinPulsarFilter<T>
): LinPulsarFilter<T>;
```

Parses a bare value expression (e.g. `paris|not_lk_lyon`, as produced by `LinPulsarFilterValue.toString`) into a
**new** `LinPulsarFilter<T>` instance carrying the parsed `values`. `input` never carries the `name=` query
parameter prefix produced by `toString()` — it is the value expression only. An empty string produces an empty
`values` array — as does any non-string `input` received at runtime despite the `string` type (e.g. across a
Module Federation boundary), rather than throwing.

`type`, `options` and `dynamicLabelOptions` are not derivable from `input`: pass the `definition` declared in
the configuration and they are carried over to the parsed filter, so that a filter restored from a URL behaves
like the one the user applied — dynamic label resolution included. Without a `definition`, the returned filter
falls back to a placeholder `'text'` `type`, empty `options` and no `dynamicLabelOptions`, and callers should
then only use the parsed `values`. `name` is the query parameter key and always wins over `definition.name`.

```ts
const restored = LinPulsarFilter.fromString(
  'organizationalUnitId',
  '1|2',
  definition
);

restored.type; // the type of the definition, e.g. 'tree'
restored.dynamicLabelOptions; // the one of the definition — the values can be resolved
```

```ts
const parsed = LinPulsarFilter.fromString('city', 'paris|not_lk_lyon');

parsed.values;
// [
//   { isNegation: false, operator: '', value: 'paris' },
//   { isNegation: true, operator: 'lk_', value: 'lyon' },
// ]
parsed.name; // 'city'
parsed.type; // 'text' — placeholder, not derived from input
```

### 6.4 toString

```ts
toString(): string;
```

Reconstructs the filter as an HTTP query parameter value, with multiple values combined with OR via `|`.

```ts
parsed.toString(); // 'paris|not_lk_lyon'
```

Items resolved through `dynamicLabelOptions` are display information only: they never appear in the result.

### 6.5 Dynamic item resolution (`dynamicLabelOptions`)

Some filters hold values that aren't readable on their own — typically identifiers (e.g. a UUID): displaying
`c0ffee42-…` as a filter chip is useless, the name behind it is what the user needs to see. `dynamicLabelOptions`
describes **how to fetch the item behind each value**; the resolved item is then stored on the matching
`LinPulsarFilterValue.item`.

```ts
export interface LinPulsarFilterDynamicLabelOptions {
  multipleRequests?: boolean;
  url: string;
  responseItemsPath?: string;
  valuePath?: string;
}
```

| Property            | Type      | Description                                                                                  |
| ------------------- | --------- | -------------------------------------------------------------------------------------------- |
| `multipleRequests`  | `boolean` | Whether to perform one request per value. Defaults to `false` (one request for all)          |
| `url`               | `string`  | Nunjucks URL template: `{{ value }}` when `multipleRequests`, `{{ values }}` otherwise       |
| `responseItemsPath` | `string`  | Path to the collection of items in the response. Required when `multipleRequests` is `false` |
| `valuePath`         | `string`  | Path, within an item, to the attribute matching `LinPulsarFilterValue.value`. Same condition |

The two template variables hold the **raw values** of the `LinPulsarFilterValue` still missing an item — the
`value` property alone, without the negation marker nor the operator prefix, and without the values already
resolved:

- `{{ values }}` (single request) is the **array** of those values, to be joined by the template itself, e.g.
  `{{ values | join('|') }}`;
- `{{ value }}` (one request per value) is the **single** value of the request being built.

`responseItemsPath` and `valuePath` are **required** when `multipleRequests` is `false`, since a single
response then holds several items to dispatch; both are **ignored** when it is `true`, where the whole
response is the item of the value it was requested for. Both are dot-notation paths of unlimited depth
(`content`, `page.content`, `data.items.0.attributes`), not slash-separated ones.

> `LinPulsarFilter` and `LinPulsarFilterValue` are data/model classes: they **never perform HTTP requests**. They only
> carry the configuration and the resolved items, so that the consuming layer (e.g. the component rendering the
> filter values) performs the requests and writes the items back.

That layer also owns the URL encoding: `url` is a template, not a ready-to-send URL. Whatever it renders —
the separator joining the values first of all — must reach the API percent-encoded, since a raw `|` in a query
string is rejected by servers such as Tomcat with a `400 Bad Request`. A consumer that encodes the query
string of the rendered URL (as the filter chip of the `LinPulsarSmartFilter` component of the `linPulsar` catalog does) lets a template
keep `join('|')` as-is; otherwise, and whenever the values themselves may carry URL-special characters such as
`&`, `=` or `#`, add the Nunjucks `urlencode` filter: `{{ values | join('|') | urlencode }}`.

Resolution rules:

- Filters without `dynamicLabelOptions` keep their current behavior — nothing is resolved.
- Only values whose `item` is missing require resolution; a value that already has one triggers no request.
- Resolved items are assigned to the `item` of their corresponding `LinPulsarFilterValue`.
- The complete returned item is stored, not just the displayed attribute.
- Resolution never affects the serialized filter query parameter.

#### Single request (default)

With `multipleRequests` left to its `false` default, all values are resolved with a **single** request. The
`{{ values }}` template variable holds the values to resolve, and can be combined with the Nunjucks `join`
filter:

```json
{
  "dynamicLabelOptions": {
    "url": "/organizational-units?ids={{ values | join('|') }}",
    "responseItemsPath": "content",
    "valuePath": "id"
  }
}
```

For the values below:

```ts
[
  new LinPulsarFilterValue(false, '', '1'),
  new LinPulsarFilterValue(false, '', '2'),
];
```

the request is:

```text
GET /organizational-units?ids=1|2
```

`responseItemsPath` points to the collection of items in the response, and `valuePath` to the attribute of each
item matching `LinPulsarFilterValue.value`. Since a filter value is always a string while the attribute may be of
any type (a number `1`, a UUID, a boolean), the comparison is made on the **string conversion** of the
attribute: an item whose `id` is the number `1` matches the value `'1'`. An item whose `valuePath` resolves to
nothing, or to a value no filter value matches, is simply skipped; the filter values it should have matched
keep no item and are rendered raw, which is also what happens when the response holds no item at all:

```json
{
  "content": [
    { "id": 1, "name": "toto" },
    { "id": 2, "name": "tata" }
  ]
}
```

so the first value receives:

```ts
{
  value: '1',
  item: { id: 1, name: 'toto' },
}
```

#### One request per value

With `multipleRequests` set to `true`, one request is performed **per value**, and `{{ value }}` holds the
current value:

```json
{
  "dynamicLabelOptions": {
    "multipleRequests": true,
    "url": "/organizational-units/{{ value }}"
  }
}
```

For the values `1` and `2`:

```text
GET /organizational-units/1
GET /organizational-units/2
```

Each response is the item of its own value, so `responseItemsPath` and `valuePath` are not used in this mode.

#### Limitations

This first version of the mechanism doesn't cover every filter value format. In particular, it doesn't support:

- textual values containing filter syntax characters (e.g. a value equal to `*tot`);
- date values using operators such as "lower than", where the requested date can itself be read as part of the
  filter expression.

More generally, a filter value may carry operators or syntax meaningful to the filter parser — build the URL
template accordingly.

---

## 7. `LinPulsarFilterSet` class

`LinPulsarFilterSet` represents a **saved filter set** (favorite search): a user-defined `label` paired with the
collection of `LinPulsarFilter` it is made of. Its primary purpose is to save and restore a complete filter
configuration from user preferences.

It reuses the exact same URL filter representation as `LinPulsarFilter`/`LinPulsarFilterValue` — a `&`-separated list of
`name=value` pairs, each value itself optionally `|`-separated for values combined with OR — so a saved favorite is a
ready-to-use query string for APIs powered by
[`spring-query-filter`](https://github.com/Zorin95670/spring-query-filter), and a compact string suitable for
storage in user preferences.

### 7.1 Properties

```ts
class LinPulsarFilterSet {
  id: string;
  label: string;
  filters: LinPulsarFilter[];
}
```

| Property  | Type                | Description                                         |
| --------- | ------------------- | --------------------------------------------------- |
| `id`      | `string`            | Unique identifier of the filter set                 |
| `label`   | `string`            | User-friendly name of the favorite search           |
| `filters` | `LinPulsarFilter[]` | Collection of filters composing the favorite search |

### 7.2 constructor

```ts
new LinPulsarFilterSet(id: string, label: string, filters: LinPulsarFilter[]);
```

Builds a `LinPulsarFilterSet` directly from its identifier, label and filters.

### 7.3 fromString (static)

```ts
static fromString(
  id: string,
  label: string,
  value: string | null | undefined,
  definitions?: LinPulsarFilter[]
): LinPulsarFilterSet;
```

Parses a `&`-separated string of `name=value` pairs, as produced by `toString()`, into a **new**
`LinPulsarFilterSet`. Each `=`-containing segment is turned into a `LinPulsarFilter` via `LinPulsarFilter.fromString`
(which in turn parses each `|`-separated value with `LinPulsarFilterValue.fromString`); segments missing `=` are
silently dropped instead of producing a filter with a guessed name.

Since `type`, `options` and `dynamicLabelOptions` aren't derivable from the string, pass the filter
`definitions` declared in the configuration: each parsed filter is matched to the definition carrying the same
`name` and restored from it (see [section 6.3](#63-fromstring-static)), so that a restored favorite resolves
its dynamic labels like a freshly applied filter. A parsed filter matching no definition keeps placeholder
values.

`value` tolerates `null`/`undefined`/any non-string at runtime (e.g. `localStorage.getItem(...)`, or across a
Module Federation boundary): like an empty string, it produces an empty `filters` array instead of throwing —
the expected case for a user with no favorite saved yet.

### 7.4 toString

```ts
toString(): string;
```

Reconstructs the filter set as a `&`-separated string of each filter's own `name=value` representation.
`fromString` and `toString` round-trip for well-formed input:
`LinPulsarFilterSet.fromString(id, label, value).toString() === value`.

### 7.5 Usage

```ts
import { LinPulsarFilter, LinPulsarFilterSet } from '@linagora/lin-pulsar-core';

// Save a favorite search
const favorite = new LinPulsarFilterSet('fav-123', 'My Active Projects', [
  LinPulsarFilter.fromString('status', 'active|pending'),
  LinPulsarFilter.fromString('createdAt', 'gt_2026-01-01'),
]);

const serialized = favorite.toString();
// 'status=active|pending&createdAt=gt_2026-01-01'

savePreference(serialized);

// Restore it later
const restored = LinPulsarFilterSet.fromString(
  'fav-123',
  'My Active Projects',
  storedValue
);

restored.filters.map((filter) => filter.name);
// ['status', 'createdAt']
```

`LinPulsarFilterSet.toString()` builds the same `name=value` query parameter representation expected by APIs powered
by `spring-query-filter`, so a restored filter set's string can be appended to a request URL as a query string.
Note that no URL-encoding is performed: if a filter value itself contains reserved URL characters (`&`, `=`, a
space, etc.), the caller is responsible for encoding it before doing so.

---

## 8. `LinPulsarFilterSetUserPreference` type

A `LinPulsarFilterSetUserPreference` represents the **persisted form of a saved filter set in user preferences**.

Unlike `LinPulsarFilterSet`, which is a runtime structure used to manipulate filters in memory, this type is a
**storage-oriented DTO** used to serialize and retrieve favorite filter sets from user preference systems
(e.g. backend storage, local storage, or federated module configuration).

It contains only the minimal metadata required to reconstruct a `LinPulsarFilterSet`: a unique identifier, a display
label, and a serialized filter value string that can be parsed back using `LinPulsarFilterSet.fromString`.

This format is typically used when storing favorites under keys such as
`ui.<instanceId>.favorites.<favoriteId>`.

---

### 8.1 Structure

```ts
export interface LinPulsarFilterSetUserPreference {
  id: string;
  label: string;
  value: string;
}
```

| Property | Type     | Description                                                           |
| -------- | -------- | --------------------------------------------------------------------- |
| `id`     | `string` | Unique identifier of the saved favorite filter set                    |
| `label`  | `string` | Human-readable name of the favorite                                   |
| `value`  | `string` | Serialized filter expression (`LinPulsarFilterSet.toString()` format) |

---

### 8.2 Semantics

- `id` is used to uniquely identify the preference entry in the user preference store.
- `label` is purely presentational and used in UI contexts (e.g. dropdown of saved searches).
- `value` is the canonical serialized form of a filter set and can be parsed back via:

```ts
LinPulsarFilterSet.fromString(id, label, value);
```

---

### 8.3 Example

```ts
const preference: LinPulsarFilterSetUserPreference = {
  id: 'fav-123',
  label: 'My active projects',
  value: 'status=active|pending&createdAt=gt_2026-01-01',
};

const filterSet = LinPulsarFilterSet.fromString(
  preference.id,
  preference.label,
  preference.value
);
```

---

### 8.4 Relationship with `LinPulsarFilterSet`

| Concept                            | Role                                                        |
| ---------------------------------- | ----------------------------------------------------------- |
| `LinPulsarFilterSet`               | Runtime model used in the application to manipulate filters |
| `LinPulsarFilterSetUserPreference` | Persisted DTO used to store/retrieve saved filter sets      |

In summary, `LinPulsarFilterSetUserPreference` is a **serialization boundary type**, while `LinPulsarFilterSet` is the
**domain/runtime representation** used for filtering logic.

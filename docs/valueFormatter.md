# useValueFormatter

This document describes the `useValueFormatter` composable, which applies **named formatters** to raw values before
they are displayed.

---

## Overview

Generic components (tables, detail views, forms) receive their field and column definitions as configuration, not as
code. Such a definition cannot carry a formatting *function*, because it must survive JSON serialization and a Module
Federation boundary. It carries a formatter **name** instead, and `useValueFormatter` resolves that name at render
time.

| Function                      | Description                                            |
|-------------------------------|--------------------------------------------------------|
| [`formatValue`](#formatvalue) | Applies the formatter designated by name to a raw value |

The composable is **deliberately permissive**: it never throws. Any input it cannot handle — a missing value, an
unknown formatter name, incomplete options — results in the raw value being returned unchanged, so a malformed
configuration degrades the display instead of breaking the page.

---

## Usage

```ts
import { useValueFormatter } from '@linagora/lin-pulsar-core';

const { formatValue } = useValueFormatter();
```

`useValueFormatter` depends on [`useCommonMapper`](./commonMapper.md), which itself calls `useI18n()`. It must
therefore be called from a **Vue setup context**, like any other composable.

---

## `formatValue`

Applies the formatter designated by `formatter` to `value`.

```ts
formatValue(
  value: unknown,
  formatter?: string,
  options?: Record<string, unknown>
): unknown
```

### Parameters

| Parameter   | Type                      | Required | Description                                                                                  |
|-------------|---------------------------|----------|----------------------------------------------------------------------------------------------|
| `value`     | `unknown`                 | yes      | The raw value to format, typically read from an entity returned by the API.                  |
| `formatter` | `string`                  | no       | Name of the formatter to apply. See [Available formatters](#available-formatters).           |
| `options`   | `Record<string, unknown>` | no       | Options forwarded to the formatter. Expected keys depend on the formatter that is requested. |

### Returns

The formatted value, or **the original value unchanged** in each of these cases:

- `value` is `null` or `undefined`.
- `formatter` is omitted or empty.
- `formatter` does not match any registered formatter.
- The formatter itself cannot honour the given `options` (e.g. `toDate` without a `formatKey`).

The return type is `unknown`: a formatter is free to return something other than a string, and the caller decides how
to consume the result.

### Behavior

- Only `null` and `undefined` short-circuit the call. Other falsy values (`0`, `''`, `false`) **are** passed to the
  formatter.
- Name resolution uses `Object.hasOwn`, so inherited `Object.prototype` members (`constructor`, `toString`,
  `hasOwnProperty`, …) are never resolved as formatters. This matters because names come from JSON configuration and
  therefore are not guaranteed by the type system at runtime.
- The registry is rebuilt on each `useValueFormatter()` call, because formatters close over helpers that must be
  resolved in a Vue setup context.

### Examples

```ts
const { formatValue } = useValueFormatter();

// Nominal case
formatValue('2024-07-20T12:34:56.000Z', 'toDate', {
  formatKey: 'application.dateFormat',
});
// '20/07/2024' — depending on the locale format

// Nullish values pass through
formatValue(null, 'toDate', { formatKey: 'application.dateFormat' }); // null
formatValue(undefined, 'toDate', { formatKey: 'application.dateFormat' }); // undefined

// No formatter requested
formatValue('raw'); // 'raw'

// Required option missing
formatValue('2024-07-20T12:34:56.000Z', 'toDate'); // '2024-07-20T12:34:56.000Z'
formatValue('2024-07-20T12:34:56.000Z', 'toDate', {}); // '2024-07-20T12:34:56.000Z'
```

---

## Available formatters

| Name     | Required options              | Delegates to                                    | Returns                                                     |
|----------|-------------------------------|-------------------------------------------------|-------------------------------------------------------------|
| `toDate` | `formatKey` (`string`)        | [`useCommonMapper().toDate`](./commonMapper.md#todate) | The date formatted with the i18n format named by `formatKey` |

### `toDate`

Formats a date using the format resolved from i18n through `formatKey`.

```ts
formatValue(value, 'toDate', { formatKey: 'application.dateFormat' });
```

- `formatKey` must be a **complete i18n translation key** (e.g. `'application.dateFormat'`), not a date pattern.
- If `formatKey` is missing, empty, or not a string, the raw value is returned and the mapper is never called.
- If `formatKey` is present but the value is not a parseable date, `toDate` returns an **empty string** — that value
  comes from the mapper and is propagated as-is.

---

## Declarative usage

The intended entry point is not a direct call, but the
[`FormatterConfiguration`](./types-and-interfaces.md#formatterconfiguration) interface, which field and column
definitions extend.

```ts
import type { FormatterConfiguration } from '@linagora/lin-pulsar-core';

interface ColumnDefinition extends FormatterConfiguration {
  name: string;
  label: string;
}
```

Such a definition can then be declared in a `module-<name>.json` file:

```json
{
  "options": {
    "columns": [
      {
        "name": "createdAt",
        "label": "columns.createdAt",
        "formatter": "toDate",
        "formatOptions": {
          "formatKey": "application.dateFormat"
        }
      }
    ]
  }
}
```

And consumed in a component:

```vue
<script setup lang="ts">
  import { useValueFormatter } from '@linagora/lin-pulsar-core';

  const { formatValue } = useValueFormatter();
  defineProps<{ row: Record<string, unknown>; columns: ColumnDefinition[] }>();
</script>

<template>
  <td v-for="column in columns" :key="column.name">
    {{ formatValue(row[column.name], column.formatter, column.formatOptions) }}
  </td>
</template>
```

---

## Adding a formatter

Add the formatter to the registry built by `createFormatters` in `src/composables/useValueFormatter.ts`. The registry
is typed `Record<string, ValueFormatter>`, so nothing else needs to be declared.

A formatter must respect the `ValueFormatter` contract: return the value **untouched** rather than throwing when it
cannot handle the given input.

```ts
type ValueFormatter = (
  value: unknown,
  options?: Record<string, unknown>
) => unknown;
```

> The registry is closed: a remote plugin cannot register its own formatter. Any new formatter must be added to the
> lin-pulsar-core and released with it.

> `formatter` is typed `string`, so a name that is not registered is **not** rejected at compile time. A typo in a
> configuration surfaces only at runtime, as the raw value being displayed.

---

## Related documentation

- [`docs/commonMapper.md`](./commonMapper.md) — the `toDate` mapper the `toDate` formatter delegates to.
- [`docs/types-and-interfaces.md`](./types-and-interfaces.md#-formatter-types) — `ValueFormatter` and
  `FormatterConfiguration`.

# useDayjs

This document describes the `useDayjs` composable, which exposes dayjs utility functions over the shared dayjs singleton managed by `dayjsService`.

---

## Overview

`useDayjs` provides three helpers for parsing and comparing dates:

| Function              | Description                                 |
| --------------------- | ------------------------------------------- |
| [`toDayjs`](#todayjs) | Parses any value into a Dayjs instance      |
| [`maxDate`](#maxdate) | Returns the latest valid date from a list   |
| [`minDate`](#mindate) | Returns the earliest valid date from a list |

It also re-exports the `DEFAULT_DATE_FORMAT` constant (`'YYYY-MM-DD'`), which is the fallback format used by all three functions when none is specified.

### Prerequisites

`useDayjs` delegates to the dayjs singleton initialized by `setDayjsInstance`. That singleton must be set up **once** at application startup, before any call to `useDayjs`:

```ts
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { setDayjsInstance } from '@linagora/lin-pulsar-core';

dayjs.extend(customParseFormat);
setDayjsInstance(dayjs);
```

> `customParseFormat` is required for strict string parsing. Without it, dayjs falls back to non-strict mode: strings that do not match the expected format may be silently accepted, and calendrically invalid dates such as `'2026-02-30'` will not be rejected.

---

## Usage

```ts
import { useDayjs } from '@linagora/lin-pulsar-core';

const { toDayjs, maxDate, minDate } = useDayjs();
```

---

## `toDayjs`

Parses an arbitrary value into a Dayjs instance.

```ts
toDayjs(value: unknown, format?: string): Dayjs
```

### Parameters

| Parameter | Type      | Required | Description                                                                                                                                               |
| --------- | --------- | -------- | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`   | `unknown` | yes      | The value to parse. Accepts strings, numbers (timestamps), `Date` objects, `Dayjs` instances, `null`, or `undefined`.                                     |
| `format`  | `string`  | no       | Date format for strict parsing of **string** values (e.g. `'YYYY-MM-DD'`). Defaults to `'YYYY-MM-DD'` if omitted or empty. Ignored for non-string values. |

### Returns

A `Dayjs` instance, which may be invalid. Always check `.isValid()` before using the result.

### Behavior

- **String values** are parsed in **strict mode** against `format`. A string that does not exactly match the format, or that represents a calendrically invalid date (e.g. `'2026-02-30'`), produces an invalid `Dayjs`.
- **Non-string values** (`number`, `Date`, `Dayjs`, `null`, `undefined`) are passed directly to dayjs; `format` is ignored.

### Examples

```ts
toDayjs('2026-06-15', 'YYYY-MM-DD').isValid(); // true
toDayjs('15/06/2026', 'YYYY-MM-DD').isValid(); // false — wrong format
toDayjs('2026-02-30', 'YYYY-MM-DD').isValid(); // false — invalid calendar date
toDayjs(new Date('2026-06-15')).isValid(); // true
toDayjs(1750000000000).format('YYYY-MM-DD'); // valid timestamp
toDayjs('2026-06-15').isValid(); // true — default format YYYY-MM-DD
```

---

## `maxDate`

Returns the latest date among a list of values, silently ignoring invalid or unparseable entries.

```ts
maxDate(dates: unknown[], format?: string): Dayjs | null
```

### Parameters

| Parameter | Type        | Required | Description                                                                                                                         |
| --------- | ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `dates`   | `unknown[]` | yes      | List of date values to compare. Each element is parsed via `toDayjs`.                                                               |
| `format`  | `string`    | no       | Date format for strict parsing of string elements. Defaults to `'YYYY-MM-DD'` if omitted or empty. Ignored for non-string elements. |

### Returns

The maximum date as a `Dayjs` instance, or `null` if the list is empty or contains no valid dates.

### Examples

```ts
maxDate(['2026-06-10', '2026-06-20', '2026-06-15'], 'YYYY-MM-DD')?.format(
  'YYYY-MM-DD'
); // '2026-06-20'

maxDate(['not-a-date', '2026-06-15', '2026-02-30'], 'YYYY-MM-DD')?.format(
  'YYYY-MM-DD'
); // '2026-06-15' — invalid entries skipped

maxDate([]); // null
maxDate(['not-a-date']); // null
```

---

## `minDate`

Returns the earliest date among a list of values, silently ignoring invalid or unparseable entries.

```ts
minDate(dates: unknown[], format?: string): Dayjs | null
```

### Parameters

| Parameter | Type        | Required | Description                                                                                                                         |
| --------- | ----------- | -------- | ----------------------------------------------------------------------------------------------------------------------------------- |
| `dates`   | `unknown[]` | yes      | List of date values to compare. Each element is parsed via `toDayjs`.                                                               |
| `format`  | `string`    | no       | Date format for strict parsing of string elements. Defaults to `'YYYY-MM-DD'` if omitted or empty. Ignored for non-string elements. |

### Returns

The minimum date as a `Dayjs` instance, or `null` if the list is empty or contains no valid dates.

### Examples

```ts
minDate(['2026-06-10', '2026-06-20', '2026-06-15'], 'YYYY-MM-DD')?.format(
  'YYYY-MM-DD'
); // '2026-06-10'

minDate(['not-a-date', '2026-06-15', '2026-02-30'], 'YYYY-MM-DD')?.format(
  'YYYY-MM-DD'
); // '2026-06-15' — invalid entries skipped

minDate([]); // null
minDate(['not-a-date']); // null
```

# useCommonMapper

This document describes the `useCommonMapper` composable, which provides data transformation utilities for common
operations on dates, records, and attributes.

---

## Overview

`useCommonMapper` provides five helpers for data transformation and formatting:

| Function                          | Description                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------- |
| [`toDate`](#todate)               | Converts ISO date strings to locale-formatted date strings                            |
| [`toDateISO`](#todateiso)         | Converts locale-formatted dates to canonical ISO 8601 UTC strings                     |
| [`formatDate`](#formatdate)       | Formats a date value into a given output format, with an optional strict input format |
| [`toEmptyRecord`](#toemptyrecord) | Creates an empty record from field definitions                                        |
| [`toDayJs`](#todayjs)             | Parses any date value into a Dayjs instance                                           |

---

## Usage

```ts
import { useCommonMapper } from '@linagora/lin-pulsar-core';

const { toDate, toDateISO, formatDate, toEmptyRecord, toDayJs } =
  useCommonMapper();
```

---

## `toDate`

Converts any parseable date value into a human-readable string, formatted according to the specified locale format from
i18n.

```ts
toDate(value :unknown, formatKey :string) :string
```

### Parameters

| Parameter   | Type      | Required | Description                                                                                                                                                                                            |
| ----------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `value`     | `unknown` | yes      | A date value to convert. Accepts ISO 8601 strings, high-precision datetime strings, `Date` objects, or falsy values. Numbers are converted to strings before parsing, so timestamps are not supported. |
| `formatKey` | `string`  | yes      | Exact i18n translation key to retrieve the date format string (e.g., `'application.dateFormat'`, `'application.shortDateFormat'`).                                                                     |

### Returns

A formatted date string according to the locale format retrieved from i18n, or an empty string `''` if:

- The input is falsy (`null`, `undefined`, empty string).
- The input cannot be parsed as a valid date.

### Behavior

- **Falsy inputs** are checked first; if `!value` is true, return `''` immediately.
- **Non-falsy inputs** are converted to strings and parsed by dayjs in non-strict mode (any format dayjs recognizes).
- **Valid dates** are formatted using the format string retrieved from `t(formatKey)`.
- **Invalid dates** (unparseable strings) return `''`.

### Notes

- The `formatKey` parameter is **required** and must be a complete i18n translation key (e.g.,
  `'application.dateFormat'`).
- Dayjs uses **non-strict parsing**, so it is lenient with date formats. For strict format validation, use [
  `toDateISO`](#todateiso) instead.
- High-precision datetime strings (e.g., `'2024-06-30T12:34:56.789003'`) are accepted and parsed correctly.

### Examples

```ts
// ISO 8601 strings
toDate('2024-07-20T12:34:56.000Z', 'application.dateFormat');
// Returns formatted date (e.g., '2024-07-20 12:34' or '20/07/2024 12:34' depending on locale)

// High-precision datetime string
toDate('2024-06-30T12:34:56.789003', 'application.dateFormat');
// Parsed correctly despite fractional seconds precision

// Falsy values
toDate(null, 'application.dateFormat'); // ''
toDate(undefined, 'application.dateFormat'); // ''
toDate('', 'application.dateFormat'); // ''

// Invalid dates
toDate('not-a-date', 'application.dateFormat'); // ''

// With custom format keys
toDate('2024-07-20T12:34:56.000Z', 'application.shortDateFormat');
// Uses application.shortDateFormat from i18n

toDate('2024-07-20T12:34:56.000Z', 'application.fullDateTimeFormat');
// Uses application.fullDateTimeFormat from i18n
```

---

## `toDateISO`

Converts a date string to an ISO 8601 string, suitable for API consumption: ISO 8601 inputs are returned as-is (offset
included), locale-formatted inputs are converted to UTC.

The function intelligently detects and handles two formats:

- **ISO 8601 format** (detected via regex): parsed and validated, then returned as-is if valid.
- **Locale-formatted strings**: strictly parsed using the locale format from i18n, then normalized to UTC ISO format.

Both formats enforce strict parsing: any string that does not exactly match the expected format, or represents a
calendrically invalid date (e.g., `'2026-02-30'`), returns an empty string.

```ts
toDateISO(value: unknown, formatKey: string): string
```

### Parameters

| Parameter   | Type      | Required | Description                                                                                                                                             |
| ----------- | --------- | -------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `value`     | `unknown` | yes      | A date string to convert to ISO format. Must be either a valid ISO 8601 string or match the format pattern from the `formatKey` (e.g., `'DD/MM/YYYY'`). |
| `formatKey` | `string`  | yes      | I18n translation key.                                                                                                                                   |

### Returns

The ISO 8601 input unchanged, the locale-formatted input converted to a UTC ISO 8601 string (e.g.,
`'2024-06-30T00:00:00.000Z'`), or an empty string `''` if:

- The input is falsy.
- The input does not exactly match the expected format.
- The input represents a calendrically invalid date.

### Behavior

- **Falsy values** return `''`.
- **ISO 8601-format strings** (matching the regex pattern `YYYY-MM-DDThh:mm:ss[.sss](Z|±hh:mm)`) are validated and
  returned as-is if valid.
- **Non-ISO strings** are strictly parsed using the locale format from i18n, then converted to UTC ISO format.
- **Invalid dates** (e.g., `'2026-02-30'` or format mismatches) return `''`.

### ISO 8601 Pattern

Matches strings of the form `YYYY-MM-DDThh:mm:ss[.sss](Z|±hh:mm)`:

- Date part: `YYYY-MM-DD` (four-digit year, two-digit month, two-digit day)
- Literal `T` separator
- Time part: `hh:mm:ss` (two-digit hour, minute, second)
- Optional fractional seconds: `[.sss...]`
- Mandatory timezone: `Z` (UTC) or `±hh:mm` (offset)

### Examples

```ts
// ISO 8601 inputs (returned as-is if valid)
toDateISO('2024-06-30T00:00:00.000Z', 'application.dateFormat'); // '2024-06-30T00:00:00.000Z'
toDateISO('2024-06-30T12:00:00+02:00', 'application.dateFormat'); // '2024-06-30T12:00:00+02:00'

// Non-ISO, invalid, or misformatted ISO strings
toDateISO('2024-06-30', 'application.dateFormat'); // '' — missing time and timezone
toDateISO('2024-06-30T12:00:00', 'application.dateFormat'); // '' — missing timezone

// Invalid calendar dates
toDateISO('2024-99-99T99:99:99Z', 'application.dateFormat'); // '' — semantically invalid
toDateISO('2026-02-30T00:00:00Z', 'application.dateFormat'); // '' — no February 30th

// Locale-formatted input (e.g., French format 'DD/MM/YYYY')
toDateISO('24/07/2025', 'application.dateFormat'); // '2025-07-24T00:00:00.000Z'

// Falsy values
toDateISO(null, 'application.dateFormat'); // ''
toDateISO(undefined, 'application.dateFormat'); // ''
toDateISO('', 'application.dateFormat'); // ''

// Format mismatch
toDateISO('2024-07-20', 'application.dateFormat'); // '' — ISO format doesn't match locale format when 'dateFormat' is 'DD/MM/YYYY'
```

---

## `formatDate`

Formats a date value into a given output format. Falsy input (`null`, `undefined`, `''`) returns `''`. If
`inputFormat` is given, `date` must strictly match it; otherwise `date` is parsed using dayjs's default detection.
`''` is returned when the value doesn't parse.

```ts
formatDate(date: unknown, outputFormat: string, inputFormat?: string): string
```

### Parameters

| Parameter      | Type      | Required | Description                                                                                               |
| -------------- | --------- | -------- | --------------------------------------------------------------------------------------------------------- |
| `date`         | `unknown` | yes      | Date value to format (ISO string, locale-formatted string, or `Date` instance).                           |
| `outputFormat` | `string`  | yes      | Format string describing the desired output (e.g., `'DD/MM/YYYY'`).                                       |
| `inputFormat`  | `string`  | no       | Format to strictly parse `date` against (e.g., `'DD/MM/YYYY'`). Defaults to dayjs's non-strict detection. |

### Returns

The formatted date string, or `''` if `date` is falsy or does not match the expected format.

### Behavior

- **Falsy values** (`null`, `undefined`, `''`) return `''` immediately.
- **When `inputFormat` is given**, `date` is parsed strictly against it (dayjs's strict mode): the string must match
  the format exactly, and calendrically invalid dates (e.g., `'31/02/2024'`) are rejected rather than rolled over to
  the next valid date.
- **When `inputFormat` is omitted**, `date` is parsed using dayjs's non-strict default detection.
- **Valid dates** are formatted using `outputFormat` and returned as a string.
- **Invalid or non-matching dates** return `''` rather than throwing or yielding the `'Invalid Date'` string.

### Examples

```ts
// Default parsing (no inputFormat)
formatDate('2024-07-20T12:34:56.000Z', 'YYYY-MM-DD'); // '2024-07-20'
formatDate(new Date(Date.UTC(2024, 6, 20)), 'YYYY-MM-DD'); // '2024-07-20'

// Strict parsing with inputFormat
formatDate('30/06/2024', 'YYYY-MM-DD', 'DD/MM/YYYY'); // '2024-06-30'

// Mismatched or calendrically invalid input
formatDate('31/02/2024', 'YYYY-MM-DD', 'DD/MM/YYYY'); // ''
formatDate('not-a-valid-date', 'YYYY-MM-DD', 'DD/MM/YYYY'); // ''

// Falsy values
formatDate(null, 'YYYY-MM-DD'); // ''
formatDate(undefined, 'YYYY-MM-DD'); // ''
formatDate('', 'YYYY-MM-DD'); // ''
```

---

## `toEmptyRecord`

Creates an empty object (record) with one key per field, each initialized to an empty string. Use this to seed reactive
form objects when the shape is driven by runtime configuration.

```ts
toEmptyRecord<T>(fields: LinPulsarAttributeConfiguration[]): T
```

### Parameters

| Parameter | Type                                | Required | Description                                                                |
| --------- | ----------------------------------- | -------- | -------------------------------------------------------------------------- |
| `fields`  | `LinPulsarAttributeConfiguration[]` | yes      | Array of attribute definitions that describe the form fields to initialize |

### Returns

A plain object with one key per field name (using `field.name`), each key mapped to an empty string `''`. The returned
object is generic and can be cast to any type `T`.

### Behavior

- Returns a **new object** on each call; modifying the result does not affect subsequent calls.
- Each field name becomes a key; all values are initialized to `''` (empty string).
- Empty field lists return an empty object `{}`.

### Examples

```ts
import type { LinPulsarAttributeConfiguration } from '@linagora/lin-pulsar-core';

const fields: LinPulsarAttributeConfiguration[] = [
  {
    name: 'externalId',
    type: 'String',
    required: true,
    hasValidations: false,
    input: 'Text',
    inputSettings: {},
  },
  {
    name: 'email',
    type: 'String',
    required: true,
    hasValidations: true,
    input: 'Email',
    inputSettings: {},
  },
];

const record = toEmptyRecord(fields);
// { externalId: '', email: '' }

// Each call returns a new object
toEmptyRecord(fields) !== toEmptyRecord(fields); // true

// Empty field list
toEmptyRecord([]); // {}
```

---

## `toDayJs`

Parses a date value into a Dayjs instance. Returns `null` for falsy inputs, or values that cannot
be parsed as valid dates.

```ts
toDayJs(value: unknown): Dayjs | null
```

### Parameters

| Parameter | Type      | Required | Description                                                                                                            |
| --------- | --------- | -------- | ---------------------------------------------------------------------------------------------------------------------- |
| `value`   | `unknown` | yes      | A date value to parse. Typically an ISO 8601 string from the API, but may be any value dayjs can parse (e.g., `Date`). |

### Returns

A `Dayjs` instance if the input is valid and parseable, or `null` if:

- The input is falsy (`null`, `undefined`, empty string)
- The input cannot be parsed as a valid date
- The input starts with an ISO 8601 date or time that does not exist in the calendar (e.g., `'2026-02-30'`)

### Behavior

- **Falsy values** return `null` without attempting to parse.
- **Valid date values** are parsed and returned as a Dayjs instance.
- **Invalid values** (unparseable strings, invalid dates) return `null`.

### Examples

```ts
// Valid ISO 8601 strings
toDayJs('2025-07-24T12:34:56.000Z')?.isValid(); // true
toDayJs('2025-07-24T12:34:56.000Z')?.toISOString(); // '2025-07-24T12:34:56.000Z'

// Falsy values
toDayJs(null); // null
toDayJs(undefined); // null
toDayJs(''); // null

// Invalid dates
toDayJs('not-a-valid-date'); // null
toDayJs('2026-02-30T00:00:00Z'); // null — no February 30th
```

---

## Integration Example

Here's a complete example integrating all functions:

```ts
import { reactive } from 'vue';
import { useCommonMapper } from '@linagora/lin-pulsar-core';
import type { LinPulsarAttributeConfiguration } from '@linagora/lin-pulsar-core';

const { toDate, toDateISO, formatDate, toEmptyRecord, toDayJs } =
  useCommonMapper();

// Display a date from API in locale format
const apiDate = '2024-07-20T12:34:56.000Z';
console.log(toDate(apiDate, 'application.dateFormat')); // Formatted date

// Prepare a date for API submission
const userInput = '24/07/2024';
const isoDate = toDateISO(userInput, 'application.dateFormat'); // ISO format for API

// Reformat a date
console.log(formatDate(apiDate, 'DD/MM/YYYY')); // '20/07/2024'

// Create a form object from field definitions
const fields: LinPulsarAttributeConfiguration[] = [
  {
    name: 'firstName',
    type: 'String',
    required: true,
    hasValidations: false,
    input: 'Text',
    inputSettings: {},
  },
  {
    name: 'birthDate',
    type: 'Date',
    required: false,
    hasValidations: false,
    input: 'Date',
    inputSettings: {},
  },
];
const form = reactive(
  toEmptyRecord<{ firstName: string; birthDate: string }>(fields)
);
// { firstName: '', birthDate: '' }

// Parse and manipulate a date
const birthDate = toDayJs(form.birthDate);
if (birthDate?.isValid()) {
  console.log(birthDate.format('YYYY-MM-DD'));
}
```

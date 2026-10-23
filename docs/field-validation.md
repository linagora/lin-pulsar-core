# ✅ Field Validation Composables

This document explains how to use the field validation composables to dynamically validate form fields via the backend API, with automatic internationalized error message handling.

---

## 1. Overview

This module provides three composables for field validation, each in its own file:

- **`useFieldValidation`** (from `composables/useFieldValidation.ts`): Base validation functions that take the value to check, followed by the validator parameters (e.g. `minLength(value, min)`)
- **`useQuasarFieldValidation`** (from `composables/useQuasarFieldValidation.ts`): Quasar-compatible curried validation functions
- **`useQuasarRules`** (from `composables/useQuasarRules.ts`): Helper to automatically generate Quasar validation rules from attribute configuration

### Features

- **Backend validation**: Validate fields against the backend API (server-side business validation)
- **Client-side validation**: Built-in validators for common requirements (required, min/max length, min/max value, regex patterns)
- **Internationalization**: All error messages are automatically translated according to the field context
- **Quasar compatibility**: All validators follow Quasar's validation rules contract

### Prerequisites

The three composables read the shared Dayjs instance as soon as they are called, so the host must register it
with `setDayjsInstance` first (see [Dates](./dayjs.md#prerequisites)). Otherwise they throw
`[LinPulsar Core] Dayjs instance is not initialized. Call setDayjsInstance() first.`, even when no date validator is
used.

The date validators (`validDate`, `afterDate`, `beforeDate`, `fromDate`, `upToDate`) rely on dayjs's [`customParseFormat`](https://day.js.org/docs/en/plugin/custom-parse-format) plugin to perform strict format parsing. The plugin **must be registered once** in your application entry point, before any date validator runs:

```ts
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { setDayjsInstance } from '@linagora/lin-pulsar-core';

dayjs.extend(customParseFormat);
setDayjsInstance(dayjs);
```

> Without this step, dayjs falls back to non-strict parsing: strings that do not match the expected format may be silently accepted, and calendrically invalid dates such as `'2026-02-30'` will not be detected.

The library declares `dayjs` as a peer dependency, so the consumer controls the dayjs version and the set of registered plugins. No date validation side effect is triggered on import.

---

## 2. Basic Usage

### 2.1 Import and Initialization

```ts
import {
  useFieldValidation,
  useQuasarFieldValidation,
  useQuasarRules,
} from '@linagora/lin-pulsar-core';

// Option 1: Base validation
const baseValidation = useFieldValidation('i18nScope');
// Usage: baseValidation.minLength('test', 5)

// Option 2: Quasar-compatible validation (curried functions)
const quasarValidation = useQuasarFieldValidation('user-module.fields.email');
// Usage in Quasar rules: [quasarValidation.minLength(5)]

// Option 3: Auto-generate rules from attribute configuration
const rules = useQuasarRules(
  'user-module',
  attributeConfig,
  ['minLength', 'maxLength'],
  'user-module.fields.email'
);
// Returns ready-to-use Quasar rules array in the specified order
```

### 2.2 Available Validation Methods

#### useFieldValidation

- **`validateFromApi(instanceId, fieldName, value)`**: Validates a value against the backend API
- **`required(value)`**: Validates that a value is provided
- **`email(value)`**: Validates that a value matches a basic email shape. Empty values (`null`, `undefined`, `''`) are skipped
- **`minLength(value, min)`**: Validates minimum string length
- **`maxLength(value, max)`**: Validates maximum string length
- **`min(value, min)`**: Validates minimum numeric value
- **`max(value, max)`**: Validates maximum numeric value
- **`pattern(value, pattern)`**: Validates against a regex pattern
- **`unique(value, items)`**: Validates that a value is not already present in a list
- **`maxFileSize(value, maxSize)`**: Validates that a `File`, or every file of a `File[]` multiple selection, does not exceed `maxSize` megabytes. Empty values (`null`, `undefined`, `[]`) are skipped
- **`allowedExtensions(value, extensions)`**: Validates that the extension of a `File` name, or of every file of a `File[]` multiple selection, is in `extensions` (compared case-insensitively, with or without leading dot); a name without extension is rejected. Empty values and an empty list are skipped
- **`validDate(value, format?)`**: Validates that a value parses to a valid date — strings against `format` with strict parsing, other types (`number`, `Date`, `Dayjs`) via dayjs directly. Empty values (`null`, `undefined`, `''`) are skipped. `format` defaults to `'YYYY-MM-DD'` (ISO 8601) if not provided.
- **`afterDate(value, compareTo, format?)`**: Validates that a date is strictly after `compareTo`. Empty or unparseable values are skipped. `format` defaults to `'YYYY-MM-DD'`.
- **`beforeDate(value, compareTo, format?)`**: Validates that a date is strictly before `compareTo`. Empty or unparseable values are skipped. `format` defaults to `'YYYY-MM-DD'`.
- **`fromDate(value, compareTo, format?)`**: Validates that a date is `compareTo` or after (inclusive lower bound). Empty or unparseable values are skipped. `format` defaults to `'YYYY-MM-DD'`.
- **`upToDate(value, compareTo, format?)`**: Validates that a date is `compareTo` or before (inclusive upper bound). Empty or unparseable values are skipped. `format` defaults to `'YYYY-MM-DD'`.

#### useQuasarFieldValidation (Recommended for Quasar)

- **`validateFromApi(instanceId, fieldName)`**: Returns a validator bound to the given instance and field. The returned function validates a value against the backend API.
- **`required`**: Validates that a value is provided (same as above)
- **`email`**: Validates that a value matches a basic email shape, empty values are skipped (same as above)
- **`minLength(min)`**: Returns a validator for minimum string length
- **`maxLength(max)`**: Returns a validator for maximum string length
- **`min(min)`**: Returns a validator for minimum numeric value
- **`max(max)`**: Returns a validator for maximum numeric value
- **`pattern(pattern)`**: Returns a validator for regex pattern matching
- **`unique(items)`**: Returns a validator that checks the value is not already in the list
- **`maxFileSize(maxSize)`**: Returns a validator that checks a `File`, or every file of a `File[]`, does not exceed `maxSize` megabytes
- **`allowedExtensions(extensions)`**: Returns a validator that checks the extension of a `File` name, or of every file of a `File[]`, is one of `extensions`
- **`validDate(format?)`**: Returns a validator that checks the value parses to a valid date. `format` defaults to `'YYYY/MM/DD'` to match Quasar's [QDate](https://quasar.dev/vue-components/date#qdate-api) default mask.
- **`afterDate(compareTo, format?)`**: Returns a validator that checks the date is strictly after `compareTo`. `format` defaults to `'YYYY/MM/DD'`.
- **`beforeDate(compareTo, format?)`**: Returns a validator that checks the date is strictly before `compareTo`. `format` defaults to `'YYYY/MM/DD'`.
- **`fromDate(compareTo, format?)`**: Returns a validator that checks the date is `compareTo` or after (inclusive). `format` defaults to `'YYYY/MM/DD'`.
- **`upToDate(compareTo, format?)`**: Returns a validator that checks the date is `compareTo` or before (inclusive). `format` defaults to `'YYYY/MM/DD'`.

#### useQuasarRules (Easiest for Quasar)

- **`useQuasarRules(instanceId, attributeConfig, validatorNames, i18nScope)`**: Automatically generates an array of Quasar validation rules following the order of validatorNames parameter and based on attribute configuration

---

## 3. Behavior Details

### 3.1 Common Behavior

- **Scoped i18n**: All validators translate their error messages under the `i18nScope` given to the composable
  (`${i18nScope}.validation.<rule>`, e.g. `user-module.fields.email.validation.minLength`)
- **Backend validation** (`validateFromApi`):
  - Calls the backend API with the provided value
  - Returns the internationalized `error` field from `LinPulsarApiErrorResponseBody` for HTTP 400 (Bad Request) and 404 (Not Found) status codes
  - Returns the generic i18n message `validation.unknownError` for all other errors (network errors, 500, etc.)
  - Executes asynchronously (returns a Promise)
- **Quasar Compatibility**:
  - All validators follow [Quasar validation rules](https://quasar.dev/vue-components/input#validation-rules) contract
  - Return `true` for valid values or an error message (`string`) for invalid values

### 3.2 Architecture

The three composables are organized in a modular hierarchy:

```
useFieldValidation (base layer)
       ↓
useQuasarFieldValidation (currying layer)
       ↓
useQuasarRules (automation layer)
```

- `useFieldValidation` provides the core validation logic
- `useQuasarFieldValidation` wraps it to provide curried functions
- `useQuasarRules` uses `useQuasarFieldValidation` to automatically generate rule arrays

### 3.3 Differences Between Composables

#### useFieldValidation

- Returns functions that take the value first, then the validator parameters (none for `required` and `email`)
- Example: `minLength('test', 5)`
- Use case: Custom validation logic outside Quasar components

#### useQuasarFieldValidation

- Returns curried functions compatible with Quasar's `rules` prop
- Example: `minLength(5)` returns `(value) => true | string`
- Use case: Direct use in Quasar component `rules` arrays
- Implementation: Wraps `useFieldValidation` functions to create curried versions

#### useQuasarRules

- Takes an attribute configuration and array of validator names
- Automatically generates the complete `rules` array
- Returns an empty array if `attributeConfig.hasValidations` is `false`, `required` is `false`, and no validators are specified
- Handles `required` based on `attributeConfig.required`
- `required` validator is the first in the list if `attributeConfig.required` is `true`
- Filters validators based on available `inputSettings`, except `email` which takes no setting and is always added
  when listed
- Follows the order of `validatorNames` parameter
- Includes `validateFromApi` at the end if `attributeConfig.hasValidations` is `true`
- Implementation: Uses `useQuasarFieldValidation` internally
- Use case: Simplified rule generation from configuration

---

## 4. Full Examples in Vue 3 + Quasar Components

### 4.1 Using useQuasarFieldValidation (Manual Approach)

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useQuasarFieldValidation } from '@linagora/lin-pulsar-core';

const email = ref('');
const age = ref<number>();

// Email field validators
const emailValidation = useQuasarFieldValidation('user-module.fields.email');
const emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

// Age field validators
const ageValidation = useQuasarFieldValidation('user-module.fields.age');
</script>

<template>
  <q-form>
    <!-- Email with multiple validators -->
    <q-input
      v-model="email"
      label="Email"
      :rules="[
        emailValidation.required,
        emailValidation.minLength(5),
        emailValidation.maxLength(100),
        emailValidation.pattern(emailPattern),
        emailValidation.validateFromApi('user-module', 'email'),
      ]"
    />

    <!-- Age with numeric validators -->
    <q-input
      v-model.number="age"
      type="number"
      label="Age"
      :rules="[
        ageValidation.required,
        ageValidation.min(18),
        ageValidation.max(120),
      ]"
    />
  </q-form>
</template>
```

### 4.2 Using useQuasarRules (Automated Approach - Recommended)

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { useQuasarRules } from '@linagora/lin-pulsar-core';
import type { LinPulsarAttributeConfiguration } from '@linagora/lin-pulsar-core';

const email = ref('');
const username = ref('');

// Attribute configurations (typically from backend/store)
const emailConfig: LinPulsarAttributeConfiguration = {
  name: 'email',
  type: 'String',
  input: 'Email',
  hasValidations: true,
  required: true,
  inputSettings: {
    minLength: 5,
    maxLength: 100,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  },
};

const usernameConfig: LinPulsarAttributeConfiguration = {
  name: 'username',
  type: 'String',
  input: 'Text',
  hasValidations: true,
  required: false,
  inputSettings: {
    minLength: 3,
    maxLength: 20,
  },
};

// Automatically generate rules from configuration
const emailRules = useQuasarRules(
  'user-module',
  emailConfig,
  ['minLength', 'maxLength', 'pattern'],
  'user-module.fields.email'
);

const usernameRules = useQuasarRules(
  'user-module',
  usernameConfig,
  ['minLength', 'maxLength'],
  'user-module.fields.username'
);
</script>

<template>
  <q-form>
    <!-- Email with auto-generated rules -->
    <q-input
      v-model="email"
      label="Email"
      :rules="emailRules"
    />

    <!-- Username with auto-generated rules -->
    <q-input
      v-model="username"
      label="Username"
      :rules="usernameRules"
    />
  </q-form>
</template>
```

---

## 5. Validation Methods Details

### 5.1 Backend Validation

```ts
const { validateFromApi } = useQuasarFieldValidation('user-module.fields.email');

// validateFromApi is curried: first call binds instanceId and fieldName,
// the returned function is the Quasar validator that takes the field value.
:rules="[validateFromApi('user-module', 'email')]"
```

### 5.2 Required Field

```ts
const { required } = useQuasarFieldValidation('user-module.fields.username');

// Use directly in Quasar rules - it validates the value
:rules="[required]"
```

### 5.3 String Length Validation

```ts
const { minLength, maxLength } = useQuasarFieldValidation('user-module.fields.username');

:rules="[
  minLength(3),   // Returns a validator for at least 3 characters
  maxLength(20)   // Returns a validator for at most 20 characters
]"
```

```ts
const { minLength, maxLength } = useQuasarFieldValidation('user-module.fields.username');

// Using input settings from attribute definition
:rules="[
  minLength(attribute.definition.inputSettings.minLength),
  maxLength(attribute.definition.inputSettings.maxLength)
]"
```

### 5.4 Numeric Range Validation

```ts
const { min, max } = useQuasarFieldValidation('user-module.fields.age');

:rules="[
  min(18),   // Returns a validator for at least 18
  max(120)   // Returns a validator for at most 120
]"
```

```ts
const { min, max } = useQuasarFieldValidation('user-module.fields.age');

// Using input settings from attribute definition
:rules="[
  min(attribute.definition.inputSettings.min),
  max(attribute.definition.inputSettings.max)
]"
```

### 5.5 Pattern Validation

```ts
const { pattern } = useQuasarFieldValidation('user-module.fields.postalCode');

const postalCodePattern = '^[0-9]{5}$';
:rules="[pattern(postalCodePattern)]" // Returns a validator for the pattern
```

```ts
const { pattern } = useQuasarFieldValidation('user-module.fields.postalCode');

// Using input settings from attribute definition
:rules="[pattern(attribute.definition.inputSettings.pattern)]"
```

### 5.6 Uniqueness Validation

```ts
const { unique } = useQuasarFieldValidation('user-module.fields.username');

const existingUsernames = ['alice', 'bob', 'charlie'];
:rules="[unique(existingUsernames)]" // Returns a validator that checks the value is not in the list
```

> **Note**: For primitives (`string`, `number`, `boolean`), comparison uses `String()` conversion — `1` and `"1"` are treated as equal. For objects and arrays, deep equality is used. A `null` or `undefined` value always passes (considered the responsibility of `required`).

### 5.7 Valid Date Validation

> **Prerequisite**: `validDate`, `afterDate`, `beforeDate`, `fromDate` and `upToDate` require the `customParseFormat` dayjs plugin. See [Prerequisites](#prerequisites) for the one-time setup.

```ts
const { validDate } = useQuasarFieldValidation('user-module.fields.birthDate');

:rules="[validDate('YYYY-MM-DD')]" // Returns a validator that checks format AND calendrical validity
```

```ts
const { validDate } = useQuasarFieldValidation('user-module.fields.birthDate');

// Without format — uses the Quasar wrapper default ('YYYY/MM/DD'), aligned with QDate
:rules="[validDate()]"
```

> **Notes**:
>
> - **Strings** are validated against `format` with strict parsing — they must match exactly. Non-string values (`number`, `Date`, `Dayjs`) are passed to dayjs as-is and `format` is ignored.
> - **Empty values** (`null`, `undefined`, `''`) are skipped and return `true`, so this rule can be combined with `required` without producing duplicate errors.
> - **Defaults**: the Quasar wrapper defaults to `'YYYY/MM/DD'`, which matches the default mask of Quasar's [QDate](https://quasar.dev/vue-components/date#qdate-api) component — so `v-model` values from `<q-date>` validate out of the box without specifying a format. If your input does not follow the wrapper default, pass an explicit `format`.

### 5.8 Date Range Validation

Use `afterDate`, `beforeDate`, `fromDate` or `upToDate` to constrain dates relative to a fixed reference point.

| Validator    | Comparison         | Inclusive? |
| ------------ | ------------------ | ---------- |
| `afterDate`  | value > compareTo  | No         |
| `beforeDate` | value < compareTo  | No         |
| `fromDate`   | value >= compareTo | Yes        |
| `upToDate`   | value <= compareTo | Yes        |

```ts
const { validDate, afterDate } = useQuasarFieldValidation('user-module.fields.startDate');

// Validate format first, then range constraint
:rules="[
  validDate(),                   // Checks format and calendrical validity
  afterDate('2020/01/01'),       // Strictly after reference date
]"
```

```ts
const { fromDate, upToDate } = useQuasarFieldValidation('user-module.fields.startDate');

// Inclusive bounds — uses the Quasar wrapper default ('YYYY/MM/DD')
:rules="[
  fromDate('2020/01/01'),   // On or after reference date
  upToDate('2030/12/31'),   // On or before reference date
]"
```

> **Notes**:
>
> - **Empty values** (`null`, `undefined`, `''`) are skipped and return `true`.
> - **Unparseable values** are also skipped (return `true`). Pair with `validDate` to catch invalid date strings before the range check.
> - **Day-level granularity**: comparison is performed at day granularity in the **browser's local timezone**. String values parsed against `format` (e.g. `'YYYY-MM-DD'` or `'YYYY/MM/DD'`) are treated as local midnight and are therefore timezone-neutral. For values that carry an absolute moment (`Date` instances, timestamps, ISO strings with explicit offsets), the local-timezone calendar day is used, and the verdict can differ across timezones — a moment that falls on one day in one timezone may fall on a different day in another. Normalize `value` to UTC before passing it in if you need timezone-independent comparison.
> - **Defaults**: the Quasar wrapper defaults `format` to `'YYYY/MM/DD'`, which matches the default mask of Quasar's [QDate](https://quasar.dev/vue-components/date#qdate-api) — so `v-model` values from `<q-date>` validate out of the box.

### 5.9 File Validation

```ts
const { maxFileSize, allowedExtensions } = useQuasarFieldValidation('user-module.fields.avatar');

:rules="[maxFileSize(10), allowedExtensions(['png', 'jpg'])]" // Size in megabytes; extensions without their leading dot
```

> **Note**: Both validators accept the `File` of a single selection or the `File[]` of a `QFile` with `multiple`, and check every file. A `null`, `undefined` or empty selection always passes (considered the responsibility of `required`). Extensions are compared case-insensitively, a leading dot in the configured list is ignored, and a file name without extension is rejected.

### 5.10 Combining Validators

```ts
const validation = useQuasarFieldValidation('user-module.fields.email');
const emailPattern = '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$';

:rules="[
  validation.required,
  validation.minLength(5),
  validation.maxLength(100),
  validation.pattern(emailPattern),
  validation.validateFromApi('user-module', 'email')
]"
```

### 5.11 Using useQuasarRules for Automatic Rule Generation

```ts
import { useQuasarRules } from '@linagora/lin-pulsar-core';
import type { LinPulsarAttributeConfiguration } from '@linagora/lin-pulsar-core';

// Attribute configuration
const emailConfig: LinPulsarAttributeConfiguration = {
  name: 'email',
  type: 'String',
  input: 'Email',
  hasValidations: true,
  required: true,
  inputSettings: {
    minLength: 5,
    maxLength: 100,
    pattern: '^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$',
  },
};

// Generate rules automatically
const emailRules = useQuasarRules(
  'user-module',
  emailConfig,
  ['minLength', 'maxLength', 'pattern'],
  'user-module.fields.email'
);

// Use directly in component
:rules="emailRules"

// The generated rules include:
// - required (if attributeConfig.required is true)
// - validators specified in the array (if they have settings in inputSettings)
// - validateFromApi (if attributeConfig.hasValidations is true)
```

---

## 6. API Reference

### Composable Signatures

#### useFieldValidation

```ts
function useFieldValidation(i18nScope: string): {
  validateFromApi: (
    instanceId: string,
    fieldName: string,
    value: unknown
  ) => Promise<true | string>;
  required: (value: unknown) => true | string;
  email: (value: unknown) => true | string;
  minLength: (
    value: string | null | undefined,
    minValue: number
  ) => true | string;
  maxLength: (
    value: string | null | undefined,
    maxValue: number
  ) => true | string;
  min: (value: number, minValue: number) => true | string;
  max: (value: number, maxValue: number) => true | string;
  pattern: (value: string, pattern: string) => true | string;
  unique: (value: unknown, items: unknown[]) => true | string;
  maxFileSize: (
    value: File | File[] | null | undefined,
    maxSize: number
  ) => true | string;
  allowedExtensions: (
    value: File | File[] | null | undefined,
    extensions: string[]
  ) => true | string;
  validDate: (value: unknown, format?: string) => true | string;
  afterDate: (
    value: unknown,
    compareTo: unknown,
    format?: string
  ) => true | string;
  beforeDate: (
    value: unknown,
    compareTo: unknown,
    format?: string
  ) => true | string;
  fromDate: (
    value: unknown,
    compareTo: unknown,
    format?: string
  ) => true | string;
  upToDate: (
    value: unknown,
    compareTo: unknown,
    format?: string
  ) => true | string;
};
```

#### useQuasarFieldValidation

```ts
function useQuasarFieldValidation(i18nScope: string): {
  validateFromApi: (
    instanceId: string,
    fieldName: string
  ) => (value: string) => Promise<true | string>;
  required: (value: unknown) => true | string;
  email: (value: unknown) => true | string;
  minLength: (minValue: number) => (value: string) => true | string;
  maxLength: (maxValue: number) => (value: string) => true | string;
  min: (minValue: number) => (value: string | number) => true | string;
  max: (maxValue: number) => (value: string | number) => true | string;
  pattern: (pattern: string) => (value: string) => true | string;
  unique: (items: unknown[]) => (value: unknown) => true | string;
  maxFileSize: (
    maxSize: number
  ) => (value: File | File[] | null | undefined) => true | string;
  allowedExtensions: (
    extensions: string[]
  ) => (value: File | File[] | null | undefined) => true | string;
  validDate: (format?: string) => (value: unknown) => true | string;
  afterDate: (
    compareTo: string,
    format?: string
  ) => (value: unknown) => true | string;
  beforeDate: (
    compareTo: string,
    format?: string
  ) => (value: unknown) => true | string;
  fromDate: (
    compareTo: string,
    format?: string
  ) => (value: unknown) => true | string;
  upToDate: (
    compareTo: string,
    format?: string
  ) => (value: unknown) => true | string;
};
```

#### useQuasarRules

```ts
function useQuasarRules<T extends Record<string, unknown>>(
  instanceId: string,
  attributeConfig: LinPulsarAttributeConfiguration<T>,
  validatorsNames: ValidatorName[],
  i18nScope: string
): ValidationRule[];

// ValidatorName type
type ValidatorName =
  | 'email'
  | 'min'
  | 'max'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'unique'
  | 'maxFileSize'
  | 'allowedExtensions';

// LinPulsarAttributeConfiguration interface
interface LinPulsarAttributeConfiguration<T = Record<string, unknown>> {
  name: string;
  type: string;
  required: boolean;
  hasValidations: boolean;
  input: AttributeInputType;
  // Read by useQuasarRules: min, max, minLength, maxLength, pattern, unique, maxFileSize, allowedExtensions
  inputSettings: T;
}
```

### Method Signatures

#### validateFromApi(instanceId, fieldName)

- **instanceId**: `string` - The unique identifier of the module instance
- **fieldName**: `string` - The name of the field to validate
- **Returns**: `(value: string) => Promise<true | string>` - A Quasar-compatible validator bound to the given instance and field
- **Use case**: Server-side business validation
- **Error handling**:
  - For HTTP 400/404 responses: Returns the `error` field from `LinPulsarApiErrorResponseBody` (already internationalized by backend)
  - For all other errors: Returns the i18n message `validation.unknownError`

#### required(value)

- **value**: `unknown` - The value to check for presence
- **Returns**: `true | string` - `true` if present, error message otherwise
- **Use case**: Mandatory fields

#### email(value)

- **value**: `unknown` - The value to check against the email shape
- **Returns**: `true | string` - `true` if the value is empty or matches an email shape, error message otherwise
- **Use case**: Email input format validation
- **Notes**:
  - The pattern is pragmatic, not RFC 5322 compliant: local part allows letters, digits and `._%+-`; domain allows letters, digits, `.` and `-`; the top-level label is at least two letters.
  - **Empty values** (`null`, `undefined`, `''`) intentionally return `true` — presence enforcement is the responsibility of the `required` validator, not `email`.
  - Non-empty values that are not strings (`number`, `boolean`, object…) return the error message.

#### minLength(minValue)

- **minValue**: `number` - Minimum string length
- **Returns**: `(value: string) => true | string` - Validator function
- **Use case**: Text input minimum length
- **Note**: Returns `true` if value is `null` or `undefined` (allows optional fields)

#### maxLength(maxValue)

- **maxValue**: `number` - Maximum string length
- **Returns**: `(value: string) => true | string` - Validator function
- **Use case**: Text input maximum length
- **Note**: Returns `true` if value is `null` or `undefined` (allows optional fields)

#### min(minValue)

- **minValue**: `number` - Minimum numeric value
- **Returns**: `(value: string | number) => true | string` - Validator function, a string value is parsed with
  `parseFloat`
- **Use case**: Numeric input lower bound

#### max(maxValue)

- **maxValue**: `number` - Maximum numeric value
- **Returns**: `(value: string | number) => true | string` - Validator function, a string value is parsed with
  `parseFloat`
- **Use case**: Numeric input upper bound

#### pattern(pattern)

- **pattern**: `string` - Regular expression pattern
- **Returns**: `(value: string) => true | string` - Validator function
- **Use case**: Custom format validation (email, phone, etc.)

#### unique(items)

- **items**: `unknown[]` - The list of existing values to check against
- **Returns**: `(value: unknown) => true | string` - Validator function
- **Use case**: Ensure a value does not already exist in a list (e.g. unique username)
- **Note**: For primitives, comparison uses `String()` conversion (`1` and `"1"` are equal). For objects and arrays, deep equality is used. Returns `true` if value is `null` or `undefined`.

#### maxFileSize(maxSize)

- **maxSize**: `number` - The maximum allowed file size, in megabytes
- **Returns**: `(value: File | File[] | null | undefined) => true | string` - Validator function
- **Use case**: Bound the size of an uploaded file, e.g. an avatar image
- **Note**: Checks every file of a multiple selection. Returns `true` if the value is `null`, `undefined` or an empty selection.

#### allowedExtensions(extensions)

- **extensions**: `string[]` - The allowed extensions, with or without leading dot (e.g. `['png', '.jpg']`)
- **Returns**: `(value: File | File[] | null | undefined) => true | string` - Validator function
- **Use case**: Restrict an upload to a set of file types, e.g. images
- **Note**: Extensions are compared case-insensitively; a file name without extension is rejected. Checks every file of a multiple selection. Returns `true` if the value is `null`, `undefined`, an empty selection, or if `extensions` is empty.

#### validDate(format?)

- **format**: `string | undefined` - Optional date format string (e.g. `'YYYY-MM-DD'`, `'DD/MM/YYYY'`). Defaults to `'YYYY/MM/DD'` in the Quasar wrapper to match Quasar's [QDate](https://quasar.dev/vue-components/date#qdate-api) default mask; the base `useFieldValidation` falls back to `'YYYY-MM-DD'`.
- **Returns**: `(value: unknown) => true | string` - Validator function
- **Use case**: Ensure a date input string matches the expected format and is calendrically valid
- **Notes**:
  - **Strings** are validated against `format` with strict parsing — they must match exactly.
  - **Non-string values** (`number`, `Date`, `Dayjs`) are passed to dayjs as-is and checked only for calendrical validity; `format` is intentionally ignored for these types since it is a string-parsing hint, not a type constraint.
  - **Empty values** (`null`, `undefined`, `''`) intentionally return `true` — presence enforcement is the responsibility of the `required` validator, not `validDate`.

#### afterDate(compareTo, format?) / beforeDate(compareTo, format?) / fromDate(compareTo, format?) / upToDate(compareTo, format?)

- **compareTo**: `string` - The reference date string to compare against, in the same `format`.
- **format**: `string | undefined` - Optional date format string. Defaults to `'YYYY/MM/DD'` in the Quasar wrapper; the base `useFieldValidation` falls back to `'YYYY-MM-DD'`.
- **Returns**: `(value: unknown) => true | string` - Validator function
- **Use case**: Constrain a date field to a range relative to a fixed reference point
- **Notes**:
  - Empty values (`null`, `undefined`, `''`) return `true`. Values that cannot be parsed also return `true` — pair with `validDate` to catch unparseable strings first.
  - Comparison is performed at day granularity (time component is stripped).
  - `afterDate` and `beforeDate` are exclusive; `fromDate` and `upToDate` are inclusive.

#### useQuasarRules(instanceId, attributeConfig, validatorsNames, i18nScope)

- **instanceId**: `string` - The unique identifier of the module instance
- **attributeConfig**: `LinPulsarAttributeConfiguration<T>` - The configuration of the attribute being validated
- **validatorsNames**: `ValidatorName[]` - Array of validator names to include (`'email'`, `'min'`, `'max'`, `'minLength'`, `'maxLength'`, `'pattern'`, `'unique'`, `'maxFileSize'`, `'allowedExtensions'`)
- **i18nScope**: `string` - The i18n scope passed to `useQuasarFieldValidation` for error message translation (e.g. `'user-module.fields.email'`)
- **Returns**: `ValidationRule[]` - Array of validation functions ready to use in Quasar's `rules` prop
- **Use case**: Automatic rule generation from configuration
- **Behavior**:
  - Returns empty array if `attributeConfig.hasValidations` is `false`, `required` is `false`, and no validators are specified
  - Includes `required` validator if `attributeConfig.required` is `true`
  - Only includes validators that have values in `attributeConfig.inputSettings`, except `email` which takes no setting
    and is always added when listed
  - Includes `validateFromApi` at the end if `attributeConfig.hasValidations` is `true`

> **Note**: All validators return `true | string` following the [Quasar validation rules](https://quasar.dev/vue-components/input#validation-rules) contract.

---

## 7. Internationalization Messages

### Required i18n Keys

All validation error messages must be defined in your i18n files under `${i18nScope}.validation`, where `i18nScope` is
the scope given to the composable (`user-module.fields.email` in the example below).

```json
{
  "user-module": {
    "fields": {
      "email": {
        "validation": {
          "required": "This field is required.",
          "email": "Invalid email address.",
          "minLength": "Must be at least {min} characters.",
          "maxLength": "Must not exceed {max} characters.",
          "pattern": "Invalid format. Expected pattern: {pattern}",
          "unique": "This value already exists.",
          "unknownError": "Unknown error while validating the field."
        }
      },
      "age": {
        "validation": {
          "required": "Age is required.",
          "min": "Must be at least {min}.",
          "max": "Must not exceed {max}.",
          "unknownError": "Unknown error while validating age."
        }
      },
      "birthDate": {
        "validation": {
          "required": "Birth date is required.",
          "invalidDate": "Invalid date. Expected format: {format}.",
          "afterDate": "Date must be after {compareTo}.",
          "beforeDate": "Date must be before {compareTo}.",
          "fromDate": "Date must be {compareTo} or later.",
          "upToDate": "Date must be {compareTo} or earlier.",
          "unknownError": "Unknown error while validating the date."
        }
      },
      "avatar": {
        "validation": {
          "required": "An image is required.",
          "maxFileSize": "The image must not exceed {maxFileSize} MB.",
          "allowedExtensions": "Allowed extensions: {extensions}.",
          "unknownError": "Unknown error while validating the image."
        }
      }
    }
  }
}
```

### Translation Parameters

- **minLength/maxLength**: `{ min }` or `{ max }`
- **min/max**: `{ min }` or `{ max }`
- **pattern**: `{ pattern }`
- **invalidDate**: `{ format }` — the format string passed to `validDate`
- **afterDate/beforeDate/fromDate/upToDate**: `{ compareTo }` — the compared date, displayed in the validator format
- **maxFileSize**: `{ maxFileSize }` — the maximum size in megabytes
- **allowedExtensions**: `{ extensions }` — the allowed extensions, normalized and comma-separated (e.g. `png, jpg`)

## 8. Best Practices

### 8.1 Choosing the Right Composable

- **Use `useQuasarRules`** when working with attribute configurations from backend/store (recommended)
- **Use `useQuasarFieldValidation`** when you need manual control over which validators to apply in Quasar components
- **Use `useFieldValidation`** only for custom validation logic outside Quasar components

### 8.2 General Best Practices

- Initialize validation composables once per field at the component level
- Combine multiple validators in the `rules` array for comprehensive validation
- `validateFromApi` is automatically added at the end by `useQuasarRules` to avoid unnecessary API calls when client-side validation fails
- Always provide translated error messages for all validation keys
- When using `useQuasarFieldValidation`:
  - For `required` and `email`, use them directly without calling as functions
  - For `validateFromApi`, call it with `(instanceId, fieldName)` to get the bound validator function
  - For other validators (`minLength`, `maxLength`, `min`, `max`, `pattern`), call them with the parameter to get the validator function
- When using `useQuasarRules`:
  - Only specify validators that have corresponding values in `inputSettings`
  - The composable automatically filters out validators without configuration, except `email` which takes none
  - No need to manually add `required` or `validateFromApi` - they are handled automatically

### 8.3 Example: Migrating to useQuasarRules

**Before (manual approach):**

```ts
const { required, minLength, maxLength, validateFromApi } =
  useQuasarFieldValidation('user-module.fields.email');

const emailRules = [
  required,
  minLength(emailConfig.inputSettings.minLength),
  maxLength(emailConfig.inputSettings.maxLength),
  validateFromApi('user-module', 'email'),
];
```

**After (automated approach):**

```ts
const emailRules = useQuasarRules(
  'user-module',
  emailConfig,
  ['minLength', 'maxLength'],
  'user-module.fields.email'
);
// Automatically includes required and validateFromApi based on config
```

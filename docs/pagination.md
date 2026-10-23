# 📄 usePagination Composable

This document explains how to use the `usePagination` composable to convert between backend pagination models and Quasar QTable pagination formats.

---

## 1. Overview

The `usePagination` composable provides utility functions to translate between:

- The generic `Pagination` structure used by the API layer (0-based page index)
- The `QuasarPagination` structure expected by Quasar components (1-based page index)

This ensures consistent page indexing, sorting, and sizing conventions across the application.

---

## 2. Usage

### 2.1 Import and Initialization

```ts
import { usePagination } from '@linagora/lin-pulsar-core';

const { toPagination, toQuasarPagination } = usePagination();
```

### 2.2 Available Methods

| Method               | Description                                            |
| -------------------- | ------------------------------------------------------ |
| `toPagination`       | Converts Quasar pagination to API pagination format    |
| `toQuasarPagination` | Converts API Page response to Quasar pagination format |

---

## 3. Method Details

### 3.1 toPagination

Converts a Quasar-style pagination object to a generic `Pagination` format suitable for API calls.

```ts
function toPagination(pagination: QuasarPagination): Pagination;
```

**Conversion rules:**

- `page`: Quasar uses 1-based indexing → API uses 0-based indexing (`page - 1`)
- `size`: Maps from `rowsPerPage` (defaults to 5)
- `sort`: A single `'<column>,<direction>'` string. The column maps from `sortBy`, defaulting to
  `'updateDate'` when no sort is active. The direction is `'desc'` when `descending` is true,
  otherwise `'asc'`, and is applied even when no column is active — so an unset `sortBy` with
  `descending: true` asks for the default column, newest first

> **Why `sort` is a single string**
>
> The backend expects the Spring Data convention, where the sort column and its direction are
> combined in one query parameter (`?sort=name,desc`). There is no separate `direction` field on
> `Pagination`.

**Example:**

```ts
const quasarPagination = {
  page: 2,
  rowsPerPage: 10,
  sortBy: 'name',
  descending: true,
};

const apiPagination = toPagination(quasarPagination);
// Result: { page: 1, size: 10, sort: 'name,desc' }
```

### 3.2 toQuasarPagination

Converts a generic `Page<T>` response from the API to a Quasar-compatible pagination format.

```ts
function toQuasarPagination<T>(
  page: Page<T>,
  current: QuasarPagination
): QuasarPagination;
```

**Conversion rules:**

- `page`: API uses 0-based indexing → Quasar uses 1-based indexing (`number + 1`)
- `rowsPerPage`: Maps from `size`
- `rowsNumber`: Maps from `totalElements`
- `sortBy`: Carried forward from `current`, or `null` when its sort is empty
- `descending`: Carried forward from `current`, independently of `sortBy`

Both sort fields are **always present** on the returned object. `sortBy: null` is the value Quasar
uses for "no active sort".

> **Why `current` is required**
>
> `Page<T>.pageable.sort` only exposes `{ sorted, unsorted, empty }` — it does not include the
> column name or sort direction. Those fields can only be carried forward from the caller's existing
> pagination value, so there is no sensible default for `current`: omitting it could only reset
> `sortBy` and `descending`, making Quasar lose the active sort on the next server request. The
> parameter is mandatory so that the compiler — not this page — catches call sites that would drop
> the sort state.

**Example:**

```ts
const apiResponse = {
  content: [...],
  number: 0,
  size: 10,
  totalElements: 45,
  // ... other Page properties
};

pagination.value = toQuasarPagination(apiResponse, pagination.value);
// Result: { page: 1, rowsPerPage: 10, rowsNumber: 45, sortBy: 'name', descending: true }
```

---

## 4. Full Example with QTable

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { getEntities, usePagination } from '@linagora/lin-pulsar-core';
import type {
  QTableRequestEvent,
  QuasarPagination,
} from '@linagora/lin-pulsar-core';

const { toPagination, toQuasarPagination } = usePagination();

const rows = ref([]);
const loading = ref(false);
const pagination = ref<QuasarPagination>({
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0,
  sortBy: 'updateDate',
  descending: false,
});

async function onRequest(props: QTableRequestEvent) {
  loading.value = true;

  // Convert Quasar pagination to API format
  const apiPagination = toPagination(props.pagination);

  // Call the API of the module instance with the converted pagination
  const response = await getEntities('my-module', {}, apiPagination);

  // Update rows
  rows.value = response.content;

  // Convert API response back to Quasar format, preserving sort state
  pagination.value = toQuasarPagination(response, pagination.value);

  loading.value = false;
}
</script>

<template>
  <q-table
    v-model:pagination="pagination"
    :rows="rows"
    :loading="loading"
    @request="onRequest"
  />
</template>
```

---

## 5. Related Types

The following types are used by this composable and are exported from the library:

### Pagination

```ts
interface Pagination {
  page: number; // 0-based page index
  size: number; // Number of items per page
  sort?: string; // '<column>,<direction>', e.g. 'name,desc'
}
```

### QuasarPagination

```ts
interface QuasarPagination {
  page: number; // 1-based page index
  rowsPerPage: number;
  rowsNumber?: number; // Total number of rows
  sortBy: string | null; // null when no sort is active
  descending: boolean; // applied even when sortBy is null
}
```

> `sortBy` and `descending` are required, and `sortBy` accepts `null` rather
> than `undefined`. Object literals typed as `QuasarPagination` must now provide both fields. This
> matches the shape Quasar itself emits on `@update:pagination`.
>
> `toQuasarPagination` also takes a second, **mandatory** `current` argument: existing single-argument
> calls no longer compile and must pass the pagination value being replaced.

### Page\<T\>

```ts
interface Page<T> {
  content: T[];
  number: number; // 0-based page index
  size: number;
  totalElements: number;
  totalPages: number;
  // ... additional metadata
}
```

### QTableRequestEvent

```ts
interface QTableRequestEvent {
  pagination: QuasarPagination;
  filter?: string;
  props?: Record<string, unknown>;
}
```

For complete type definitions, see [`docs/types-and-interfaces.md`](types-and-interfaces.md).

---

## 6. API Reference

### Composable Signature

```ts
function usePagination(): {
  toPagination: (pagination: QuasarPagination) => Pagination;
  toQuasarPagination: <T>(
    page: Page<T>,
    current: QuasarPagination
  ) => QuasarPagination;
};
```

### Parameters

The composable takes no parameters.

### Return Value

| Property             | Type                                                                | Description                                                            |
| -------------------- | ------------------------------------------------------------------- | ---------------------------------------------------------------------- |
| `toPagination`       | `(pagination: QuasarPagination) => Pagination`                      | Converts Quasar format to API format                                   |
| `toQuasarPagination` | `<T>(page: Page<T>, current: QuasarPagination) => QuasarPagination` | Converts API Page response to Quasar format, preserving the sort state |

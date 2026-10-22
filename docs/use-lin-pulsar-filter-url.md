# 🔗 URL Filter Sync with useLinPulsarFilterUrl

This document explains how to use the `useLinPulsarFilterUrl` composable to synchronize a list of `LinPulsarFilter` instances
with the query params of the current URL.

---

## 1. Overview

The filter URL system provides a **bidirectional sync between filters and the URL query string**.

The `useLinPulsarFilterUrl` composable allows you to:

- **Write** filters into the URL as query params (`setFiltersInUrl`)
- **Read** filters back from the URL query params (`getFiltersFromUrl`)
- **Preserve** selected existing query params untouched while updating the rest

---

## 2. Query Param Format

Each `LinPulsarFilter` is serialized using its `name` as the query key and its `toString()` value as the query value.

When several filters share the same `name`, their values are grouped into an array under that key, so the URL ends up
with repeated params:

```
?status=active&status=pending
```

When reading back, a single value is normalized into an array of one element, so both single and repeated occurrences of
a key are handled the same way.

`null` values (a query param present without a value, e.g. `?status`) are silently ignored when reading filters back.

---

## 3. Using the `useLinPulsarFilterUrl` Composable

The `useLinPulsarFilterUrl()` composable provides:

- `setFiltersInUrl(filters, keeps)` — pushes the given filters into the URL query params via `router.replace`.
- `getFiltersFromUrl(filters)` — reads the current URL query params and rebuilds the matching `LinPulsarFilter` instances.

### 3.1 Import and Setup

```ts
import { useLinPulsarFilterUrl } from '@linagora/lin-pulsar-core';
import { useRoute, useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();

const { setFiltersInUrl, getFiltersFromUrl } = useLinPulsarFilterUrl(router, route);
```

---

## 4. Writing Filters to the URL

`setFiltersInUrl(filters, keeps)` replaces the current route's query params:

- Query params whose key is listed in `keeps` are **preserved as-is**. `keeps` is a list of query parameter names to
  keep unchanged (for example `['page', 'sort', 'view']`). It does not contain filter names.
- All other query params are **replaced** by the serialization of `filters`.

```ts
import { LinPulsarFilter } from '../filters/linPulsarFilter';

const filters: LinPulsarFilter[] = [/* ... LinPulsarFilter instances ... */];

// Keep the "page" and "sort" query params, replace everything else with the filters
setFiltersInUrl(filters, ['page', 'sort']);
```

- Filters are grouped by `name`: if multiple filters share the same name, the resulting query param becomes an array.
- This calls `router.replace`, so it does **not** push a new history entry.

---

## 5. Reading Filters from the URL

`getFiltersFromUrl(filters)` reads the current `route.query` and reconstructs `LinPulsarFilter` instances for every query
param whose key matches one of the provided reference filters' `name`.

```ts
const knownFilters: LinPulsarFilter[] = [
  /* ... filter definitions used as a reference for matching by name ... */
];

const extractedFilters = getFiltersFromUrl(knownFilters);
```

- Only query params whose key matches a `name` in `knownFilters` are extracted; unrelated query params are ignored.
- Each matching value is rebuilt via `LinPulsarFilter.fromString(name, value, definition)`, where `definition` is the
  matched reference filter: the rebuilt filter carries its `type`, `options` and `dynamicLabelOptions`, so a filter
  restored from the URL behaves like the one the user applied — dynamic label resolution included.
- If a key has multiple values in the URL, one `LinPulsarFilter` is created per value.
- `null` values are filtered out before being passed to `LinPulsarFilter.fromString`.

---

## 6. Typical Usage Pattern

A common pattern is to read filters from the URL on mount, and write them back whenever they change:

```ts
import { onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useLinPulsarFilterUrl } from '@linagora/lin-pulsar-core';

const router = useRouter();
const route = useRoute();
const { setFiltersInUrl, getFiltersFromUrl } = useLinPulsarFilterUrl(router, route);

const filters = ref<LinPulsarFilter[]>([]);

onMounted(() => {
  filters.value = getFiltersFromUrl(knownFilters);
});

watch(filters, (newFilters) => {
  setFiltersInUrl(newFilters, ['page', 'sort']);
});
```

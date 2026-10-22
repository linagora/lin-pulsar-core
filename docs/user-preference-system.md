# ⚙️ User Preferences System (`useLinPulsarUserPreference`)

This document describes how to manage **user preferences** using:

* a centralized **Pinia store**
* a **composable** that synchronizes preferences with the backend API

---

## 1. Overview

The user preference system provides a simple abstraction to:

* Store user preferences locally (Pinia)
* Synchronize preferences with the backend API
* Provide a composable API for components and services

It is composed of:

* `useLinPulsarUserPreferenceStore` → state management layer
* `useLinPulsarUserPreference` → API + store orchestration layer

---

## 2. Pinia Store (`useLinPulsarUserPreferenceStore`)

### 2.1 Purpose

The store is responsible for holding user preferences in memory and providing mutation methods.

---

### 2.2 State

```ts
interface LinPulsarUserPreferenceState {
  userPreferences: Record<string, string>;
}
```

* `userPreferences`: key-value map of all user preferences

---

### 2.3 Actions

#### `setUserPreferences(values)`

Replaces the full preference set.

```ts
setUserPreferences(values: Record<string, string>): void
```

#### `setUserPreference(key, value)`

Creates or updates a single preference.

```ts
setUserPreference(key: string, value: string): void
```

#### `removeUserPreference(key)`

Removes a preference entry.

```ts
removeUserPreference(key: string): void
```

---

### 2.4 Usage

```ts
import { useLinPulsarUserPreferenceStore } from '../stores/linPulsarUserPreferenceStore';

const store = useLinPulsarUserPreferenceStore();

store.setUserPreference('theme', 'dark');
store.removeUserPreference('language');
```

---

## 3. Composable (`useLinPulsarUserPreference`)

### 3.1 Purpose

The composable acts as a **service layer** between:

* backend API (`user-preferences`)
* Pinia store

It ensures synchronization between remote and local state.

---

### 3.2 Initialization

#### `init()`

Fetches preferences from backend and populates the store.

```ts
init(): Promise<void>
```

Example:

```ts
const { init } = useLinPulsarUserPreference();

await init();
```

---

### 3.3 Save preference

#### `saveUserPreference(key, value)`

Saves a preference to the backend and updates the store.

```ts
saveUserPreference(key: string, value: string): Promise<void>
```

Example:

```ts
const { saveUserPreference } = useLinPulsarUserPreference();

await saveUserPreference('theme', 'dark');
```

---

### 3.4 Delete preference

#### `deleteUserPreference(key)`

Deletes a preference from backend and store.

```ts
deleteUserPreference(key: string): Promise<void>
```

Example:

```ts
const { deleteUserPreference } = useLinPulsarUserPreference();

await deleteUserPreference('theme');
```

---

### 3.5 Returned API

```ts
{
  init,
    saveUserPreference,
    deleteUserPreference,
    userPreferenceStore
}
```

* `userPreferenceStore`: direct access to reactive Pinia store

---

## 4. Backend Contract

All API calls are performed against:

```
GET    user-preferences
POST   user-preferences
DELETE user-preferences/:key
```

### 4.1 GET response

```ts
Record<string, string>
```

### 4.2 POST payload / response

```ts
{
  key: string;
  value: string;
}
```

### 4.3 DELETE response

No payload (`void`)

---

## 5. Typical Usage Pattern

```ts
const {
  init,
  saveUserPreference,
  deleteUserPreference,
  userPreferenceStore,
} = useLinPulsarUserPreference();

await init();

await saveUserPreference('theme', 'dark');

console.log(userPreferenceStore.userPreferences);
```

---

## 6. Design Notes

* The store is **pure state management**
* The composable is the **integration layer (API ↔ store)**
* All state updates go through store actions only
* API responses are immediately reflected in local state

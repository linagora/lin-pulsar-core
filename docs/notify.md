# 🔔 Notification System with useNotify

This document explains how to use the `useNotify` composable to emit notification events through the shared UiEventService, using Quasar's `QNotifyCreateOptions`.

---

## 1. Overview

The notification system provides a **centralized event-based approach** to emit notifications across all modules. It ensures that all modules can emit and listen to notifications consistently through a shared event stream.

The `useNotify` composable allows you to emit notification events with a **QNotifyCreateOptions** payload, which can be consumed by any observer subscribed to the UiEventService.

---

## 2. Notification Events

### 2.1 Event Stream

Notifications go through `uiEventSubject`, the shared UI event bus described in
[UI Event Service](./services.md#-ui-event-service):

```ts
import { uiEventSubject } from '@linagora/lin-pulsar-core';

// Subscribe to all notification events
uiEventSubject.subscribe((event) => {
  if (event.key === 'notify') {
    console.log('Notification:', event.data);
  }
});
```

- All notification events have `key: 'notify'`.
- Ensures a consistent event flow across modules.

### 2.2 Event Structure

Each notification event follows the `UiEvent` interface:

```ts
interface UiEvent {
  key: string;
  data: QNotifyCreateOptions;
}
```

---

## 3. Using the `useNotify` Composable

The `useNotify()` composable provides a `Notify` function to emit notification events.

### 3.1 Import and Setup

```ts
import { useNotify } from '@linagora/lin-pulsar-core';
import type { QNotifyCreateOptions } from 'quasar';

const { Notify } = useNotify();
```

- The `Notify` function emits events through the shared `uiEventSubject`.
- Can be used anywhere in your Vue components or services.

### 3.2 Using `notify`

The `Notify` function accepts a single parameter:

- **data** (`QNotifyCreateOptions`): The notification payload, as expected by Quasar's `$q.notify`.

#### Simple notification with a message

```ts
Notify({ type: 'positive', message: 'User profile updated successfully!' });
```

#### Notification with additional options

```ts
Notify({
  type: 'negative',
  message: 'Failed to save changes',
  caption: 'Network connection lost',
  color: 'red',
  timeout: 5000,
});
```

#### Info notification

```ts
Notify({
  type: 'info',
  message: 'New features are available. Check the changelog.',
});
```

#### Warning notification

```ts
Notify({
  type: 'warning',
  message: 'Your session will expire soon',
  timeout: 10000,
});
```

---

## 4. Full Example in a Vue 3 + Quasar Component

### 4.1 Emitting Notifications

```vue
<template>
  <q-btn
    @click="handleNotify"
    label="Show notification"
  />
</template>

<script setup lang="ts">
import { useNotify } from '@linagora/lin-pulsar-core';
const { Notify } = useNotify();

function handleNotify() {
  Notify({ type: 'positive', message: 'Hello from Notify!' });
}
</script>
```

---

## 5. Best Practices

- **Use consistent notification types**: Stick to standard types like `'positive'`, `'negative'`, `'info'`, and `'warning'` (as per Quasar).
- **Provide meaningful messages**: Make sure the data payload contains clear, user-friendly messages.
- **Centralize notification handling**: Create a single component or service to subscribe to notifications and display them consistently.
- **Structured payloads**: For complex notifications, use objects with `message`, `details`, and other relevant fields.
- **Avoid notification spam**: Don't emit multiple notifications for the same event in quick succession.

---

## 6. TypeScript Support

The composable is fully typed and ensures type safety:

```ts
import { useNotify } from '@linagora/lin-pulsar-core';
import type { QNotifyCreateOptions } from 'quasar';

const { Notify } = useNotify();

// Type-safe notification emission
Notify({ type: 'positive', message: 'Operation completed' });

// With structured data
const errorData: QNotifyCreateOptions = {
  type: 'negative',
  message: 'An error occurred',
  caption: 'Unable to connect to server',
  color: 'red',
};

Notify(errorData);
```

- The `data` parameter is typed as `QNotifyCreateOptions`, allowing any Quasar notification structure.
- Return type is `void` as the function emits events without returning values.

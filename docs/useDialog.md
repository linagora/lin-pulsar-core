# 💬 Dialog System with useDialog

This document explains how to use the `useDialog` composable to handle dialog events through the shared `uiEventSubject`.

---

## 1. Overview

The dialog system provides a **centralized event-based approach** to manage dialogs.

The `useDialog` composable allows you to:

- **Listen** to dialog events (open/close)
- **Reactively control** dialog visibility with a `show` ref
- **Execute custom logic** when a dialog opens via an optional callback

---

## 2. Shared UiEventService

### 2.1 Event Stream

The UiEventService exposes a **shared RxJS Subject** (`uiEventSubject`) that acts as an event bus for all UI events, including dialogs:

### 2.2 Event Structure

Each dialog event follows the `UiEvent` interface with a `DialogEvent` payload:

```ts
interface UiEvent {
  key: string;
  data: DialogEvent;
}

interface DialogEvent {
  type: 'open' | 'close';
  uiNamespace: string;
  i18nScope: string;
}
```

---

## 3. Using the `useDialog` Composable

The `useDialog()` composable provides:

- A reactive `show` ref that tracks dialog visibility.
- A `dialogRef` ref that should be bound to the dialog component instance when you want draggable behavior.
- Automatic subscription to dialog events on component mount and automatic cleanup on unmount.

### 3.1 Import and Setup

```ts
import { useDialog } from '@linagora/lin-pulsar-core';

// You can optionally pass an onOpen callback
const { show, dialogRef } = useDialog('dialog', (event) => {
  // handle opened dialog event
});
```

- The `show` ref is updated when dialog events are received.
- The `dialogRef` value is `null` by default; bind it to a component with `ref="dialogRef"` to enable draggable initialization when the underlying DOM element becomes available.

## 4. Draggable dialogs (interact.js)

When you bind `dialogRef` to a component, `useDialog` will initialize `interact.js` once the instance's `$el` is available. Key points:

- Each time `dialogRef` changes to a new instance, the previous `interact` instance is unset and a new one is initialized on the new `$el`.
- Draggable is configured to allow dragging only from components matching `.drag-handle`.
- On each drag `move` event the composable:
  - skips silently if the event target is neither an `HTMLElement` nor an `SVGElement`,
  - reads `data-x` / `data-y` attributes from the target (defaults to 0),
  - adds the event `dx` / `dy`,
  - updates `target.style.transform = translate(${x}px, ${y}px)`,
  - writes back `data-x` and `data-y` attributes with the new values.
- `interact.modifiers.restrictRect({ restriction: 'parent', endOnly: true })` is applied to keep the dialog inside its parent.

Usage example (template):

```html
<template>
  <!-- bind the component instance to dialogRef to enable draggable behavior -->
  <DialogComponent ref="dialogRef" />
</template>
```

## 5. Lifecycle and cleanup

`useDialog` subscribes to `uiEventSubject` on mount. On unmount, both the interact.js instance (if initialized) and the event subscription are cleaned up together in `onUnmounted`.

## 6. Emitting Dialog Events

To trigger a dialog from anywhere in your application, emit a dialog event through the `uiEventSubject`:

### 6.1 Opening a Dialog

```ts
import { uiEventSubject } from '@linagora/lin-pulsar-core';

// Open a simple confirmation dialog
uiEventSubject.next({
  key: 'dialog',
  data: {
    type: 'open',
    uiNamespace: 'myModule',
    i18nScope: 'myModule.dialogs',
  },
});
```

### 6.2 Closing a Dialog

```ts
import { uiEventSubject } from '@linagora/lin-pulsar-core';

// Close the dialog
uiEventSubject.next({
  key: 'dialog',
  data: {
    type: 'close',
    uiNamespace: 'myModule',
    i18nScope: 'myModule.dialogs',
  },
});
```

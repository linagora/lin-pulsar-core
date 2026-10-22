# Quasar Constants

This document describes the constants exported by `constants/quasarDate.ts`, which centralize default values aligned
with the [Quasar Framework](https://quasar.dev/)'s component defaults.

---

## `QDATE_DEFAULT_MASK`

```ts
QDATE_DEFAULT_MASK: string;
```

Default mask used to format dates for Quasar's [`QDate`](https://quasar.dev/vue-components/date#qdate-api) component.

### Value

```ts
'YYYY/MM/DD';
```

### Usage

```ts
import { QDATE_DEFAULT_MASK } from '@linagora/lin-pulsar-core';

console.log(QDATE_DEFAULT_MASK); // 'YYYY/MM/DD'
```
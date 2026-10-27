# Module Lifecycle System

The module lifecycle system provides a standardized way for business modules to initialize themselves in the host application.

## Overview

The lifecycle consists of five phases that are executed in sequence for all modules:

```
Setup → Configure → Initialize → Ready → Post-Init
```

Each phase has a specific purpose and is executed for **all modules** before moving to the next phase.

---

## Lifecycle Phases

### 1. Setup Phase

**Purpose:** Validate dependencies and prepare the module

**When executed:** First phase, after the module is loaded via Module Federation

**Use cases:**

- Check if required dependencies are available
- Validate environment
- Prepare internal state
- Check Vue version compatibility

**Hook signature:**

```typescript
async setup(): Promise<ModuleLifecycleResult>
```

**Implementation example:**

```typescript
async setup(): Promise<ModuleLifecycleResult> {
  // Example: Check Vue version compatibility
  if (!window.Vue || !window.Vue.version.startsWith('3.')) {
    return {
      success: false,
      error: 'Incompatible Vue version, Vue 3.x is required'
    };
  }
  return { success: true };
}
```

---

### 2. Configure Phase

**Purpose:** Receive and validate host configuration

**When executed:** After setup, before initialization

**Use cases:**

- Receive configuration from host (`modules/<ModuleName>.json`)
- Validate required configuration fields
- Store configuration for later use
- Apply configuration settings

**Hook signature:**

```typescript
async configure(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>
```

**Implementation example:**

```typescript
async configure(
  config: ModuleHostConfig<MyModuleOptions>
): Promise<ModuleLifecycleResult> {
  // Example: check for required config fields
  if (!config.instanceId) {
    return {
      success: false,
      error: 'Missing module instanceId in configuration'
    };
  }

  if (!config.basePath) {
    return {
      success: false,
      error: 'Missing basePath in configuration'
    };
  }

  return { success: true };
}
```

---

### 3. Initialize Phase

**Purpose:** Initialize resources

**When executed:** After configuration

**Use cases:**

- Receive configuration from host (`modules/<ModuleName>.json`)
- Set up event listeners
- Initialize module-specific resources
- Prepare data structures

**Hook signature:**

```typescript
async initialize(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>
```

**Implementation example:**

```typescript
async initialize(config: ModuleHostConfig<MyModuleOptions>): Promise<ModuleLifecycleResult> {
  // Initialize module resources
  await this.loadInitialData();

  return {
    success: true,
    metadata: { storesRegistered: 1 }
  };
}
```

---

### 4. Ready Phase

**Purpose:** Signal that the module is ready for use

**When executed:** After all modules are initialized

**Use cases:**

- Receive configuration from host (`modules/<ModuleName>.json`)
- Perform final checks
- Emit ready events
- Log readiness status

**Hook signature:**

```typescript
async ready(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>
```

**Implementation example:**

```typescript
async ready(config: ModuleHostConfig<MyModuleOptions>): Promise<ModuleLifecycleResult> {
  console.log(`Module ${this.name} v${this.version} is ready!`);

  return {
    success: true,
    metadata: { startTime: Date.now() }
  };
}
```

---

### 5. Post-Init Phase

**Purpose:** Cross-module integrations and final setup

**When executed:** After all modules are ready

**Use cases:**

- Receive configuration from host (`modules/<ModuleName>.json`)
- Register module information in shared Pinia store states (e.g., navigation items)
- Integrate with other modules
- Set up cross-module communication
- Perform final setup that requires all modules to be ready

The zones declared in the module configuration are registered by the host before `postInit` is called.

**Hook signature:**

```typescript
async postInit(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>
```

**Implementation example:**

```typescript
async postInit(config: ModuleHostConfig<MyModuleOptions>): Promise<ModuleLifecycleResult> {
  // Register module in main navigation items of Ui Store
  const store = useLinPulsarUiStore();

  store.addMainNavigationMenuItems(
    { id: config.instanceId, labelKey: `${config.instanceId}.NavigationMenu.label`, path: config.basePath || '/users' }
  );

  // Access other modules from host's module registry
  // Set up cross-module event listeners
  // Perform integrations

  return { success: true };
}
```

---

## Result Object

All lifecycle hooks must return a `ModuleLifecycleResult`:

```typescript
interface ModuleLifecycleResult {
  /**
   * Whether the phase completed successfully.
   * If false, the module still continues through the remaining phases: the host does not use the result.
   */
  success: boolean;

  /**
   * Error message if the phase failed.
   */
  error?: string;

  /**
   * Additional metadata from the phase (for debugging).
   */
  metadata?: Record<string, unknown>;
}
```

### Success Result

```typescript
return { success: true };
```

### Success with Metadata

```typescript
return {
  success: true,
  metadata: {
    storesRegistered: 2,
    dataLoaded: true,
  },
};
```

### Failure Result

```typescript
return {
  success: false,
  error: 'Missing required configuration',
};
```

---

## Ready-Made Page Module Lifecycle

For a standard page module, you do not need to write a lifecycle class at all. lin-pulsar-core provides a `createModulePageLifecycle` factory that returns a ready-to-expose module instance with the default page integration behavior:

- Optionally registers an entry in the host application's main navigation menu during `postInit`, when the host configuration sets `options.addNavigationMenu` to `true`. The menu item uses the module instance identifier as id, the i18n key `<instanceId>.NavigationMenu.label` as label key, and the configured base path as target.
- Registers the given dialog components once in the host layout dialog zone during `postInit`. The zone is provided through the required `dialogZone` option (e.g. `base-layout.dialogComponent`).

```typescript
// src/federation/module-page-lifecycle.ts
import { createModulePageLifecycle } from '@linagora/lin-pulsar-core';

export default createModulePageLifecycle({
  id: 'modulePage',
  name: 'Page module',
  version: '0.0.1',
  description: 'Module to manage page entity.',
  dialogZone: 'base-layout.dialogComponent',
  dialogComponents: ['linPulsar/ConfirmationDialog', 'linPulsar/FormDialog'],
});
```

### Overriding Phases

Any lifecycle phase can be overridden through the `hooks` option. An overridden phase fully replaces the default behavior of that phase:

```typescript
export default createModulePageLifecycle({
  id: 'modulePage',
  name: 'Page module',
  version: '0.0.1',
  dialogZone: 'base-layout.dialogComponent',
  hooks: {
    async configure(config) {
      if (!config.basePath) {
        return { success: false, error: 'Missing basePath' };
      }
      return { success: true };
    },
  },
});
```

The options of `createModulePageLifecycle` are typed by `ModulePageLifecycleOptions`:

| Option             | Required | Description                                                                                 |
| ------------------ | -------- | ------------------------------------------------------------------------------------------- |
| `id`               | yes      | Unique identifier of the module.                                                            |
| `name`             | yes      | Human-readable name of the module.                                                          |
| `version`          | yes      | Version of the module (semantic versioning).                                                |
| `description`      | no       | Description of what the module does.                                                        |
| `dialogZone`       | yes      | Zone of the host layout where the dialog components are registered.                         |
| `dialogComponents` | no       | Zone component names registered once in `dialogZone` during `postInit`.                     |
| `hooks`            | no       | Per-phase overrides; an overridden phase fully replaces the default behavior of that phase. |

The module-specific options type can extend `ModulePageLifecycleHostOptions` so typed hooks keep access to the shared `addNavigationMenu` option.

### Initialization

There is nothing to call on the plugin side. Expose the created instance as the module's lifecycle entry in the federation configuration (`vite.config.ts`):

```typescript
exposes: {
  './PageLifecycle': './src/federation/module-page-lifecycle.ts',
},
```

The host application loads this entry during boot (`src/boot/module-lifecycle.ts` in the host) and drives all five phases automatically.

---

## Implementing a Module

### Option 1: Extending BasicRemoteModule (Recommended)

lin-pulsar-core provides a `BasicRemoteModule` class with default implementations for all hooks:

```typescript
import { BasicRemoteModule } from '@linagora/lin-pulsar-core';
import type {
  ModuleHostConfig,
  ModuleLifecycleResult,
} from '@linagora/lin-pulsar-core';

class MyModule extends BasicRemoteModule<MyModuleOptions> {
  constructor() {
    super('my-module', 'My Business Module', '1.0.0', 'Description');
  }

  // Override only the hooks you need
  async initialize(
    config: ModuleHostConfig<MyModuleOptions>
  ): Promise<ModuleLifecycleResult> {
    // do something

    return { success: true };
  }
}

export default new MyModule();
```

**Advantages:**

- ✅ All hooks have default implementations (return success)
- ✅ Override only what you need
- ✅ Object-oriented design
- ✅ Follows SOLID principles
- ✅ Easy to extend and maintain

---

### Option 2: Implementing RemoteModule Interface

Implement the `RemoteModule` interface directly for full control:

```typescript
import { useLinPulsarUiStore } from '@linagora/lin-pulsar-core';
import type {
  RemoteModule,
  ModuleLifecycleResult,
  ModuleHostConfig,
} from '@linagora/lin-pulsar-core';

class MyModule implements RemoteModule<MyModuleOptions> {
  id = 'my-module';
  name = 'My Business Module';
  version = '1.0.0';
  description = 'Description of what the module does';

  async setup(): Promise<ModuleLifecycleResult> {
    // Validate dependencies
    return { success: true };
  }

  async configure(
    config: ModuleHostConfig<MyModuleOptions>
  ): Promise<ModuleLifecycleResult> {
    // Apply configuration
    if (!config.instanceId) {
      return { success: false, error: 'Missing module instanceId' };
    }
    if (!config.basePath) {
      return { success: false, error: 'Missing basePath' };
    }
    return { success: true };
  }

  async initialize(
    config: ModuleHostConfig<MyModuleOptions>
  ): Promise<ModuleLifecycleResult> {
    // do something
    return { success: true };
  }

  async ready(
    config: ModuleHostConfig<MyModuleOptions>
  ): Promise<ModuleLifecycleResult> {
    // do something
    return { success: true };
  }

  async postInit(
    config: ModuleHostConfig<MyModuleOptions>
  ): Promise<ModuleLifecycleResult> {
    // Register module in main navigation items of Ui Store
    const store = useLinPulsarUiStore();

    store.addMainNavigationMenuItems({
      id: config.instanceId,
      labelKey: `${config.instanceId}.NavigationMenu.label`,
      path: config.basePath || '/my-module',
    });

    return { success: true };
  }
}

export default new MyModule();
```

**Advantages:**

- ✅ Full control over implementation
- ✅ Implement only needed hooks
- ✅ Type-safe with TypeScript
- ✅ Clean, explicit code

---

### Module Federation Configuration

Expose the lifecycle in your module's `vite.config.ts`:

```typescript
import { defineConfig } from 'vite';
import federation from '@module-federation/vite';

export default defineConfig({
  plugins: [
    federation({
      name: 'myBusinessModule',
      filename: 'remoteEntry.js',
      exposes: {
        './lifecycle': './src/lifecycle.ts', // Required for business modules
        './MyComponent': './src/components/MyComponent.vue',
      },
    }),
  ],
});
```

---

## Best Practices

### 1. Keep Phases Focused

Each phase should have a single, clear responsibility.

✅ **Good:**

```typescript
async initialize(config: ModuleHostConfig<MyModuleOptions>): Promise<ModuleLifecycleResult> {
  return { success: true };
}
```

❌ **Bad:**

```typescript
async initialize(config: ModuleHostConfig<MyModuleOptions>): Promise<ModuleLifecycleResult> {
  await fetchUserData(); // Should be in ready or postInit
  integrateWithOtherModule(); // Should be in postInit
  return { success: true };
}
```

---

### 2. Always Return a Valid Result

Never return `undefined` or forget the return statement.

✅ **Good:**

```typescript
return { success: true };
```

✅ **Good:**

```typescript
return {
  success: false,
  error: 'Missing required configuration',
};
```

❌ **Bad:**

```typescript
return; // Invalid, returns undefined
```

---

### 3. Use Metadata for Debugging

Provide useful debugging information in the metadata.

```typescript
return {
  success: true,
  metadata: {
    storesRegistered: 2,
    routesRegistered: 3,
    duration: Date.now() - startTime,
  },
};
```

---

### 4. Fail Fast in Setup

Validate prerequisites early in the Setup phase.

```typescript
async setup(): Promise<ModuleLifecycleResult> {
  if (!window.someRequiredAPI) {
    return {
      success: false,
      error: 'Required API not available'
    };
  }

  return { success: true };
}
```

---

### 5. Don't Throw Errors

Return failure results instead of throwing errors.

✅ **Good:**

```typescript
if (!config.instanceId) {
  return { success: false, error: 'Missing module instanceId' };
}
```

❌ **Bad:**

```typescript
if (!config.instanceId) {
  throw new Error('Missing module instanceId'); // Makes init() reject
}
```

**Why:** The host does not catch thrown errors: they make `linPulsarModuleFederation.init()` reject and stop the initialization of all modules, while a failure result lets the other modules and phases run.

---

### 6. Implement Only What You Need

All lifecycle hooks are optional. Don't implement hooks your module doesn't need.

```typescript
class SimpleModule extends BasicRemoteModule<MyModuleOptions> {
  constructor() {
    super('simple-module', 'Simple Module', '1.0.0');
  }

  async initialize(
    config: ModuleHostConfig<MyModuleOptions>
  ): Promise<ModuleLifecycleResult> {
    return { success: true };
  }

  // No need for setup, configure, ready, or postInit
}

export default new SimpleModule();
```

---

## Error Handling

### Module configuration file fails to load

Each URL of the `modules` option is fetched independently. A file that cannot be fetched or does not hold a valid
module configuration is logged and skipped, the other modules are still loaded:

```
[LinPulsar Core] Failed to load file: /modules/MyModule.json (HTTP 404)
[LinPulsar Core] Failed to fetch or parse file: /modules/MyModule.json
[LinPulsar Core] Invalid content in file: /modules/MyModule.json
```

The first message is logged when the server answers with an error status, the second when the request itself fails
(network error, invalid JSON), the third when the file does not hold the expected content.

The same rule applies to the files of the `extraZones` option.

---

### Module lifecycle fails to load

If the `lifecycleRemote` of a module cannot be loaded (unregistered remote, missing exposed element, unregistered local
component), `init()` rejects and no module is initialized: the lifecycles of all modules are loaded before the first
phase runs.

---

### Lifecycle phase fails

The result returned by a phase is not used to stop the initialization: a module returning `{ success: false }` does not
prevent the next modules and phases from running. A phase that **throws** makes `init()` reject, which is why phases
must return a failure result instead of throwing (see [Best Practices](#5-dont-throw-errors)).

---

## Execution Sequence

`linPulsarModuleFederation.init()` executes the lifecycle in this order:

```
linPulsarModuleFederation.init(options)
    │
    ├─ 1. Register the remotes and share the Module Federation instance
    │
    ├─ 2. Register the host-local components
    │
    ├─ 3. Load the module configuration files and extra zone files (in parallel)
    │
    ├─ 4. Load the lifecycle (lifecycleRemote) of each module, in configuration order
    │
    ├─ 5. Phase 1: Setup       → module-A.setup(), then module-B.setup(), ...
    ├─ 6. Phase 2: Configure   → routes and i18n registered, then module-A.configure(configA), ...
    ├─ 7. Phase 3: Initialize  → module-A.initialize(configA), ...
    ├─ 8. Phase 4: Ready       → module-A.ready(configA), ...
    ├─ 9. Phase 5: Post-Init   → zones registered, then module-A.postInit(configA), ...
    │
    └─ 10. Register the zones of the extra zone files
```

**Key points:**

- All modules complete one phase before moving to the next
- Within a phase, modules are executed one after the other, in the order of the `modules` option
- A failure result does not block the other modules, a thrown error aborts the initialization

---

## Integration with Host

### Application Configuration

The host application (by default `LinOpenFactoryUi`) is driven by a single `config.json` file. Only some of its
entries are consumed by lin-pulsar-core, the others are handled by the host itself:

```json
{
  "environment": "__APP_ENV__",
  "i18n": {
    "languages": ["fr-FR", "en-US"],
    "locale": "fr-FR",
    "i18nFiles": ["common.json", "accounts.json"]
  },
  "themeVariables": {
    "primary": "#0A84FF",
    "secondary": "#7A7781"
  },
  "remotes": [
    {
      "name": "linPulsar",
      "entry": "http://localhost:5001/mf-manifest.json"
    }
  ],
  "modules": ["/modules/AccountsPage.json", "/modules/AccountDetailsPage.json"],
  "extraZones": [],
  "designFiles": ["design/default.json", "design/base-layout.json"]
}
```

| Entry            | Consumed by                                                                                             |
| ---------------- | ------------------------------------------------------------------------------------------------------- |
| `remotes`        | `linPulsarModuleFederation.init()` — Module Federation remotes to register (`{ name, entry }`).         |
| `modules`        | `linPulsarModuleFederation.init()` — URLs of the module configuration files.                            |
| `extraZones`     | `linPulsarModuleFederation.init()` — URLs of additional zone files (see [below](#loading-extra-zones)). |
| `i18n`           | The host, which builds the vue-i18n instance and shares it with `setI18nInstance()`.                    |
| `designFiles`    | The host, which merges the design files and shares the result with `setUiDesign()`.                     |
| `themeVariables` | The host only (Quasar brand colors).                                                                    |
| Other entries    | The host only.                                                                                          |

The translations and the design of the components of the `linPulsar` catalog are not shipped by the catalog: they are
defined by the application, through the `i18n` and `designFiles` entries.

### Host Responsibilities

The whole federation setup is provided by lin-pulsar-core through `linPulsarModuleFederation.init()`. The host
application loads its `config.json`, then calls `init()` in a single boot file:

```typescript
// src/boot/module-lifecycle.ts
import { linPulsarModuleFederation } from '@linagora/lin-pulsar-core';
import { defineBoot } from '@quasar/app-vite/wrappers';
import MyLocalComponent from 'components/MyLocalComponent.vue';
import { appConfig } from './config'; // content of config.json

export default defineBoot(async ({ router }) => {
  await linPulsarModuleFederation.init({
    router,
    remotes: appConfig.remotes,
    modules: appConfig.modules,
    extraZones: appConfig.extraZones,
    localComponents: { MyLocalComponent },
  });
});
```

`init()` performs the complete setup, in order: it registers the given remotes and shares the Module Federation instance with lin-pulsar-core, makes the given host-local components available to zones and module configurations, loads each module configuration file and extra zone file in a fault-tolerant way (a broken entry is skipped), loads every module's lifecycle entry point (`lifecycleRemote`), then executes the five phases in sequence for all modules. During the CONFIGURE phase it registers the routes exposed by each module (`routesRemote`) on the provided router and merges the module i18n messages (`i18nRemote`); during the POST_INIT phase it registers the zones declared in each module configuration. Finally, it registers the zones of the extra zone files.

Options:

| Option            | Required | Description                                                                                  |
| ----------------- | -------- | -------------------------------------------------------------------------------------------- |
| `router`          | yes      | Host Vue Router instance, used to register module routes.                                    |
| `remotes`         | yes      | Module Federation remotes to register (`{ name, entry }` entries).                           |
| `modules`         | yes      | URLs of the module configuration files to load (e.g. `/modules/AccountsPage.json`).          |
| `extraZones`      | no       | URLs of additional zone definition files to load (see below).                                |
| `localComponents` | no       | Host-local components to make available to zones and module configurations, indexed by name. |
| `hooks`           | no       | Host-side overrides of the phase runners (see below).                                        |

Example with literal values:

```typescript
import ExportApplicationScriptBtn from 'components/btn/ExportApplicationScriptBtn.vue';

await linPulsarModuleFederation.init({
  router,
  remotes: [
    {
      name: 'linPulsar',
      entry: 'http://localhost:5001/mf-manifest.json',
    },
  ],
  modules: [
    '/modules/AccountsPage.json',
    '/modules/OrganizationalUnitPage.json',
  ],
  extraZones: ['/zones/supersetGraphs.json'],
  localComponents: { ExportApplicationScriptBtn },
});
```

### Referencing Local Components in Module Configuration

The `lifecycleRemote`, `routesRemote` and `i18nRemote` configuration properties, and any property consumed as a route
component (such as `options.layout` and `options.page` for a page module), accept a `ModuleComponentRef`: a plain
string or a `FederatedLinPulsarZoneEntry` for an element exposed through Module Federation, or a
`ComponentLinPulsarZoneEntry` for an element registered through the `localComponents` option. A local reference is
resolved without any Module Federation loading, and an unregistered name produces an error.

```json
{
  "instanceId": "moduleTimeEntriesPage",
  "remoteName": "linPulsar",
  "entity": "accounts",
  "lifecycleRemote": {
    "type": "component",
    "component": "timeEntriesLifecycle"
  },
  "routesRemote": { "type": "component", "component": "timeEntriesRoutes" },
  "i18nRemote": { "type": "federated", "plugin": "linPulsar/EmptyI18n" },
  "apiEndpoint": "time-entries",
  "basePath": "/time-entries",
  "zones": [],
  "options": {
    "layout": "linPulsar/BaseLayout",
    "page": { "type": "component", "component": "timeEntriesPage" },
    "pagePath": ""
  }
}
```

The referenced elements are registered by the host alongside its zone components:

```typescript
await linPulsarModuleFederation.init({
  router,
  remotes: appConfig.remotes,
  modules: appConfig.modules,
  localComponents: {
    timeEntriesLifecycle,
    timeEntriesRoutes,
    timeEntriesPage: TimeEntriesPage,
  },
});
```

A route definition consumes such a property through a single-expression Nunjucks template (e.g.
`component: '{{ config.options.page }}'`): when the configuration value behind the expression is a zone entry, the
entry is resolved directly instead of being rendered as a string, so existing string-based configurations keep
working unchanged.

### Loading Extra Zones

Zones can be declared outside module configuration files through the `extraZones` option. Each entry is the URL of a
JSON file holding an array of `ModuleZoneDefinition` entries, in the same format as the `zones` field of a module
configuration (see [Configuring Zones in Module Configuration](./components-plugin-zones.md#-configuring-zones-in-module-configuration)):

```json
[
  {
    "zone": "moduleAccountDetailsPage.content.after",
    "plugin": "linPulsar/SupersetWidgetCard",
    "props": {
      "supersetDomain": "https://superset.example.com",
      "dashboardSlug": "accounts"
    }
  },
  {
    "zone": "moduleAccountDetailsPage.header.actions",
    "component": "ExportApplicationScriptBtn"
  }
]
```

All files are fetched during initialization and their zones are registered after the zones declared by the modules,
in file order. A file that cannot be loaded or does not hold an array of valid zone definitions (a `zone` name plus
exactly one of a `plugin` or a `component` name) is logged and skipped, without aborting the initialization.

### Hooking into Host-Side Phases

The host can extend how any lifecycle phase is orchestrated through the `hooks` option. Each hook has the
`LinPulsarModuleFederationPhaseRunner` signature (`(module, config, router) => Promise<ModuleLifecycleResult>`) and is
executed after the default host-side runner of its phase (which already calls the module's own hook); phases without a
hook keep the default behavior.

```typescript
export default defineBoot(async ({ router }) => {
  await linPulsarModuleFederation.init({
    router,
    remotes: appConfig.remotes,
    modules: appConfig.modules,
    hooks: {
      configure: async (module, config) => {
        // Additional host logic, executed after the default CONFIGURE runner.
        return { success: true };
      },
    },
  });
});
```

### Module Responsibilities

Business modules are responsible for:

1. ✅ Exposing the element referenced by `lifecycleRemote` in their Module Federation config
2. ✅ Implementing the `RemoteModule` interface (or extending `BasicRemoteModule`)
3. ✅ Returning valid `ModuleLifecycleResult` from all hooks
4. ✅ Handling their own errors gracefully

---

## Troubleshooting

### Module Not Loading

**Problem:** The module is not initialized (its routes, zones or navigation items are missing)

**Solutions:**

1. Check the module configuration file is listed in the `modules` entry of the application `config.json`
2. Verify the module configuration file can be fetched at that URL
3. Check the Module Federation remote referenced by `lifecycleRemote` is listed in the `remotes` entry of `config.json`
4. Verify the remote exposes the element referenced by `lifecycleRemote`
5. Check browser console for `[LinPulsar Core]` errors

---

### Lifecycle Hook Not Called

**Problem:** A specific lifecycle hook is not being called

**Solutions:**

1. Verify the hook is implemented and exported
2. Check the hook signature matches the interface
3. Ensure the hook is `async` and returns a `Promise<ModuleLifecycleResult>`
4. Check whether `linPulsarModuleFederation.init()` rejected: an error thrown by a hook is not caught, so it reaches
   the host boot unchanged (without the `[LinPulsar Core]` prefix) and the remaining hooks are never called (see
   [Lifecycle phase fails](#lifecycle-phase-fails))

---

### Configuration Not Received

**Problem:** Module's `configure` receives unexpected configuration

**Solutions:**

1. Check the module configuration file is the one listed in the `modules` entry of the application `config.json`
2. Validate JSON syntax in config file
3. Check browser network tab for config file fetch (404?)

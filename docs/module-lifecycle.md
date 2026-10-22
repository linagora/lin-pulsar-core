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

- Receive configuration from host (`module-<name>.json`)
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

- Receive configuration from host (`module-<name>.json`)
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

- Receive configuration from host (`module-<name>.json`)
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

- Receive configuration from host (`module-<name>.json`)
- Register zones from configuration into the LinPulsar Zone Store
- Register module information in shared Pinia store states (e.g., navigation items)
- Integrate with other modules
- Set up cross-module communication
- Perform final setup that requires all modules to be ready

**Hook signature:**

```typescript
async postInit(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>
```

**Implementation example:**

```typescript
async postInit(config: ModuleHostConfig<MyModuleOptions>): Promise<ModuleLifecycleResult> {
  // Register zones defined in configuration
  if (config.zones.length > 0) {
    const zoneStore = useLinPulsarZoneStore();
    config.zones.forEach((zoneDefinition) => {
      if ('component' in zoneDefinition && zoneDefinition.component) {
        zoneStore.registerComponent(
          zoneDefinition.zone,
          zoneDefinition.component,
          zoneDefinition.props
        );
      } else if ('plugin' in zoneDefinition && zoneDefinition.plugin) {
        zoneStore.registerPluginOnce(
          zoneDefinition.zone,
          zoneDefinition.plugin,
          zoneDefinition.props
        );
      }
    });
  }
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
   * If false, the error is logged but the module continues through remaining phases.
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

For a standard page module, you do not need to write a lifecycle class at all. The lin-pulsar-core provides a `createModulePageLifecycle` factory that returns a ready-to-expose module instance with the default page integration behavior:

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
  dialogComponents: ['myRemote/ConfirmationDialog', 'myRemote/FormDialog'],
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

The lin-pulsar-core provides a `BasicRemoteModule` class with default implementations for all hooks:

```typescript
import { BasicRemoteModule } from '@linagora/lin-pulsar-core';
import type { ModuleLifecycleResult } from '@linagora/lin-pulsar-core';
import type { App } from 'vue';

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
import type {
  RemoteModule,
  ModuleLifecycleResult,
  ModuleHostConfig,
} from '@linagora/lin-pulsar-core';
import type { App } from 'vue';

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

  async ready(config: ModuleHostConfig): Promise<ModuleLifecycleResult> {
    // do something
    return { success: true };
  }

  async postInit(
    config: ModuleHostConfig<MyModuleOptions>
  ): Promise<ModuleLifecycleResult> {
    // Register zones defined in configuration
    if (config.zones.length > 0) {
      const zoneStore = useLinPulsarZoneStore();
      config.zones.forEach((zoneDefinition) => {
        if ('component' in zoneDefinition && zoneDefinition.component) {
          zoneStore.registerComponent(
            zoneDefinition.zone,
            zoneDefinition.component,
            zoneDefinition.props
          );
        } else if ('plugin' in zoneDefinition && zoneDefinition.plugin) {
          zoneStore.registerPluginOnce(
            zoneDefinition.zone,
            zoneDefinition.plugin,
            zoneDefinition.props
          );
        }
      });
    }

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
  throw new Error('Missing module instanceId'); // Will be caught by host but not clean
}
```

**Why:** Thrown errors are caught by the host and converted to failure results, but explicit returns are clearer and follow the expected pattern.

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

### Module configuration files list fails to load

If `modules.json` cannot be loaded, the host application will log an error and skip the module lifecycle system:

```
[Module Lifecycle] Failed to load module configurations: Failed to fetch /modules.json
```

---

### Module configuration fails to load

If a module’s configuration file cannot be loaded, the host will log an error and skip that module:

```
[Module Lifecycle] [Module Lifecycle] Config file not found: moduleMyModule.json
```

---

### Module fails to load

If a module’s remote lifecycle cannot be loaded, the host application will crash.

---

## Execution Sequence

The host executes lifecycle phases in this order:

```
Host Application
    │
    ├─ 1. Load modules.json (get list of modules to load)
    │
    ├─ 2. For each module in modules.json:
    │   ├─ Load module-<name>.json configuration
    │   └─ Load module via Module Federation (remoteName/lifecycle)
    │
    ├─ 3. Phase 1: Setup (all modules in parallel)
    │   ├─ module-A.setup()
    │   ├─ module-B.setup()
    │   └─ module-C.setup()
    │
    ├─ 4. Phase 2: Configure (all modules in parallel)
    │   ├─ module-A.configure(configA)
    │   ├─ module-B.configure(configB)
    │   └─ module-C.configure(configC)
    │
    ├─ 5. Phase 3: Initialize (all modules in parallel)
    │   ├─ module-A.initialize(configA)
    │   ├─ module-B.initialize(configB)
    │   └─ module-C.initialize(configC)
    │
    ├─ 6. Phase 4: Ready (all modules in parallel)
    │   ├─ module-A.ready(configA)
    │   ├─ module-B.ready(configB)
    │   └─ module-C.ready(configC)
    │
    └─ 7. Phase 5: Post-Init (all modules in parallel)
        ├─ module-A.postInit(configA)
        ├─ module-B.postInit(configB)
        └─ module-C.postInit(configC)
```

**Key points:**

- All modules complete one phase before moving to the next
- Phases execute in parallel for all modules (using `Promise.allSettled`)
- Failure in one module doesn't block others

---

## Integration with Host

### Host Responsibilities

The whole federation setup is provided by the lin-pulsar-core through `linPulsarModuleFederation.init()`. The host application only declares its configuration (remotes, module configuration files, extra zone files, host-local components) and calls `init()` in a single boot file:

```typescript
// src/boot/module-lifecycle.ts
import { linPulsarModuleFederation } from '@linagora/lin-pulsar-core';
import { defineBoot } from '@quasar/app-vite/wrappers';
import MyLocalComponent from 'components/MyLocalComponent.vue';
import { appConfig } from './config';

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

`init()` performs the complete setup, in order: it registers the given remotes and shares the Module Federation instance with the lin-pulsar-core, makes the given host-local components available to zones and module configurations, loads each module configuration file and extra zone file in a fault-tolerant way (a broken entry is skipped), loads every module's lifecycle entry point (`lifecycleRemote`), then executes the five phases in sequence for all modules. During the CONFIGURE phase it registers the routes exposed by each module (`routesRemote`) on the provided router and merges the module i18n messages (`i18nRemote`); during the POST_INIT phase it registers the zones declared in each module configuration. Finally, it registers the zones of the extra zone files.

Options:

| Option            | Required | Description                                                                                 |
| ----------------- | -------- | ------------------------------------------------------------------------------------------- |
| `router`          | yes      | Host Vue Router instance, used to register module routes.                                   |
| `remotes`         | yes      | Module Federation remotes to register (`{ name, entry }` entries).                          |
| `modules`         | yes      | URLs of the module configuration files to load (e.g. `/modules/AccountsPage.json`).         |
| `extraZones`      | no       | URLs of additional zone definition files to load (see below).                               |
| `localComponents` | no       | Host-local components to make available to zones and module configurations, indexed by name. |
| `hooks`           | no       | Host-side overrides of the phase runners (see below).                                       |

Example with literal values:

```typescript
import ExportApplicationScriptBtn from 'components/btn/ExportApplicationScriptBtn.vue';

await linPulsarModuleFederation.init({
  router,
  remotes: [
    {
      name: 'catalogUI',
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
  "remoteName": "catalogUI",
  "entity": "accounts",
  "lifecycleRemote": { "type": "component", "component": "timeEntriesLifecycle" },
  "routesRemote": { "type": "component", "component": "timeEntriesRoutes" },
  "i18nRemote": { "type": "federated", "plugin": "catalogUI/EmptyI18n" },
  "apiEndpoint": "time-entries",
  "basePath": "/time-entries",
  "zones": [],
  "options": {
    "layout": "catalogUI/BaseLayout",
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
    "plugin": "catalogUI/SupersetWidgetCard",
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

1. ✅ Exposing `./lifecycle` in Module Federation config
2. ✅ Implementing the `RemoteModule` interface (or extending `BasicRemoteModule`)
3. ✅ Returning valid `ModuleLifecycleResult` from all hooks
4. ✅ Handling their own errors gracefully

---

## Future Enhancements

The following features are planned for future versions:

### Router Integration

Add direct router access for route registration during lifecycle phases.

### Zone System

Allow modules to inject components into named zones in the UI.

### Module Dependencies

Declare and validate inter-module dependencies:

```typescript
class MyModule extends BasicRemoteModule<MyModuleOptions> {
  dependencies = ['core-module', 'auth-module'];

  // ...
}
```

### Lazy Loading

Support for lazy-loaded module features that load on demand.

---

## Troubleshooting

### Module Not Loading

**Problem:** Module doesn't appear in lifecycle logs

**Solutions:**

1. Check module is listed in host's `modules.json`
2. Verify config file exists: `module-<name>.json`
3. Check Module Federation remote is registered in `remotes.json`
4. Verify module exposes `./lifecycle` in its Module Federation config
5. Check browser console for loading errors

---

### Lifecycle Hook Not Called

**Problem:** A specific lifecycle hook is not being called

**Solutions:**

1. Verify the hook is implemented and exported
2. Check the hook signature matches the interface
3. Ensure the hook is `async` and returns a `Promise<ModuleLifecycleResult>`
4. Check browser console for `[Module Lifecycle]` logs

---

### Configuration Not Received

**Problem:** Module's `configure` receives unexpected configuration

**Solutions:**

1. Check the config file path: `module-<module-name>.json`
2. Validate JSON syntax in config file
3. Check browser network tab for config file fetch (404?)

# TypeScript Types & Interfaces 🧩

This document explains the **types and interfaces** used in `lin-pulsar-core`.

---

## 🔌 LinPulsarZoneEntry

Represents an entry that can be rendered inside a zone. The model is a discriminated union: an entry provides its
component either through a federated plugin identifier (`FederatedLinPulsarZoneEntry`) or through a component name
(`ComponentLinPulsarZoneEntry`).

```ts
export interface BaseLinPulsarZoneEntry {
  /** Props forwarded to the rendered component */
  props?: Record<string, unknown>;
}

export interface FederatedLinPulsarZoneEntry extends BaseLinPulsarZoneEntry {
  type: 'federated';

  /** Path or identifier of the plugin module */
  plugin: string;
}

export interface ComponentLinPulsarZoneEntry extends BaseLinPulsarZoneEntry {
  type: 'component';

  /** Name of the component to render */
  component: string;
}

export type LinPulsarZoneEntry =
  FederatedLinPulsarZoneEntry | ComponentLinPulsarZoneEntry;
```

**Usage:**

- Entries are created by the `LinPulsar Zone Store` helpers (`registerPlugin`, `registerPluginOnce`,
  `registerComponent`); consumers never build them manually.
- The `type` discriminant removes any ambiguity on the available properties and keeps the model extensible for
  future entry kinds.

### LinPulsarZoneResolvedEntry

A zone entry once resolved for rendering by `LinPulsarZoneRenderer`: the component to render and its props.

```ts
export interface LinPulsarZoneResolvedEntry {
  /** Async component loaded from the federated plugin, or component resolved from its name. */
  component: Component | string;

  /** Optional props passed to the rendered component. */
  props?: Record<string, unknown>;
}
```

- Unresolved component names are kept as strings, so that Vue resolves them globally.
- Only useful to code rendering zones itself: `LinPulsarZoneRenderer` already performs this resolution.

---

## 🧑‍💼 LinPulsarUser

Represents an authenticated user in the system.

```ts
export interface LinPulsarUser {
  /** Username of the user (mapped from the OIDC `sub` claim). */
  username: string;

  /** Email address of the user. */
  email: string;

  /** Full name of the user (mapped from the OIDC `name` claim). */
  fullName: string;

  /** The list of roles assigned to the user. */
  roles: string[];
}
```

**Usage:**

- Populated by the host application in `useLinPulsarUserStore`, from the claims of an OIDC ID token.
- Consumed by components that need to display or check user identity and roles.

Authentication is the responsibility of the host application: lin-pulsar-core performs no login, logout or token
handling. Once the user is authenticated, the host fills the store through `useLinPulsarUserStore()`, and remotes read
the user from the same store, along with its `isAuthenticated` flag (set to `true` once the user claims are loaded):

```ts
import { storeToRefs } from 'pinia';
import { useLinPulsarUserStore } from '@linagora/lin-pulsar-core';

// Host side, after a successful OIDC login (claims of the ID token)
useLinPulsarUserStore().setUserFromClaims(user.profile);

// Remote side
const { user, isAuthenticated } = storeToRefs(useLinPulsarUserStore());
```

`setUserFromClaims()` maps the `sub`, `email`, `name` and `roles` claims to `username`, `email`, `fullName` and
`roles`.

---

## 📦 Modules types

### FederatedModule

Defines the structure of a remote module loaded via Module Federation.

```ts
/**
 * ESM namespace object returned when loading a remote module through
 * Module Federation (for example via `loadRemote`).
 *
 * In a Vite + native ESM environment, federated modules are not auto-unwrapped:
 * the effective export is exposed on the `default` property of the namespace.
 * @template T Type of the value exported as `default` by the federated module.
 */
export interface FederatedModule<T> {
  /**
   * Default export of the federated module.
   *
   * This commonly represents a concrete runtime value such as a lifecycle
   * instance, service, or class instance, but may also be a function, class,
   * or plain object depending on the remote’s contract.
   */
  default: T;
}
```

**Usage:**

- Used internally by [`loadAsyncComponent`](./services.md#loadasynccomponent) to ensure type safety when loading
  federated components.

**Remote modules must export a default component:**

```vue
<!-- ✅ Correct - .vue file -->
<template>
  <div>My Component</div>
</template>

<script setup lang="ts">
// Default export is automatic
</script>
```

```typescript
// ❌ Wrong - named export only
export const MyComponent = defineComponent({/* ... */});

// ✅ Correct - default export
export default defineComponent({/* ... */});
```

### LocalComponent

A value registrable under a local name through the `localComponents` initialization option: a Vue component, or any
module element referenced from a module configuration (lifecycle implementation, route definitions, i18n messages).

```ts
export type LocalComponent = Component | object;
```

### LinPulsarRemoteConfig

A Module Federation remote, as declared in the `remotes` entry of the application `config.json`.

```ts
export interface LinPulsarRemoteConfig {
  /** Unique name of the remote (e.g. `linPulsar`). */
  name: string;

  /** URL of the remote manifest (e.g. `http://localhost:5001/mf-manifest.json`). */
  entry: string;
}
```

### LinPulsarModuleFederationInitOptions

Options of `linPulsarModuleFederation.init()`, described in
[Host Responsibilities](./module-lifecycle.md#host-responsibilities).

```ts
export interface LinPulsarModuleFederationInitOptions {
  /** Host application router, used to register the routes exposed by the modules. */
  router: Router;

  /** Module Federation remotes to register before loading any module. */
  remotes: LinPulsarRemoteConfig[];

  /** URLs of the module configuration files to load. */
  modules: string[];

  /** URLs of additional zone definition files to load. */
  extraZones?: string[];

  /** Host-local components available to zones and module configurations, indexed by name. */
  localComponents?: Record<string, LocalComponent>;

  /** Host-side hooks executed after the default behavior of their phase. */
  hooks?: Partial<
    Record<ModuleLifecyclePhase, LinPulsarModuleFederationPhaseRunner>
  >;
}

export type LinPulsarModuleFederationPhaseRunner = (
  module: RemoteModule<unknown>,
  config: ModuleHostConfig<unknown>,
  router: Router
) => Promise<ModuleLifecycleResult>;
```

### ModuleComponentRef

Reference to a module element (lifecycle, routes, i18n messages or component) in a module configuration.

```ts
export type ModuleComponentRef = string | LinPulsarZoneEntry;
```

A plain string references an element exposed through Module Federation (e.g. `linPulsar/PageLifecycle`), as does a
`FederatedLinPulsarZoneEntry`:

```json
{ "type": "federated", "plugin": "linPulsar/PageLifecycle" }
```

A `ComponentLinPulsarZoneEntry` references an element registered locally through the `localComponents` initialization
option, without any Module Federation loading:

```json
{ "type": "component", "component": "timeEntriesLifecycle" }
```

A component entry referencing a name that is not registered produces an error. The `props` field of an entry is not
used for module element references.

### ModuleHostConfig

Defines the configuration provided to a remote module by the host application.

```ts
/**
 * Module configuration in the host (modules/<ModuleName>.json).
 *
 * This is what the host provides to each module during the configuration phase.
 * The host reads this from `modules/<ModuleName>.json` files.
 * @template T Type of the module-specific options
 */
export interface ModuleHostConfig<T> {
  /**
   * Unique identifier for this instance of the module.
   * Typically used to differentiate multiple instances of the same module within the host.
   */
  instanceId: string;

  /**
   * Module Federation remote name (must match the `name` of an entry of the `remotes` configuration).
   *
   * This is the name used to load the remote module via Module Federation.
   */
  remoteName: string;

  /**
   * Reference to the element used to load the lifecycle implementation.
   *
   * The referenced element should implement the module lifecycle hooks
   * contract and is typically loaded during the module initialization phase.
   */
  lifecycleRemote: ModuleComponentRef;

  /**
   * Reference to the element used to load the route definitions.
   *
   * The referenced element should hold the routes contributed by the module so
   * they can be registered by the host application.
   */
  routesRemote: ModuleComponentRef;

  /**
   * Reference to the element used to load internationalization resources.
   *
   * The referenced element should hold the module translations, locale
   * definitions, or i18n registration logic consumed by the host application.
   */
  i18nRemote: ModuleComponentRef;

  /**
   * Name of the entity used in the host configuration.
   * Allows the module to retrieve associated attributes and other information for this entity.
   */
  entity: string;

  /**
   * Base URL for the module's API endpoints.
   * All API requests from the module should be prefixed with this endpoint.
   */
  apiEndpoint: string;

  /**
   * Base path (default route) for the module in the host application.
   * Used to mount the module at a specific route.
   */
  basePath: string;

  /**
   * Definitions of the zones where the module will render exposed elements in other modules.
   *
   * Zones should always be set (empty array [] when no zones).
   */
  zones: ModuleZoneDefinition[];

  /**
   * Module-specific options provided in the host configuration.
   * These options are passed to the module during configuration.
   */
  options: T;
}
```

**Usage:**

- Passed to remote modules during their lifecycle `configure` phase.
- The `zones` field allows modules to declare UI elements that should be rendered in zones exposed by other modules. It
  can be an empty array if no zones are needed.

### RemoteModule

Defines the structure of a remote module loaded via Module Federation.

```ts
/**
 * Remote module interface.
 *
 * All remote modules exposed via Module Federation should implement this interface.
 * This is the contract between the host application and remote modules.
 * @template T Type of the module-specific options provided in the host configuration.
 */
export interface RemoteModule<T> extends ModuleLifecycleHooks<T> {
  /**
   * Unique identifier for the module.
   *
   * Should match the ID in the module configuration.
   */
  id: string;

  /**
   * Human-readable name of the module.
   */
  name: string;

  /**
   * Version of the module.
   *
   * Should follow semantic versioning (semver).
   */
  version: string;

  /**
   * Optional description of the module.
   *
   * Provide a brief description of what the module does.
   */
  description?: string;
}
```

**Usage:**

- Used to define the contract for remote modules loaded into the host application.

### ModuleZoneDefinition

Defines a UI zone injection, allowing a module to declare that an element should be rendered inside a named zone
exposed by another module. It is a union of two variants: the element is either exposed through module federation
(`FederatedModuleZoneDefinition`) or referenced by component name (`ComponentModuleZoneDefinition`).

```ts
/**
 * Fields shared by all UI zone injection variants.
 * @template T Props type for the injected element.
 */
export interface BaseModuleZoneDefinition<T = Record<string, unknown>> {
  /**
   * Name of the target zone exposed by another module where the element will be rendered.
   */
  zone: string;
  /**
   * Optional props to pass to the exposed element rendered in this zone.
   * The module can define the structure of these props as needed.
   */
  props?: T;
}

export interface FederatedModuleZoneDefinition<
  T = Record<string, unknown>,
> extends BaseModuleZoneDefinition<T> {
  /**
   * Name of the exposed element to render in the zone.
   */
  plugin: string;
  /** Never set on this variant, which is identified by its `plugin` field. */
  component?: never;
}

export interface ComponentModuleZoneDefinition<
  T = Record<string, unknown>,
> extends BaseModuleZoneDefinition<T> {
  /**
   * Name of the component to render in the zone.
   */
  component: string;
  /** Never set on this variant, which is identified by its `component` field. */
  plugin?: never;
}

export type ModuleZoneDefinition<T = Record<string, unknown>> =
  FederatedModuleZoneDefinition<T> | ComponentModuleZoneDefinition<T>;
```

**Usage:**

- Declared in `modules/<ModuleName>.json` configuration files in the `zones` array.
- Allows modules to inject UI elements into predefined zones exposed by other modules.
- The `zone` field identifies the target zone (e.g., "entity-details", "sidebar").
- The `plugin` field specifies which federated element to render.
- The `component` field specifies which component to render by name, and requires that name to have been made
  available to zones through `registerLocalComponent`.
- `plugin` and `component` are mutually exclusive, and determine which variant an entry is.
- The `props` field is optional and allows passing configuration to the element.

**Example:**

```json
{
  "instanceId": "moduleComments-instance",
  "remoteName": "moduleComments",
  "entity": "comments",
  "apiEndpoint": "/api/comments",
  "lifecycleRemote": "linPulsar/PageLifecycle",
  "routesRemote": "linPulsar/PageRoutes",
  "i18nRemote": "linPulsar/EmptyI18n",
  "basePath": "/comments",
  "zones": [
    {
      "zone": "entity-details",
      "plugin": "moduleComments/CommentsCardPlugin",
      "props": {
        "showAvatar": true
      }
    }
  ],
  "options": {}
}
```

---

## 🏢 Entity Configuration Types

Types for entity and route metadata returned by the backend API.

### LinPulsarAttributeConfiguration

Describes a single attribute of an entity. This is a **generic interface** where the `inputSettings` type can be
customized by consumers.

#### Supported Input Types

| Input Type    | Description                             |
| ------------- | --------------------------------------- |
| `Text`        | Text-based inputs (QInput)              |
| `Number`      | Numeric inputs (QInput number)          |
| `Boolean`     | Toggle/checkbox (QToggle)               |
| `Date`        | Date picker (QDate)                     |
| `List`        | Select with static values (QSelect)     |
| `DynamicList` | Select with dynamic values (QSelect)    |
| `TextArea`    | Multi-line text input (QInput textarea) |
| `Email`       | Email input (QInput email)              |
| `File`        | File picker (QFile)                     |
| `Tree`        | Tree node picker (QTree)                |

> **Note:** The available input types depend on the inputs defined in the `linPulsar` catalog. Custom remotes
> can extend these types.

#### Generic Parameter

The interface accepts a generic parameter `T` for `inputSettings`, defaulting to `Record<string, unknown>`. This allows
consumers to define their own settings structure without requiring lin-pulsar-core updates.

```ts
interface LinPulsarAttributeConfiguration<T = Record<string, unknown>> {
  name: string;
  type: string;
  required: boolean;
  hasValidations: boolean;
  input:
    | 'Text'
    | 'Number'
    | 'Boolean'
    | 'Date'
    | 'List'
    | 'DynamicList'
    | 'TextArea'
    | 'Email'
    | 'File'
    | 'Tree';
  inputSettings: T;
}
```

#### Example Usage

```ts
import type { LinPulsarAttributeConfiguration } from '@linagora/lin-pulsar-core';

// Basic usage with default inputSettings
const attr: LinPulsarAttributeConfiguration = {
  name: 'age',
  type: 'Integer',
  required: true,
  hasValidations: true,
  input: 'Number',
  inputSettings: { min: 0, max: 150 },
};

// Usage with custom inputSettings type
interface MyNumberSettings {
  min?: number;
  max?: number;
  step?: number;
}

const typedAttr: LinPulsarAttributeConfiguration<MyNumberSettings> = {
  name: 'salary',
  type: 'Integer',
  required: false,
  hasValidations: true,
  input: 'Number',
  inputSettings: { min: 0, step: 1000 },
};

// Date input example
const dateAttr: LinPulsarAttributeConfiguration = {
  name: 'birthDate',
  type: 'Date',
  required: true,
  hasValidations: false,
  input: 'Date',
  inputSettings: { format: 'YYYY-MM-DD' },
};
```

### ValidatorName

Represents the available validator names that can be used with `useQuasarRules`.

Most validators read their parameters from the `inputSettings` property of `LinPulsarAttributeConfiguration`. `'email'` is
the exception: it takes no parameter and is applied directly.

```ts
export type ValidatorName =
  | 'email'
  | 'min'
  | 'max'
  | 'minLength'
  | 'maxLength'
  | 'pattern'
  | 'unique'
  | 'maxFileSize'
  | 'allowedExtensions';
```

**Usage:**

- Used with [`useQuasarRules`](./field-validation.md#usequasarrules) to specify which validators to apply
- Each validator reads its parameter from the corresponding property in `inputSettings`

**Example:**

```ts
const rules = useQuasarRules('myInstance', attributeConfig, [
  'min',
  'maxLength',
]);
// Applies min and maxLength validators if configured in inputSettings
```

### LinPulsarEntityConfiguration

Represents an entity with its name and list of attributes. Returned by `/metadata/entities` and
`/metadata/entities/:entity`.

### LinPulsarApiEndpointConfiguration

Represents a REST route (method, path, entity, variables). Returned by `/metadata/routes`.

---

## 🌐 linOpenFactory API Response Types

Types representing standard response structures returned by linOpenFactory backend APIs.

### LinPulsarApiErrorResponseBody

Represents the structure of an error response body returned by linOpenFactory APIs.

This structure is used across all linOpenFactory API error responses to provide consistent error handling with internationalized
messages.

```ts
export interface LinPulsarApiErrorResponseBody {
  /**
   * The internationalized error message.
   */
  error: string;

  /**
   * The key of this internationalized message.
   */
  errorKey: string;

  /**
   * The context map associated with this message. The map contains parameters or additional
   * information for the message.
   */
  errorContext: Record<string, unknown>;

  /**
   * The HTTP status code associated with the error.
   */
  status: number;

  /**
   * The timestamp indicating when the error occurred.
   */
  timestamp: number;
}
```

**Usage:**

- Used by [`useFieldValidation`](./field-validation.md#51-backend-validation) to extract error messages from backend
  validation responses
- Returned by all linOpenFactory API endpoints for HTTP errors
- The `error` field contains the already-internationalized error message ready for display
- The `errorKey` and `errorContext` can be used for custom error handling if needed

**Example:**

```ts
import type { LinPulsarApiErrorResponseBody } from '@linagora/lin-pulsar-core';
import axios from 'axios';

try {
  await someApiCall();
} catch (error) {
  if (axios.isAxiosError(error) && error.response?.status === 400) {
    const errorBody = error.response.data as LinPulsarApiErrorResponseBody;
    console.error(errorBody.error); // Display internationalized error message
    console.log(errorBody.errorKey); // e.g., "validation.email.invalid"
    console.log(errorBody.errorContext); // e.g., { email: "test@" }
  }
}
```

---

## 🛣️ LinPulsarRoute & LinPulsarRoutes

Defines the structure for application routes, supporting recursive nesting for multi-level routes.

```ts
export type LinPulsarRoutes = LinPulsarRoute[];

export interface LinPulsarRoute {
  /** Optional unique route name, used by Vue Router for deterministic override. */
  name?: string;
  /** Absolute or nested route path (e.g. "/admin" or "settings"). */
  path: string;
  /**
   * Component reference: a remote component name resolved through Module Federation (e.g. "remoteA/ComponentX"), or
   * a zone entry referencing a federated or locally registered component. A string may be a Nunjucks template; when
   * the template is a single expression resolving to a zone entry in the host configuration (e.g.
   * "{{ config.options.page }}"), the entry itself is used as the reference.
   */
  component: ModuleComponentRef;
  /** Optional list of child routes for nested routing. */
  children?: LinPulsarRoutes;
  /** Optional metadata associated with the route. */
  meta?: Record<string, unknown>;
}
```

**Usage:**

- Used to describe both top-level and nested routes in the application.
- Enables recursive route definitions for complex navigation structures.
- The optional `name` field enables deterministic route overriding: if two routes share the same name, the latest one
  replaces the previous one via Vue Router's `addRoute` mechanism.

---

## 📄 Pagination & Page Types

Utility types used to represent **paginated API responses**, **standard pagination**, and **Quasar QTable events**.
Defined in `src/types/page.ts`.

---

### Page<T>

Represents a paginated result returned by the backend API.

This structure closely follows **Spring Data’s `Page<T>`** model.

```ts
export interface Page<T> {
  /** The content (list of items) on the current page. */
  content: T[];

  /** Pagination information about the current request. */
  pageable: {
    /** Sorting details applied on this pageable request. */
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };

    /** Zero-based page index. */
    pageNumber: number;

    /** Size of the page requested. */
    pageSize: number;

    /** Offset of the first item in this page relative to the entire data set. */
    offset: number;

    /** Whether the page is paged. */
    paged: boolean;

    /** Whether the page is unpaged. */
    unpaged: boolean;
  };

  /** Total number of pages available. */
  totalPages: number;

  /** Total number of elements across all pages. */
  totalElements: number;

  /** Whether this page is the last page. */
  last: boolean;

  /** Whether this page is the first page. */
  first: boolean;

  /** Overall sorting information (duplicate of pageable.sort). */
  sort: {
    sorted: boolean;
    unsorted: boolean;
    empty: boolean;
  };

  /** Number of elements on this page. */
  numberOfElements: number;

  /** Size of the page requested (duplicate of pageable.pageSize). */
  size: number;

  /** Current page number (zero-based). */
  number: number;

  /** Whether the current page content is empty. */
  empty: boolean;
}
```

**Usage:**

- Returned by API services
- Stored in Pinia stores
- Consumed by data tables and lists

---

### Pagination

Standard pagination model used when querying the backend.

```ts
export interface Pagination {
  /** Current page number (0-based). */
  page: number;

  /** Page size (number of items per page). */
  size: number;

  /** Ordering, as a single `'<column>,<direction>'` string (e.g. `'name,desc'`). */
  sort?: string;
}
```

**Notes:**

- `sort` follows the Spring Data convention and combines the column and the direction in one value.
  There is no separate `direction` field.

---

### QTableRequestEvent

Payload emitted by Quasar `QTable` when using **server-side pagination**.

```ts
export interface QTableRequestEvent {
  /** Pagination sent by the QTable */
  pagination: QuasarPagination;

  /** Global filter string */
  filter?: string;

  /** Full QTable props */
  props?: Record<string, unknown>;
}
```

---

### QuasarPagination

Pagination structure used internally by Quasar `QTable`.

```ts
export interface QuasarPagination {
  /** Current page number (1-based). */
  page: number;

  /** Number of rows displayed per page. */
  rowsPerPage: number;

  /** Total number of rows (optional). */
  rowsNumber?: number;

  /** Column used for sorting, or `null` when no sort is active. */
  sortBy: string | null;

  /** Whether sorting is descending (true) or ascending (false). */
  descending: boolean;
}
```

**Notes:**

- Page indexing is **1-based**, unlike backend pagination.
- `sortBy` and `descending` are **required**; an inactive sort is `sortBy: null`, not `undefined`.
- Usually converted to `Pagination` before API requests.

---

### QueryFilter

Represents a flexible set of query parameters used to filter API requests.

```ts
export interface QueryFilter {
  [key: string]: string | number | boolean | undefined;
}
```

**Usage:**

- Passed as query params to API services
- Enables dynamic filtering without strong typing per endpoint

---

## 🔄 Module lifecycle types

Types related to module lifecycle management.

### ModuleLifecyclePhase

Defines the sequence of initialization steps for remote modules. Each phase is executed in order for all modules before
moving to the next phase.

```ts
export enum ModuleLifecyclePhase {
  /**
   * Initial setup phase - module is being loaded.
   *
   * Use this phase to validate dependencies and prepare the module.
   */
  SETUP = 'setup',

  /**
   * Configuration phase - module receives configuration.
   *
   * Use this phase to receive and validate the host configuration.
   */
  CONFIGURE = 'configure',

  /**
   * Initialization phase - module initializes its core features.
   *
   * Use this phase to register stores and initialize resources.
   */
  INITIALIZE = 'initialize',

  /**
   * Ready phase - module is ready to be used.
   *
   * Use this phase to perform final checks and emit ready state.
   */
  READY = 'ready',

  /**
   * Post-initialization phase - final setup after all modules are ready.
   *
   * Use this phase for cross-module integrations and final setup.
   */
  POST_INIT = 'postInit',
}
```

**Usage:**

- Used internally by the module loader to manage the lifecycle of remote modules.

### ModuleLifecycleResult

Result of a lifecycle phase execution. Modules should return this from their lifecycle hooks to indicate success or
failure of the phase.

```ts
export interface ModuleLifecycleResult {
  /**
   * Whether the phase completed successfully.
   *
   * If false, the module still continues through the remaining phases:
   * the host does not use the result.
   */
  success: boolean;

  /**
   * Error message if the phase failed.
   *
   * Only present when success is false.
   */
  error?: string;

  /**
   * Additional metadata from the phase.
   *
   * Use this to provide debugging information or statistics.
   */
  metadata?: Record<string, unknown>;
}
```

**Usage:**

- Used as the return type for module lifecycle hooks to indicate phase outcomes.

### ModuleLifecycleHooks

Remote modules should implement these hooks to participate in the lifecycle. All hooks are optional - implement only
what your module needs.

```ts
/**
 * Module lifecycle hooks interface.
 *
 * Remote modules should implement these hooks to participate in the lifecycle.
 * All hooks are optional - implement only what your module needs.
 * @template T Type of the module-specific options.
 */
export interface ModuleLifecycleHooks<T> {
  /**
   * Called when the module is first loaded.
   *
   * Use this to prepare the module for initialization and validate
   * that all required dependencies are available.
   * @returns Promise resolving to the lifecycle result.
   */
  setup(): Promise<ModuleLifecycleResult>;

  /**
   * Called to configure the module with application-specific settings.
   *
   * Use this to receive and validate the host configuration for your module.
   * This is where you should check that all required configuration is present.
   * @param config - Module-specific configuration from host (from modules/<ModuleName>.json).
   *                 Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  configure(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;

  /**
   * Called to initialize the module's core functionality.
   *
   * Use this to initialize any resources
   * your module needs to function.
   * @param config - Module-specific configuration from host (from modules/<ModuleName>.json).
   * Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  initialize(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;

  /**
   * Called when the module is ready to be used.
   *
   * Use this to perform final checks and emit ready state.
   * At this point, all other modules have completed initialization.
   * @param config - Module-specific configuration from host (from modules/<ModuleName>.json).
   * Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  ready(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;

  /**
   * Called after all modules have been initialized.
   *
   * Use this for cross-module integrations and final setup that requires
   * all modules to be ready.
   * @param config - Module-specific configuration from host (from modules/<ModuleName>.json).
   * Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  postInit(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;
}
```

**Usage:**

- Remote modules should implement these hooks to participate in the lifecycle management.

### ModulePageLifecycleHostOptions

Host-provided options understood by the default page module lifecycle returned by
[`createModulePageLifecycle`](./module-lifecycle.md#ready-made-page-module-lifecycle). They are read from the `options`
of the module host configuration (`ModuleHostConfig<T>`).

```ts
export interface ModulePageLifecycleHostOptions {
  /**
   * Whether the module registers an entry in the host application's main
   * navigation menu during the post-initialization phase.
   */
  addNavigationMenu?: boolean;
}
```

**Usage:**

- When `addNavigationMenu` is `true`, `postInit` adds a main navigation menu item whose `id` is the module instance
  identifier, whose `labelKey` is `<instanceId>.NavigationMenu.label` and whose `path` is the module base path.
- Module-specific option types extend this interface, so typed hooks keep access to `addNavigationMenu` (see the
  example below).

### ModulePageLifecycleOptions

Creation options of the `createModulePageLifecycle` factory.

```ts
export interface ModulePageLifecycleOptions<
  T extends ModulePageLifecycleHostOptions = ModulePageLifecycleHostOptions,
> {
  /** Unique identifier for the module. Must match the ID in the host configuration. */
  id: string;

  /** Human-readable name of the module. */
  name: string;

  /** Version of the module (semantic versioning). */
  version: string;

  /** Optional description of what the module does. */
  description?: string;

  /** Zone component names registered once in the dialog zone during `postInit` (e.g. `myRemote/ConfirmationDialog`). */
  dialogComponents?: string[];

  /** Zone of the host application layout where the dialog components are registered (e.g. `base-layout.dialogComponent`). */
  dialogZone: string;

  /** Optional per-phase lifecycle overrides. An overridden phase fully replaces the default behavior of that phase. */
  hooks?: Partial<ModuleLifecycleHooks<T>>;
}
```

**Usage:**

- `dialogZone` is required, even when `dialogComponents` is empty.
- A dialog component already registered in `dialogZone` is not registered a second time.
- Overriding `postInit` through `hooks` drops the default behavior: no navigation menu entry and no dialog component
  registration.
- `T` types `config.options` in the hooks.

**Example:**

```ts
import {
  createModulePageLifecycle,
  type ModulePageLifecycleHostOptions,
} from '@linagora/lin-pulsar-core';

interface UserPageOptions extends ModulePageLifecycleHostOptions {
  entity: string;
}

export default createModulePageLifecycle<UserPageOptions>({
  id: 'user-page',
  name: 'User page',
  version: '1.0.0',
  dialogZone: 'base-layout.dialogComponent',
  dialogComponents: ['linPulsar/ConfirmationDialog'],
  hooks: {
    async configure(config) {
      if (!config.options?.entity) {
        return { success: false, error: 'Missing entity option' };
      }
      return { success: true };
    },
  },
});
```

---

## 🎨 Ui design types

### UiDesignValue

See description in [Ui design documentation](./ui-design.md#5-typescript-support).

### UiDesignNamespace

See description in [Ui design documentation](./ui-design.md#5-typescript-support).

### UiDesign

See description in [Ui design documentation](./ui-design.md#5-typescript-support).

### QComponentName

See description in [Ui design documentation](./ui-design.md#5-typescript-support).

### LinPulsarQComponentProps

See description in [Ui design documentation](./ui-design.md#5-typescript-support).

### LinPulsarHtmlAttrs

See description in [Ui design documentation](./ui-design.md#32-html-attributes-class-and-style).

### LinPulsarQBtnProps

See description in [Ui design documentation](./ui-design.md#q-btn).

### LinPulsarQTabsProps

See description in [Ui design documentation](./ui-design.md#q-tabs).

### LinPulsarQRouteTabProps

See description in [Ui design documentation](./ui-design.md#q-route-tab).

### LinPulsarQHeaderProps

See description in [Ui design documentation](./ui-design.md#q-header).

### LinPulsarQToolbarProps

See description in [Ui design documentation](./ui-design.md#q-toolbar).

### LinPulsarQToolbarTitleProps

See description in [Ui design documentation](./ui-design.md#q-toolbar-title).

### LinPulsarQAvatarProps

See description in [Ui design documentation](./ui-design.md#q-avatar).

### LinPulsarQBadgeProps

See description in [Ui design documentation](./ui-design.md#q-badge).

### LinPulsarQTableProps

See description in [Ui design documentation](./ui-design.md#q-table).

### LinPulsarQCardProps

See description in [Ui design documentation](./ui-design.md#q-card).

### LinPulsarQCardActionsProps

See description in [Ui design documentation](./ui-design.md#q-card-actions).

### LinPulsarQCardSectionProps

See description in [Ui design documentation](./ui-design.md#q-card-section).

### LinPulsarQCheckboxProps

See description in [Ui design documentation](./ui-design.md#q-checkbox).

### LinPulsarQFieldProps

See description in [Ui design documentation](./ui-design.md#q-field).

### LinPulsarQIconProps

See description in [Ui design documentation](./ui-design.md#q-icon).

### LinPulsarQChipProps

See description in [Ui design documentation](./ui-design.md#q-chip).

### LinPulsarQToggleProps

See description in [Ui design documentation](./ui-design.md#q-toggle).

### LinPulsarQInputProps

See description in [Ui design documentation](./ui-design.md#q-input).

### LinPulsarQDateProps

See description in [Ui design documentation](./ui-design.md#q-date).

### LinPulsarQImgProps

See description in [Ui design documentation](./ui-design.md#q-img).

### LinPulsarQFileProps

See description in [Ui design documentation](./ui-design.md#q-file).

### LinPulsarQFormProps

See description in [Ui design documentation](./ui-design.md#q-form).

### LinPulsarQSelectProps

See description in [Ui design documentation](./ui-design.md#q-select).

### LinPulsarQDialogProps

See description in [Ui design documentation](./ui-design.md#q-dialog).

### LinPulsarQSpinnerProps

See description in [Ui design documentation](./ui-design.md#q-spinner).

### LinPulsarQBtnDropdownProps

See description in [Ui design documentation](./ui-design.md#q-btn-dropdown).

### LinPulsarQLayoutProps

See description in [Ui design documentation](./ui-design.md#q-layout).

### LinPulsarQListProps

See description in [Ui design documentation](./ui-design.md#q-list).

### LinPulsarQItemProps

See description in [Ui design documentation](./ui-design.md#q-item).

### LinPulsarQItemSectionProps

See description in [Ui design documentation](./ui-design.md#q-item-section).

### LinPulsarQItemLabelProps

See description in [Ui design documentation](./ui-design.md#q-item-label).

### LinPulsarQBannerProps

See description in [Ui design documentation](./ui-design.md#q-banner).

### LinPulsarQMenuProps

See description in [Ui design documentation](./ui-design.md#q-menu).

### LinPulsarQTreeProps

See description in [Ui design documentation](./ui-design.md#q-tree).

### LinPulsarQSplitterProps

See description in [Ui design documentation](./ui-design.md#q-splitter).

### LinPulsarQSeparatorProps

See description in [Ui design documentation](./ui-design.md#q-separator).

### LinPulsarQOptionGroupProps

See description in [Ui design documentation](./ui-design.md#q-option-group).

### LinPulsarQScrollAreaProps

See description in [Ui design documentation](./ui-design.md#q-scroll-area).

### ThirdPartyComponentName

See description in [Ui design documentation](./ui-design.md#5-typescript-support).

### LinPulsarDraggableProps

See description in [Ui design documentation](./ui-design.md#draggable).

---

## 🌳 Tree types

Types used to represent tree structures in LinPulsar components.
Defined in `src/types/linPulsarTree.ts`.

### TreeNodeType

Describes a type of node that can appear in the tree, along with the default actions for that type.

```ts
export type TreeNodeType = {
  /** Unique identifier for the node type. */
  type: string;

  /** Default actions for nodes of this type. */
  actions?: string[];

  /** Whether the nodes of this type can be selected. Defaults to true. */
  selectable?: boolean;
};
```

**Example:**

```ts
import type { TreeNodeType } from '@linagora/lin-pulsar-core';

const nodeTypes: TreeNodeType[] = [
  { type: 'root', selectable: false },
  { type: 'group', actions: ['import', 'export'] },
  { type: 'user', actions: ['view', 'edit', 'delete'] },
];
```

---

### TreeNode

Represents a node in the tree structure. Nodes are recursive — each node can contain child nodes.

```ts
export type TreeNode<T> = {
  /** The type of the node, used to differentiate node categories. */
  type: string;

  /** Unique key identifying the node within the tree. */
  key: string;

  /** The value associated with the node. */
  value: T;

  /** Child nodes nested under this node. */
  nodes: TreeNode<T>[];

  /** Additional actions. */
  extraActions?: string[];
};
```

**Example:**

```ts
import type { TreeNode } from '@linagora/lin-pulsar-core';

const nodes: TreeNode<string>[] = [
  {
    type: 'group',
    key: 'group-1',
    value: 'Engineering',
    extraActions: [],
    nodes: [
      {
        type: 'user',
        key: 'user-1',
        value: 'Alice',
        extraActions: ['import', 'export'],
        nodes: [],
      },
    ],
  },
];
```

---

## 🔽 Dropdown types

Types describing the contract of the federated `DropdownButton` component, exposed by
the `linPulsar` catalog. They are kept in lin-pulsar-core so any host application can build typed menus and listen to
typed click payloads without depending on the catalog internals.

Defined in `src/types/dropdownButton.ts`.

### MenuItem

Shape of a single entry passed to the dropdown.

```ts
export interface MenuItem<TKey extends string = string> {
  /** Unique identifier of the menu item, used as an i18n key and as the base of the emitted action key. */
  key: TKey;

  /** Whether the menu item triggers a click event when activated. */
  clickable: boolean;

  /** Optional list of child keys rendered as a sub-menu. */
  children?: TKey[];
}
```

**Generic parameter:** `TKey` defaults to `string` for open-ended menus and can be narrowed to a finite union (typically
derived from a `const`-tuple via `typeof X[number]`) so the entry key and any nested children share the same identifier
domain.

**Example:**

```ts
import type { MenuItem } from '@linagora/lin-pulsar-core';

const ACCOUNT_ACTIONS = [
  'activation',
  'suspension',
  'deactivation',
  'immediate',
  'scheduled',
] as const;
type AccountActionKey = (typeof ACCOUNT_ACTIONS)[number];

const items: MenuItem<AccountActionKey>[] = [
  {
    key: 'activation',
    clickable: true,
    children: ['immediate', 'scheduled'],
  },
];
```

---

### DropdownClickPayload

Payload emitted by the dropdown when the user activates an entry.

```ts
export interface DropdownClickPayload<TKey extends string = string> {
  /** Dotted action key emitted by the dropdown. */
  key: TKey;
}
```

**Format of `key`:**

- For a root entry, `key` equals the entry's own key (e.g. `'edit'`).
- For a child entry, `key` is the dot-separated composite of the parent key and the child key (e.g. `'export.csv'`).

**Generic parameter:** `TKey` lets consumers strongly type the keys they expect to receive. When left to the default
`string`, the payload accepts any key emitted by the dropdown.

**Example:**

```ts
import type { DropdownClickPayload } from '@linagora/lin-pulsar-core';

type AccountAction = 'activation.immediate' | 'activation.scheduled';

function onClick(payload: DropdownClickPayload<AccountAction>): void {
  // payload.key is narrowed to 'activation.immediate' | 'activation.scheduled'
}
```

---

## 🎯 Formatter types

Types describing how a raw value is formatted before display. Because field and column definitions must survive JSON
serialization and a Module Federation boundary, a formatter is designated by **name**, never by function. The name is
resolved at render time by the [`useValueFormatter`](./value-formatter.md) composable.

Defined in `src/types/formatter.ts`.

### ValueFormatter

Contract every formatter implementation must satisfy.

```ts
export type ValueFormatter = (
  value: unknown,
  options?: Record<string, unknown>
) => unknown;
```

**Usage:**

- Internal to the library — this type is exported from `src/types/formatter.ts` but is **not** re-exported from the
  package entry point, since consumers cannot register formatters.
- A formatter must return the value **untouched** rather than throwing when it cannot handle the given input. That
  contract is what allows a malformed configuration to degrade the display instead of breaking the page.

### FormatterConfiguration

Formatting properties mixed into the field and column definitions of generic components.

```ts
export interface FormatterConfiguration {
  /** Formatter applied to the value before display. An unknown name displays the raw value. */
  formatter?: string;

  /** Options forwarded to the formatter. `toDate` requires a `formatKey` string. */
  formatOptions?: Record<string, unknown>;
}
```

**Usage:**

- Extended by any configuration type describing a displayable field or column.
- Both fields are optional: a definition without `formatter` displays the raw value.
- `formatter` is typed `string`, not a union of the registered names: an unregistered name is **not** rejected at
  compile time and surfaces only at runtime, as the raw value being displayed. The registry itself is closed — see
  [Adding a formatter](./value-formatter.md#adding-a-formatter).
- `formatOptions` is intentionally untyped (`Record<string, unknown>`), since the expected keys depend on the
  formatter that is requested. The per-formatter requirements are documented in
  [Available formatters](./value-formatter.md#available-formatters).

**Example:**

```ts
import type { FormatterConfiguration } from '@linagora/lin-pulsar-core';

interface ColumnDefinition extends FormatterConfiguration {
  name: string;
  label: string;
}

const column: ColumnDefinition = {
  name: 'createdAt',
  label: 'columns.createdAt',
  formatter: 'toDate',
  formatOptions: { formatKey: 'application.dateFormat' },
};
```

---

## 🖼️ LinPulsar Ui Store types

### NavigationMenuItem

Describes a single item in the main navigation menu.

```ts
export interface NavigationMenuItem {
  /** Unique identifier of the navigation item. */
  id: string;
  /** I18n key used to resolve the label of the navigation item. */
  labelKey: string;
  /** Path/route of the navigation item. */
  path: string;
}
```

---

## 📣 UI event types

Types of the events carried by `uiEventSubject`, the shared UI event bus described in
[UI Event Service](./services.md#-ui-event-service).

### UiEvent

Event emitted on, and received from, `uiEventSubject`.

```ts
export interface UiEvent {
  /** Event key. */
  key: string;

  /** Event data. */
  data: unknown;
}
```

**Usage:**

- `key` lets each subscriber ignore the events that are not addressed to it (e.g. `useDialog` only handles its own key).
- `data` is `unknown`: subscribers narrow it before use.

**Example:**

```ts
import { uiEventSubject, type UiEvent } from '@linagora/lin-pulsar-core';

const subscription = uiEventSubject.subscribe((event: UiEvent) => {
  if (event.key !== 'users-refresh') {
    return;
  }
  // narrow event.data before using it
});

uiEventSubject.next({ key: 'users-refresh', data: null });

// when the component is unmounted
subscription.unsubscribe();
```

### DialogEvent

Payload (`UiEvent.data`) of the dialog events handled by [`useDialog`](./dialog.md).

```ts
export type DialogEvent = {
  /** Event type, expected to be 'open' or 'close'. */
  type: 'open' | 'close';

  /** Namespace for the UI design. */
  uiNamespace: string;

  /** I18n scope for translating the dialog content and buttons. */
  i18nScope: string;
};
```

**Usage:**

- `useDialog` sets `show` to `false` on `'close'`; on `'open'`, it sets `show` to `true` and calls its `onOpen` callback
  with the payload.
- `uiNamespace` and `i18nScope` are not read by `useDialog`: the dialog component reads them in `onOpen` to resolve its
  UI design and translations.
- `useDialog<T extends DialogEvent>` accepts an extended payload. The payload is cast to `T`, not validated at runtime.

**Example:**

```ts
import { ref } from 'vue';
import { useDialog, type DialogEvent } from '@linagora/lin-pulsar-core';

interface DeleteDialogEvent extends DialogEvent {
  entityId: string;
}

const entityId = ref<string>();

const { show } = useDialog<DeleteDialogEvent>('delete-dialog', (event) => {
  entityId.value = event.entityId;
});
```

---

## 🔍 Filter types

Types describing a filter that can be applied to a list of entities. `LinPulsarFilterType`, `LinPulsarFilterOperator`,
`LinPulsarFilterDynamicLabelOptions` and the two filter expression separator constants below are defined in
`src/types/linPulsarFilter.ts`.

The filter itself (`LinPulsarFilter`) and the applied values (`LinPulsarFilterValue`) are **classes**, not plain type
shapes — they carry parsing logic (`fromString`/`toString`) in addition to their data, and are exported as
regular (value) exports, not type-only exports. They are documented in detail in
[`docs/filters.md`](./filters.md).

### LIN_PULSAR_FILTER_OR_SEPARATOR & LIN_PULSAR_FILTER_NEGATION_PREFIX

Runtime constants (not types) used to build and parse filter expressions — also exported as regular (value)
exports, not type-only, since `LinPulsarFilter` and `LinPulsarFilterValue` use them at runtime.

```ts
export const LIN_PULSAR_FILTER_OR_SEPARATOR = '|';
export const LIN_PULSAR_FILTER_NEGATION_PREFIX = 'not_';
```

| Constant                            | Value    | Meaning                                                                 |
| ----------------------------------- | -------- | ----------------------------------------------------------------------- |
| `LIN_PULSAR_FILTER_OR_SEPARATOR`    | `'\|'`   | Separates value expressions combined with OR within a `LinPulsarFilter` |
| `LIN_PULSAR_FILTER_NEGATION_PREFIX` | `'not_'` | Prefix marking a `LinPulsarFilterValue` expression as negated           |

### LinPulsarFilterType

Union type defining the filter category and the expected UI behavior.

```ts
export type LinPulsarFilterType = 'date' | 'text' | 'number' | 'list' | 'tree';
```

### LinPulsarFilterOperator

Union type defining the comparison operator used when converting or parsing a `LinPulsarFilterValue` expression.

```ts
export type LinPulsarFilterOperator = 'lk_' | '' | 'gt_' | 'lt_';
```

| Operator | Meaning         |
| -------- | --------------- |
| `lk_`    | Like / contains |
| `''`     | Equality        |
| `gt_`    | Greater than    |
| `lt_`    | Lower than      |

### LinPulsarFilterDynamicLabelOptions

Describes how to resolve the item behind each value of a filter whose values are identifiers
(e.g. UUIDs) and therefore can't be displayed as-is. It is carried by `LinPulsarFilter.dynamicLabelOptions`
and consumed by the layer rendering the filter values: `LinPulsarFilter` and `LinPulsarFilterValue` never perform
any request themselves. See [`docs/filters.md`](./filters.md#65-dynamic-item-resolution-dynamiclabeloptions)
for the resolution rules and examples.

```ts
export interface LinPulsarFilterDynamicLabelOptions {
  multipleRequests?: boolean;
  url: string;
  responseItemsPath?: string;
  valuePath?: string;
}
```

| Property            | Type      | Description                                                                                  |
| ------------------- | --------- | -------------------------------------------------------------------------------------------- |
| `multipleRequests`  | `boolean` | Whether to perform one request per value. Defaults to `false` (one request for all)          |
| `url`               | `string`  | Nunjucks URL template: `{{ value }}` when `multipleRequests`, `{{ values }}` otherwise       |
| `responseItemsPath` | `string`  | Path to the collection of items in the response. Only when `multipleRequests` is `false`     |
| `valuePath`         | `string`  | Path, within an item, to the attribute matching `LinPulsarFilterValue.value`. Same condition |

**Example:**

```ts
const dynamicLabelOptions: LinPulsarFilterDynamicLabelOptions = {
  url: "/organizational-units?ids={{ values | join('|') }}",
  responseItemsPath: 'content',
  valuePath: 'id',
};
```

### LinPulsarFilter\<T\>

Class representing a filter that can be applied to a list of entities. The generic parameter `T` lets consumers
define their own `options` structure for maximum flexibility. Its `id` is auto generated by the constructor.
`fromString` parses and `toString` converts the filter to an HTTP query parameter value, compatible with
APIs powered by [`spring-query-filter`](https://github.com/Zorin95670/spring-query-filter). `fromString` tolerates a
non-string `input` at runtime (e.g. received across a Module Federation boundary) by returning an empty `values`
array instead of throwing. See [`docs/filters.md`](./filters.md#6-linpulsarfilter-class) for the full API.

```ts
export class LinPulsarFilter<T = Record<string, unknown>> {
  id: string;
  name: string;
  type: LinPulsarFilterType;
  options: T;
  values: LinPulsarFilterValue[];
  dynamicLabelOptions?: LinPulsarFilterDynamicLabelOptions;

  constructor(
    name: string,
    type: LinPulsarFilterType,
    options: T,
    values: LinPulsarFilterValue[],
    dynamicLabelOptions?: LinPulsarFilterDynamicLabelOptions
  );

  static fromString<T = Record<string, unknown>>(
    name: string,
    input: string,
    definition?: LinPulsarFilter<T>
  ): LinPulsarFilter<T>;

  toString(): string;
}
```

**Example:**

```ts
import {
  LinPulsarFilter,
  LinPulsarFilterValue,
} from '@linagora/lin-pulsar-core';

const cityFilter = new LinPulsarFilter<{ placeholder: string }>(
  'city',
  'text',
  { placeholder: 'City' },
  [LinPulsarFilterValue.fromString('lk_paris')]
);

cityFilter.toString();
// 'lk_paris'

LinPulsarFilter.fromString('city', 'lk_paris|not_toto');
// LinPulsarFilter { name: 'city', type: 'text', options: {}, values: [...] }
```

### LinPulsarFilterSet

Class representing a saved filter set (favorite search): a user-defined `label` paired with the collection of
`LinPulsarFilter` it is made of. Its `fromString`/`toString` build/parse `name=value` query parameter pairs — one
per filter, joined with `&` — by combining each filter's `name` with its own `LinPulsarFilter.toString()` value, so
a favorite can be stored as-is in user preferences and reused directly as a query string. `fromString` accepts
`null`/`undefined` for `value` (e.g. directly from `localStorage.getItem(...)`), tolerates any other non-string
value the same way, and silently ignores malformed `name=value` pairs. See
[`docs/filters.md`](./filters.md#7-linpulsarfilterset-class) for the full API.

```ts
export class LinPulsarFilterSet {
  id: string;
  label: string;
  filters: LinPulsarFilter[];

  constructor(id: string, label: string, filters: LinPulsarFilter[]);

  static fromString(
    id: string,
    label: string,
    value: string | null | undefined,
    definitions?: LinPulsarFilter[]
  ): LinPulsarFilterSet;

  toString(): string;
}
```

**Example:**

```ts
import { LinPulsarFilter, LinPulsarFilterSet } from '@linagora/lin-pulsar-core';

const favorite = new LinPulsarFilterSet('id', 'My Active Projects', [
  LinPulsarFilter.fromString('status', 'active|pending'),
]);

favorite.toString();
// 'status=active|pending'

LinPulsarFilterSet.fromString(
  'id',
  'My Active Projects',
  'status=active|pending'
);
// LinPulsarFilterSet { label: 'My Active Projects', filters: [...] }
```

---

### LinPulsarFilterSetUserPreference

Represents the persisted form of a saved filter set (favorite search) stored in user preferences. It is a
lightweight DTO used to serialize and retrieve a `LinPulsarFilterSet` from external storage (e.g. backend user
preferences, localStorage, or federated configuration). It contains only the minimal metadata required to
reconstruct the runtime model: a unique identifier, a display label, and a serialized filter value string
compatible with `LinPulsarFilterSet.fromString`.

The `value` field follows the same `name=value` format as `LinPulsarFilterSet.toString()`, where multiple filters
are joined with `&` and each filter may contain `|`-separated values produced by `LinPulsarFilter.toString()`.

See [`docs/filters.md`](./filters.md#8-linpulsarfiltersetuserpreference-type) for the full type definition and
behavior.

```ts
export interface LinPulsarFilterSetUserPreference {
  id: string;
  label: string;
  value: string;
}
```

**Example:**

```ts
import { LinPulsarFilterSet } from '@linagora/lin-pulsar-core';

const preference = {
  id: 'fav-001',
  label: 'My Active Projects',
  value: 'status=active|pending&createdAt=gt_2026-01-01',
};

const filterSet = LinPulsarFilterSet.fromString(
  preference.id,
  preference.label,
  preference.value
);

// LinPulsarFilterSet { label: 'My Active Projects', filters: [...] }
```

---

## 🖋️ Nunjucks types

### RenderResult

Return type of `render` from [`useNunjucks`](./nunjucks.md#render), computed recursively from the type of the rendered
value. Shown here with its internal helper aliases inlined.

```ts
export type RenderResult<T> = T extends string
  ? string | Record<string, unknown>
  : T extends ReadonlyArray<infer U>
    ? RenderResult<U>[]
    : T extends Record<string, unknown>
      ? { [K in keyof T]: RenderResult<T[K]> }
      : T;
```

**Usage:**

- A string becomes `string | Record<string, unknown>`: a single dotted lookup resolving to a plain object (e.g.
  `'{{ entity.details }}'`) returns that object. Narrow with `typeof` before use.
- Arrays and plain object types are mapped element by element and property by property; any other type is returned
  unchanged.
- An `interface` is not assignable to `Record<string, unknown>` (no implicit index signature): `RenderResult<MyInterface>`
  is `MyInterface` unchanged, and its string properties stay typed `string`. Declare the input with a `type` alias to
  get the mapped type.

**Example:**

```ts
import { useNunjucks } from '@linagora/lin-pulsar-core';

const { render } = useNunjucks();

const entity = { name: 'Alice', type: 'user' };
const field = {
  label: '{{ entity.name }}',
  size: 3,
  tags: ['{{ entity.type }}'],
};

const rendered = render(field, { entity });
// RenderResult<typeof field>:
// {
//   label: string | Record<string, unknown>;
//   size: number;
//   tags: (string | Record<string, unknown>)[];
// }

if (typeof rendered.label === 'string') {
  // rendered.label is a string here
}
```

---

## 🧰 Summary

| Type / Interface                       | Purpose                                                                                          |
| -------------------------------------- | ------------------------------------------------------------------------------------------------ |
| `LinPulsarZoneEntry`                   | Defines the contract for a plugin component                                                      |
| `BaseLinPulsarZoneEntry`               | Base model shared by all zone entry variants                                                     |
| `ComponentLinPulsarZoneEntry`          | Zone entry referencing a component by name                                                       |
| `FederatedLinPulsarZoneEntry`          | Zone entry referencing a component loaded through Module Federation                              |
| `LinPulsarZoneResolvedEntry`           | Zone entry resolved for rendering (component and props)                                          |
| `LinPulsarRemoteConfig`                | Module Federation remote declared in the application configuration                               |
| `LinPulsarModuleFederationInitOptions` | Options of `linPulsarModuleFederation.init()`                                                    |
| `LinPulsarModuleFederationPhaseRunner` | Host-side runner of a single lifecycle phase for one federated module                            |
| `FederatedModule`                      | Defines the structure of a federated component module                                            |
| `ModuleHostConfig`                     | Configuration provided to remote modules                                                         |
| `RemoteModule`                         | Defines the structure of a remote module                                                         |
| `ModuleComponentRef`                   | Reference to a module element (lifecycle, routes, i18n messages or component)                    |
| `ModuleZoneDefinition`                 | Definition of a UI zone injection declared in a module configuration                             |
| `LocalComponent`                       | Value registrable under a local name: a Vue component or any module element                      |
| `ModulePageLifecycleOptions`           | Creation options of the page module lifecycle factory                                            |
| `ModulePageLifecycleHostOptions`       | Host-provided options understood by the default page module lifecycle                            |
| `AttributeInputType`                   | Input type union: Text, Number, Boolean, Date, List, DynamicList, TextArea, Email, File, Tree    |
| `LinPulsarAttributeConfiguration`      | Generic interface describing an entity attribute                                                 |
| `ValidatorName`                        | Available validator names for field validation                                                   |
| `LinPulsarEntityConfiguration`         | Describes an entity and its attributes                                                           |
| `LinPulsarApiErrorResponseBody`        | Standard error response structure from linOpenFactory APIs                                       |
| `LinPulsarApiEndpointConfiguration`    | Describes a REST route                                                                           |
| `LinPulsarRoute`                       | Defines the structure of a route (recursive children)                                            |
| `LinPulsarRoutes`                      | Array of LinPulsarRoute for nested routes                                                        |
| `Page<T>`                              | Paginated API response                                                                           |
| `Pagination`                           | Backend pagination model                                                                         |
| `QTableRequestEvent`                   | Quasar table server-side request payload                                                         |
| `QuasarPagination`                     | Quasar-specific pagination structure                                                             |
| `QueryFilter`                          | Flexible query parameter map                                                                     |
| `ModuleLifecyclePhase`                 | Enum of module lifecycle phases                                                                  |
| `ModuleLifecycleResult`                | Result of a lifecycle phase execution                                                            |
| `ModuleLifecycleHooks`                 | Lifecycle hooks for remote modules                                                               |
| `UiDesignValue`                        | Single primitive value in the UI configuration                                                   |
| `UiDesignNamespace`                    | Namespace with key-value pairs of UI configuration values                                        |
| `UiDesign`                             | The full UI design configuration                                                                 |
| `QComponentName`                       | Valid Quasar component names for type-safe UI design                                             |
| `LinPulsarQComponentProps`             | All supported Quasar component props subsets                                                     |
| `LinPulsarHtmlAttrs`                   | HTML attributes (`class`, `style`) a design entry can set on any component                       |
| `ThirdPartyComponentName`              | Valid third-party component names for type-safe UI design                                        |
| `LinPulsarDraggableProps`              | vue-draggable-next (SortableJS) component properties supported by Ui Design                      |
| `LinPulsarQBtnProps`                   | QBtn component properties supported by Ui Design                                                 |
| `LinPulsarQTabsProps`                  | QTabs component properties supported by Ui Design                                                |
| `LinPulsarQRouteTabProps`              | QRouteTab component properties supported by Ui Design                                            |
| `LinPulsarQHeaderProps`                | QHeader component properties supported by Ui Design                                              |
| `LinPulsarQToolbarProps`               | QToolbar component properties supported by Ui Design                                             |
| `LinPulsarQToolbarTitleProps`          | QToolbarTitle component properties supported by Ui Design                                        |
| `LinPulsarQAvatarProps`                | QAvatar component properties supported by Ui Design                                              |
| `LinPulsarQBadgeProps`                 | QBadge component properties supported by Ui Design                                               |
| `LinPulsarQTableProps`                 | QTable component properties supported by Ui Design                                               |
| `LinPulsarQCardProps`                  | QCard component properties supported by Ui Design                                                |
| `LinPulsarQCardActionsProps`           | QCardActions component properties supported by Ui                                                |
| `LinPulsarQCardSectionProps`           | QCardSection component properties supported by Ui Design                                         |
| `LinPulsarQIconProps`                  | QIcon component properties supported by Ui Design                                                |
| `LinPulsarQChipProps`                  | QChip component properties supported by Ui Design                                                |
| `LinPulsarQCheckboxProps`              | QCheckbox component properties supported by Ui Design                                            |
| `LinPulsarQToggleProps`                | QToggle component properties supported by Ui Design                                              |
| `LinPulsarQInputProps`                 | QInput component properties supported by Ui Design                                               |
| `LinPulsarQDateProps`                  | QDate component properties supported by Ui Design                                                |
| `LinPulsarQImgProps`                   | QImg component properties supported by Ui Design                                                 |
| `LinPulsarQFieldProps`                 | QField component properties supported by Ui Design                                               |
| `LinPulsarQFileProps`                  | QFile component properties supported by Ui Design                                                |
| `LinPulsarQFormProps`                  | QForm component properties supported by Ui Design                                                |
| `LinPulsarQSelectProps`                | QSelect component properties supported by Ui Design                                              |
| `LinPulsarQSeparatorProps`             | QSeparator component properties supported by Ui Design                                           |
| `LinPulsarQSpinnerProps`               | QSpinner component properties supported by Ui Design                                             |
| `LinPulsarQBtnDropdownProps`           | QBtnDropdown component properties supported by Ui Design                                         |
| `LinPulsarQListProps`                  | QList component properties supported by Ui Design                                                |
| `LinPulsarQItemProps`                  | QItem component properties supported by Ui Design                                                |
| `LinPulsarQItemSectionProps`           | QItemSection component properties supported by Ui Design                                         |
| `LinPulsarQItemLabelProps`             | QItemLabel component properties supported by Ui Design                                           |
| `LinPulsarQDialogProps`                | QDialog component properties supported by Ui Design                                              |
| `LinPulsarQBannerProps`                | QBanner component properties supported by Ui Design                                              |
| `LinPulsarQMenuProps`                  | QMenu component properties supported by Ui Design                                                |
| `LinPulsarQTreeProps`                  | QTree component properties supported by Ui Design                                                |
| `LinPulsarQSplitterProps`              | QSplitter component properties supported by Ui Design                                            |
| `LinPulsarQOptionGroupProps`           | QOptionGroup component properties supported by Ui Design                                         |
| `LinPulsarQScrollAreaProps`            | QScrollArea component properties supported by Ui Design                                          |
| `LinPulsarQLayoutProps`                | QLayout component properties supported by Ui Design                                              |
| `TreeNode`                             | Represents a node in the tree structure (recursive)                                              |
| `TreeNodeType`                         | Describes a node type and its default actions                                                    |
| `MenuItem`                             | Generic menu entry consumed by the federated DropdownButton                                      |
| `DropdownClickPayload`                 | Generic click payload emitted by the federated DropdownButton                                    |
| `LinPulsarUser`                        | Represents an authenticated user in the system                                                   |
| `NavigationMenuItem`                   | Describes a main navigation menu item                                                            |
| `UiEvent`                              | Event carried by the shared `uiEventSubject`                                                     |
| `DialogEvent`                          | Payload of the dialog events handled by `useDialog`                                              |
| `LinPulsarFilterType`                  | Union type for filter categories: date, text, number, list, tree                                 |
| `LinPulsarFilterOperator`              | Union type for filter value comparison operators                                                 |
| `LIN_PULSAR_FILTER_OR_SEPARATOR`       | Runtime constant (`'\|'`) separating values combined with OR in a filter expression              |
| `LIN_PULSAR_FILTER_NEGATION_PREFIX`    | Runtime constant (`'not_'`) marking a filter value expression as negated                         |
| `LinPulsarFilter<T>`                   | Generic class representing a filter, converted to a query parameter value                        |
| `LinPulsarFilterDynamicLabelOptions`   | Configuration describing how to resolve the item displayed behind each filter value              |
| `LinPulsarFilterSet`                   | Class representing a saved filter set (favorite search): a label and its `LinPulsarFilter[]`     |
| `LinPulsarFilterSetUserPreference`     | Represents the persisted form of a saved filter set (favorite search) stored in user preferences |
| `ValueFormatter`                       | Contract every formatter implementation must satisfy (internal, not re-exported)                 |
| `FormatterConfiguration`               | Formatting properties mixed into field and column definitions                                    |
| `RenderResult`                         | Return type of the Nunjucks `render`, computed from the input type                               |

These types enforce **consistency and type safety** across all front-end modules and plugins.

---

> Additional types and interfaces will be added as new features are implemented in the library.

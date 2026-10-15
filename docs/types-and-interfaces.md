# TypeScript Types & Interfaces 🧩

This document explains the **types and interfaces** used in `linid-im-front-corelib`.

---

## 🔌 LinidZoneEntry

Represents an entry that can be rendered inside a zone. The model is a discriminated union: an entry provides its
component either through a federated plugin identifier (`FederatedLinidZoneEntry`) or through a component name
(`ComponentLinidZoneEntry`).

```ts
export interface BaseLinidZoneEntry {
  /** Props forwarded to the rendered component */
  props?: Record<string, unknown>;
}

export interface FederatedLinidZoneEntry extends BaseLinidZoneEntry {
  type: 'federated';

  /** Path or identifier of the plugin module */
  plugin: string;
}

export interface ComponentLinidZoneEntry extends BaseLinidZoneEntry {
  type: 'component';

  /** Name of the component to render */
  component: string;
}

export type LinidZoneEntry = FederatedLinidZoneEntry | ComponentLinidZoneEntry;
```

**Usage:**

- Entries are created by the `Linid Zone Store` helpers (`registerPlugin`, `registerPluginOnce`,
  `registerComponent`); consumers never build them manually.
- The `type` discriminant removes any ambiguity on the available properties and keeps the model extensible for
  future entry kinds.

---

## 🧱 LinidZoneState

Represents the state of the Pinia store that manages all plugin zones.

```ts
interface LinidZoneState {
  /** Map of zone names to their registered entries */
  zones: Record<string, LinidZoneEntry[]>;
}
```

- `zones` is a reactive object.
- Each key corresponds to a zone, each value is an array of entries for that zone.
- A zone key only exists once at least one entry has been registered for it: reading an unregistered zone yields
  `undefined`, not an empty array. Use the store's `hasZoneEntries(zone)` getter rather than inspecting `zones`
  directly to know whether a zone will render content — see
  [Checking Whether a Zone Has Entries](./components-plugin-zones.md#-checking-whether-a-zone-has-entries-haszoneentries).

---

## 🧑‍💼 LinidUser

Represents an authenticated user in the system.

```ts
export interface LinidUser {
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

- Populated by the `linidUserStore` from an OIDC ID token's claims.
- Consumed by components that need to display or check user identity and roles.

---

## 🧱 LinidUserState

Represents the state of the Pinia store that manages user authentication.

```ts
interface LinidUserState {
  /** Current authenticated user information. */
  user: LinidUser;
  /** Flag indicating whether the user is authenticated. */
  isAuthenticated: boolean;
}
```

- `user` is populated via `setUserFromClaims()` after a successful OIDC login.
- `isAuthenticated` is set to `true` after the user claims are loaded.

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

- Used internally by [`loadAsyncComponent`](./helpers.md#loadasynccomponent) to ensure type safety when loading
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

### ModuleComponentRef

Reference to a module element (lifecycle, routes, i18n messages or component) in a module configuration.

```ts
export type ModuleComponentRef = string | LinidZoneEntry;
```

A plain string references an element exposed through Module Federation (e.g. `catalogUI/PageLifecycle`), as does a
`FederatedLinidZoneEntry`:

```json
{ "type": "federated", "plugin": "catalogUI/PageLifecycle" }
```

A `ComponentLinidZoneEntry` references an element registered locally through the `localComponents` initialization
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
 * Module configuration in the host (module-<name>.json).
 *
 * This is what the host provides to each module during the configuration phase.
 * The host reads this from `module-<name>.json` files.
 * @template T Type of the module-specific options
 */
export interface ModuleHostConfig<T> {
  /**
   * Unique identifier for this instance of the module.
   * Typically used to differentiate multiple instances of the same module within the host.
   */
  instanceId: string;

  /**
   * Module Federation remote name (must match a key in remotes.json).
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
   * Should be in kebab-case and match the ID in the module configuration.
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

- Declared in `module-<name>.json` configuration files in the `zones` array.
- Allows modules to inject UI elements into predefined zones exposed by other modules.
- The `zone` field identifies the target zone (e.g., "user-details", "sidebar").
- The `plugin` field specifies which federated element to render.
- The `component` field specifies which component to render by name, and requires that name to have been made
  available to zones through `registerLocalComponent`.
- `plugin` and `component` are mutually exclusive, and determine which variant an entry is.
- The `props` field is optional and allows passing configuration to the element.

**Example:**

```json
{
  "instanceId": "moduleRoles-instance",
  "remoteName": "moduleRoles",
  "entity": "roles",
  "apiEndpoint": "/api/roles",
  "basePath": "/roles",
  "zones": [
    {
      "zone": "user-details",
      "plugin": "moduleRoles/RoleCardPlugin",
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

### LinidAttributeConfiguration

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

> **Note:** The available input types depend on the inputs defined in `linid-im-front-community-plugins`. Custom plugins
> can extend these types.

#### Generic Parameter

The interface accepts a generic parameter `T` for `inputSettings`, defaulting to `Record<string, unknown>`. This allows
consumers to define their own settings structure without requiring corelib updates.

```ts
interface LinidAttributeConfiguration<T = Record<string, unknown>> {
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
import type { LinidAttributeConfiguration } from '@linagora/linid-im-front-corelib';

// Basic usage with default inputSettings
const attr: LinidAttributeConfiguration = {
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

const typedAttr: LinidAttributeConfiguration<MyNumberSettings> = {
  name: 'salary',
  type: 'Integer',
  required: false,
  hasValidations: true,
  input: 'Number',
  inputSettings: { min: 0, step: 1000 },
};

// Date input example
const dateAttr: LinidAttributeConfiguration = {
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

Most validators read their parameters from the `inputSettings` property of `LinidAttributeConfiguration`. `'email'` is
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

### LinidEntityConfiguration

Represents an entity with its name and list of attributes. Returned by `/metadata/entities` and
`/metadata/entities/:entity`.

### LinidApiEndpointConfiguration

Represents a REST route (method, path, entity, variables). Returned by `/metadata/routes`.

---

## 🌐 LinID API Response Types

Types representing standard response structures returned by LinID backend APIs.

### LinidApiErrorResponseBody

Represents the structure of an error response body returned by LinID APIs.

This structure is used across all LinID API error responses to provide consistent error handling with internationalized
messages.

```ts
export interface LinidApiErrorResponseBody {
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

- Used by [`useFieldValidation`](./field-validation.md#validatefromapivalue) to extract error messages from backend
  validation responses
- Returned by all LinID API endpoints for HTTP errors
- The `error` field contains the already-internationalized error message ready for display
- The `errorKey` and `errorContext` can be used for custom error handling if needed

**Example:**

```ts
import type { LinidApiErrorResponseBody } from '@linagora/linid-im-front-corelib';
import axios from 'axios';

try {
  await someApiCall();
} catch (error) {
  if (axios.isAxiosError(error) && error.response?.status === 400) {
    const errorBody = error.response.data as LinidApiErrorResponseBody;
    console.error(errorBody.error); // Display internationalized error message
    console.log(errorBody.errorKey); // e.g., "validation.email.invalid"
    console.log(errorBody.errorContext); // e.g., { email: "test@" }
  }
}
```

---

## 🗃️ LinidConfigurationState

Represents the state of the Pinia store that manages entity and route configurations.

```ts
interface LinidConfigurationState {
  /** List of entity configurations fetched from the backend. */
  entities: LinidEntityConfiguration[];
  /** List of api endpoint configurations fetched from the backend. */
  apiEndpoints: LinidApiEndpointConfiguration[];
  /** Indicates if the configuration is currently being loaded. */
  loading: boolean;
  /** Error message if the configuration fetch failed. */
  error: string | null;
}
```

---

## 🛣️ LinidRoute & LinidRoutes

Defines the structure for application routes, supporting recursive nesting for multi-level routes.

```ts
export type LinidRoutes = LinidRoute[];

export interface LinidRoute {
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
  children?: LinidRoutes;
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
Defined in `src/type/page.ts`.

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
   * If false, the module will continue through remaining phases but
   * the error will be logged.
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
   * @param config - Module-specific configuration from host (from module-<name>.json).
   *                 Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  configure(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;

  /**
   * Called to initialize the module's core functionality.
   *
   * Use this to initialize any resources
   * your module needs to function.
   * @param config - Module-specific configuration from host (from module-<name>.json).
   * Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  initialize(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;

  /**
   * Called when the module is ready to be used.
   *
   * Use this to perform final checks and emit ready state.
   * At this point, all other modules have completed initialization.
   * @param config - Module-specific configuration from host (from module-<name>.json).
   * Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  ready(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;

  /**
   * Called after all modules have been initialized.
   *
   * Use this for cross-module integrations and final setup that requires
   * all modules to be ready.
   * @param config - Module-specific configuration from host (from module-<name>.json).
   * Contains module-specific options of type T.
   * @returns Promise resolving to the lifecycle result.
   */
  postInit(config: ModuleHostConfig<T>): Promise<ModuleLifecycleResult>;
}
```

**Usage:**

- Remote modules should implement these hooks to participate in the lifecycle management.

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

### LinidQComponentProps

See description in [Ui design documentation](./ui-design.md#5-typescript-support).

### LinidHtmlAttrs

See description in [Ui design documentation](./ui-design.md#32-html-attributes-class-and-style).

### LinidQBtnProps

See description in [Ui design documentation](./ui-design.md#q-btn).

### LinidQTabsProps

See description in [Ui design documentation](./ui-design.md#q-tabs).

### LinidQRouteTabProps

See description in [Ui design documentation](./ui-design.md#q-route-tab).

### LinidQHeaderProps

See description in [Ui design documentation](./ui-design.md#q-header).

### LinidQToolbarProps

See description in [Ui design documentation](./ui-design.md#q-toolbar).

### LinidQToolbarTitleProps

See description in [Ui design documentation](./ui-design.md#q-toolbar-title).

### LinidQAvatarProps

See description in [Ui design documentation](./ui-design.md#q-avatar).

### LinidQBadgeProps

See description in [Ui design documentation](./ui-design.md#q-badge).

### LinidQTableProps

See description in [Ui design documentation](./ui-design.md#q-table).

### LinidQCardProps

See description in [Ui design documentation](./ui-design.md#q-card).

### LinidQCardActionsProps

See description in [Ui design documentation](./ui-design.md#q-card-actions).

### LinidQCardSectionProps

See description in [Ui design documentation](./ui-design.md#q-card-section).

### LinidQCheckboxProps

See description in [Ui design documentation](./ui-design.md#q-checkbox).

### LinidQFieldProps

See description in [Ui design documentation](./ui-design.md#q-field).

### LinidQIconProps

See description in [Ui design documentation](./ui-design.md#q-icon).

### LinidQChipProps

See description in [Ui design documentation](./ui-design.md#q-chip).

### LinidQToggleProps

See description in [Ui design documentation](./ui-design.md#q-toggle).

### LinidQInputProps

See description in [Ui design documentation](./ui-design.md#q-input).

### LinidQDateProps

See description in [Ui design documentation](./ui-design.md#q-date).

### LinidQImgProps

See description in [Ui design documentation](./ui-design.md#q-img).

### LinidQFileProps

See description in [Ui design documentation](./ui-design.md#q-file).

### LinidQFormProps

See description in [Ui design documentation](./ui-design.md#q-form).

### LinidQSelectProps

See description in [Ui design documentation](./ui-design.md#q-select).

### LinidQDialogProps

See description in [Ui design documentation](./ui-design.md#q-dialog).

### LinidQSpinnerProps

See description in [Ui design documentation](./ui-design.md#q-spinner).

### LinidQBtnDropDownProps

See description in [Ui design documentation](./ui-design.md#q-btn-dropdown).

### LinidQLayoutProps

See description in [Ui design documentation](./ui-design.md#q-layout).

### LinidQListProps

See description in [Ui design documentation](./ui-design.md#q-list).

### LinidQItemProps

See description in [Ui design documentation](./ui-design.md#q-item).

### LinidQItemSectionProps

See description in [Ui design documentation](./ui-design.md#q-item-section).

### LinidQItemLabelProps

See description in [Ui design documentation](./ui-design.md#q-item-label).

### LinidQBannerProps

See description in [Ui design documentation](./ui-design.md#q-banner).

### LinidQMenuProps

See description in [Ui design documentation](./ui-design.md#q-menu).

### LinidQTreeProps

See description in [Ui design documentation](./ui-design.md#q-tree).

### LinidQSplitterProps

See description in [Ui design documentation](./ui-design.md#q-splitter).

### LinidQSeparatorProps

See description in [Ui design documentation](./ui-design.md#q-separator).

### LinidQOptionGroupProps

See description in [Ui design documentation](./ui-design.md#q-option-group).

### LinidQScrollAreaProps

See description in [Ui design documentation](./ui-design.md#q-scroll-area).

### ThirdPartyComponentName

See description in [Ui design documentation](./ui-design.md#5-typescript-support).

### LinidThirdPartyComponentProps

See description in [Ui design documentation](./ui-design.md#5-typescript-support).

### LinidDraggableProps

See description in [Ui design documentation](./ui-design.md#draggable).

---

## 🌳 Tree types

Types used to represent tree structures in LinID components.
Defined in `src/types/linidTree.ts`.

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
import type { TreeNodeType } from '@linagora/linid-im-front-corelib';

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
export type TreeNode = {
  /** The type of the node, used to differentiate node categories. */
  type: string;

  /** Unique key identifying the node within the tree. */
  key: string;

  /** The value associated with the node, which can be a string, number, or an object for complex nodes. */
  value: string | number | Record<string, unknown>;

  /** Child nodes nested under this node. */
  nodes: TreeNode[];

  /** Additional actions. */
  extraActions?: string[];
};
```

**Example:**

```ts
import type { TreeNode } from '@linagora/linid-im-front-corelib';

const nodes: TreeNode[] = [
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
`linid-im-front-community-plugins`. They are kept in corelib so any host application can build typed menus and listen to
typed click payloads without depending on the plugin internals.

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
import type { MenuItem } from '@linagora/linid-im-front-corelib';

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
import type { DropdownClickPayload } from '@linagora/linid-im-front-corelib';

type AccountAction = 'activation.immediate' | 'activation.scheduled';

function onClick(payload: DropdownClickPayload<AccountAction>): void {
  // payload.key is narrowed to 'activation.immediate' | 'activation.scheduled'
}
```

---

## 🎯 Formatter types

Types describing how a raw value is formatted before display. Because field and column definitions must survive JSON
serialization and a Module Federation boundary, a formatter is designated by **name**, never by function. The name is
resolved at render time by the [`useValueFormatter`](./use-value-formatter.md) composable.

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
  [Adding a formatter](./use-value-formatter.md#adding-a-formatter).
- `formatOptions` is intentionally untyped (`Record<string, unknown>`), since the expected keys depend on the
  formatter that is requested. The per-formatter requirements are documented in
  [Available formatters](./use-value-formatter.md#available-formatters).

**Example:**

```ts
import type { FormatterConfiguration } from '@linagora/linid-im-front-corelib';

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

## 🖼️ Linid Ui Store types

### LinidUiState

Represents the state of the Pinia store that manages UI-related configurations.

```ts
interface LinidUiState {
  /** List of main navigation menu items. */
  mainNavigationItems: NavigationMenuItem[];
  /** Internationalization state: active locale and available languages. */
  i18n: {
    /** Currently active locale code (e.g. "fr-FR"). */
    locale: string;
    /** List of available locale codes declared in the configuration. */
    languages: string[];
  };
}
```

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

## 🔍 Filter types

Types describing a filter that can be applied to a list of entities. `LinidFilterType`, `LinidFilterOperator`,
`LinidFilterDynamicLabelOptions` and the two filter expression separator constants below are defined in
`src/types/linidFilter.ts`.

The filter itself (`LinidFilter`) and the applied values (`LinidFilterValue`) are **classes**, not plain type
shapes — they carry parsing logic (`fromString`/`toString`) in addition to their data, and are exported as
regular (value) exports, not type-only exports. They are documented in detail in
[`docs/filters.md`](./filters.md).

### LINID_FILTER_OR_SEPARATOR & LINID_FILTER_NEGATION_PREFIX

Runtime constants (not types) used to build and parse filter expressions — also exported as regular (value)
exports, not type-only, since `LinidFilter` and `LinidFilterValue` use them at runtime.

```ts
export const LINID_FILTER_OR_SEPARATOR = '|';
export const LINID_FILTER_NEGATION_PREFIX = 'not_';
```

| Constant                       | Value    | Meaning                                                             |
| ------------------------------ | -------- | ------------------------------------------------------------------- |
| `LINID_FILTER_OR_SEPARATOR`    | `'\|'`   | Separates value expressions combined with OR within a `LinidFilter` |
| `LINID_FILTER_NEGATION_PREFIX` | `'not_'` | Prefix marking a `LinidFilterValue` expression as negated           |

### LinidFilterType

Union type defining the filter category and the expected UI behavior.

```ts
export type LinidFilterType = 'date' | 'text' | 'number' | 'list' | 'tree';
```

### LinidFilterOperator

Union type defining the comparison operator used when converting or parsing a `LinidFilterValue` expression.

```ts
export type LinidFilterOperator = 'lk_' | '' | 'gt_' | 'lt_';
```

| Operator | Meaning         |
| -------- | --------------- |
| `lk_`    | Like / contains |
| `''`     | Equality        |
| `gt_`    | Greater than    |
| `lt_`    | Lower than      |

### LinidFilterDynamicLabelOptions

Describes how to resolve the item behind each value of a filter whose values are identifiers
(e.g. UUIDs) and therefore can't be displayed as-is. It is carried by `LinidFilter.dynamicLabelOptions`
and consumed by the layer rendering the filter values: `LinidFilter` and `LinidFilterValue` never perform
any request themselves. See [`docs/filters.md`](./filters.md#65-dynamic-item-resolution-dynamiclabeloptions)
for the resolution rules and examples.

```ts
export interface LinidFilterDynamicLabelOptions {
  multipleRequests?: boolean;
  url: string;
  responseItemsPath?: string;
  valuePath?: string;
}
```

| Property            | Type      | Description                                                                              |
| ------------------- | --------- | ---------------------------------------------------------------------------------------- |
| `multipleRequests`  | `boolean` | Whether to perform one request per value. Defaults to `false` (one request for all)      |
| `url`               | `string`  | Nunjucks URL template: `{{ value }}` when `multipleRequests`, `{{ values }}` otherwise   |
| `responseItemsPath` | `string`  | Path to the collection of items in the response. Only when `multipleRequests` is `false` |
| `valuePath`         | `string`  | Path, within an item, to the attribute matching `LinidFilterValue.value`. Same condition |

**Example:**

```ts
const dynamicLabelOptions: LinidFilterDynamicLabelOptions = {
  url: "/organizational-units?ids={{ values | join('|') }}",
  responseItemsPath: 'content',
  valuePath: 'id',
};
```

### LinidFilter\<T\>

Class representing a filter that can be applied to a list of entities. The generic parameter `T` lets consumers
define their own `options` structure for maximum flexibility. Its `id` is auto generated by the constructor.
`fromString` parses and `toString` converts the filter to an HTTP query parameter value, compatible with
APIs powered by [`spring-query-filter`](https://github.com/Zorin95670/spring-query-filter). `fromString` tolerates a
non-string `input` at runtime (e.g. received across a Module Federation boundary) by returning an empty `values`
array instead of throwing. See [`docs/filters.md`](./filters.md#6-linidfilter-class) for the full API.

```ts
export class LinidFilter<T = Record<string, unknown>> {
  id: string;
  name: string;
  type: LinidFilterType;
  options: T;
  values: LinidFilterValue[];
  dynamicLabelOptions?: LinidFilterDynamicLabelOptions;

  constructor(
    name: string,
    type: LinidFilterType,
    options: T,
    values: LinidFilterValue[],
    dynamicLabelOptions?: LinidFilterDynamicLabelOptions
  );

  static fromString<T = Record<string, unknown>>(
    name: string,
    input: string,
    definition?: LinidFilter<T>
  ): LinidFilter<T>;

  toString(): string;
}
```

**Example:**

```ts
import {
  LinidFilter,
  LinidFilterValue,
} from '@linagora/linid-im-front-corelib';

const cityFilter = new LinidFilter<{ placeholder: string }>(
  'city',
  'text',
  { placeholder: 'City' },
  [LinidFilterValue.fromString('lk_paris')]
);

cityFilter.toString();
// 'lk_paris'

LinidFilter.fromString('city', 'lk_paris|not_toto');
// LinidFilter { name: 'city', type: 'text', options: {}, values: [...] }
```

### LinidFilterSet

Class representing a saved filter set (favorite search): a user-defined `label` paired with the collection of
`LinidFilter` it is made of. Its `fromString`/`toString` build/parse `name=value` query parameter pairs — one
per filter, joined with `&` — by combining each filter's `name` with its own `LinidFilter.toString()` value, so
a favorite can be stored as-is in user preferences and reused directly as a query string. `fromString` accepts
`null`/`undefined` for `value` (e.g. directly from `localStorage.getItem(...)`), tolerates any other non-string
value the same way, and silently ignores malformed `name=value` pairs. See
[`docs/filters.md`](./filters.md#7-linidfilterset-class) for the full API.

```ts
export class LinidFilterSet {
  id: string;
  label: string;
  filters: LinidFilter[];

  constructor(id: string, label: string, filters: LinidFilter[]);

  static fromString(
    id: string,
    label: string,
    value: string | null | undefined,
    definitions?: LinidFilter[]
  ): LinidFilterSet;

  toString(): string;
}
```

**Example:**

```ts
import { LinidFilter, LinidFilterSet } from '@linagora/linid-im-front-corelib';

const favorite = new LinidFilterSet('My Active Projects', [
  LinidFilter.fromString('status', 'active|pending'),
]);

favorite.toString();
// 'status=active|pending'

LinidFilterSet.fromString('My Active Projects', 'status=active|pending');
// LinidFilterSet { label: 'My Active Projects', filters: [...] }
```

---

### LinidFilterSetUserPreference

Represents the persisted form of a saved filter set (favorite search) stored in user preferences. It is a
lightweight DTO used to serialize and retrieve a `LinidFilterSet` from external storage (e.g. backend user
preferences, localStorage, or federated configuration). It contains only the minimal metadata required to
reconstruct the runtime model: a unique identifier, a display label, and a serialized filter value string
compatible with `LinidFilterSet.fromString`.

The `value` field follows the same `name=value` format as `LinidFilterSet.toString()`, where multiple filters
are joined with `&` and each filter may contain `|`-separated values produced by `LinidFilter.toString()`.

See [`docs/filters.md`](./filters.md#8-linidfiltersetuserpreference-type) for the full type definition and
behavior.

```ts
export interface LinidFilterSetUserPreference {
  id: string;
  label: string;
  value: string;
}
```

**Example:**

```ts
import { LinidFilterSet } from '@linagora/linid-im-front-corelib';

const preference = {
  id: 'fav-001',
  label: 'My Active Projects',
  value: 'status=active|pending&createdAt=gt_2026-01-01',
};

const filterSet = LinidFilterSet.fromString(preference.label, preference.value);

// LinidFilterSet { label: 'My Active Projects', filters: [...] }
```

---

## 🧰 Summary

| Type / Interface                 | Purpose                                                                                          |
| -------------------------------- | ------------------------------------------------------------------------------------------------ |
| `LinidZoneEntry`                 | Defines the contract for a plugin component                                                      |
| `LinidZoneState`                 | Defines the structure of the zone store                                                          |
| `FederatedModule`                | Defines the structure of a federated component module                                            |
| `ModuleHostConfig`               | Configuration provided to remote modules                                                         |
| `RemoteModule`                   | Defines the structure of a remote module                                                         |
| `AttributeInputType`             | Input type union: Text, Number, Boolean, Date, List, DynamicList, TextArea, Email, File, Tree    |
| `LinidAttributeConfiguration`    | Generic interface describing an entity attribute                                                 |
| `ValidatorName`                  | Available validator names for field validation                                                   |
| `LinidEntityConfiguration`       | Describes an entity and its attributes                                                           |
| `LinidApiErrorResponseBody`      | Standard error response structure from LinID APIs                                                |
| `LinidApiEndpointConfiguration`  | Describes a REST route                                                                           |
| `LinidConfigurationState`        | Defines the structure of the configuration store                                                 |
| `LinidRoute`                     | Defines the structure of a route (recursive children)                                            |
| `LinidRoutes`                    | Array of LinidRoute for nested routes                                                            |
| `Page<T>`                        | Paginated API response                                                                           |
| `Pagination`                     | Backend pagination model                                                                         |
| `QTableRequestEvent`             | Quasar table server-side request payload                                                         |
| `QuasarPagination`               | Quasar-specific pagination structure                                                             |
| `QueryFilter`                    | Flexible query parameter map                                                                     |
| `ModuleLifecyclePhase`           | Enum of module lifecycle phases                                                                  |
| `ModuleLifecycleResult`          | Result of a lifecycle phase execution                                                            |
| `ModuleLifecycleHooks`           | Lifecycle hooks for remote modules                                                               |
| `UiDesignValue`                  | Single primitive value in the UI configuration                                                   |
| `UiDesignNamespace`              | Namespace with key-value pairs of UI configuration values                                        |
| `UiDesign`                       | The full UI design configuration                                                                 |
| `QComponentName`                 | Valid Quasar component names for type-safe UI design                                             |
| `LinidQComponentProps`           | All supported Quasar component props subsets                                                     |
| `ThirdPartyComponentName`        | Valid third-party component names for type-safe UI design                                        |
| `LinidThirdPartyComponentProps`  | All supported third-party component props subsets                                                |
| `LinidDraggableProps`            | vue-draggable-next (SortableJS) component properties supported by Ui Design                      |
| `LinidQBtnProps`                 | QBtn component properties supported by Ui Design                                                 |
| `LinidQTabsProps`                | QTabs component properties supported by Ui Design                                                |
| `LinidQRouteTabProps`            | QRouteTab component properties supported by Ui Design                                            |
| `LinidQHeaderProps`              | QHeader component properties supported by Ui Design                                              |
| `LinidQToolbarProps`             | QToolbar component properties supported by Ui Design                                             |
| `LinidQToolbarTitleProps`        | QToolbarTitle component properties supported by Ui Design                                        |
| `LinidQAvatarProps`              | QAvatar component properties supported by Ui Design                                              |
| `LinidQBadgeProps`               | QBadge component properties supported by Ui Design                                               |
| `LinidQTableProps`               | QTable component properties supported by Ui Design                                               |
| `LinidQCardProps`                | QCard component properties supported by Ui Design                                                |
| `LinidQCardActionsProps`         | QCardActions component properties supported by Ui                                                |
| `LinidQCardSectionProps`         | QCardSection component properties supported by Ui Design                                         |
| `LinidQIconProps`                | QIcon component properties supported by Ui Design                                                |
| `LinidQChipProps`                | QChip component properties supported by Ui Design                                                |
| `LinidQCheckboxProps`            | QCheckbox component properties supported by Ui Design                                            |
| `LinidQToggleProps`              | QToggle component properties supported by Ui Design                                              |
| `LinidQInputProps`               | QInput component properties supported by Ui Design                                               |
| `LinidQDateProps`                | QDate component properties supported by Ui Design                                                |
| `LinidQImgProps`                 | QImg component properties supported by Ui Design                                                 |
| `LinidQFieldProps`               | QField component properties supported by Ui Design                                               |
| `LinidQFileProps`                | QFile component properties supported by Ui Design                                                |
| `LinidQFormProps`                | QForm component properties supported by Ui Design                                                |
| `LinidQSelectProps`              | QSelect component properties supported by Ui Design                                              |
| `LinidQSeparatorProps`           | QSeparator component properties supported by Ui Design                                           |
| `LinidQSpinnerProps`             | QSpinner component properties supported by Ui Design                                             |
| `LinidQBtnDropdownProps`         | QBtnDropdown component properties supported by Ui Design                                         |
| `LinidQListProps`                | QList component properties supported by Ui Design                                                |
| `LinidQItemProps`                | QItem component properties supported by Ui Design                                                |
| `LinidQItemSectionProps`         | QItemSection component properties supported by Ui Design                                         |
| `LinidQItemLabelProps`           | QItemLabel component properties supported by Ui Design                                           |
| `LinidQDialogProps`              | QDialog component properties supported by Ui Design                                              |
| `LinidQBannerProps`              | QBanner component properties supported by Ui Design                                              |
| `LinidQMenuProps`                | QMenu component properties supported by Ui Design                                                |
| `LinidQTreeProps`                | QTree component properties supported by Ui Design                                                |
| `LinidQSplitterProps`            | QSplitter component properties supported by Ui Design                                            |
| `LinidQOptionGroupProps`         | QOptionGroup component properties supported by Ui Design                                         |
| `LinidQScrollAreaProps`          | QScrollArea component properties supported by Ui Design                                          |
| `TreeNode`                       | Represents a node in the tree structure (recursive)                                              |
| `TreeNodeType`                   | Describes a node type and its default actions                                                    |
| `MenuItem`                       | Generic menu entry consumed by the federated DropdownButton                                      |
| `DropdownClickPayload`           | Generic click payload emitted by the federated DropdownButton                                    |
| `LinidUiState`                   | Defines the structure of the UI store                                                            |
| `LinidUser`                      | Represents an authenticated user in the system                                                   |
| `LinidUserState`                 | Defines the structure of the user store                                                          |
| `NavigationMenuItem`             | Describes a main navigation menu item                                                            |
| `LinidFilterType`                | Union type for filter categories: date, text, number, list, tree                                 |
| `LinidFilterOperator`            | Union type for filter value comparison operators                                                 |
| `LINID_FILTER_OR_SEPARATOR`      | Runtime constant (`'\|'`) separating values combined with OR in a filter expression              |
| `LINID_FILTER_NEGATION_PREFIX`   | Runtime constant (`'not_'`) marking a filter value expression as negated                         |
| `LinidFilter<T>`                 | Generic class representing a filter, converted to a query parameter value                        |
| `LinidFilterDynamicLabelOptions` | Configuration describing how to resolve the item displayed behind each filter value              |
| `LinidFilterSet`                 | Class representing a saved filter set (favorite search): a label and its `LinidFilter[]`         |
| `LinidFilterSetUserPreference`   | Represents the persisted form of a saved filter set (favorite search) stored in user preferences |
| `ValueFormatter`                 | Contract every formatter implementation must satisfy (internal, not re-exported)                 |
| `FormatterConfiguration`         | Formatting properties mixed into field and column definitions                                    |

These types enforce **consistency and type safety** across all front-end modules and plugins.

---

> Additional types and interfaces will be added as new features are implemented in the library.

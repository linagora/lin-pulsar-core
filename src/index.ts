/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for LinID Identity Manager software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "LinID™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of LinID™, powered by
 * Linagora © 2009–2013. Contribute to LinID R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the LinID Identity Manager user interface, (ii) retain all hypertext links between LinID Identity Manager
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * LinID Identity Manager along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * LinID Identity Manager software.
 */

// Components
export { default as LinidZoneRenderer } from './components/LinidZoneRenderer.vue';

// Composables
export { useCommonMapper } from './composables/useCommonMapper';
export { DEFAULT_DATE_FORMAT, useDayjs } from './composables/useDayjs';
export { useDialog } from './composables/useDialog';
export { useFieldValidation } from './composables/useFieldValidation';
export { useLinidFilterUrl } from './composables/useLinidFilterUrl';
export { useLinidUserPreference } from './composables/useLinidUserPreference';
export { useNotify } from './composables/useNotify';
export { useNunjucks } from './composables/useNunjucks';
export type { RenderResult } from './composables/useNunjucks';
export { usePagination } from './composables/usePagination';
export { useQuasarFieldValidation } from './composables/useQuasarFieldValidation';
export { useQuasarRules } from './composables/useQuasarRules';
export {
  changeLocale,
  resolveLocale,
  syncLocale,
  useScopedI18n,
} from './composables/useScopedI18n';
export { useTree } from './composables/useTree';
export { useUiDesign } from './composables/useUiDesign';
export { useValueFormatter } from './composables/useValueFormatter';

// Stores
export { useLinidConfigurationStore } from './stores/linidConfigurationStore';
export { useLinidUiStore } from './stores/linidUiStore';
export { useLinidUserPreferenceStore } from './stores/linidUserPreferenceStore';
export { useLinidUserStore } from './stores/linidUserStore';
export { useLinidZoneStore } from './stores/linidZoneStore';

// Services
export { getDayjsInstance, setDayjsInstance } from './services/dayjsService';
export {
  getModuleFederation,
  loadAsyncComponent,
  setModuleFederation,
} from './services/federationService';
export { getHttpClient, setHttpClient } from './services/httpClientService';
export { getI18nInstance, setI18nInstance } from './services/i18nService';
export {
  getApiEndpointsConfiguration,
  getEntitiesConfiguration,
  getEntityConfiguration,
} from './services/linidConfigurationService';
export {
  deleteEntityById,
  getEntities,
  getEntityById,
  saveEntity,
  updateEntity,
} from './services/linidEntityService';
export {
  getModuleHostConfiguration,
  registerModuleHostConfiguration,
} from './services/linidModuleConfigurationService';
export { getNunjucksEnv, setNunjucksEnv } from './services/nunjucksService';
export {
  deepEqual,
  deepEqualUnordered,
  fromDot,
  getNestedValue,
  isObject,
  merge,
  renameKeys,
  setNestedValue,
} from './services/objectService';
export {
  getLocalComponent,
  registerLocalComponent,
  registerLocalComponents,
  resolveLocalComponent,
} from './services/localComponentService';
export { getPiniaStore, setPiniaStore } from './services/piniaStoreService';
export { getUiDesign, setUiDesign } from './services/uiDesignService';
export { uiEventSubject } from './services/uiEventService';

// Filters
export { LinidFilter } from './filters/linidFilter';
export { LinidFilterSet } from './filters/linidFilterSet';
export { LinidFilterValue } from './filters/linidFilterValue';
export {
  LINID_FILTER_NEGATION_PREFIX,
  LINID_FILTER_OR_SEPARATOR,
} from './types/linidFilter';
export type {
  LinidFilterDynamicLabelOptions,
  LinidFilterSetUserPreference,
} from './types/linidFilter';

// Types - Zones
export type {
  BaseLinidZoneEntry,
  ComponentLinidZoneEntry,
  FederatedLinidZoneEntry,
  LinidZoneEntry,
  LinidZoneResolvedEntry,
} from './types/linidZone';

// Types - route
export type { LinidRoute, LinidRoutes } from './types/linidRoute';
export type {
  Page,
  Pagination,
  QTableRequestEvent,
  QuasarPagination,
  QueryFilter,
} from './types/page';

// Types - Configuration
export type {
  AttributeInputType,
  LinidApiEndpointConfiguration,
  LinidAttributeConfiguration,
  LinidEntityConfiguration,
} from './types/linidConfiguration';

export type {
  FederatedModule,
  LocalComponent,
  ModuleComponentRef,
  ModuleHostConfig,
  ModuleZoneDefinition,
  RemoteModule,
} from './types/module';

// Types - Module Lifecycle
export type {
  ModuleLifecycleHooks,
  ModuleLifecycleResult,
} from './types/moduleLifecycle';
export type {
  ModulePageLifecycleHostOptions,
  ModulePageLifecycleOptions,
} from './types/modulePageLifecycle';

// Types - UI design
export type {
  LinidDraggableProps,
  LinidQAvatarProps,
  LinidQBadgeProps,
  LinidQBannerProps,
  LinidQBtnDropdownProps,
  LinidQBtnProps,
  LinidQCardActionsProps,
  LinidQCardProps,
  LinidQCardSectionProps,
  LinidQCheckboxProps,
  LinidQChipProps,
  LinidQDateProps,
  LinidQDialogProps,
  LinidQFieldProps,
  LinidQFileProps,
  LinidQFormProps,
  LinidQHeaderProps,
  LinidQIconProps,
  LinidQImgProps,
  LinidQInputProps,
  LinidQItemLabelProps,
  LinidQItemProps,
  LinidQItemSectionProps,
  LinidQLayoutProps,
  LinidQListProps,
  LinidQMenuProps,
  LinidQOptionGroupProps,
  LinidQRouteTabProps,
  LinidQScrollAreaProps,
  LinidQSelectProps,
  LinidQSeparatorProps,
  LinidQSpinnerProps,
  LinidQSplitterProps,
  LinidQTableProps,
  LinidQTabsProps,
  LinidQToggleProps,
  LinidQToolbarProps,
  LinidQToolbarTitleProps,
  LinidQTreeProps,
  UiDesign,
  UiDesignNamespace,
  UiDesignValue,
} from './types/uiDesign';

// Types - UI
export type { NavigationMenuItem } from './types/linidUi';

export { ModuleLifecyclePhase } from './types/moduleLifecycle';

// Lifecycle Base Class
export { BasicRemoteModule } from './lifecycle/skeleton';
export { createModulePageLifecycle } from './lifecycle/modulePageLifecycle';
export { linidModuleFederation } from './lifecycle/linidModuleFederation';
export type {
  LinidModuleFederationInitOptions,
  LinidModuleFederationPhaseRunner,
  LinidRemoteConfig,
} from './types/linidModuleFederation';

// Types - UIEvent
export type { UiEvent } from './types/uiEvent';

// Types - Field Validation
export type { ValidatorName } from './types/fieldValidation';

// Types - Linid API
export type { LinidApiErrorResponseBody } from './types/linidApi';

// Types - DialogEvent
export type { DialogEvent } from './types/dialogType';

// Types - User
export type { LinidUser } from './types/linidUser';

// Types - Tree
export type { TreeNode, TreeNodeType } from './types/linidTree';

// Types - Dropdown
export type { DropdownClickPayload, MenuItem } from './types/dropdownButton';

// Types - Filter
export type { LinidFilterOperator, LinidFilterType } from './types/linidFilter';

// Types - Formatter
export type { FormatterConfiguration } from './types/formatter';

// Constants - quasarDate
export { QDATE_DEFAULT_MASK } from './constants/quasarDate';

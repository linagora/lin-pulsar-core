/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for LinOpenFactory software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "LinOpenFactory™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of LinOpenFactory™, powered by
 * Linagora © 2009–2026. Contribute to LinOpenFactory R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the LinOpenFactory user interface, (ii) retain all hypertext links between LinOpenFactory
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * LinOpenFactory along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * LinOpenFactory software.
 */

// Components
export { default as LinPulsarZoneRenderer } from './components/LinPulsarZoneRenderer.vue';

// Composables
export { useCommonMapper } from './composables/useCommonMapper';
export { DEFAULT_DATE_FORMAT, useDayjs } from './composables/useDayjs';
export { useDialog } from './composables/useDialog';
export { useFieldValidation } from './composables/useFieldValidation';
export { useLinPulsarFilterUrl } from './composables/useLinPulsarFilterUrl';
export { useLinPulsarUserPreference } from './composables/useLinPulsarUserPreference';
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
export { useLinPulsarConfigurationStore } from './stores/linPulsarConfigurationStore';
export { useLinPulsarUiStore } from './stores/linPulsarUiStore';
export { useLinPulsarUserPreferenceStore } from './stores/linPulsarUserPreferenceStore';
export { useLinPulsarUserStore } from './stores/linPulsarUserStore';
export { useLinPulsarZoneStore } from './stores/linPulsarZoneStore';

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
} from './services/linPulsarConfigurationService';
export {
  deleteEntityById,
  getEntities,
  getEntityById,
  saveEntity,
  updateEntity,
} from './services/linPulsarEntityService';
export {
  getModuleHostConfiguration,
  registerModuleHostConfiguration,
} from './services/linPulsarModuleConfigurationService';
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
export { LinPulsarFilter } from './filters/linPulsarFilter';
export { LinPulsarFilterSet } from './filters/linPulsarFilterSet';
export { LinPulsarFilterValue } from './filters/linPulsarFilterValue';
export {
  LIN_PULSAR_FILTER_NEGATION_PREFIX,
  LIN_PULSAR_FILTER_OR_SEPARATOR,
} from './types/linPulsarFilter';
export type {
  LinPulsarFilterDynamicLabelOptions,
  LinPulsarFilterSetUserPreference,
} from './types/linPulsarFilter';

// Types - Zones
export type {
  BaseLinPulsarZoneEntry,
  ComponentLinPulsarZoneEntry,
  FederatedLinPulsarZoneEntry,
  LinPulsarZoneEntry,
  LinPulsarZoneResolvedEntry,
} from './types/linPulsarZone';

// Types - route
export type { LinPulsarRoute, LinPulsarRoutes } from './types/linPulsarRoute';
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
  LinPulsarApiEndpointConfiguration,
  LinPulsarAttributeConfiguration,
  LinPulsarEntityConfiguration,
} from './types/linPulsarConfiguration';

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
  LinPulsarDraggableProps,
  LinPulsarHtmlAttrs,
  LinPulsarQAvatarProps,
  LinPulsarQBadgeProps,
  LinPulsarQBannerProps,
  LinPulsarQBtnDropdownProps,
  LinPulsarQBtnProps,
  LinPulsarQCardActionsProps,
  LinPulsarQCardProps,
  LinPulsarQCardSectionProps,
  LinPulsarQCheckboxProps,
  LinPulsarQChipProps,
  LinPulsarQDateProps,
  LinPulsarQDialogProps,
  LinPulsarQFieldProps,
  LinPulsarQFileProps,
  LinPulsarQFormProps,
  LinPulsarQHeaderProps,
  LinPulsarQIconProps,
  LinPulsarQImgProps,
  LinPulsarQInputProps,
  LinPulsarQItemLabelProps,
  LinPulsarQItemProps,
  LinPulsarQItemSectionProps,
  LinPulsarQLayoutProps,
  LinPulsarQListProps,
  LinPulsarQMenuProps,
  LinPulsarQOptionGroupProps,
  LinPulsarQRouteTabProps,
  LinPulsarQScrollAreaProps,
  LinPulsarQSelectProps,
  LinPulsarQSeparatorProps,
  LinPulsarQSpinnerProps,
  LinPulsarQSplitterProps,
  LinPulsarQTableProps,
  LinPulsarQTabsProps,
  LinPulsarQToggleProps,
  LinPulsarQToolbarProps,
  LinPulsarQToolbarTitleProps,
  LinPulsarQTreeProps,
  UiDesign,
  UiDesignNamespace,
  UiDesignValue,
} from './types/uiDesign';

// Types - UI
export type { NavigationMenuItem } from './types/linPulsarUi';

export { ModuleLifecyclePhase } from './types/moduleLifecycle';

// Lifecycle Base Class
export { BasicRemoteModule } from './lifecycle/skeleton';
export { createModulePageLifecycle } from './lifecycle/modulePageLifecycle';
export { linPulsarModuleFederation } from './lifecycle/linPulsarModuleFederation';
export type {
  LinPulsarModuleFederationInitOptions,
  LinPulsarModuleFederationPhaseRunner,
  LinPulsarRemoteConfig,
} from './types/linPulsarModuleFederation';

// Types - UIEvent
export type { UiEvent } from './types/uiEvent';

// Types - Field Validation
export type { ValidatorName } from './types/fieldValidation';

// Types - LinPulsar API
export type { LinPulsarApiErrorResponseBody } from './types/linPulsarApi';

// Types - DialogEvent
export type { DialogEvent } from './types/dialogType';

// Types - User
export type { LinPulsarUser } from './types/linPulsarUser';

// Types - Tree
export type { TreeNode, TreeNodeType } from './types/linPulsarTree';

// Types - Dropdown
export type { DropdownClickPayload, MenuItem } from './types/dropdownButton';

// Types - Filter
export type {
  LinPulsarFilterOperator,
  LinPulsarFilterType,
} from './types/linPulsarFilter';

// Types - Formatter
export type { FormatterConfiguration } from './types/formatter';

// Constants - quasarDate
export { QDATE_DEFAULT_MASK } from './constants/quasarDate';

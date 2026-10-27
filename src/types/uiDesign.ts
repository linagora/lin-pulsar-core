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

import type {
  NamedColor,
  QAvatarProps,
  QBadgeProps,
  QBannerProps,
  QBtnDropdownProps,
  QBtnProps,
  QCardActionsProps,
  QCardProps,
  QCardSectionProps,
  QCheckboxProps,
  QChipProps,
  QDateProps,
  QDialogProps,
  QFieldProps,
  QFileProps,
  QFormProps,
  QHeaderProps,
  QIconProps,
  QImgProps,
  QInputProps,
  QItemLabelProps,
  QItemProps,
  QItemSectionProps,
  QLayoutProps,
  QListProps,
  QMenuProps,
  QOptionGroupProps,
  QRouteTabProps,
  QScrollAreaProps,
  QSelectProps,
  QSeparatorProps,
  QSpinnerProps,
  QSplitterProps,
  QTableProps,
  QTabsProps,
  QToggleProps,
  QToolbarProps,
  QToolbarTitleProps,
  QTreeProps,
  VueClassProp,
  VueStyleObjectProp,
  VueStyleProp,
} from 'quasar';

/**
 * Represents a single primitive value in the UI configuration.
 */
export type UiDesignValue =
  | string
  | number
  | boolean
  | NamedColor
  | VueStyleProp
  | VueClassProp
  | VueStyleObjectProp;

/**
 * Represents a namespace containing key-value pairs of UI configuration values.
 * Values can be primitives or nested namespaces.
 */
export interface UiDesignNamespace {
  [key: string]: UiDesignValue | UiDesignNamespace;
}

/**
 * Represents the full UI design configuration used across the application.
 * Contains multiple namespaces, including the `default` namespace used as a fallback.
 */
export interface UiDesign {
  /**
   * Default namespace providing fallback values for all components.
   */
  default?: UiDesignNamespace;

  /**
   * Arbitrary namespaces for component-specific overrides.
   */
  [namespace: string]: UiDesignNamespace | undefined;
}

/**
 * List of QBtnProps keys for type-safe UI design retrieval.
 */
const Q_BTN_PROPS = [
  'icon',
  'iconRight',
  'noCaps',
  'noWrap',
  'align',
  'stack',
  'stretch',
  'size',
  'outline',
  'flat',
  'unelevated',
  'rounded',
  'push',
  'square',
  'glossy',
  'fab',
  'fabMini',
  'padding',
  'color',
  'textColor',
  'dense',
  'ripple',
  'round',
] as const;

/**
 * List of QTabsProps keys for type-safe UI design retrieval.
 */
const Q_TABS_PROPS = [
  'vertical',
  'outsideArrows',
  'mobileArrows',
  'align',
  'breakpoint',
  'leftIcon',
  'rightIcon',
  'stretch',
  'shrink',
  'switchIndicator',
  'narrowIndicator',
  'inlineLabel',
  'noCaps',
  'activeColor',
  'activeBgColor',
  'indicatorColor',
  'contentClass',
  'activeClass',
  'dense',
] as const;

/**
 * List of QRouteTabProps keys for type-safe UI design retrieval.
 */
const Q_ROUTE_TAB_PROPS = [
  'icon',
  'activeClass',
  'exactActiveClass',
  'noCaps',
  'alert',
  'contentClass',
  'ripple',
] as const;

/**
 * List of QHeaderProps keys for type-safe UI design retrieval.
 */
const Q_HEADER_PROPS = [
  'reveal',
  'revealOffset',
  'elevated',
  'bordered',
] as const;

/**
 * List of QToolbarProps keys for type-safe UI design retrieval.
 */
const Q_TOOLBAR_PROPS = ['inset'] as const;

/**
 * List of QToolbarTitleProps keys for type-safe UI design retrieval.
 */
const Q_TOOLBAR_TITLE_PROPS = ['shrink'] as const;

/**
 * List of QAvatarProps keys for type-safe UI design retrieval.
 */
const Q_AVATAR_PROPS = [
  'icon',
  'size',
  'fontSize',
  'color',
  'textColor',
  'square',
  'rounded',
] as const;

/**
 * List of QBadgeProps keys for type-safe UI design retrieval.
 */
const Q_BADGE_PROPS = [
  'floating',
  'multiLine',
  'align',
  'color',
  'textColor',
  'transparent',
  'outline',
  'rounded',
] as const;

/**
 * List of QTableProps keys for type-safe UI design retrieval.
 */
const Q_TABLE_PROPS = [
  'virtualScrollItemSize',
  'virtualScrollStickySizeStart',
  'virtualScrollStickySizeEnd',
  'color',
  'iconFirstPage',
  'iconPrevPage',
  'iconNextPage',
  'iconLastPage',
  'grid',
  'gridHeader',
  'dense',
  'hideHeader',
  'hideBottom',
  'hideSelectedBanner',
  'hideNoData',
  'hidePagination',
  'flat',
  'bordered',
  'square',
  'separator',
  'wrapCells',
  'tableStyle',
  'tableClass',
  'tableHeaderStyle',
  'tableHeaderClass',
  'cardContainerStyle',
  'cardContainerClass',
  'cardStyle',
  'cardClass',
  'titleClass',
] as const;

/**
 * List of QCardProps keys for type-safe UI design retrieval.
 */
const Q_CARD_PROPS = ['dark', 'square', 'flat', 'bordered'] as const;

/**
 * List of QCardActionsProps keys for type-safe UI design retrieval.
 */
const Q_CARD_ACTIONS_PROPS = ['align', 'vertical'] as const;

/**
 * List of QCardSectionProps keys for type-safe UI design retrieval.
 */
const Q_CARD_SECTION_PROPS = ['horizontal'] as const;

/**
 * List of QIconProps keys for type-safe UI design retrieval.
 */
const Q_ICON_PROPS = ['left', 'right', 'name', 'size', 'color'] as const;

/**
 * List of QChipProps keys for type-safe UI design retrieval.
 */
const Q_CHIP_PROPS = [
  'removeAriaLabel',
  'icon',
  'iconRight',
  'iconRemove',
  'iconSelected',
  'dense',
  'size',
  'dark',
  'color',
  'textColor',
  'square',
  'outline',
  'ripple',
] as const;

/**
 * List of QToggleProps keys for type-safe UI design retrieval.
 */
const Q_TOGGLE_PROPS = [
  'toggleOrder',
  'toggleIndeterminate',
  'keepColor',
  'icon',
  'checkedIcon',
  'uncheckedIcon',
  'indeterminateIcon',
  'leftLabel',
  'size',
  'color',
  'dark',
  'dense',
  'iconColor',
] as const;

/**
 * List of QToggleProps keys for type-safe UI design retrieval.
 */
const Q_CHECKBOX_PROPS = [
  'toggleOrder',
  'toggleIndeterminate',
  'keepColor',
  'checkedIcon',
  'uncheckedIcon',
  'indeterminateIcon',
  'size',
  'color',
  'dark',
  'dense',
] as const;

/**
 * List of QInputProps keys for type-safe UI design retrieval.
 */
const Q_INPUT_PROPS = [
  'autofocus',
  'stackLabel',
  'hideHint',
  'clearable',
  'clearIcon',
  'counter',
  'autogrow',
  'fillMask',
  'reverseFillMask',
  'unmaskedValue',
  'debounce',
  'labelColor',
  'color',
  'bgColor',
  'dark',
  'filled',
  'outlined',
  'borderless',
  'standout',
  'hideBottomSpace',
  'rounded',
  'square',
  'dense',
  'itemAligned',
  'noErrorIcon',
] as const;

/**
 * List of QDateProps keys for type-safe UI design retrieval.
 */
const Q_DATE_PROPS = [
  'landscape',
  'yearsInMonthView',
  'todayBtn',
  'minimal',
  'defaultView',
  'color',
  'textColor',
  'dark',
  'square',
  'flat',
  'bordered',
] as const;

/**
 * List of QImgProps keys for type-safe UI design retrieval.
 */
const Q_IMG_PROPS = [
  'loading',
  'loadingShowDelay',
  'noSpinner',
  'noNativeMenu',
  'noTransition',
  'draggable',
  'src',
  'srcset',
  'sizes',
  'placeholderSrc',
  'errorSrc',
  'ratio',
  'initialRatio',
  'width',
  'height',
  'fit',
  'position',
  'imgClass',
  'imgStyle',
  'spinnerColor',
  'spinnerSize',
] as const;

/**
 * List of QFieldProps keys for type-safe UI design retrieval.
 */
const Q_FIELD_PROPS = [
  'clearable',
  'autofocus',
  'stackLabel',
  'hideHint',
  'clearIcon',
  'counter',
  'labelColor',
  'color',
  'bgColor',
  'dark',
  'filled',
  'outlined',
  'borderless',
  'standout',
  'hideBottomSpace',
  'rounded',
  'square',
  'dense',
  'itemAligned',
  'noErrorIcon',
] as const;

/**
 * List of QFileProps keys for type-safe UI design retrieval.
 */
const Q_FILE_PROPS = [
  'autofocus',
  'stackLabel',
  'hideHint',
  'clearable',
  'clearIcon',
  'useChips',
  'labelColor',
  'color',
  'bgColor',
  'dark',
  'filled',
  'outlined',
  'borderless',
  'standout',
  'hideBottomSpace',
  'rounded',
  'square',
  'dense',
  'itemAligned',
  'inputClass',
  'inputStyle',
  'noErrorIcon',
] as const;

/**
 * List of QSelectProps keys for type-safe UI design retrieval.
 */
const Q_SELECT_PROPS = [
  'virtualScrollHorizontal',
  'clearable',
  'autofocus',
  'hideDropdownIcon',
  'popupNoRouteDismiss',
  'fillInput',
  'transitionShow',
  'transitionHide',
  'transitionDuration',
  'behavior',
  'stackLabel',
  'hideHint',
  'clearIcon',
  'counter',
  'dropdownIcon',
  'useInput',
  'inputDebounce',
  'optionsDense',
  'optionsDark',
  'optionsSelectedClass',
  'optionsCover',
  'menuShrink',
  'disableTabSelection',
  'menuAnchor',
  'menuSelf',
  'menuOffset',
  'displayValueHtml',
  'hideSelected',
  'useChips',
  'labelColor',
  'color',
  'bgColor',
  'dark',
  'filled',
  'outlined',
  'borderless',
  'standout',
  'hideBottomSpace',
  'rounded',
  'square',
  'dense',
  'itemAligned',
  'popupContentClass',
  'popupContentStyle',
  'inputClass',
  'inputStyle',
  'noErrorIcon',
  'virtualScrollSliceSize',
  'virtualScrollSliceRatioBefore',
  'virtualScrollSliceRatioAfter',
  'virtualScrollItemSize',
  'virtualScrollStickySizeStart',
  'virtualScrollStickySizeEnd',
] as const;

/**
 * List of QDialogProps keys for type-safe UI design retrieval.
 */
const Q_DIALOG_PROPS = [
  'persistent',
  'noEscDismiss',
  'noBackdropDismiss',
  'noRouteDismiss',
  'autoClose',
  'noRefocus',
  'noFocus',
  'noShake',
  'allowFocusOutside',
  'seamless',
  'maximized',
  'fullWidth',
  'fullHeight',
  'position',
  'backdropFilter',
  'square',
  'transitionShow',
  'transitionHide',
  'transitionDuration',
] as const;

/**
 * List of QSpinnerProps keys for type-safe UI design retrieval.
 */
const Q_SPINNER_PROPS = ['size', 'color', 'thickness'] as const;

/**
 * List of QBtnDropdownProps keys for type-safe UI design retrieval.
 */
const Q_BTN_DROPDOWN_PROPS = [
  'split',
  'disableMainBtn',
  'disableDropdown',
  'persistent',
  'noEscDismiss',
  'noRouteDismiss',
  'autoClose',
  'noRefocus',
  'noFocus',
  'icon',
  'iconRight',
  'noCaps',
  'noWrap',
  'align',
  'stack',
  'stretch',
  'dropdownIcon',
  'cover',
  'menuAnchor',
  'menuSelf',
  'menuOffset',
  'size',
  'outline',
  'flat',
  'unelevated',
  'rounded',
  'push',
  'square',
  'glossy',
  'fab',
  'fabMini',
  'padding',
  'color',
  'textColor',
  'dense',
  'ripple',
  'noIconAnimation',
  'contentStyle',
  'contentClass',
  'transitionShow',
  'transitionHide',
  'transitionDuration',
] as const;

/**
 * List of QLayoutProps keys for type-safe UI design retrieval.
 */
const Q_LAYOUT_PROPS = ['view', 'container'] as const;

/**
 * List of QListProps keys for type-safe UI design retrieval.
 */
const Q_LIST_PROPS = [
  'separator',
  'padding',
  'tag',
  'bordered',
  'dense',
  'dark',
] as const;

/**
 * List of QItemProps keys for type-safe UI design retrieval.
 */
const Q_ITEM_PROPS = [
  'insetLevel',
  'tag',
  'activeClass',
  'exactActiveClass',
  'clickable',
  'manualFocus',
  'focused',
  'dark',
  'dense',
] as const;

/**
 * List of QItemSectionProps keys for type-safe UI design retrieval.
 */
const Q_ITEM_SECTION_PROPS = [
  'avatar',
  'thumbnail',
  'side',
  'top',
  'noWrap',
] as const;

/**
 * List of QFormProps keys for type-safe UI design retrieval.
 */
const Q_FORM_PROPS = [
  'autofocus',
  'noErrorFocus',
  'noResetFocus',
  'greedy',
] as const;

/**
 * List of QItemLabelProps keys for type-safe UI design retrieval.
 */
const Q_ITEM_LABEL_PROPS = ['lines', 'overline', 'caption', 'header'] as const;

/**
 * List of QBannerProps keys for type-safe UI design retrieval.
 */
const Q_BANNER_PROPS = ['inlineActions', 'dense', 'rounded', 'dark'] as const;

/**
 * List of QMenuProps keys for type-safe UI design retrieval.
 */
const Q_MENU_PROPS = [
  'contextMenu',
  'touchPosition',
  'persistent',
  'noEscDismiss',
  'noRouteDismiss',
  'autoClose',
  'separateClosePopup',
  'noRefocus',
  'noFocus',
  'fit',
  'cover',
  'anchor',
  'self',
  'offset',
  'dark',
  'square',
  'maxHeight',
  'maxWidth',
  'transitionShow',
  'transitionHide',
  'transitionDuration',
] as const;

/**
 * List of QTreeProps keys for type-safe UI design retrieval.
 */
const Q_TREE_PROPS = [
  'tickStrategy',
  'noSelectionUnset',
  'defaultExpandAll',
  'accordion',
  'noTransition',
  'noConnectors',
  'color',
  'controlColor',
  'textColor',
  'selectedColor',
  'dense',
  'dark',
  'duration',
] as const;

/**
 * List of QSplitterProps keys for type-safe UI design retrieval.
 */
const Q_SPLITTER_PROPS = [
  'horizontal',
  'limits',
  'modelValue',
  'reverse',
  'unit',
  'disable',
  'beforeClass',
  'afterClass',
  'separatorClass',
  'separatorStyle',
  'dark',
] as const;

const Q_SEPARATOR_PROPS = [
  'spaced',
  'inset',
  'vertical',
  'dark',
  'size',
  'color',
] as const;

const Q_OPTION_GROUP_PROPS = [
  'keepColor',
  'type',
  'leftLabel',
  'inline',
  'size',
  'color',
  'dark',
  'dense',
] as const;

const Q_SCROLL_AREA_PROPS = [
  'visible',
  'delay',
  'dark',
  'verticalOffset',
  'horizontalOffset',
  'barStyle',
  'verticalBarStyle',
  'horizontalBarStyle',
  'thumbStyle',
  'verticalThumbStyle',
  'horizontalThumbStyle',
  'contentStyle',
  'contentActiveStyle',
] as const;

const DRAGGABLE_PROPS = [
  'tag',
  'sort',
  'delay',
  'delayOnTouchOnly',
  'touchStartThreshold',
  'disabled',
  'animation',
  'easing',
  'handle',
  'filter',
  'draggable',
  'ghostClass',
  'chosenClass',
  'dragClass',
  'swapThreshold',
  'invertSwap',
  'invertedSwapThreshold',
  'direction',
  'forceFallback',
  'fallbackClass',
  'fallbackOnBody',
  'fallbackTolerance',
  'emptyInsertThreshold',
  'scroll',
  'scrollSensitivity',
  'scrollSpeed',
] as const;

/**
 * Maps Quasar component names to their respective props keys for UI design retrieval.
 */
export const Q_COMPONENT_PROPS: Record<QComponentName, readonly string[]> = {
  'q-avatar': Q_AVATAR_PROPS,
  'q-badge': Q_BADGE_PROPS,
  'q-banner': Q_BANNER_PROPS,
  'q-btn': Q_BTN_PROPS,
  'q-btn-dropdown': Q_BTN_DROPDOWN_PROPS,
  'q-card': Q_CARD_PROPS,
  'q-card-actions': Q_CARD_ACTIONS_PROPS,
  'q-card-section': Q_CARD_SECTION_PROPS,
  'q-checkbox': Q_CHECKBOX_PROPS,
  'q-date': Q_DATE_PROPS,
  'q-dialog': Q_DIALOG_PROPS,
  'q-field': Q_FIELD_PROPS,
  'q-file': Q_FILE_PROPS,
  'q-form': Q_FORM_PROPS,
  'q-header': Q_HEADER_PROPS,
  'q-icon': Q_ICON_PROPS,
  'q-chip': Q_CHIP_PROPS,
  'q-img': Q_IMG_PROPS,
  'q-input': Q_INPUT_PROPS,
  'q-item': Q_ITEM_PROPS,
  'q-item-label': Q_ITEM_LABEL_PROPS,
  'q-item-section': Q_ITEM_SECTION_PROPS,
  'q-layout': Q_LAYOUT_PROPS,
  'q-list': Q_LIST_PROPS,
  'q-menu': Q_MENU_PROPS,
  'q-option-group': Q_OPTION_GROUP_PROPS,
  'q-route-tab': Q_ROUTE_TAB_PROPS,
  'q-scroll-area': Q_SCROLL_AREA_PROPS,
  'q-select': Q_SELECT_PROPS,
  'q-separator': Q_SEPARATOR_PROPS,
  'q-spinner': Q_SPINNER_PROPS,
  'q-splitter': Q_SPLITTER_PROPS,
  'q-table': Q_TABLE_PROPS,
  'q-tabs': Q_TABS_PROPS,
  'q-toggle': Q_TOGGLE_PROPS,
  'q-toolbar': Q_TOOLBAR_PROPS,
  'q-toolbar-title': Q_TOOLBAR_TITLE_PROPS,
  'q-tree': Q_TREE_PROPS,
} as const;

/**
 * Maps third-party component names to their respective props keys for UI design retrieval.
 */
export const THIRD_PARTY_COMPONENT_PROPS: Record<
  ThirdPartyComponentName,
  readonly string[]
> = {
  draggable: DRAGGABLE_PROPS,
} as const;

/**
 * Subset of QBtn props supported in UI design configuration.
 */
export type LinPulsarQBtnProps = Pick<QBtnProps, (typeof Q_BTN_PROPS)[number]>;

/**
 * Subset of QTabs props supported in UI design configuration.
 */
export type LinPulsarQTabsProps = Pick<
  QTabsProps,
  (typeof Q_TABS_PROPS)[number]
>;

/**
 * Subset of QRouteTab props supported in UI design configuration.
 */
export type LinPulsarQRouteTabProps = Pick<
  QRouteTabProps,
  (typeof Q_ROUTE_TAB_PROPS)[number]
>;

/**
 * Subset of QHeader props supported in UI design configuration.
 */
export type LinPulsarQHeaderProps = Pick<
  QHeaderProps,
  (typeof Q_HEADER_PROPS)[number]
>;

/**
 * Subset of QHeader props supported in UI design configuration.
 */
export type LinPulsarQToolbarProps = Pick<
  QToolbarProps,
  (typeof Q_TOOLBAR_PROPS)[number]
>;

/**
 * Subset of QToolbarTitle props supported in UI design configuration.
 */
export type LinPulsarQToolbarTitleProps = Pick<
  QToolbarTitleProps,
  (typeof Q_TOOLBAR_TITLE_PROPS)[number]
>;

/**
 * Subset of QAvatar props supported in UI design configuration.
 */
export type LinPulsarQAvatarProps = Pick<
  QAvatarProps,
  (typeof Q_AVATAR_PROPS)[number]
>;

/**
 * Subset of QBadge props supported in UI design configuration.
 */
export type LinPulsarQBadgeProps = Pick<
  QBadgeProps,
  (typeof Q_BADGE_PROPS)[number]
>;

/**
 * Subset of QTable props supported in UI design configuration.
 */
export type LinPulsarQTableProps = Pick<
  QTableProps,
  (typeof Q_TABLE_PROPS)[number]
>;

/**
 * Subset of QCard props supported in UI design configuration.
 */
export type LinPulsarQCardProps = Pick<
  QCardProps,
  (typeof Q_CARD_PROPS)[number]
>;

/**
 * Subset of QCardActions props supported in UI design configuration.
 */
export type LinPulsarQCardActionsProps = Pick<
  QCardActionsProps,
  (typeof Q_CARD_ACTIONS_PROPS)[number]
>;

/**
 * Subset of QCardSection props supported in UI design configuration.
 */
export type LinPulsarQCardSectionProps = Pick<
  QCardSectionProps,
  (typeof Q_CARD_SECTION_PROPS)[number]
>;

/**
 * Subset of QCheckboxProps props supported in UI design configuration.
 */
export type LinPulsarQCheckboxProps = Pick<
  QCheckboxProps,
  (typeof Q_CHECKBOX_PROPS)[number]
>;

/**
 * Subset of QIcon props supported in UI design configuration.
 */
export type LinPulsarQIconProps = Pick<
  QIconProps,
  (typeof Q_ICON_PROPS)[number]
>;

/**
 * Subset of QChip props supported in UI design configuration.
 */
export type LinPulsarQChipProps = Pick<
  QChipProps,
  (typeof Q_CHIP_PROPS)[number]
>;

/**
 * Subset of QToggle props supported in UI design configuration.
 */
export type LinPulsarQToggleProps = Pick<
  QToggleProps,
  (typeof Q_TOGGLE_PROPS)[number]
>;

/**
 * Subset of QInput props supported in UI design configuration.
 */
export type LinPulsarQInputProps = Pick<
  QInputProps,
  (typeof Q_INPUT_PROPS)[number]
>;

/**
 * Subset of QInput props supported in UI design configuration.
 */
export type LinPulsarQDateProps = Pick<
  QDateProps,
  (typeof Q_DATE_PROPS)[number]
>;

/**
 * Subset of QImg props supported in UI design configuration.
 */
export type LinPulsarQImgProps = Pick<QImgProps, (typeof Q_IMG_PROPS)[number]>;

/**
 * Subset of QFieldProps props supported in UI design configuration.
 */
export type LinPulsarQFieldProps = Pick<
  QFieldProps,
  (typeof Q_FIELD_PROPS)[number]
>;

/**
 * Subset of QFile props supported in UI design configuration.
 */
export type LinPulsarQFileProps = Pick<
  QFileProps,
  (typeof Q_FILE_PROPS)[number]
>;

/**
 * Subset of QForm props supported in UI design configuration.
 */
export type LinPulsarQFormProps = Pick<
  QFormProps,
  (typeof Q_FORM_PROPS)[number]
>;

/**
 * Subset of QSelect props supported in UI design configuration.
 */
export type LinPulsarQSelectProps = Pick<
  QSelectProps,
  (typeof Q_SELECT_PROPS)[number]
>;

/**
 * Subset of QDialog props supported in UI design configuration.
 */
export type LinPulsarQDialogProps = Pick<
  QDialogProps,
  (typeof Q_DIALOG_PROPS)[number]
>;

/**
 * Subset of QSpinner props supported in UI design configuration.
 */
export type LinPulsarQSpinnerProps = Pick<
  QSpinnerProps,
  (typeof Q_SPINNER_PROPS)[number]
>;

/**
 * Subset of QBtnDropdown props supported in UI design configuration.
 */
export type LinPulsarQBtnDropdownProps = Pick<
  QBtnDropdownProps,
  (typeof Q_BTN_DROPDOWN_PROPS)[number]
>;

/**
 * Subset of QLayoutProps props supported in UI design configuration.
 */
export type LinPulsarQLayoutProps = Pick<
  QLayoutProps,
  (typeof Q_LAYOUT_PROPS)[number]
>;

/**
 * Subset of QListProps props supported in UI design configuration.
 */
export type LinPulsarQListProps = Pick<
  QListProps,
  (typeof Q_LIST_PROPS)[number]
>;

/**
 * Subset of QItemProps props supported in UI design configuration.
 */
export type LinPulsarQItemProps = Pick<
  QItemProps,
  (typeof Q_ITEM_PROPS)[number]
>;

/**
 * Subset of QItemSectionProps props supported in UI design configuration.
 */
export type LinPulsarQItemSectionProps = Pick<
  QItemSectionProps,
  (typeof Q_ITEM_SECTION_PROPS)[number]
>;

/**
 * Subset of QItemLabelProps props supported in UI design configuration.
 */
export type LinPulsarQItemLabelProps = Pick<
  QItemLabelProps,
  (typeof Q_ITEM_LABEL_PROPS)[number]
>;

/**
 * Subset of QBannerProps props supported in UI design configuration.
 */
export type LinPulsarQBannerProps = Pick<
  QBannerProps,
  (typeof Q_BANNER_PROPS)[number]
>;

/**
 * Subset of QMenuProps props supported in UI design configuration.
 */
export type LinPulsarQMenuProps = Pick<
  QMenuProps,
  (typeof Q_MENU_PROPS)[number]
>;

/**
 * Subset of QTreeProps props supported in UI design configuration.
 */
export type LinPulsarQTreeProps = Pick<
  QTreeProps,
  (typeof Q_TREE_PROPS)[number]
>;

/**
 * Subset of QSplitter props supported in UI design configuration.
 */
export type LinPulsarQSplitterProps = Pick<
  QSplitterProps,
  (typeof Q_SPLITTER_PROPS)[number]
>;

/**
 * Subset of QSeparator props supported in UI design configuration.
 */
export type LinPulsarQSeparatorProps = Pick<
  QSeparatorProps,
  (typeof Q_SEPARATOR_PROPS)[number]
>;

/**
 * Subset of QOptionGroup props supported in UI design configuration.
 */
export type LinPulsarQOptionGroupProps = Pick<
  QOptionGroupProps,
  (typeof Q_OPTION_GROUP_PROPS)[number]
>;

/**
 * Subset of QScrollArea props supported in UI design configuration.
 */
export type LinPulsarQScrollAreaProps = Pick<
  QScrollAreaProps,
  (typeof Q_SCROLL_AREA_PROPS)[number]
>;

/**
 * Subset of vue-draggable-next (SortableJS) props supported in UI design configuration.
 * Covers style, display, and user interaction behavior — not internal SortableJS mechanics.
 */
export type LinPulsarDraggableProps = {
  /** HTML element or component used as the list wrapper. */
  tag?: string;
  /** Whether items in the list can be reordered by the user. */
  sort?: boolean;
  /** Delay in milliseconds before drag starts after mousedown/touchstart. */
  delay?: number;
  /** Apply the delay only on touch devices. */
  delayOnTouchOnly?: boolean;
  /** Minimum pointer movement (px) before a touch event is treated as a drag. */
  touchStartThreshold?: number;
  /** Disables all drag interaction when true. */
  disabled?: boolean;
  /** Duration (ms) of the reorder animation when items shift position. */
  animation?: number;
  /** CSS easing function applied to the reorder animation. */
  easing?: string;
  /** CSS selector for the drag handle element within each item. */
  handle?: string;
  /** CSS selector for elements within an item that should not trigger dragging. */
  filter?: string;
  /** CSS selector restricting which child elements are draggable. */
  draggable?: string;
  /** CSS class added to the placeholder element shown at the original position during drag. */
  ghostClass?: string;
  /** CSS class added to the item while it is selected (mousedown / touchstart). */
  chosenClass?: string;
  /** CSS class added to the item while it is being dragged. */
  dragClass?: string;
  /** Fraction of an item's surface that must overlap the target before a swap is triggered (0–1). */
  swapThreshold?: number;
  /** Inverts the swap detection so that the swap zone is at the edges rather than the center. */
  invertSwap?: boolean;
  /** Swap threshold used when invertSwap is active; falls back to swapThreshold when omitted. */
  invertedSwapThreshold?: number;
  /** Drag direction; defaults to automatic detection when omitted. */
  direction?: 'horizontal' | 'vertical';
  /** Forces use of the fallback drag implementation instead of the HTML5 Drag and Drop API. */
  forceFallback?: boolean;
  /** CSS class added to the clone used when the HTML5 drag API is unavailable. */
  fallbackClass?: string;
  /** Appends the fallback clone to document.body instead of the sortable container. */
  fallbackOnBody?: boolean;
  /** Minimum pointer movement (px) before the fallback drag clone starts moving. */
  fallbackTolerance?: number;
  /** Distance in pixels from the edges of an empty list within which a dragged item can be inserted. */
  emptyInsertThreshold?: number;
  /** Enable auto-scrolling during drag; can be a boolean or a specific scroll container element. */
  scroll?: boolean;
  /** Distance in pixels from the scroll container edge at which auto-scroll triggers. */
  scrollSensitivity?: number;
  /** Auto-scroll speed in pixels per frame. */
  scrollSpeed?: number;
};

/**
 * List of the HTML attributes every component accepts, read next to its props by `ui()`.
 */
export const HTML_ATTRS = ['class', 'style'] as const;

/**
 * HTML attributes a design entry can set on any component: Vue forwards them to its root element.
 */
export interface LinPulsarHtmlAttrs {
  /** CSS classes added to the component root element (e.g. "text-negative"). */
  class?: string;
  /** Inline style added to the component root element (e.g. "font-style: italic"). */
  style?: string;
}

/**
 * Union type of all supported Quasar component props subsets.
 */
export type LinPulsarQComponentProps =
  | LinPulsarQAvatarProps
  | LinPulsarQBadgeProps
  | LinPulsarQBannerProps
  | LinPulsarQBtnDropdownProps
  | LinPulsarQBtnProps
  | LinPulsarQCardActionsProps
  | LinPulsarQCardProps
  | LinPulsarQCardSectionProps
  | LinPulsarQCheckboxProps
  | LinPulsarQDateProps
  | LinPulsarQDialogProps
  | LinPulsarQFieldProps
  | LinPulsarQFileProps
  | LinPulsarQFormProps
  | LinPulsarQHeaderProps
  | LinPulsarQIconProps
  | LinPulsarQChipProps
  | LinPulsarQImgProps
  | LinPulsarQInputProps
  | LinPulsarQItemLabelProps
  | LinPulsarQItemProps
  | LinPulsarQItemSectionProps
  | LinPulsarQListProps
  | LinPulsarQMenuProps
  | LinPulsarQOptionGroupProps
  | LinPulsarQRouteTabProps
  | LinPulsarQScrollAreaProps
  | LinPulsarQSelectProps
  | LinPulsarQSeparatorProps
  | LinPulsarQSpinnerProps
  | LinPulsarQSplitterProps
  | LinPulsarQTableProps
  | LinPulsarQTabsProps
  | LinPulsarQToggleProps
  | LinPulsarQToolbarProps
  | LinPulsarQToolbarTitleProps
  | LinPulsarQTreeProps;

/**
 * Valid Quasar component names for type-safe UI design retrieval.
 */
export type QComponentName =
  | 'q-avatar'
  | 'q-badge'
  | 'q-banner'
  | 'q-btn'
  | 'q-btn-dropdown'
  | 'q-card'
  | 'q-card-actions'
  | 'q-card-section'
  | 'q-checkbox'
  | 'q-date'
  | 'q-dialog'
  | 'q-field'
  | 'q-file'
  | 'q-form'
  | 'q-header'
  | 'q-icon'
  | 'q-chip'
  | 'q-img'
  | 'q-input'
  | 'q-item'
  | 'q-item-label'
  | 'q-item-section'
  | 'q-layout'
  | 'q-list'
  | 'q-menu'
  | 'q-option-group'
  | 'q-route-tab'
  | 'q-scroll-area'
  | 'q-select'
  | 'q-separator'
  | 'q-spinner'
  | 'q-splitter'
  | 'q-table'
  | 'q-tabs'
  | 'q-toggle'
  | 'q-toolbar'
  | 'q-toolbar-title'
  | 'q-tree';

/**
 * Valid third-party component names for type-safe UI design retrieval.
 */
export type ThirdPartyComponentName = 'draggable';

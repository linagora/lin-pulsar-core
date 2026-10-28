import type { NamedColor, QAvatarProps, QBadgeProps, QBannerProps, QBtnDropdownProps, QBtnProps, QCardActionsProps, QCardProps, QCardSectionProps, QCheckboxProps, QChipProps, QDateProps, QDialogProps, QFieldProps, QFileProps, QFormProps, QHeaderProps, QIconProps, QImgProps, QInputProps, QItemLabelProps, QItemProps, QItemSectionProps, QLayoutProps, QListProps, QMenuProps, QOptionGroupProps, QRouteTabProps, QScrollAreaProps, QSelectProps, QSeparatorProps, QSpinnerProps, QSplitterProps, QTableProps, QTabsProps, QToggleProps, QToolbarProps, QToolbarTitleProps, QTreeProps, VueClassProp, VueStyleObjectProp, VueStyleProp } from 'quasar';
/**
 * Represents a single primitive value in the UI configuration.
 */
export type UiDesignValue = string | number | boolean | NamedColor | VueStyleProp | VueClassProp | VueStyleObjectProp;
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
declare const Q_BTN_PROPS: readonly ["icon", "iconRight", "noCaps", "noWrap", "align", "stack", "stretch", "size", "outline", "flat", "unelevated", "rounded", "push", "square", "glossy", "fab", "fabMini", "padding", "color", "textColor", "dense", "ripple", "round"];
/**
 * List of QTabsProps keys for type-safe UI design retrieval.
 */
declare const Q_TABS_PROPS: readonly ["vertical", "outsideArrows", "mobileArrows", "align", "breakpoint", "leftIcon", "rightIcon", "stretch", "shrink", "switchIndicator", "narrowIndicator", "inlineLabel", "noCaps", "activeColor", "activeBgColor", "indicatorColor", "contentClass", "activeClass", "dense"];
/**
 * List of QRouteTabProps keys for type-safe UI design retrieval.
 */
declare const Q_ROUTE_TAB_PROPS: readonly ["icon", "activeClass", "exactActiveClass", "noCaps", "alert", "contentClass", "ripple"];
/**
 * List of QHeaderProps keys for type-safe UI design retrieval.
 */
declare const Q_HEADER_PROPS: readonly ["reveal", "revealOffset", "elevated", "bordered"];
/**
 * List of QToolbarProps keys for type-safe UI design retrieval.
 */
declare const Q_TOOLBAR_PROPS: readonly ["inset"];
/**
 * List of QToolbarTitleProps keys for type-safe UI design retrieval.
 */
declare const Q_TOOLBAR_TITLE_PROPS: readonly ["shrink"];
/**
 * List of QAvatarProps keys for type-safe UI design retrieval.
 */
declare const Q_AVATAR_PROPS: readonly ["icon", "size", "fontSize", "color", "textColor", "square", "rounded"];
/**
 * List of QBadgeProps keys for type-safe UI design retrieval.
 */
declare const Q_BADGE_PROPS: readonly ["floating", "multiLine", "align", "color", "textColor", "transparent", "outline", "rounded"];
/**
 * List of QTableProps keys for type-safe UI design retrieval.
 */
declare const Q_TABLE_PROPS: readonly ["virtualScrollItemSize", "virtualScrollStickySizeStart", "virtualScrollStickySizeEnd", "color", "iconFirstPage", "iconPrevPage", "iconNextPage", "iconLastPage", "grid", "gridHeader", "dense", "hideHeader", "hideBottom", "hideSelectedBanner", "hideNoData", "hidePagination", "flat", "bordered", "square", "separator", "wrapCells", "tableStyle", "tableClass", "tableHeaderStyle", "tableHeaderClass", "cardContainerStyle", "cardContainerClass", "cardStyle", "cardClass", "titleClass"];
/**
 * List of QCardProps keys for type-safe UI design retrieval.
 */
declare const Q_CARD_PROPS: readonly ["dark", "square", "flat", "bordered"];
/**
 * List of QCardActionsProps keys for type-safe UI design retrieval.
 */
declare const Q_CARD_ACTIONS_PROPS: readonly ["align", "vertical"];
/**
 * List of QCardSectionProps keys for type-safe UI design retrieval.
 */
declare const Q_CARD_SECTION_PROPS: readonly ["horizontal"];
/**
 * List of QIconProps keys for type-safe UI design retrieval.
 */
declare const Q_ICON_PROPS: readonly ["left", "right", "name", "size", "color"];
/**
 * List of QChipProps keys for type-safe UI design retrieval.
 */
declare const Q_CHIP_PROPS: readonly ["removeAriaLabel", "icon", "iconRight", "iconRemove", "iconSelected", "dense", "size", "dark", "color", "textColor", "square", "outline", "ripple"];
/**
 * List of QToggleProps keys for type-safe UI design retrieval.
 */
declare const Q_TOGGLE_PROPS: readonly ["toggleOrder", "toggleIndeterminate", "keepColor", "icon", "checkedIcon", "uncheckedIcon", "indeterminateIcon", "leftLabel", "size", "color", "dark", "dense", "iconColor"];
/**
 * List of QToggleProps keys for type-safe UI design retrieval.
 */
declare const Q_CHECKBOX_PROPS: readonly ["toggleOrder", "toggleIndeterminate", "keepColor", "checkedIcon", "uncheckedIcon", "indeterminateIcon", "size", "color", "dark", "dense"];
/**
 * List of QInputProps keys for type-safe UI design retrieval.
 */
declare const Q_INPUT_PROPS: readonly ["autofocus", "stackLabel", "hideHint", "clearable", "clearIcon", "counter", "autogrow", "fillMask", "reverseFillMask", "unmaskedValue", "debounce", "labelColor", "color", "bgColor", "dark", "filled", "outlined", "borderless", "standout", "hideBottomSpace", "rounded", "square", "dense", "itemAligned", "noErrorIcon"];
/**
 * List of QDateProps keys for type-safe UI design retrieval.
 */
declare const Q_DATE_PROPS: readonly ["landscape", "yearsInMonthView", "todayBtn", "minimal", "defaultView", "color", "textColor", "dark", "square", "flat", "bordered"];
/**
 * List of QImgProps keys for type-safe UI design retrieval.
 */
declare const Q_IMG_PROPS: readonly ["loading", "loadingShowDelay", "noSpinner", "noNativeMenu", "noTransition", "draggable", "src", "srcset", "sizes", "placeholderSrc", "errorSrc", "ratio", "initialRatio", "width", "height", "fit", "position", "imgClass", "imgStyle", "spinnerColor", "spinnerSize"];
/**
 * List of QFieldProps keys for type-safe UI design retrieval.
 */
declare const Q_FIELD_PROPS: readonly ["clearable", "autofocus", "stackLabel", "hideHint", "clearIcon", "counter", "labelColor", "color", "bgColor", "dark", "filled", "outlined", "borderless", "standout", "hideBottomSpace", "rounded", "square", "dense", "itemAligned", "noErrorIcon"];
/**
 * List of QFileProps keys for type-safe UI design retrieval.
 */
declare const Q_FILE_PROPS: readonly ["autofocus", "stackLabel", "hideHint", "clearable", "clearIcon", "useChips", "labelColor", "color", "bgColor", "dark", "filled", "outlined", "borderless", "standout", "hideBottomSpace", "rounded", "square", "dense", "itemAligned", "inputClass", "inputStyle", "noErrorIcon"];
/**
 * List of QSelectProps keys for type-safe UI design retrieval.
 */
declare const Q_SELECT_PROPS: readonly ["virtualScrollHorizontal", "clearable", "autofocus", "hideDropdownIcon", "popupNoRouteDismiss", "fillInput", "transitionShow", "transitionHide", "transitionDuration", "behavior", "stackLabel", "hideHint", "clearIcon", "counter", "dropdownIcon", "useInput", "inputDebounce", "optionsDense", "optionsDark", "optionsSelectedClass", "optionsCover", "menuShrink", "disableTabSelection", "menuAnchor", "menuSelf", "menuOffset", "displayValueHtml", "hideSelected", "useChips", "labelColor", "color", "bgColor", "dark", "filled", "outlined", "borderless", "standout", "hideBottomSpace", "rounded", "square", "dense", "itemAligned", "popupContentClass", "popupContentStyle", "inputClass", "inputStyle", "noErrorIcon", "virtualScrollSliceSize", "virtualScrollSliceRatioBefore", "virtualScrollSliceRatioAfter", "virtualScrollItemSize", "virtualScrollStickySizeStart", "virtualScrollStickySizeEnd"];
/**
 * List of QDialogProps keys for type-safe UI design retrieval.
 */
declare const Q_DIALOG_PROPS: readonly ["persistent", "noEscDismiss", "noBackdropDismiss", "noRouteDismiss", "autoClose", "noRefocus", "noFocus", "noShake", "allowFocusOutside", "seamless", "maximized", "fullWidth", "fullHeight", "position", "backdropFilter", "square", "transitionShow", "transitionHide", "transitionDuration"];
/**
 * List of QSpinnerProps keys for type-safe UI design retrieval.
 */
declare const Q_SPINNER_PROPS: readonly ["size", "color", "thickness"];
/**
 * List of QBtnDropdownProps keys for type-safe UI design retrieval.
 */
declare const Q_BTN_DROPDOWN_PROPS: readonly ["split", "disableMainBtn", "disableDropdown", "persistent", "noEscDismiss", "noRouteDismiss", "autoClose", "noRefocus", "noFocus", "icon", "iconRight", "noCaps", "noWrap", "align", "stack", "stretch", "dropdownIcon", "cover", "menuAnchor", "menuSelf", "menuOffset", "size", "outline", "flat", "unelevated", "rounded", "push", "square", "glossy", "fab", "fabMini", "padding", "color", "textColor", "dense", "ripple", "noIconAnimation", "contentStyle", "contentClass", "transitionShow", "transitionHide", "transitionDuration"];
/**
 * List of QLayoutProps keys for type-safe UI design retrieval.
 */
declare const Q_LAYOUT_PROPS: readonly ["view", "container"];
/**
 * List of QListProps keys for type-safe UI design retrieval.
 */
declare const Q_LIST_PROPS: readonly ["separator", "padding", "tag", "bordered", "dense", "dark"];
/**
 * List of QItemProps keys for type-safe UI design retrieval.
 */
declare const Q_ITEM_PROPS: readonly ["insetLevel", "tag", "activeClass", "exactActiveClass", "clickable", "manualFocus", "focused", "dark", "dense"];
/**
 * List of QItemSectionProps keys for type-safe UI design retrieval.
 */
declare const Q_ITEM_SECTION_PROPS: readonly ["avatar", "thumbnail", "side", "top", "noWrap"];
/**
 * List of QFormProps keys for type-safe UI design retrieval.
 */
declare const Q_FORM_PROPS: readonly ["autofocus", "noErrorFocus", "noResetFocus", "greedy"];
/**
 * List of QItemLabelProps keys for type-safe UI design retrieval.
 */
declare const Q_ITEM_LABEL_PROPS: readonly ["lines", "overline", "caption", "header"];
/**
 * List of QBannerProps keys for type-safe UI design retrieval.
 */
declare const Q_BANNER_PROPS: readonly ["inlineActions", "dense", "rounded", "dark"];
/**
 * List of QMenuProps keys for type-safe UI design retrieval.
 */
declare const Q_MENU_PROPS: readonly ["contextMenu", "touchPosition", "persistent", "noEscDismiss", "noRouteDismiss", "autoClose", "separateClosePopup", "noRefocus", "noFocus", "fit", "cover", "anchor", "self", "offset", "dark", "square", "maxHeight", "maxWidth", "transitionShow", "transitionHide", "transitionDuration"];
/**
 * List of QTreeProps keys for type-safe UI design retrieval.
 */
declare const Q_TREE_PROPS: readonly ["tickStrategy", "noSelectionUnset", "defaultExpandAll", "accordion", "noTransition", "noConnectors", "color", "controlColor", "textColor", "selectedColor", "dense", "dark", "duration"];
/**
 * List of QSplitterProps keys for type-safe UI design retrieval.
 */
declare const Q_SPLITTER_PROPS: readonly ["horizontal", "limits", "modelValue", "reverse", "unit", "disable", "beforeClass", "afterClass", "separatorClass", "separatorStyle", "dark"];
declare const Q_SEPARATOR_PROPS: readonly ["spaced", "inset", "vertical", "dark", "size", "color"];
declare const Q_OPTION_GROUP_PROPS: readonly ["keepColor", "type", "leftLabel", "inline", "size", "color", "dark", "dense"];
declare const Q_SCROLL_AREA_PROPS: readonly ["visible", "delay", "dark", "verticalOffset", "horizontalOffset", "barStyle", "verticalBarStyle", "horizontalBarStyle", "thumbStyle", "verticalThumbStyle", "horizontalThumbStyle", "contentStyle", "contentActiveStyle"];
/**
 * Maps Quasar component names to their respective props keys for UI design retrieval.
 */
export declare const Q_COMPONENT_PROPS: Record<QComponentName, readonly string[]>;
/**
 * Maps third-party component names to their respective props keys for UI design retrieval.
 */
export declare const THIRD_PARTY_COMPONENT_PROPS: Record<ThirdPartyComponentName, readonly string[]>;
/**
 * Subset of QBtn props supported in UI design configuration.
 */
export type LinPulsarQBtnProps = Pick<QBtnProps, (typeof Q_BTN_PROPS)[number]>;
/**
 * Subset of QTabs props supported in UI design configuration.
 */
export type LinPulsarQTabsProps = Pick<QTabsProps, (typeof Q_TABS_PROPS)[number]>;
/**
 * Subset of QRouteTab props supported in UI design configuration.
 */
export type LinPulsarQRouteTabProps = Pick<QRouteTabProps, (typeof Q_ROUTE_TAB_PROPS)[number]>;
/**
 * Subset of QHeader props supported in UI design configuration.
 */
export type LinPulsarQHeaderProps = Pick<QHeaderProps, (typeof Q_HEADER_PROPS)[number]>;
/**
 * Subset of QHeader props supported in UI design configuration.
 */
export type LinPulsarQToolbarProps = Pick<QToolbarProps, (typeof Q_TOOLBAR_PROPS)[number]>;
/**
 * Subset of QToolbarTitle props supported in UI design configuration.
 */
export type LinPulsarQToolbarTitleProps = Pick<QToolbarTitleProps, (typeof Q_TOOLBAR_TITLE_PROPS)[number]>;
/**
 * Subset of QAvatar props supported in UI design configuration.
 */
export type LinPulsarQAvatarProps = Pick<QAvatarProps, (typeof Q_AVATAR_PROPS)[number]>;
/**
 * Subset of QBadge props supported in UI design configuration.
 */
export type LinPulsarQBadgeProps = Pick<QBadgeProps, (typeof Q_BADGE_PROPS)[number]>;
/**
 * Subset of QTable props supported in UI design configuration.
 */
export type LinPulsarQTableProps = Pick<QTableProps, (typeof Q_TABLE_PROPS)[number]>;
/**
 * Subset of QCard props supported in UI design configuration.
 */
export type LinPulsarQCardProps = Pick<QCardProps, (typeof Q_CARD_PROPS)[number]>;
/**
 * Subset of QCardActions props supported in UI design configuration.
 */
export type LinPulsarQCardActionsProps = Pick<QCardActionsProps, (typeof Q_CARD_ACTIONS_PROPS)[number]>;
/**
 * Subset of QCardSection props supported in UI design configuration.
 */
export type LinPulsarQCardSectionProps = Pick<QCardSectionProps, (typeof Q_CARD_SECTION_PROPS)[number]>;
/**
 * Subset of QCheckboxProps props supported in UI design configuration.
 */
export type LinPulsarQCheckboxProps = Pick<QCheckboxProps, (typeof Q_CHECKBOX_PROPS)[number]>;
/**
 * Subset of QIcon props supported in UI design configuration.
 */
export type LinPulsarQIconProps = Pick<QIconProps, (typeof Q_ICON_PROPS)[number]>;
/**
 * Subset of QChip props supported in UI design configuration.
 */
export type LinPulsarQChipProps = Pick<QChipProps, (typeof Q_CHIP_PROPS)[number]>;
/**
 * Subset of QToggle props supported in UI design configuration.
 */
export type LinPulsarQToggleProps = Pick<QToggleProps, (typeof Q_TOGGLE_PROPS)[number]>;
/**
 * Subset of QInput props supported in UI design configuration.
 */
export type LinPulsarQInputProps = Pick<QInputProps, (typeof Q_INPUT_PROPS)[number]>;
/**
 * Subset of QInput props supported in UI design configuration.
 */
export type LinPulsarQDateProps = Pick<QDateProps, (typeof Q_DATE_PROPS)[number]>;
/**
 * Subset of QImg props supported in UI design configuration.
 */
export type LinPulsarQImgProps = Pick<QImgProps, (typeof Q_IMG_PROPS)[number]>;
/**
 * Subset of QFieldProps props supported in UI design configuration.
 */
export type LinPulsarQFieldProps = Pick<QFieldProps, (typeof Q_FIELD_PROPS)[number]>;
/**
 * Subset of QFile props supported in UI design configuration.
 */
export type LinPulsarQFileProps = Pick<QFileProps, (typeof Q_FILE_PROPS)[number]>;
/**
 * Subset of QForm props supported in UI design configuration.
 */
export type LinPulsarQFormProps = Pick<QFormProps, (typeof Q_FORM_PROPS)[number]>;
/**
 * Subset of QSelect props supported in UI design configuration.
 */
export type LinPulsarQSelectProps = Pick<QSelectProps, (typeof Q_SELECT_PROPS)[number]>;
/**
 * Subset of QDialog props supported in UI design configuration.
 */
export type LinPulsarQDialogProps = Pick<QDialogProps, (typeof Q_DIALOG_PROPS)[number]>;
/**
 * Subset of QSpinner props supported in UI design configuration.
 */
export type LinPulsarQSpinnerProps = Pick<QSpinnerProps, (typeof Q_SPINNER_PROPS)[number]>;
/**
 * Subset of QBtnDropdown props supported in UI design configuration.
 */
export type LinPulsarQBtnDropdownProps = Pick<QBtnDropdownProps, (typeof Q_BTN_DROPDOWN_PROPS)[number]>;
/**
 * Subset of QLayoutProps props supported in UI design configuration.
 */
export type LinPulsarQLayoutProps = Pick<QLayoutProps, (typeof Q_LAYOUT_PROPS)[number]>;
/**
 * Subset of QListProps props supported in UI design configuration.
 */
export type LinPulsarQListProps = Pick<QListProps, (typeof Q_LIST_PROPS)[number]>;
/**
 * Subset of QItemProps props supported in UI design configuration.
 */
export type LinPulsarQItemProps = Pick<QItemProps, (typeof Q_ITEM_PROPS)[number]>;
/**
 * Subset of QItemSectionProps props supported in UI design configuration.
 */
export type LinPulsarQItemSectionProps = Pick<QItemSectionProps, (typeof Q_ITEM_SECTION_PROPS)[number]>;
/**
 * Subset of QItemLabelProps props supported in UI design configuration.
 */
export type LinPulsarQItemLabelProps = Pick<QItemLabelProps, (typeof Q_ITEM_LABEL_PROPS)[number]>;
/**
 * Subset of QBannerProps props supported in UI design configuration.
 */
export type LinPulsarQBannerProps = Pick<QBannerProps, (typeof Q_BANNER_PROPS)[number]>;
/**
 * Subset of QMenuProps props supported in UI design configuration.
 */
export type LinPulsarQMenuProps = Pick<QMenuProps, (typeof Q_MENU_PROPS)[number]>;
/**
 * Subset of QTreeProps props supported in UI design configuration.
 */
export type LinPulsarQTreeProps = Pick<QTreeProps, (typeof Q_TREE_PROPS)[number]>;
/**
 * Subset of QSplitter props supported in UI design configuration.
 */
export type LinPulsarQSplitterProps = Pick<QSplitterProps, (typeof Q_SPLITTER_PROPS)[number]>;
/**
 * Subset of QSeparator props supported in UI design configuration.
 */
export type LinPulsarQSeparatorProps = Pick<QSeparatorProps, (typeof Q_SEPARATOR_PROPS)[number]>;
/**
 * Subset of QOptionGroup props supported in UI design configuration.
 */
export type LinPulsarQOptionGroupProps = Pick<QOptionGroupProps, (typeof Q_OPTION_GROUP_PROPS)[number]>;
/**
 * Subset of QScrollArea props supported in UI design configuration.
 */
export type LinPulsarQScrollAreaProps = Pick<QScrollAreaProps, (typeof Q_SCROLL_AREA_PROPS)[number]>;
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
export declare const HTML_ATTRS: readonly ["class", "style"];
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
export type LinPulsarQComponentProps = LinPulsarQAvatarProps | LinPulsarQBadgeProps | LinPulsarQBannerProps | LinPulsarQBtnDropdownProps | LinPulsarQBtnProps | LinPulsarQCardActionsProps | LinPulsarQCardProps | LinPulsarQCardSectionProps | LinPulsarQCheckboxProps | LinPulsarQDateProps | LinPulsarQDialogProps | LinPulsarQFieldProps | LinPulsarQFileProps | LinPulsarQFormProps | LinPulsarQHeaderProps | LinPulsarQIconProps | LinPulsarQChipProps | LinPulsarQImgProps | LinPulsarQInputProps | LinPulsarQItemLabelProps | LinPulsarQItemProps | LinPulsarQItemSectionProps | LinPulsarQListProps | LinPulsarQMenuProps | LinPulsarQOptionGroupProps | LinPulsarQRouteTabProps | LinPulsarQScrollAreaProps | LinPulsarQSelectProps | LinPulsarQSeparatorProps | LinPulsarQSpinnerProps | LinPulsarQSplitterProps | LinPulsarQTableProps | LinPulsarQTabsProps | LinPulsarQToggleProps | LinPulsarQToolbarProps | LinPulsarQToolbarTitleProps | LinPulsarQTreeProps;
/**
 * Valid Quasar component names for type-safe UI design retrieval.
 */
export type QComponentName = 'q-avatar' | 'q-badge' | 'q-banner' | 'q-btn' | 'q-btn-dropdown' | 'q-card' | 'q-card-actions' | 'q-card-section' | 'q-checkbox' | 'q-date' | 'q-dialog' | 'q-field' | 'q-file' | 'q-form' | 'q-header' | 'q-icon' | 'q-chip' | 'q-img' | 'q-input' | 'q-item' | 'q-item-label' | 'q-item-section' | 'q-layout' | 'q-list' | 'q-menu' | 'q-option-group' | 'q-route-tab' | 'q-scroll-area' | 'q-select' | 'q-separator' | 'q-spinner' | 'q-splitter' | 'q-table' | 'q-tabs' | 'q-toggle' | 'q-toolbar' | 'q-toolbar-title' | 'q-tree';
/**
 * Valid third-party component names for type-safe UI design retrieval.
 */
export type ThirdPartyComponentName = 'draggable';
export {};

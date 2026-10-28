/**
 * Dialog event for user confirmations.
 */
export type DialogEvent = {
    /**
     * Event type, expected to be 'open' or 'close'.
     */
    type: 'open' | 'close';
    /**
     * Namespace for the UI design.
     */
    uiNamespace: string;
    /**
     * I18n scope for translating the dialog content and buttons.
     */
    i18nScope: string;
};

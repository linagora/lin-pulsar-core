import type { QNotifyCreateOptions } from 'quasar';
/**
 * Composable used to emit notification events through the UiEventService.
 * It exposes a `Notify` function that publishes a UI event of type `notify`.
 * @returns An object containing the `Notify` function.
 */
export declare function useNotify(): {
    Notify: (data: QNotifyCreateOptions) => void;
};

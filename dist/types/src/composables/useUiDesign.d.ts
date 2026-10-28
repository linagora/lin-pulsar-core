import type { LinPulsarHtmlAttrs, LinPulsarQComponentProps, LinPulsarDraggableProps, QComponentName, ThirdPartyComponentName } from '../types/uiDesign';
/**
 * Composable providing access to the shared UI design configuration.
 *
 * Allows retrieving UI configuration values for a given namespace and key,
 * with automatic fallback to the `default` namespace if the value is not defined.
 * @returns An object containing the `ui` function.
 */
export declare function useUiDesign(): {
    ui: <T extends LinPulsarQComponentProps | LinPulsarDraggableProps>(uiNamespace: string, component: QComponentName | ThirdPartyComponentName, overrideProps?: Partial<T & LinPulsarHtmlAttrs>) => T & LinPulsarHtmlAttrs;
};

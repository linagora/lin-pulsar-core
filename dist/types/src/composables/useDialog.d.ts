import { type ComponentPublicInstance } from 'vue';
import { type DialogEvent } from '../types/dialogType';
/**
 * Composable to manage the state of a dialog based on events emitted by the DialogSubject.
 * @param key - The key to filter dialog events, allowing multiple dialogs to be managed independently.
 * @param onOpen - Optional callback function to execute when the dialog is opened, receiving the dialog event as an argument.
 * @returns An object containing the reactive `show` property to control the dialog visibility,
 * and the `dialogRef` to be attached to the dialog component for interact.js functionality.
 */
export declare function useDialog<T extends DialogEvent>(key: string, onOpen?: (event: T) => void): {
    show: import("vue").Ref<boolean, boolean>;
    dialogRef: import("vue").Ref<ComponentPublicInstance | null, ComponentPublicInstance | null>;
};

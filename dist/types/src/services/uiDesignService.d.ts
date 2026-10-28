import type { UiDesign } from '../types/uiDesign';
/**
 * Initializes the shared UI design instance.
 *
 * This function should be called **once** by the host application during the boot process,
 * typically after loading configuration from a file (e.g., `default.json`) or API.
 *
 * Subsequent calls are ignored and will emit a console warning.
 * @param client - The UI design object to set as the shared singleton instance.
 */
export declare function setUiDesign(client: UiDesign): void;
/**
 * Returns the shared UI design instance.
 *
 * Must be called **after** initialization via `setUiDesign()`.
 * If called before initialization, an error is thrown to prevent usage of an undefined configuration.
 * @returns The shared UI design instance.
 * @throws {Error} If the UI design instance has not been initialized.
 */
export declare function getUiDesign(): UiDesign;

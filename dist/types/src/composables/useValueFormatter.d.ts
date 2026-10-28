/**
 * Composable applying named formatters to raw values before display.
 * @returns The value formatting helpers.
 */
export declare function useValueFormatter(): {
    formatValue: (value: unknown, formatter?: string, options?: Record<string, unknown>) => unknown;
};

export declare const DEFAULT_DATE_FORMAT = "YYYY-MM-DD";
/**
 * Composable exposing dayjs utility functions.
 * @returns An object containing dayjs helper methods.
 */
export declare function useDayjs(): {
    maxDate: (dates: unknown[], format?: string) => import("dayjs").Dayjs | null;
    minDate: (dates: unknown[], format?: string) => import("dayjs").Dayjs | null;
    toDayjs: (value: unknown, format?: string) => import("dayjs").Dayjs;
};

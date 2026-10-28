/**
 * Represents the structure of an error response body returned by the linOpenFactory API.
 */
export interface LinPulsarApiErrorResponseBody {
    /**
     * The internationalized error message.
     */
    error: string;
    /**
     * The key of this internationalized message.
     */
    errorKey: string;
    /**
     * The context map associated with this message. The map contains parameters or additional
     * information for the message.
     */
    errorContext: Record<string, unknown>;
    /**
     * The HTTP status code associated with the error.
     */
    status: number;
    /**
     * The timestamp indicating when the error occurred.
     */
    timestamp: number;
}

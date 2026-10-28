/**
 * Represents a user in the system.
 */
export interface LinPulsarUser {
    /**
     * Username of the user.
     */
    username: string;
    /**
     * Email address of the user.
     */
    email: string;
    /**
     * Full name of the user.
     */
    fullName: string;
    /**
     * The list of roles assigned to the user.
     */
    roles: string[];
}

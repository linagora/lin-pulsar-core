/**
 * Navigation item structure.
 */
export interface NavigationMenuItem {
    /** Unique identifier of the navigation item. */
    id: string;
    /** I18n key used to resolve the label of the navigation item. */
    labelKey: string;
    /** Path/route of the navigation item. */
    path: string;
}

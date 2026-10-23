/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for linOpenFactory software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "linOpenFactory™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of linOpenFactory™, powered by
 * Linagora © 2009–2026. Contribute to linOpenFactory R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the linOpenFactory user interface, (ii) retain all hypertext links between linOpenFactory
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * linOpenFactory along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * linOpenFactory software.
 */

/**
 * Represents a paginated response containing a slice of data of type `T`,
 * together with detailed pagination and sorting metadata.
 *
 * This interface mirrors common backend pagination models (for example
 * Spring Data’s `Page<T>`), making it suitable for direct mapping of API
 * responses and seamless integration with data tables and lists.
 * @template T Type of the elements contained in the page.
 */
export interface Page<T> {
  /**
   * The content (list of items) on the current page.
   */
  content: T[];

  /**
   * Pagination information about the current request.
   */
  pageable: {
    /**
     * Sorting details applied on this pageable request.
     */
    sort: {
      /**
       * Whether the content is sorted.
       */
      sorted: boolean;

      /**
       * Whether the content is not sorted.
       */
      unsorted: boolean;

      /**
       * Whether the sort is empty (no sorting).
       */
      empty: boolean;
    };

    /**
     * Zero-based page index.
     */
    pageNumber: number;

    /**
     * Size of the page requested.
     */
    pageSize: number;

    /**
     * Offset of the first item in this page relative to the entire data set.
     */
    offset: number;

    /**
     * Whether the page is paged.
     */
    paged: boolean;

    /**
     * Whether the page is unpaged.
     */
    unpaged: boolean;
  };

  /**
   * Total number of pages available.
   */
  totalPages: number;

  /**
   * Total number of elements across all pages.
   */
  totalElements: number;

  /**
   * Whether this page is the last page.
   */
  last: boolean;

  /**
   * Whether this page is the first page.
   */
  first: boolean;

  /**
   * Overall sorting information (duplicate of pageable.sort).
   */
  sort: {
    /**
     * Whether this content is sorted.
     */
    sorted: boolean;
    /**
     * Whether this content is unsorted.
     */
    unsorted: boolean;
    /**
     * Whether the content is empty.
     */
    empty: boolean;
  };

  /**
   * Number of elements on this page.
   */
  numberOfElements: number;

  /**
   * Size of the page requested (duplicate of pageable.pageSize).
   */
  size: number;

  /**
   * Current page number (zero-based).
   */
  number: number;

  /**
   * Whether the current page content is empty.
   */
  empty: boolean;
}

/**
 * Standard pagination used in the application.
 */
export interface Pagination {
  /**
   * Current page number (0-based).
   */
  page: number;

  /**
   * Page size (number of items per page).
   */
  size: number;

  /**
   * Ordering, as a single `'<column>,<direction>'` string (e.g. `'name,desc'`),
   * following the Spring Data convention expected by the backend.
   */
  sort?: string;
}

/**
 * Event payload received by the Quasar QTable `@request` event.
 */
export interface QTableRequestEvent {
  /**
   * Pagination sent by the QTable.
   */
  pagination: QuasarPagination;

  /**
   * Global filter.
   */
  filter?: string;

  /**
   * Full QTable props.
   */
  props?: Record<string, unknown>;
}

/**
 * Pagination interface similar to the one used by Quasar QTable.
 */
export interface QuasarPagination {
  /**
   * Current page number (1-based).
   */
  page: number;

  /**
   * Number of rows displayed per page.
   */
  rowsPerPage: number;

  /**
   * Total number of rows (optional).
   */
  rowsNumber?: number;

  /**
   * Column used for sorting, or `null` when no sort is active.
   */
  sortBy: string | null;

  /**
   * Whether sorting is descending (true) or ascending (false).
   */
  descending: boolean;
}

/**
 * Represents a flexible set of query parameters used to filter API requests.
 *
 * Keys are free-form strings, and values can be of type `string`, `number`, `boolean`, or `undefined`.
 * This allows passing arbitrary filters without needing a strongly-typed object for each endpoint.
 */
export interface QueryFilter {
  [key: string]: string | number | boolean | undefined;
}

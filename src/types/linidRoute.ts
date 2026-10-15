/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for LinID Identity Manager software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "LinID™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of LinID™, powered by
 * Linagora © 2009–2013. Contribute to LinID R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the LinID Identity Manager user interface, (ii) retain all hypertext links between LinID Identity Manager
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * LinID Identity Manager along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * LinID Identity Manager software.
 */

import type { ModuleComponentRef } from './module';

/**
 * Represents a route exposed by a remote module, supporting recursive children for nested routing.
 * This mirrors Vue Router’s route structure, except that `component`
 * refers to a remote module federation component identifier rather
 * than a local Vue component. The host will dynamically load the
 * remote component and register the route in the Vue Router instance.
 *
 * Children are recursively defined as an array of LinidRoute, allowing for multi-level nesting.
 */
export type LinidRoutes = LinidRoute[];

/**
 * Defines a route exposed by a remote module via Module Federation.
 */
export interface LinidRoute {
  /** Optional unique route name, used by Vue Router for deterministic override. */
  name?: string;
  /** Absolute or nested route path (e.g. "/admin" or "settings"). */
  path: string;
  /**
   * Component reference: a remote component name resolved through Module Federation (e.g. "remoteA/ComponentX"), or
   * a zone entry referencing a federated or locally registered component. A string may be a Nunjucks template; when
   * the template is a single expression resolving to a zone entry in the host configuration (e.g.
   * "{{ config.options.page }}"), the entry itself is used as the reference.
   */
  component: ModuleComponentRef;
  /** Optional list of child routes for nested routing. */
  children?: LinidRoutes;
  /** Optional metadata associated with the route. */
  meta?: Record<string, unknown>;
}

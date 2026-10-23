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
 * Shape of a single entry passed to the federated DropdownButton component.
 *
 * `TKey` lets consumers narrow the accepted keys to a finite union (typically
 * derived from a `const`-tuple via `typeof X[number]`) so both the entry key
 * and any nested children share the same identifier domain.
 * @template TKey Identifier domain accepted for the entry and its children. Defaults to `string` to keep open-ended menus.
 */
export interface MenuItem<TKey extends string = string> {
  /**
   * Unique identifier of the menu item, used as an i18n key and as the base
   * of the emitted action key.
   */
  key: TKey;
  /**
   * Whether the menu item triggers a click event when activated.
   */
  clickable: boolean;
  /**
   * Optional list of child keys rendered as a sub-menu. Each child key is
   * combined with the parent `key` (e.g. `"<key>.<child>"`) when the user
   * activates a child entry.
   */
  children?: TKey[];
}

/**
 * Payload emitted by the federated DropdownButton when the user activates an
 * entry.
 *
 * For a root entry, `key` equals the entry's own key (e.g. `"edit"`). For a
 * child entry, `key` is the dot-separated composite of the parent key and the
 * child key (e.g. `"export.csv"`).
 *
 * `TKey` lets consumers strongly type the keys they expect to receive; when
 * left to the default `string`, the payload accepts any key emitted by the
 * dropdown.
 * @template TKey Domain of keys (root or `parent.child`) the listener expects to receive.
 */
export interface DropdownClickPayload<TKey extends string = string> {
  /**
   * Dotted action key emitted by the dropdown.
   */
  key: TKey;
}

/*
 * Copyright (C) 2026 Linagora
 *
 * This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General
 * Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option)
 * any later version, provided you comply with the Additional Terms applicable for LinOpenFactory software by
 * LINAGORA pursuant to Section 7 of the GNU Affero General Public License, subsections (b), (c), and (e), pursuant to
 * which these Appropriate Legal Notices must notably (i) retain the display of the "LinOpenFactory™" trademark/logo at the top
 * of the interface window, the display of the “You are using the Open Source and free version of LinOpenFactory™, powered by
 * Linagora © 2009–2026. Contribute to LinOpenFactory R&D by subscribing to an Enterprise offer!” infobox and in the e-mails
 * sent with the Program, notice appended to any type of outbound messages (e.g. e-mail and meeting requests) as well
 * as in the LinOpenFactory user interface, (ii) retain all hypertext links between LinOpenFactory
 * and https://linid.org/, as well as between LINAGORA and LINAGORA.com, and (iii) refrain from infringing LINAGORA
 * intellectual property rights over its trademarks and commercial brands. Other Additional Terms apply, see
 * <http://www.linagora.com/licenses/> for more details.
 *
 * This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License and its applicable Additional Terms for
 * LinOpenFactory along with this program. If not, see <http://www.gnu.org/licenses/> for the GNU Affero
 * General Public License version 3 and <http://www.linagora.com/licenses/> for the Additional Terms applicable to the
 * LinOpenFactory software.
 */

import type { UiDesign } from '../types/uiDesign';

/**
 * Singleton instance of UI design configuration shared across all modules.
 *
 * This instance provides centralized access to UI personalization values,
 * such as component styling flags, that are meant to be consistent application-wide.
 */
let uiDesign: UiDesign | null = null;

/**
 * Initializes the shared UI design instance.
 *
 * This function should be called **once** by the host application during the boot process,
 * typically after loading configuration from a file (e.g., `default.json`) or API.
 *
 * Subsequent calls are ignored and will emit a console warning.
 * @param client - The UI design object to set as the shared singleton instance.
 */
export function setUiDesign(client: UiDesign): void {
  if (uiDesign !== null) {
    console.warn(
      '[LinPulsar Core] UI Design has already been initialized. Re-initialization is ignored.'
    );
    return;
  }

  uiDesign = client;
}

/**
 * Returns the shared UI design instance.
 *
 * Must be called **after** initialization via `setUiDesign()`.
 * If called before initialization, an error is thrown to prevent usage of an undefined configuration.
 * @returns The shared UI design instance.
 * @throws {Error} If the UI design instance has not been initialized.
 */
export function getUiDesign(): UiDesign {
  if (uiDesign === null) {
    throw new Error(
      '[LinPulsar Core] UI Design is not initialized. Call setUiDesign() first.'
    );
  }

  return uiDesign;
}

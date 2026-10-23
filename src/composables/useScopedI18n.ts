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

import type { WritableComputedRef } from 'vue';
import { type ComposerTranslation, useI18n } from 'vue-i18n';
import { getI18nInstance } from '../services/i18nService';
import { useLinPulsarUiStore } from '../stores/linPulsarUiStore';
import { useLinPulsarUserPreference } from './useLinPulsarUserPreference';

/**
 * Creates a scoped i18n translator bound to a specific translation namespace.
 *
 * The provided `scope` is automatically prefixed to all translation keys, allowing the same module to be reused in
 * different functional contexts (e.g. "user.person", "user.account") without duplicating component code.
 * @param scope - Translation namespace prefix to apply to all keys.
 * @returns An object exposing a scoped `t` function.
 */
export function useScopedI18n(scope: string): {
  /**
   * Scoped translation function that mirrors all overloads of vue-i18n's `t` function.
   *
   * It automatically prefixes all translation keys with the provided `scope`.
   * Supports key-only, pluralization, named interpolation, and options overloads.
   */
  t: ComposerTranslation;
  /**
   * Checks whether a translation key exists within the scoped namespace.
   * @param key - Translation key (string or number) relative to the scoped namespace.
   * @returns `true` if the key exists, `false` otherwise.
   */
  te: (key: string, locale?: string | undefined) => boolean;
  /**
   * Retrieves the raw translation message for a scoped key without formatting.
   * @param key - Translation key (string or number) relative to the scoped namespace.
   * @returns The raw message associated with the key, or an empty object if the key does not exist.
   */
  tm: (key: string | number) => ReturnType<ComposerTranslation>;
  /**
   * Returns the translation for a scoped key if it exists, otherwise returns the provided default value.
   * @param defaultValue - Value to return if the translation key does not exist.
   * @param args - Arguments passed to the translation function (`t`), including key, pluralization, named parameters, or options.
   * @returns The translated string if the key exists, otherwise `defaultValue`.
   */
  translateOrDefault: (
    defaultValue: string,
    ...args: unknown[]
  ) => ReturnType<ComposerTranslation>;
} {
  const { t, te, tm } = useI18n({
    useScope: 'global',
    __i18n: getI18nInstance().global,
  });

  /**
   * Type definition for the scoped translation function returned by vue-i18n.
   *
   * This type preserves all overloads supported by the original `t` function,
   * including simple key lookup, pluralization, named interpolation, and options.
   */
  type TFunction = typeof t;

  /**
   * Type definition for the translation existence checker returned by vue-i18n.
   *
   * This function checks whether a translation key exists in the current locale.
   */
  type TeFunction = typeof te;

  /**
   * Type definition for the raw translation message resolver returned by vue-i18n.
   *
   * This function retrieves untranslated message values without applying
   * formatting or interpolation.
   */
  type TmFunction = typeof tm;

  /**
   * Scoped translation function that automatically prefixes the key with the given `scope`.
   *
   * This function mirrors all overloads of the original `t` function from vue-i18n, including key only, pluralization,
   * named interpolation, and options.
   * @param args - Arguments matching one of the overloads of `ComposerTranslation`.
   *   - args[0]: translation key (string)
   *   - args[1]: optional number for pluralization OR object for named interpolation.
   *   - args[2]: optional number for plural OR options object.
   * @returns The translated string.
   */
  function _t(...args: Parameters<TFunction>): ReturnType<TFunction> {
    const [key, a, b] = args;

    return t(`${scope}.${key}`, a, b);
  }

  /**
   * Checks whether a scoped translation key exists.
   * @param args - Arguments matching one of the overloads of `ComposerTranslation`.
   *   - args[0]: translation key (string)
   *   - args[1]: optional number for pluralization OR object for named interpolation.
   *   - args[2]: optional number for plural OR options object.
   * @returns `true` if the key exists, `false` otherwise.
   */
  function _te(...args: Parameters<TeFunction>): ReturnType<TeFunction> {
    return te(`${scope}.${args[0]}`, args[1]);
  }

  /**
   * Retrieves the raw message for a scoped translation key.
   * @param args - Arguments matching one of the overloads of `ComposerTranslation`.
   *   - args[0]: translation key (string)
   *   - args[1]: optional number for pluralization OR object for named interpolation.
   *   - args[2]: optional number for plural OR options object.
   * @returns The raw translation message, or `undefined` if the key does not exist.
   */
  function _tm(...args: Parameters<TmFunction>): ReturnType<TmFunction> {
    return tm(`${scope}.${args[0]}`);
  }

  /**
   * Returns the translation for a scoped key if it exists, otherwise returns the provided default value.
   * @param defaultValue - Value to return if the key does not exist.
   * @param args - Arguments passed to the scoped `t` function.
   * @returns Translated string if key exists, otherwise `defaultValue`.
   */
  function translateOrDefault(
    defaultValue: string,
    ...args: unknown[]
  ): string {
    if (_te(args[0] as string)) {
      return _t(...(args as Parameters<TFunction>));
    }
    return defaultValue;
  }

  return {
    t: _t as ComposerTranslation,
    te: _te,
    tm: _tm as ComposerTranslation,
    translateOrDefault,
  };
}

const LOCALE_STORAGE_KEY = 'language';

/**
 * Tells whether a language candidate is defined and part of the supported languages.
 * @param lang - The language candidate to check.
 * @returns `true` when the candidate is a non-empty, supported language.
 */
function isSupportedLanguage(lang?: string | null): lang is string {
  const uiStore = useLinPulsarUiStore();
  return !!lang && uiStore.i18n.languages.includes(lang);
}

/**
 * Resolves the effective locale to apply, without any side effect.
 *
 * The locale is resolved by priority: the stored user preference first, then the locally persisted language.
 * If neither the stored preference nor the localStorage value is a supported language, the UI store locale is used as the fallback.
 * @returns The locale code the caller should apply to its i18n target.
 */
export function resolveLocale(): string {
  const { userPreferenceStore } = useLinPulsarUserPreference();
  const uiStore = useLinPulsarUiStore();
  const storedPreference =
    userPreferenceStore.userPreferences?.[LOCALE_STORAGE_KEY];

  return (
    [storedPreference, localStorage.getItem(LOCALE_STORAGE_KEY)].find(
      isSupportedLanguage
    ) ?? uiStore.i18n.locale
  );
}

/**
 * Synchronises the persisted state with the given locale.
 *
 * The locale is always written to localStorage. The server-side user preference is updated only when it differs from
 * the currently stored one.
 * @param locale - The locale to persist.
 * @returns A promise that resolves once the persisted state has been synchronised.
 */
export async function syncLocale(locale: string): Promise<void> {
  const { userPreferenceStore, saveUserPreference } =
    useLinPulsarUserPreference();
  const storedPreference =
    userPreferenceStore.userPreferences?.[LOCALE_STORAGE_KEY];

  localStorage.setItem(LOCALE_STORAGE_KEY, locale);

  if (locale !== storedPreference) {
    await saveUserPreference(LOCALE_STORAGE_KEY, locale);
  }
}

/**
 * Applies the given locale to the application and persists the choice.
 *
 * Updates the active i18n locale, reflects it in the UI store, and synchronises the persisted state. This assumes the
 * shared i18n instance runs in Composition mode (legacy: false), as guaranteed by the lin-pulsar-core `LinPulsarI18n` convention;
 * on a legacy instance the locale assignment would be a silent no-op at runtime.
 * @param locale - The locale code to apply (e.g. "fr-FR").
 * @returns A promise that resolves once the locale has been applied and persisted.
 */
export async function changeLocale(locale: string): Promise<void> {
  const uiStore = useLinPulsarUiStore();
  const i18n = getI18nInstance();

  (i18n.global.locale as WritableComputedRef<string>).value = locale;
  uiStore.setLocale(locale);
  await syncLocale(locale);
}

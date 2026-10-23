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

import type { Interactable } from '@interactjs/core/Interactable';
import type { InteractEvent } from '@interactjs/core/InteractEvent';
import type { Target } from '@interactjs/core/types';
import interact from 'interactjs';
import type { Subscription } from 'rxjs';
import {
  type ComponentPublicInstance,
  onMounted,
  onUnmounted,
  ref,
  watch,
} from 'vue';
import { uiEventSubject } from '../services/uiEventService';
import { type DialogEvent } from '../types/dialogType';
import type { UiEvent } from '../types/uiEvent';

/**
 * Composable to manage the state of a dialog based on events emitted by the DialogSubject.
 * @param key - The key to filter dialog events, allowing multiple dialogs to be managed independently.
 * @param onOpen - Optional callback function to execute when the dialog is opened, receiving the dialog event as an argument.
 * @returns An object containing the reactive `show` property to control the dialog visibility,
 * and the `dialogRef` to be attached to the dialog component for interact.js functionality.
 */
export function useDialog<T extends DialogEvent>(
  key: string,
  onOpen?: (event: T) => void
) {
  const show = ref<boolean>(false);
  const dialogRef = ref<ComponentPublicInstance | null>(null);
  let dialogSubscription: Subscription;
  let interactable: Interactable | null = null;

  /**
   * Handles dialog events emitted by the DialogSubject.
   * @param event - The dialog event to process.
   */
  function onDialogEvent(event: UiEvent) {
    if (event.key !== key) {
      return;
    }

    const dialogEvent = event.data as T;

    if (dialogEvent.type === 'close') {
      show.value = false;
      return;
    }

    show.value = true;

    onOpen?.(dialogEvent);
  }

  watch(
    dialogRef,
    (newValue) => {
      cleanupInteract();
      if (newValue?.$el) {
        initInteract(newValue.$el);
      }
    },
    { flush: 'post' }
  );

  /**
   * Initializes the interact.js draggable functionality on the dialog element,
   * allowing it to be moved by dragging a handle.
   * @param dialogRefEl - The target element to make draggable.
   */
  function initInteract(dialogRefEl: Target) {
    interactable = interact(dialogRefEl).draggable({
      allowFrom: '.drag-handle',

      listeners: {
        /**
         * Handles the move event for the draggable dialog.
         * @param event - The interact.js drag event.
         */
        move(event: InteractEvent) {
          const target = event.target;
          if (!(
            target instanceof HTMLElement || target instanceof SVGElement
          )) {
            return;
          }

          const x = parseCoord(target.getAttribute('data-x')) + event.dx;
          const y = parseCoord(target.getAttribute('data-y')) + event.dy;

          target.style.transform = `translate(${x}px, ${y}px)`;

          target.setAttribute('data-x', String(x));
          target.setAttribute('data-y', String(y));
        },
      },
      modifiers: [
        interact.modifiers.restrictRect({
          restriction: 'parent',
          endOnly: true,
        }),
      ],
    });
  }

  /**
   * Parses a coordinate value from a string, returning 0 if the value is not a valid number.
   * @param val - The string value to parse.
   * @returns The parsed coordinate as a number, or 0 if parsing fails.
   */
  function parseCoord(val: string | null): number {
    const n = parseFloat(val ?? '');
    return Number.isNaN(n) ? 0 : n;
  }

  /**
   * Cleans up the interact.js instance by unsetting it and clearing the reference.
   */
  function cleanupInteract() {
    interactable?.unset();
    interactable = null;
  }

  onMounted(() => {
    dialogSubscription = uiEventSubject.subscribe(onDialogEvent);
  });

  onUnmounted(() => {
    cleanupInteract();
    dialogSubscription?.unsubscribe();
  });

  return { show, dialogRef };
}

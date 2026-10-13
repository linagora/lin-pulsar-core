import { useNotify } from 'src/composables/useNotify';
import { uiEventSubject } from 'src/services/uiEventService';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

describe('Test composable: useNotify', () => {
  let subscription;
  let events;

  beforeEach(() => {
    events = [];
    subscription = uiEventSubject.subscribe((event) => {
      events.push(event);
    });
  });

  afterEach(() => {
    subscription.unsubscribe();
    events = [];
  });

  it('should emit a notification event with correct structure', () => {
    const { Notify } = useNotify();
    const payload = {
      type: 'positive',
      message: 'Test message',
      color: 'green',
    };
    Notify(payload);
    expect(events).toHaveLength(1);
    expect(events[0]).toEqual({
      key: 'notify',
      data: payload,
    });
  });

  it('should allow multiple notifications', () => {
    const { Notify } = useNotify();
    Notify({ type: 'positive', message: 'First' });
    Notify({ type: 'negative', message: 'Second' });
    expect(events).toHaveLength(2);
    expect(events[0].data.message).toBe('First');
    expect(events[1].data.message).toBe('Second');
  });

  it('should work with minimal payload', () => {
    const { Notify } = useNotify();
    Notify({ message: 'Minimal' });
    expect(events[0].data.message).toBe('Minimal');
  });
});

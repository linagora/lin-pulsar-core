import nunjucks from 'nunjucks';
import { useNunjucks } from 'src/composables/useNunjucks';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { reactive } from 'vue';

const mockRenderString = vi.hoisted(() => vi.fn((str) => `rendered:${str}`));
const mockEnv = vi.hoisted(() => ({ current: null }));

vi.mock('src/services/nunjucksService', () => ({
  getNunjucksEnv: () => mockEnv.current ?? { renderString: mockRenderString },
}));

describe('Test composable: useNunjucks', () => {
  describe('Test function: render', () => {
    let render;

    beforeEach(() => {
      mockRenderString.mockClear();
      render = useNunjucks().render;
    });

    it('should render a string value as a Nunjucks template', () => {
      expect(render('hello', {})).toBe('rendered:hello');
    });

    it('should pass the context to the Nunjucks environment', () => {
      const context = { name: 'Alice' };
      mockRenderString.mockImplementationOnce(
        (str, ctx) => `${str}:${ctx.name}`
      );

      expect(render('hello', context)).toBe('hello:Alice');
    });

    it('should recursively render string items in an array', () => {
      expect(render(['a', 'b'], {})).toEqual(['rendered:a', 'rendered:b']);
    });

    it('should recursively render string properties of an object', () => {
      expect(render({ foo: 'bar', baz: 'qux' }, {})).toEqual({
        foo: 'rendered:bar',
        baz: 'rendered:qux',
      });
    });

    it('should recursively render strings in nested objects and arrays', () => {
      expect(render({ a: { b: ['x', 'y'] } }, {})).toEqual({
        a: { b: ['rendered:x', 'rendered:y'] },
      });
    });

    it('should return non-string primitive values as-is', () => {
      expect(render(42, {})).toBe(42);
      expect(render(true, {})).toBe(true);
    });

    it('should return null as-is', () => {
      expect(render(null, {})).toBeNull();
    });

    it('should return non-plain objects as-is', () => {
      const date = new Date('2026-06-15T00:00:00.000Z');

      expect(render(date, {})).toBe(date);
      expect(mockRenderString).not.toHaveBeenCalled();
    });

    const details = { a: 1, nested: { b: 2 } };
    const context = { entity: { details }, list: [details], name: 'Alice' };

    it('should return entity.details without rendering it', () => {
      expect(render('{{ entity.details }}', context)).toEqual(details);
      expect(mockRenderString).not.toHaveBeenCalled();
    });

    it('should resolve a single-segment lookup (no dot)', () => {
      expect(render('{{ entity }}', context)).toEqual(context.entity);
      expect(mockRenderString).not.toHaveBeenCalled();
    });

    it('should resolve a deeply nested lookup', () => {
      expect(render('{{ entity.details.nested }}', context)).toEqual(
        details.nested
      );
    });

    it('should resolve lookups nested in objects and arrays', () => {
      expect(
        render({ cfg: '{{ entity.details }}', label: 'hi' }, context)
      ).toEqual({ cfg: details, label: 'rendered:hi' });
      expect(render(['{{ entity.details }}'], context)).toEqual([details]);
    });

    it('should tolerate any spacing around the {{ }} delimiters and the expression', () => {
      expect(render('{{entity.details}}', context)).toEqual(details);
      expect(render('  {{  entity.details  }}  ', context)).toEqual(details);
    });

    it('should return a deep clone that does not share references with the context', () => {
      const ctx = { entity: { details: { nested: { x: 1 } } } };
      const result = render('{{ entity.details }}', ctx);
      result.nested.x = 99;
      expect(ctx.entity.details.nested.x).toBe(1);
    });

    it('should resolve through a Vue reactive context', () => {
      const ctx = reactive({ entity: { details: { id: 1 } } });
      expect(render('{{ entity.details }}', ctx)).toEqual({ id: 1 });
      expect(mockRenderString).not.toHaveBeenCalled();
    });

    it('should resolve through a Vue reactive nested value', () => {
      const details2 = reactive({ id: 1 });
      expect(
        render('{{ entity.details }}', { entity: { details: details2 } })
      ).toEqual({ id: 1 });
      expect(mockRenderString).not.toHaveBeenCalled();
    });

    it('should render normally when the lookup uses bracket notation', () => {
      for (const tpl of [
        "{{ entity['details'] }}",
        '{{ entity["details"] }}',
        '{{ list[0] }}',
      ]) {
        expect(render(tpl, context)).toBe(`rendered:${tpl}`);
      }
    });

    it('should render normally when the context is not a plain object', () => {
      const nullProtoCtx = Object.assign(Object.create(null), {
        entity: { details },
      });
      expect(render('{{ entity.details }}', nullProtoCtx)).toBe(
        'rendered:{{ entity.details }}'
      );
    });

    it('should render normally when the lookup does not resolve to a plain object', () => {
      expect(render('{{ entity.missing }}', context)).toBe(
        'rendered:{{ entity.missing }}'
      );
      expect(render('{{ list }}', context)).toBe('rendered:{{ list }}');
      expect(render('{{ name.length }}', context)).toBe(
        'rendered:{{ name.length }}'
      );
    });

    it('should render normally when the template uses Nunjucks whitespace control syntax', () => {
      for (const tpl of [
        '{{- entity.details -}}',
        '{{- entity.details }}',
        '{{ entity.details -}}',
      ]) {
        expect(render(tpl, context)).toBe(`rendered:${tpl}`);
      }
    });

    it('should render normally when the template is not a single expression', () => {
      for (const tpl of [
        'x{{ entity.details }}',
        '{{ entity.details }}{{ name }}',
        '{{ entity.details }} suffix',
      ]) {
        expect(render(tpl, context)).toBe(`rendered:${tpl}`);
      }
    });

    it('should render normally when the expression is not a plain lookup', () => {
      for (const tpl of [
        '{{ entity.details | dump }}',
        '{{ getDetails() }}',
        '{{ 1 + 2 }}',
      ]) {
        expect(render(tpl, context)).toBe(`rendered:${tpl}`);
      }
    });

    it('should render normally when the lookup resolves to a prototype-polluted property', () => {
      Object.prototype.polluted = { x: 1 };
      try {
        expect(render('{{ entity.polluted }}', context)).toBe(
          'rendered:{{ entity.polluted }}'
        );
      } finally {
        delete Object.prototype.polluted;
      }
    });

    it('should render normally when the lookup resolves to an inherited Object.prototype property', () => {
      expect(render('{{ entity.toString }}', context)).toBe(
        'rendered:{{ entity.toString }}'
      );
      expect(mockRenderString).toHaveBeenCalledOnce();
      mockRenderString.mockClear();
      expect(render('{{ entity.hasOwnProperty }}', context)).toBe(
        'rendered:{{ entity.hasOwnProperty }}'
      );
      expect(mockRenderString).toHaveBeenCalledOnce();
    });

    it('should refuse to walk the prototype chain', () => {
      for (const tpl of [
        '{{ __proto__ }}',
        '{{ entity.constructor }}',
        '{{ entity.constructor.prototype }}',
      ]) {
        expect(render(tpl, context)).toBe(`rendered:${tpl}`);
      }
    });
  });

  describe('Test function: renderJson', () => {
    const context = {
      form: {
        name: 'A&B <"C">',
        comment: '',
        count: 3,
        enabled: false,
        period: { start: '2026-12-01T00:00:00+01:00', end: null },
        tags: ['a', 'b'],
      },
    };

    /**
     * Renders a value with `renderJson` over a real Nunjucks environment.
     * @param value - The JSON value to render.
     * @param autoescape - Whether the environment escapes its output.
     * @returns The rendered value.
     */
    function renderJson(value, autoescape = false) {
      mockEnv.current = new nunjucks.Environment(null, { autoescape });
      return useNunjucks().renderJson(value, context);
    }

    afterEach(() => {
      mockEnv.current = null;
    });

    it('should parse the outputs that are valid JSON', () => {
      expect(
        renderJson({
          count: '{{- form.count -}}',
          enabled: '{{form.enabled}}',
          period: '{{ form.period }}',
          tags: '{{ form.tags | dump }}',
          quoted: '{{ form.name | dump }}',
          none: '{{ none | dump }}',
        })
      ).toEqual({
        count: 3,
        enabled: false,
        period: context.form.period,
        tags: ['a', 'b'],
        quoted: 'A&B <"C">',
        none: null,
      });
    });

    it('should render the empty outputs as null', () => {
      expect(
        renderJson({
          comment: '{{ form.comment }}',
          end: '{{ form.period.end }}',
          unknown: '{{ form.unknown }}',
          block: '{% if false %}x{% endif %}',
        })
      ).toEqual({ comment: null, end: null, unknown: null, block: null });
    });

    it('should not escape the values, even with autoescape', () => {
      const env = new nunjucks.Environment(null, { autoescape: true });
      mockEnv.current = env;

      expect(
        useNunjucks().renderJson(
          {
            name: '{{ form.name }}',
            label: "{{ 'many' if form.count > 2 else 'few' }}",
            escaped: '{{ form.name | escape }}',
          },
          context
        )
      ).toEqual({
        name: 'A&B <"C">',
        label: 'many',
        escaped: 'A&amp;B &lt;&quot;C&quot;&gt;',
      });
      expect(env.opts.autoescape).toBe(true);
    });

    it('should throw on an object rendered without dump', () => {
      expect(() => renderJson({ item: '{{ form.period or none }}' })).toThrow(
        'Use the `dump` filter'
      );
      expect(() => renderJson(['[{{ [form.period] }}]'])).toThrow(
        'Cannot render an object as JSON'
      );
    });

    it('should restore autoescape when the render throws', () => {
      const env = new nunjucks.Environment(null, {
        autoescape: true,
        throwOnUndefined: true,
      });
      mockEnv.current = env;

      expect(() =>
        useNunjucks().renderJson({ unknown: '{{ form.unknown }}' }, context)
      ).toThrow();
      expect(env.opts.autoescape).toBe(true);
    });

    it('should keep the other outputs as strings, recursively', () => {
      const date = new Date('2026-06-15T00:00:00.000Z');

      expect(
        renderJson({
          text: 'Count: {{ form.count }}',
          tags: ['#{{ form.count }}', '{% if form.count %}yes{% endif %}'],
          date,
          number: 2,
        })
      ).toEqual({ text: 'Count: 3', tags: ['#3', 'yes'], date, number: 2 });
    });
  });

  describe('Test function: renderString', () => {
    let renderString;

    beforeEach(() => {
      mockRenderString.mockClear();
      renderString = useNunjucks().renderString;
    });

    const details = { a: 1, nested: { b: 2 } };
    const context = { entity: { id: 7, details }, list: [1, 2], name: 'Alice' };

    it('should render a string value as a Nunjucks template', () => {
      expect(renderString('/users/{{ entity.id }}', context)).toBe(
        'rendered:/users/{{ entity.id }}'
      );
    });

    it('should pass the context to the Nunjucks environment', () => {
      mockRenderString.mockImplementationOnce(
        (str, ctx) => `${str}:${ctx.name}`
      );

      expect(renderString('hello', context)).toBe('hello:Alice');
    });

    it('should never short-circuit a shape that render resolves to an object', () => {
      const { render } = useNunjucks();

      for (const tpl of [
        '{{ entity }}',
        '{{ entity.details }}',
        '{{ entity.details.nested }}',
      ]) {
        expect(render(tpl, context)).toBeTypeOf('object');
        expect(renderString(tpl, context)).toBe(`rendered:${tpl}`);
      }
    });

    it('should behave like render for any template that is not a bare lookup', () => {
      const { render } = useNunjucks();

      for (const tpl of [
        '/users/{{ entity.id }}',
        '/users',
        '{{ entity.id }}',
        '{{ 1 + 2 }}',
        '{{ list }}',
        '{{ entity.missing }}',
      ]) {
        expect(renderString(tpl, context)).toBe(render(tpl, context));
      }
    });
  });
});

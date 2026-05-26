import type { StoryContext } from '@storybook/web-components';

type SourceParams = {
  code?: string;
  generate?: (args: Record<string, unknown>, context: StoryContext) => string;
};

/** Decode HTML entities when Storybook stringifies render() output. */
export function decodeHtmlEntities(code: string): string {
  if (!code.includes('&lt;') && !code.includes('&gt;') && !code.includes('&amp;')) {
    return code;
  }
  const el = document.createElement('textarea');
  el.innerHTML = code;
  return el.value;
}

export function resolveDocsSource(code: string, context: StoryContext): string {
  const source = context.parameters?.docs?.source as SourceParams | undefined;

  if (source?.code) {
    return source.code;
  }

  if (typeof source?.generate === 'function') {
    return source.generate(context.args ?? {}, context);
  }

  return decodeHtmlEntities(code);
}

export function htmlSource(code: string): { source: { code: string; language: 'html' } } {
  return { source: { code: code.trim(), language: 'html' } };
}

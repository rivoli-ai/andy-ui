import type { Meta, StoryObj } from '@storybook/web-components';
import { OmnifexIconSize } from '../shared/icon-size.enum';
import type { IconName } from './icons';
import { ICONS } from './icons';
import { iconSource, CUSTOM_SVG_SOURCE, type IconStoryArgs } from '../../storybook/icon-source';
import { htmlSource } from '../../../.storybook/docs-source';

const ALL_ICON_NAMES = Object.keys(ICONS) as IconName[];

const FAVORITE_SVG_PATH =
  'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z';

const FAVORITE_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="${FAVORITE_SVG_PATH}"/></svg>`;

function renderIcon(args: IconStoryArgs): string {
  const attrs = [
    `name="${args.name}"`,
    `size="${args.size}"`,
    args.ariaLabel ? `aria-label="${args.ariaLabel}"` : '',
  ]
    .filter(Boolean)
    .join(' ');

  const flexWrapper =
    args.size === OmnifexIconSize.FLEX
      ? 'style="width:var(--icon-button-size-large);height:var(--icon-button-size-large);display:inline-flex;color:var(--theme-text-primary);"'
      : 'style="color:var(--theme-text-primary);"';

  return `<div ${flexWrapper}><andy-ui-icon ${attrs}></andy-ui-icon></div>`;
}

const meta: Meta<IconStoryArgs> = {
  title: 'Andy UI/Icon',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        generate: (args: Record<string, unknown>) => iconSource(args as IconStoryArgs),
      },
    },
  },
  render: (args) => renderIcon(args),
  argTypes: {
    name: { control: 'select', options: ALL_ICON_NAMES },
    size: { control: 'select', options: Object.values(OmnifexIconSize) },
    ariaLabel: { control: 'text', description: 'Accessible name; omit when decorative' },
  },
  args: {
    name: 'settings',
    size: OmnifexIconSize.LARGE,
    ariaLabel: '',
  },
};

export default meta;

type Story = StoryObj<IconStoryArgs>;

export const Default: Story = {};

export const Flex: Story = {
  args: { size: OmnifexIconSize.FLEX },
};

export const Medium: Story = {
  args: { name: 'search', size: OmnifexIconSize.MEDIUM },
};

export const Small: Story = {
  args: { name: 'close', size: OmnifexIconSize.SMALL },
};

export const WithAriaLabel: Story = {
  args: { name: 'home', ariaLabel: 'Home' },
};

export const CustomSvg: Story = {
  parameters: {
    docs: {
      source: htmlSource(CUSTOM_SVG_SOURCE).source,
      description: {
        story:
          'Omit `name` and pass an `<svg>` as default slot content. Set `aria-label` when the icon conveys meaning.',
      },
    },
  },
  render: () => `
    <div style="display:flex;flex-direction:column;gap:var(--space-6);align-items:flex-start;color:var(--theme-text-primary);">
      <div style="display:flex;flex-direction:column;gap:var(--space-2);">
        <span style="font-size:var(--font-b6-size);color:var(--theme-text-secondary);">Standalone</span>
        <andy-ui-icon size="large" aria-label="Favorite">${FAVORITE_SVG}</andy-ui-icon>
      </div>
      <div style="display:flex;flex-direction:column;gap:var(--space-2);">
        <span style="font-size:var(--font-b6-size);color:var(--theme-text-secondary);">Inside andy-ui-button</span>
        <andy-ui-button variant="tertiary">
          <andy-ui-icon slot="icon" size="medium" aria-label="Favorite">${FAVORITE_SVG}</andy-ui-icon>
          Favorite
        </andy-ui-button>
      </div>
    </div>`,
};

const CATALOG_SOURCE = `<andy-ui-icon name="home" size="large" aria-label="home"></andy-ui-icon>
<andy-ui-icon name="search" size="medium" aria-label="search"></andy-ui-icon>`;

export const Catalog: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: { source: htmlSource(CATALOG_SOURCE).source },
  },
  render: () => `
    <div style="padding:var(--space-6);display:flex;flex-wrap:wrap;gap:var(--space-6);color:var(--theme-text-primary);">
      ${ALL_ICON_NAMES.map(
        (name) => `
        <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-1);">
          <andy-ui-icon name="${name}" size="large" aria-label="${name}"></andy-ui-icon>
          <span style="font-size:var(--font-b6-size);color:var(--theme-text-secondary);">${name}</span>
        </div>`,
      ).join('')}
    </div>`,
};

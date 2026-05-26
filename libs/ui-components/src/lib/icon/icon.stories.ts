import type { Meta, StoryObj } from '@storybook/web-components';
import { OmnifexVariant } from '../shared/variant.enum';
import { OmnifexAppearance } from '../shared/appearance.enum';
import { OmnifexButtonSize } from '../shared/button-size.enum';
import type { IconName } from './icons';
import { ICONS } from './icons';

const ALL_ICON_NAMES = Object.keys(ICONS) as IconName[];

type IconStoryArgs = {
  name: IconName;
  label: string;
  variant: OmnifexVariant;
  appearance: OmnifexAppearance;
  size: OmnifexButtonSize;
  disabled: boolean;
};

const meta: Meta<IconStoryArgs> = {
  title: 'Andy UI/Icon',
  tags: ['autodocs'],
  render: (args) => `<andy-ui-icon
      name="${args.name}"
      label="${args.label || args.name}"
      variant="${args.variant}"
      appearance="${args.appearance}"
      size="${args.size}"
      ${args.disabled ? 'disabled' : ''}
    ></andy-ui-icon>`,
  argTypes: {
    name: { control: 'select', options: ALL_ICON_NAMES },
    variant: { control: 'select', options: Object.values(OmnifexVariant) },
    appearance: { control: 'select', options: Object.values(OmnifexAppearance) },
    size: { control: 'select', options: Object.values(OmnifexButtonSize) },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    name: 'settings',
    label: '',
    variant: OmnifexVariant.PRIMARY,
    appearance: OmnifexAppearance.FILLED,
    size: OmnifexButtonSize.LARGE,
    disabled: false,
  },
};

export default meta;

type Story = StoryObj<IconStoryArgs>;

export const Default: Story = {};

export const PrimaryOutlined: Story = {
  args: { appearance: OmnifexAppearance.OUTLINED },
};

export const PrimaryBasic: Story = {
  args: { appearance: OmnifexAppearance.BASIC },
};

export const SecondaryFilled: Story = {
  args: { variant: OmnifexVariant.SECONDARY, name: 'user' },
};

export const TertiaryFilled: Story = {
  args: { variant: OmnifexVariant.TERTIARY, name: 'menu' },
};

export const Medium: Story = {
  args: { size: OmnifexButtonSize.MEDIUM },
};

export const Small: Story = {
  args: { size: OmnifexButtonSize.SMALL },
};

export const Disabled: Story = {
  args: { disabled: true },
};

/** All available named icons at a glance */
export const IconCatalog: Story = {
  name: 'Catalog — all icons',
  parameters: { layout: 'fullscreen' },
  render: () => `
    <div style="padding:var(--space-6);display:flex;flex-wrap:wrap;gap:var(--space-6);">
      ${ALL_ICON_NAMES.map(
        (name) => `
        <div style="display:flex;flex-direction:column;align-items:center;gap:var(--space-1);">
          <andy-ui-icon name="${name}" appearance="basic" variant="primary" size="large"></andy-ui-icon>
          <span style="font-size:var(--font-b6-size);color:var(--theme-text-secondary);">${name}</span>
        </div>`,
      ).join('')}
    </div>`,
};

/** All sizes side by side */
export const Sizes: Story = {
  parameters: { layout: 'padded' },
  render: () => `
    <div style="display:flex;align-items:center;gap:var(--space-4);">
      <andy-ui-icon name="settings" size="large" label="large"></andy-ui-icon>
      <andy-ui-icon name="settings" size="medium" label="medium"></andy-ui-icon>
      <andy-ui-icon name="settings" size="small" label="small"></andy-ui-icon>
    </div>`,
};

/** Full matrix */
export const MatrixLight: Story = {
  parameters: { layout: 'fullscreen' },
  render: () => `
    <div style="display:flex;flex-direction:column;gap:var(--space-4);padding:var(--space-6);">
      ${[OmnifexAppearance.FILLED, OmnifexAppearance.OUTLINED, OmnifexAppearance.BASIC]
        .map(
          (appearance) => `
        <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;align-items:center;">
          ${[OmnifexVariant.PRIMARY, OmnifexVariant.SECONDARY, OmnifexVariant.TERTIARY]
            .map(
              (variant) => `
            <andy-ui-icon name="settings" variant="${variant}" appearance="${appearance}" size="large"></andy-ui-icon>
            <andy-ui-icon name="settings" variant="${variant}" appearance="${appearance}" size="medium"></andy-ui-icon>
            <andy-ui-icon name="settings" variant="${variant}" appearance="${appearance}" size="small"></andy-ui-icon>`,
            )
            .join('')}
        </div>`,
        )
        .join('')}
    </div>`,
};

export const DarkTheme: Story = {
  parameters: { backgrounds: { default: 'dark' } },
  decorators: [
    (story) =>
      `<div data-theme="dark" style="padding:1rem;background:var(--theme-bg-page,#070f34);">${story()}</div>`,
  ],
};

import type { Meta, StoryObj } from '@storybook/web-components';
import { OmnifexVariant } from '../shared/variant.enum';
import { OmnifexAppearance } from '../shared/appearance.enum';
import { OmnifexButtonSize } from '../shared/button-size.enum';
import { buttonSource, type ButtonStoryArgs } from '../../storybook/button-source';
import { htmlSource } from '../../../.storybook/docs-source';

const meta: Meta<ButtonStoryArgs> = {
  title: 'Andy UI/Button',
  tags: ['autodocs'],
  parameters: {
    docs: {
      source: {
        generate: (args: Record<string, unknown>) => buttonSource(args as ButtonStoryArgs),
      },
    },
  },
  render: (args) => {
    const icon = args.showIcon
      ? `<andy-ui-icon slot="icon" name="add" size="flex"></andy-ui-icon>`
      : '';

    return `<andy-ui-button
      variant="${args.variant}"
      appearance="${args.appearance}"
      size="${args.size}"
      ${args.disabled ? 'disabled' : ''}
      ${args.fullWidth ? 'full-width' : ''}
    >${icon}${args.label}</andy-ui-button>`;
  },
  argTypes: {
    variant: {
      control: 'select',
      options: Object.values(OmnifexVariant),
    },
    appearance: {
      control: 'select',
      options: Object.values(OmnifexAppearance),
    },
    size: {
      control: 'select',
      options: Object.values(OmnifexButtonSize),
    },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    showIcon: { control: 'boolean' },
    label: { control: 'text' },
  },
  args: {
    label: 'Button',
    variant: OmnifexVariant.PRIMARY,
    appearance: OmnifexAppearance.FILLED,
    size: OmnifexButtonSize.LARGE,
    disabled: false,
    fullWidth: false,
    showIcon: true,
  },
};

export default meta;

type Story = StoryObj<ButtonStoryArgs>;

export const PrimaryFilled: Story = {};

export const PrimaryOutlined: Story = {
  args: { appearance: OmnifexAppearance.OUTLINED },
};

export const PrimaryBasic: Story = {
  args: { appearance: OmnifexAppearance.BASIC },
};

export const SecondaryFilled: Story = {
  args: { variant: OmnifexVariant.SECONDARY },
};

export const TertiaryFilled: Story = {
  args: { variant: OmnifexVariant.TERTIARY },
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

export const FullWidth: Story = {
  args: { fullWidth: true },
  parameters: { layout: 'padded' },
};

const MATRIX_SOURCE = `<andy-ui-button variant="primary" appearance="filled" size="large">Button</andy-ui-button>
<andy-ui-button variant="primary" appearance="filled" size="medium">Button</andy-ui-button>
<andy-ui-button variant="primary" appearance="filled" size="small">Button</andy-ui-button>`;

export const MatrixLight: Story = {
  parameters: {
    layout: 'fullscreen',
    docs: { source: htmlSource(MATRIX_SOURCE).source },
  },
  render: () => `
    <div style="display:flex;flex-direction:column;gap:var(--space-4);padding:var(--space-6);flex-wrap:wrap;">
      ${[OmnifexAppearance.FILLED, OmnifexAppearance.OUTLINED, OmnifexAppearance.BASIC]
        .map(
          (appearance) => `
        <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;align-items:center;">
          ${[OmnifexVariant.PRIMARY, OmnifexVariant.SECONDARY, OmnifexVariant.TERTIARY]
            .map(
              (variant) => `
            <andy-ui-button variant="${variant}" appearance="${appearance}" size="large">Button</andy-ui-button>
            <andy-ui-button variant="${variant}" appearance="${appearance}" size="medium">Button</andy-ui-button>
            <andy-ui-button variant="${variant}" appearance="${appearance}" size="small">Button</andy-ui-button>
          `,
            )
            .join('')}
        </div>`,
        )
        .join('')}
    </div>`,
};

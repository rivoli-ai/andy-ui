import type { Meta, StoryObj } from '@storybook/web-components';
import { OmnifexVariant } from '../shared/variant.enum';
import { OmnifexAppearance } from '../shared/appearance.enum';
import { OmnifexButtonSize } from '../shared/button-size.enum';

type ButtonStoryArgs = {
  label: string;
  variant: OmnifexVariant;
  appearance: OmnifexAppearance;
  size: OmnifexButtonSize;
  disabled: boolean;
  fullWidth: boolean;
  showIcon: boolean;
};

const meta: Meta<ButtonStoryArgs> = {
  title: 'Andy UI/Button',
  tags: ['autodocs'],
  render: (args) => {
    const icon = args.showIcon
      ? `<svg slot="icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>`
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

export const MatrixLight: Story = {
  parameters: { layout: 'fullscreen' },
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
          `
            )
            .join('')}
        </div>`
        )
        .join('')}
    </div>`,
};

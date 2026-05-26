import type { Meta, StoryObj } from '@storybook/web-components';

type LoginStoryArgs = {
  heading: string;
  subheading: string;
  cardTitle: string;
  cardDescription: string;
  actionLabel: string;
  isLoading: boolean;
  error: string;
};

const meta: Meta<LoginStoryArgs> = {
  title: 'Omnifex/Login',
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  render: (args) => `
    <omnifex-login
      heading="${args.heading}"
      subheading="${args.subheading}"
      card-title="${args.cardTitle}"
      card-description="${args.cardDescription}"
      action-label="${args.actionLabel}"
      ${args.isLoading ? 'is-loading' : ''}
      ${args.error ? `error="${args.error}"` : ''}
    ></omnifex-login>
  `,
  argTypes: {
    heading: { control: 'text' },
    subheading: { control: 'text' },
    cardTitle: { control: 'text' },
    cardDescription: { control: 'text' },
    actionLabel: { control: 'text' },
    isLoading: { control: 'boolean' },
    error: { control: 'text' },
  },
  args: {
    heading: 'Andy UI',
    subheading: 'Design System',
    cardTitle: 'Welcome Back',
    cardDescription: 'Sign in to access your application again.',
    actionLabel: 'Login',
    isLoading: false,
    error: '',
  },
};

export default meta;

type Story = StoryObj<LoginStoryArgs>;

export const Default: Story = {};

export const Loading: Story = { args: { isLoading: true } };

export const Error: Story = { args: { error: 'Sign in failed. Try again.' } };

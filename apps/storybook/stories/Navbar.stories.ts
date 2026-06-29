import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Collections/Navbar",
  component: "andy-navbar",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Top navigation bar (`.au-navbar`) — a ready-made composition of `<andy-breadcrumb>`, `<andy-search-input>` and `<andy-theme-toggle>`. Child events bubble (`andy-navigate`, `andy-input`, `andy-theme-change`). Use the `actions` slot for extra controls before the theme toggle.",
      },
    },
  },
  argTypes: {
    items: { control: "object", description: "Breadcrumb trail.", table: { category: "Props" } },
    searchPlaceholder: { control: "text", table: { category: "Props", defaultValue: { summary: "Search…" } } },
    searchValue: { control: "text", table: { category: "Props" } },
    noSearch: { control: "boolean", description: "Hide the search box.", table: { category: "Props" } },
    noThemeToggle: { control: "boolean", description: "Hide the theme toggle.", table: { category: "Props" } },
  },
  args: {
    items: [
      { label: "workspace", href: "#" },
      { label: "repos", href: "#" },
      { label: "devpilot-api" },
    ],
    searchPlaceholder: "Search repos…",
    searchValue: "",
    noSearch: false,
    noThemeToggle: false,
  },
  render: (a) => html`
    <andy-navbar
      .items=${a.items}
      searchPlaceholder=${a.searchPlaceholder}
      .searchValue=${a.searchValue}
      ?noSearch=${a.noSearch}
      ?noThemeToggle=${a.noThemeToggle}
    ></andy-navbar>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const WithActions: Story = {
  parameters: { docs: { description: { story: "Extra controls slotted before the theme toggle." } } },
  render: (a) => html`
    <andy-navbar .items=${a.items} searchPlaceholder=${a.searchPlaceholder}>
      <andy-button slot="actions" size="sm" variant="primary">New repo</andy-button>
    </andy-navbar>
  `,
};

export const Minimal: Story = {
  parameters: { docs: { description: { story: "Breadcrumb only (search and toggle hidden)." } } },
  args: { noSearch: true, noThemeToggle: true },
};

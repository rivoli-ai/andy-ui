import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Views/Skill card",
  component: "andy-skill-card",
  tags: ["autodocs"],
  parameters: {
    docs: { description: { component: "Link-style card with icon, title, description and a slug + version meta row (`.ds-skill-card`)." } },
  },
  argTypes: {
    heading: { control: "text", table: { category: "Props" } },
    description: { control: "text", table: { category: "Props" } },
    slug: { control: "text", table: { category: "Props" } },
    version: { control: "text", table: { category: "Props" } },
    href: { control: "text", table: { category: "Props" } },
  },
  args: {
    heading: "PDF Extractor",
    description: "Pull text, tables and metadata from PDFs.",
    slug: "pdf-extract",
    version: "v2.1.0",
    href: "#",
  },
  render: (a) => html`
    <div style="max-width:300px">
      <andy-skill-card heading=${a.heading} description=${a.description} slug=${a.slug} version=${a.version} href=${a.href}></andy-skill-card>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

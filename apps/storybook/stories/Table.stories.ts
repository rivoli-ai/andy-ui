import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Collections/Table",
  component: "andy-table",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Canonical data table (`.ds-table`). Provide `columns` (`{ key, header, align?, mono?, strong? }[]`) and `rows`. For rich cells (pills, action buttons) use the `.ds-table` CSS classes directly instead.",
      },
    },
  },
  argTypes: {
    columns: { control: "object", table: { category: "Props" } },
    rows: { control: "object", table: { category: "Props" } },
  },
  args: {
    columns: [
      { key: "skill", header: "Skill", strong: true },
      { key: "slug", header: "Slug", mono: true },
      { key: "created", header: "Created" },
      { key: "latest", header: "Latest" },
    ],
    rows: [
      { skill: "PDF extractor", slug: "pdf-extractor", created: "Apr 12, 2026", latest: "1.3.0" },
      { skill: "Slack notifier", slug: "slack-notify", created: "Apr 9, 2026", latest: "0.8.2" },
      { skill: "SQL runner", slug: "sql-runner", created: "Mar 30, 2026", latest: "2.0.0" },
    ],
  },
  render: (a) => html`<andy-table .columns=${a.columns} .rows=${a.rows}></andy-table>`,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

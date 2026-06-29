import { html } from "lit";
import type { Meta, StoryObj } from "@storybook/web-components";

const meta: Meta = {
  title: "Modules/Chat",
  component: "andy-message",
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component:
          "Conversation primitives: `<andy-chat>` is the container, `<andy-message>` a bubble (`kind` = user|agent, plus `author`/`avatar`/`time`), `<andy-typing>` the typing indicator, and `<andy-session>` a session-list row.",
      },
    },
  },
  render: () => html`
    <div style="max-width:560px">
      <andy-chat>
        <andy-message kind="user" author="You" avatar="JD" time="14:02">
          Summarize the failing tests in the API repo.
        </andy-message>
        <andy-message kind="agent" author="DevPilot Agent" avatar="AI" time="14:02">
          Three suites fail — all in <code>auth.spec.ts</code>. The token refresh mock returns 401 after the clock advance.
        </andy-message>
        <andy-message kind="agent" author="DevPilot Agent" avatar="AI">
          <andy-typing></andy-typing> &nbsp;Streaming…
        </andy-message>
      </andy-chat>
    </div>
  `,
};
export default meta;
type Story = StoryObj;

export const Overview: Story = {};

export const Sessions: Story = {
  parameters: { docs: { description: { story: "`<andy-session>` — a session-list row." } } },
  render: () => html`
    <div style="display:flex;flex-direction:column;gap:8px;max-width:360px">
      <andy-session active name="API refactor" description="Migrate auth to refresh tokens" meta="2m ago · 18 messages"></andy-session>
      <andy-session name="Docs cleanup" meta="1h ago · 6 messages"></andy-session>
    </div>
  `,
};

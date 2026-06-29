import type { Preview } from "@storybook/web-components";
import { setCustomElementsManifest } from "@storybook/web-components";
import { withActions } from "@storybook/addon-actions/decorator";
// Full design-system stylesheet + every custom element.
import "@andy-ui/tokens/andy-ui.css";
import "@andy-ui/core";
// Drives the auto-generated docs tables (properties, events, slots, CSS).
import manifest from "@andy-ui/core/custom-elements.json";

setCustomElementsManifest(manifest);

/** Every custom event the library emits — logged in the Actions panel. */
const ANDY_EVENTS = [
  "andy-click",
  "andy-input",
  "andy-change",
  "andy-toggle",
  "andy-close",
  "andy-navigate",
  "andy-select",
  "andy-copy",
  "andy-theme-change",
  "andy-collapse-toggle",
];

const preview: Preview = {
  tags: ["autodocs"],
  parameters: {
    controls: { matchers: { color: /(background|color)$/i, date: /Date$/i } },
    actions: { handles: ANDY_EVENTS },
    backgrounds: { disable: true },
    a11y: {
      // Run axe on every story; surface violations in the Accessibility tab.
      config: {},
      options: {},
    },
    options: {
      storySort: {
        // Semantic-UI-style taxonomy: components grouped by what they ARE,
        // and each page ordered Overview -> Types -> States -> Variations.
        order: [
          "Introduction",
          ["Overview", "Getting Started"],
          "Globals",
          ["Overview", "Colors", "Typography"],
          "Elements",
          "Collections",
          ["Form"],
          "Views",
          "Modules",
          "Behaviors",
          ["Theming", "Toast"],
          "Layouts",
          "*",
          ["Overview", "Types", "States", "Variations"],
        ],
      },
    },
  },
  globalTypes: {
    theme: {
      description: "Andy-UI theme",
      defaultValue: "light",
      toolbar: {
        title: "Theme",
        icon: "circlehollow",
        items: [
          { value: "light", title: "Light", icon: "sun" },
          { value: "dark", title: "Dark", icon: "moon" },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [
    withActions,
    (story, ctx) => {
      document.documentElement.dataset.theme = ctx.globals.theme ?? "light";
      return story();
    },
  ],
};

export default preview;

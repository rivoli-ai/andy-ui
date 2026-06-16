/**
 * @andy-ui/react — React bindings for the Andy-UI web components.
 *
 * Each export is a real React component created with `@lit/react`, so props,
 * refs, and custom events behave the way React developers expect (e.g. the
 * `andy-click` DOM event is surfaced as the `onAndyClick` prop).
 *
 * Remember to import the stylesheet once at your app root:
 *   import "@andy-ui/tokens/andy-ui.css";
 */
import * as React from "react";
import { createComponent } from "@lit/react";
import { AndyButton, AndyBadge, AndyStatus, AndyVersionPill, AndyInput, AndySelect, AndySearchInput, AndySwitch, AndyCard, AndySkillCard, AndyStat, AndyCallout, AndyAvatar, AndyProgress, AndyIcon, AndyIconChip, AndyEmptyState, AndyBreadcrumb, AndyNavList, AndyNavItem, AndyNavbar, AndyAppShell, AndySidebar, AndyNavSection, AndyHeader, AndyFooter, AndyModal, AndyTabs, AndyAccordion, AndyThemeToggle, AndyKeyBox, AndyTable, AndyChat, AndyMessage, AndyTyping, AndySession, } from "@andy-ui/core";
export const Button = createComponent({
    react: React,
    tagName: "andy-button",
    elementClass: AndyButton,
    events: { onAndyClick: "andy-click" },
});
export const Badge = createComponent({ react: React, tagName: "andy-badge", elementClass: AndyBadge });
export const Status = createComponent({ react: React, tagName: "andy-status", elementClass: AndyStatus });
export const VersionPill = createComponent({ react: React, tagName: "andy-version-pill", elementClass: AndyVersionPill });
export const Input = createComponent({
    react: React,
    tagName: "andy-input",
    elementClass: AndyInput,
    events: {
        onAndyInput: "andy-input",
        onAndyChange: "andy-change",
    },
});
export const Select = createComponent({
    react: React,
    tagName: "andy-select",
    elementClass: AndySelect,
    events: { onAndyChange: "andy-change" },
});
export const SearchInput = createComponent({
    react: React,
    tagName: "andy-search-input",
    elementClass: AndySearchInput,
    events: { onAndyInput: "andy-input" },
});
export const Switch = createComponent({
    react: React,
    tagName: "andy-switch",
    elementClass: AndySwitch,
    events: { onAndyChange: "andy-change" },
});
export const Card = createComponent({ react: React, tagName: "andy-card", elementClass: AndyCard });
export const SkillCard = createComponent({ react: React, tagName: "andy-skill-card", elementClass: AndySkillCard });
export const Stat = createComponent({ react: React, tagName: "andy-stat", elementClass: AndyStat });
export const Callout = createComponent({ react: React, tagName: "andy-callout", elementClass: AndyCallout });
export const Avatar = createComponent({ react: React, tagName: "andy-avatar", elementClass: AndyAvatar });
export const Progress = createComponent({ react: React, tagName: "andy-progress", elementClass: AndyProgress });
export const Icon = createComponent({ react: React, tagName: "andy-icon", elementClass: AndyIcon });
export const IconChip = createComponent({ react: React, tagName: "andy-icon-chip", elementClass: AndyIconChip });
export const EmptyState = createComponent({ react: React, tagName: "andy-empty-state", elementClass: AndyEmptyState });
export const Breadcrumb = createComponent({
    react: React,
    tagName: "andy-breadcrumb",
    elementClass: AndyBreadcrumb,
    events: { onAndyNavigate: "andy-navigate" },
});
export const NavList = createComponent({ react: React, tagName: "andy-nav-list", elementClass: AndyNavList });
export const NavItem = createComponent({
    react: React,
    tagName: "andy-nav-item",
    elementClass: AndyNavItem,
    events: { onAndySelect: "andy-select" },
});
export const AppShell = createComponent({ react: React, tagName: "andy-app-shell", elementClass: AndyAppShell });
export const Sidebar = createComponent({
    react: React,
    tagName: "andy-sidebar",
    elementClass: AndySidebar,
    events: { onAndyCollapseToggle: "andy-collapse-toggle" },
});
export const NavSection = createComponent({ react: React, tagName: "andy-nav-section", elementClass: AndyNavSection });
export const Navbar = createComponent({
    react: React,
    tagName: "andy-navbar",
    elementClass: AndyNavbar,
    events: {
        onAndyNavigate: "andy-navigate",
        onAndyInput: "andy-input",
        onAndyThemeChange: "andy-theme-change",
    },
});
export const Header = createComponent({ react: React, tagName: "andy-header", elementClass: AndyHeader });
export const Footer = createComponent({ react: React, tagName: "andy-footer", elementClass: AndyFooter });
export const Modal = createComponent({
    react: React,
    tagName: "andy-modal",
    elementClass: AndyModal,
    events: { onAndyClose: "andy-close" },
});
export const Tabs = createComponent({
    react: React,
    tagName: "andy-tabs",
    elementClass: AndyTabs,
    events: { onAndyChange: "andy-change" },
});
export const Accordion = createComponent({
    react: React,
    tagName: "andy-accordion",
    elementClass: AndyAccordion,
    events: { onAndyToggle: "andy-toggle" },
});
export const ThemeToggle = createComponent({
    react: React,
    tagName: "andy-theme-toggle",
    elementClass: AndyThemeToggle,
    events: { onAndyThemeChange: "andy-theme-change" },
});
export const KeyBox = createComponent({
    react: React,
    tagName: "andy-key-box",
    elementClass: AndyKeyBox,
    events: { onAndyCopy: "andy-copy" },
});
export const Table = createComponent({ react: React, tagName: "andy-table", elementClass: AndyTable });
export const Chat = createComponent({ react: React, tagName: "andy-chat", elementClass: AndyChat });
export const Message = createComponent({ react: React, tagName: "andy-message", elementClass: AndyMessage });
export const Typing = createComponent({ react: React, tagName: "andy-typing", elementClass: AndyTyping });
export const Session = createComponent({ react: React, tagName: "andy-session", elementClass: AndySession });
// Imperative helpers re-exported verbatim from core.
export { toast, showToast } from "@andy-ui/core";
export { getTheme, setTheme, toggleTheme, initTheme } from "@andy-ui/core";
//# sourceMappingURL=index.js.map
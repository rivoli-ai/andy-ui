import { newSpecPage } from '@stencil/core/testing';
import { AndyUiIcon } from './icon';

const gearSvg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"/></svg>`;

describe('andy-ui-icon', () => {
  // ── Named icon (registry) ──────────────────────────────────────────────────

  it('renders a built-in SVG when name is provided', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon name="settings"></andy-ui-icon>`,
    });
    await page.waitForChanges();

    const svg = page.root?.shadowRoot?.querySelector('svg');
    expect(svg).toBeTruthy();
  });

  it('derives aria-label from name when label is omitted', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon name="home"></andy-ui-icon>`,
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-label')).toBe('home');
  });

  it('prefers explicit label over the icon name', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon name="user" label="View profile"></andy-ui-icon>`,
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.getAttribute('aria-label')).toBe('View profile');
  });

  it('renders the fallback slot for an unknown name', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon name="nonexistent-icon-xyz">${gearSvg}</andy-ui-icon>`,
    });
    await page.waitForChanges();

    // no named SVG → slot rendered
    const slot = page.root?.shadowRoot?.querySelector('slot');
    expect(slot).toBeTruthy();
  });

  it('reflects name attribute on the host', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon name="search"></andy-ui-icon>`,
    });

    expect((page.root as HTMLElement).getAttribute('name')).toBe('search');
  });

  // ── Custom SVG slot (backward compat) ─────────────────────────────────────

  it('renders a native button with default classes and explicit aria-label', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon label="Settings">${gearSvg}</andy-ui-icon>`,
    });
    await page.waitForChanges();

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.getAttribute('aria-label')).toBe('Settings');
    expect(button?.classList.contains('icon-btn-filled')).toBe(true);
    expect(button?.classList.contains('icon-btn-primary')).toBe(true);
    expect(button?.classList.contains('icon-btn-size-large')).toBe(true);
  });

  it('reflects variant, appearance, and size', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon label="Add" variant="secondary" appearance="outlined" size="medium">${gearSvg}</andy-ui-icon>`,
    });

    const host = page.root as HTMLElement;
    expect(host.getAttribute('variant')).toBe('secondary');
    expect(host.getAttribute('appearance')).toBe('outlined');
    expect(host.getAttribute('size')).toBe('medium');

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('icon-btn-secondary')).toBe(true);
    expect(button?.classList.contains('icon-btn-outlined')).toBe(true);
    expect(button?.classList.contains('icon-btn-size-medium')).toBe(true);
  });

  it('sets disabled and aria-disabled when disabled', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon label="Disabled" disabled="">${gearSvg}</andy-ui-icon>`,
    });
    await page.waitForChanges();

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.hasAttribute('disabled')).toBe(true);
    expect(button?.getAttribute('aria-disabled')).toBe('true');
  });

  it('emits iconClick when enabled', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon name="add"></andy-ui-icon>`,
    });

    const spy = jest.fn();
    page.root?.addEventListener('iconClick', spy);

    page.root?.shadowRoot?.querySelector('button')?.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not emit iconClick when disabled', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon name="close" disabled></andy-ui-icon>`,
    });

    const spy = jest.fn();
    page.root?.addEventListener('iconClick', spy);

    page.root?.shadowRoot?.querySelector('button')?.click();
    await page.waitForChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('supports basic (standard) appearance', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon name="more-vertical" appearance="basic" variant="tertiary"></andy-ui-icon>`,
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('icon-btn-basic')).toBe(true);
    expect(button?.classList.contains('icon-btn-tertiary')).toBe(true);
  });
});

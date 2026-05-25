import { newSpecPage } from '@stencil/core/testing';
import { AndyUiButton } from './button';

describe('andy-ui-button', () => {
  it('renders a native button with default classes', async () => {
    const page = await newSpecPage({
      components: [AndyUiButton],
      html: `<andy-ui-button>Click me</andy-ui-button>`,
    });
    await page.waitForChanges();

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button).toBeTruthy();
    expect(button?.classList.contains('btn-filled')).toBe(true);
    expect(button?.classList.contains('btn-primary')).toBe(true);
    expect(button?.classList.contains('btn-size-large')).toBe(true);
    expect(page.root?.textContent).toContain('Click me');
  });

  it('reflects variant, appearance, and size attributes', async () => {
    const page = await newSpecPage({
      components: [AndyUiButton],
      html: `<andy-ui-button variant="secondary" appearance="outlined" size="medium">Label</andy-ui-button>`,
    });

    const host = page.root as HTMLElement;
    expect(host.getAttribute('variant')).toBe('secondary');
    expect(host.getAttribute('appearance')).toBe('outlined');
    expect(host.getAttribute('size')).toBe('medium');

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('btn-secondary')).toBe(true);
    expect(button?.classList.contains('btn-outlined')).toBe(true);
    expect(button?.classList.contains('btn-size-medium')).toBe(true);
  });

  it('sets disabled and aria-disabled when disabled', async () => {
    const page = await newSpecPage({
      components: [AndyUiButton],
      html: `<andy-ui-button disabled="">Disabled</andy-ui-button>`,
    });
    await page.waitForChanges();

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.hasAttribute('disabled')).toBe(true);
    expect(button?.getAttribute('aria-disabled')).toBe('true');
  });

  it('emits buttonClick when enabled', async () => {
    const page = await newSpecPage({
      components: [AndyUiButton],
      html: `<andy-ui-button>Go</andy-ui-button>`,
    });

    const spy = jest.fn();
    page.root?.addEventListener('buttonClick', spy);

    page.root?.shadowRoot?.querySelector('button')?.click();
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('does not emit buttonClick when disabled', async () => {
    const page = await newSpecPage({
      components: [AndyUiButton],
      html: `<andy-ui-button disabled>Go</andy-ui-button>`,
    });

    const spy = jest.fn();
    page.root?.addEventListener('buttonClick', spy);

    page.root?.shadowRoot?.querySelector('button')?.click();
    await page.waitForChanges();

    expect(spy).not.toHaveBeenCalled();
  });

  it('applies full-width class when full-width is set', async () => {
    const page = await newSpecPage({
      components: [AndyUiButton],
      html: `<andy-ui-button full-width>Wide</andy-ui-button>`,
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('btn--full-width')).toBe(true);
  });

  it('supports basic (ghost) appearance', async () => {
    const page = await newSpecPage({
      components: [AndyUiButton],
      html: `<andy-ui-button appearance="basic" variant="tertiary">Ghost</andy-ui-button>`,
    });

    const button = page.root?.shadowRoot?.querySelector('button');
    expect(button?.classList.contains('btn-basic')).toBe(true);
    expect(button?.classList.contains('btn-tertiary')).toBe(true);
  });
});

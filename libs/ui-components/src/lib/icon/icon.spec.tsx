import { newSpecPage } from '@stencil/core/testing';
import { AndyUiIcon } from './icon';

describe('andy-ui-icon', () => {
  it('renders built-in SVG when name is provided', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon name="settings"></andy-ui-icon>`,
    });
    await page.waitForChanges();

    expect(page.root?.shadowRoot?.querySelector('svg')).toBeTruthy();
    expect(page.root?.shadowRoot?.querySelector('button')).toBeFalsy();
  });

  it('defaults to flex size', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon name="home"></andy-ui-icon>`,
    });

    expect((page.root as HTMLElement).getAttribute('size')).toBe('flex');
  });

  it('is decorative without aria-label', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon name="home"></andy-ui-icon>`,
    });

    const host = page.root as HTMLElement;
    expect(host.getAttribute('aria-hidden')).toBe('true');
    expect(host.getAttribute('role')).toBeNull();
  });

  it('exposes role img when aria-label is set', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon name="home" aria-label="Home"></andy-ui-icon>`,
    });

    const host = page.root as HTMLElement;
    expect(host.getAttribute('role')).toBe('img');
    expect(host.getAttribute('aria-label')).toBe('Home');
  });

  it('reflects fixed size on host', async () => {
    const page = await newSpecPage({
      components: [AndyUiIcon],
      html: `<andy-ui-icon name="search" size="small"></andy-ui-icon>`,
    });

    expect((page.root as HTMLElement).getAttribute('size')).toBe('small');
  });
});

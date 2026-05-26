import { newSpecPage } from '@stencil/core/testing';
import { OmnifexLogin } from './login';

describe('omnifex-login', () => {
  it('renders brand title, subtitle, and login button', async () => {
    const page = await newSpecPage({
      components: [OmnifexLogin],
      html: `<omnifex-login heading="Andy UI" subheading="Design System" action-label="Login"></omnifex-login>`,
    });

    expect(page.root?.shadowRoot?.querySelector('.login__title')?.textContent).toContain('Andy UI');
    expect(page.root?.shadowRoot?.querySelector('.login__subtitle')?.textContent).toContain(
      'Design System',
    );
    expect(page.root?.shadowRoot?.querySelector('.login__card-title')?.textContent).toContain(
      'Welcome Back',
    );
    expect(page.root?.shadowRoot?.querySelector('.login__card')).toBeTruthy();
  });

  it('emits login-click when button is activated', async () => {
    const page = await newSpecPage({
      components: [OmnifexLogin],
      html: `<omnifex-login></omnifex-login>`,
    });

    const spy = jest.fn();
    page.root?.addEventListener('login-click', spy);

    const cta = page.root?.shadowRoot?.querySelector('andy-ui-button') as HTMLElement | null;
    cta?.dispatchEvent(new CustomEvent('buttonClick', { bubbles: true, composed: true }));
    await page.waitForChanges();

    expect(spy).toHaveBeenCalledTimes(1);
  });

  it('renders error when set', async () => {
    const page = await newSpecPage({
      components: [OmnifexLogin],
      html: `<omnifex-login error="Bad"></omnifex-login>`,
    });
    expect(page.root?.shadowRoot?.querySelector('[role="alert"]')?.textContent).toContain('Bad');
  });
});

import { Component, Host, Prop, h } from '@stencil/core';
import { OmnifexIconSize } from '../shared/icon-size.enum';
import { ICONS, IconName } from './icons';

/**
 * Presentational icon glyph (no button). Use inside `andy-ui-button` or layouts.
 *
 *   <andy-ui-icon name="home"></andy-ui-icon>
 *   <andy-ui-button variant="primary">
 *     <andy-ui-icon slot="icon" name="home"></andy-ui-icon>
 *     Home
 *   </andy-ui-button>
 */
@Component({
  tag: 'andy-ui-icon',
  styleUrl: 'icon.css',
  shadow: true,
})
export class AndyUiIcon {
  @Prop({ reflect: true }) name?: IconName;

  @Prop({ reflect: true }) size: OmnifexIconSize = OmnifexIconSize.FLEX;

  /** When set, exposes role="img"; otherwise decorative (aria-hidden) */
  @Prop({ attribute: 'aria-label' }) ariaLabel?: string;

  private renderGlyph() {
    if (this.name) {
      const paths = ICONS[this.name];
      if (paths) {
        const svg =
          `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"` +
          ` fill="none" stroke="currentColor" stroke-width="2"` +
          ` stroke-linecap="round" stroke-linejoin="round">${paths}</svg>`;
        return <span class="icon__svg" innerHTML={svg} />;
      }
    }
    return <slot />;
  }

  render() {
    const label = this.ariaLabel;
    const decorative = !label;

    return (
      <Host
        part="icon"
        role={decorative ? undefined : 'img'}
        aria-label={label}
        aria-hidden={decorative ? 'true' : undefined}
        class={`icon icon-size-${this.size}`}
      >
        <span class="icon__glyph">{this.renderGlyph()}</span>
      </Host>
    );
  }
}

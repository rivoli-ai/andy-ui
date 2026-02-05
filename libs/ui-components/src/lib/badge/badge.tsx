import { Component, Prop, h } from '@stencil/core';
import { OmnifexVariant } from '../shared/variant.enum';

@Component({
  tag: 'omnifex-badge',
  styleUrl: 'badge.css',
  shadow: true,
})
export class OmnifexBadge {
  @Prop() variant: OmnifexVariant = OmnifexVariant.PRIMARY;

  render() {
    return (
      <span class={`badge badge-${this.variant}`}>
        <slot></slot>
      </span>
    );
  }
}

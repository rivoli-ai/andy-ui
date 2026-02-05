import { Component, Prop, h } from '@stencil/core';
import { OmnifexVariant } from '../shared/variant.enum';
import { OmnifexAppearance } from '../shared/appearance.enum';

@Component({
  tag: 'omnifex-card',
  styleUrl: 'card.css',
  shadow: true,
})
export class OmnifexCard {
  @Prop() cardTitle: string = '';
  @Prop() icon: string = '';
  @Prop() description: string = '';
  @Prop() items: string | string[] = [];
  @Prop() appearance: OmnifexAppearance = OmnifexAppearance.FILLED;
  @Prop() variant: OmnifexVariant = OmnifexVariant.PRIMARY;

  // Get card class based on appearance
  private getCardClass(): string {
    return 'card-' + this.appearance;
  }

  // Get title class based on appearance
  private getTitleClass(): string {
    return 'text-theme-text-primary';
  }

  // Get all card classes
  private getCardClasses(): string {
    const classes = [this.getCardClass()];
    
    // Add default card class for all variant enum values
    classes.push('card-default');
    
    // Add variant-specific classes
    if (this.variant === OmnifexVariant.PRIMARY) {
      classes.push('card-variant-primary');
    } else if (this.variant === OmnifexVariant.SECONDARY) {
      classes.push('card-variant-secondary');
    } else if (this.variant === OmnifexVariant.TERTIARY) {
      classes.push('card-variant-tertiary');
    } else if (this.variant === OmnifexVariant.INVERSE) {
      classes.push('card-variant-inverse');
    }
    
    return classes.join(' ');
  }

  render() {
    const isVariantEnum = this.variant === OmnifexVariant.PRIMARY || 
                          this.variant === OmnifexVariant.SECONDARY || 
                          this.variant === OmnifexVariant.TERTIARY || 
                          this.variant === OmnifexVariant.INVERSE;

    let itemsArray: string[] = [];
    if (Array.isArray(this.items)) {
      itemsArray = this.items;
    } else if (typeof this.items === 'string') {
      try {
        itemsArray = JSON.parse(this.items);
      } catch {
        itemsArray = [];
      }
    }

    return (
      <div class={this.getCardClasses()}>
        {this.cardTitle && (
          <h3 class={this.getTitleClass() + ' card-title'}>
            {this.icon && <span class="card-icon">{this.icon}</span>}
            {this.cardTitle}
          </h3>
        )}
        {this.description && isVariantEnum && (
          <p class="card-description">{this.description}</p>
        )}
        {itemsArray && itemsArray.length > 0 && isVariantEnum && (
          <ul class="card-items">
            {itemsArray.map((item: string) => (
              <li class="card-item">
                <span class="card-item-check">✓</span>
                {item}
              </li>
            ))}
          </ul>
        )}
        <slot />
      </div>
    );
  }
}

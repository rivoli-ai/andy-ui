import { OmnifexIconSize } from '../lib/shared/icon-size.enum';
import type { IconName } from '../lib/icon/icons';

export type IconStoryArgs = {
  name: IconName;
  size: OmnifexIconSize;
  ariaLabel: string;
};

export function iconSource(args: IconStoryArgs): string {
  const attrs = [
    `name="${args.name}"`,
    `size="${args.size}"`,
    args.ariaLabel ? `aria-label="${args.ariaLabel}"` : null,
  ]
    .filter(Boolean)
    .join('\n  ');

  if (args.size === OmnifexIconSize.FLEX) {
    return `<div style="width: var(--icon-button-size-large); height: var(--icon-button-size-large); display: inline-flex;">
  <andy-ui-icon
    ${attrs}
  ></andy-ui-icon>
</div>`;
  }

  return `<andy-ui-icon
  ${attrs}
></andy-ui-icon>`;
}

export const CUSTOM_SVG_SOURCE = `<!-- Standalone: omit name, pass SVG in default slot -->
<andy-ui-icon size="large" aria-label="Favorite">
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
  </svg>
</andy-ui-icon>

<!-- Inside andy-ui-button: use slot="icon" -->
<andy-ui-button variant="tertiary">
  <andy-ui-icon slot="icon" size="flex" aria-label="Favorite">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
    </svg>
  </andy-ui-icon>
  Favorite
</andy-ui-button>`;

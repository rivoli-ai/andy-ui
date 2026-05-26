import { OmnifexAppearance } from '../lib/shared/appearance.enum';
import { OmnifexButtonSize } from '../lib/shared/button-size.enum';
import { OmnifexVariant } from '../lib/shared/variant.enum';

export type ButtonStoryArgs = {
  label: string;
  variant: OmnifexVariant;
  appearance: OmnifexAppearance;
  size: OmnifexButtonSize;
  disabled: boolean;
  fullWidth: boolean;
  showIcon: boolean;
};

export function buttonSource(args: ButtonStoryArgs): string {
  const attrs = [
    `variant="${args.variant}"`,
    `appearance="${args.appearance}"`,
    `size="${args.size}"`,
    args.disabled ? 'disabled' : null,
    args.fullWidth ? 'full-width' : null,
  ]
    .filter(Boolean)
    .join('\n  ');

  const icon = args.showIcon
    ? `  <andy-ui-icon slot="icon" name="add" size="flex"></andy-ui-icon>\n  `
    : '';

  return `<andy-ui-button
  ${attrs}
>${icon}${args.label}
</andy-ui-button>`;
}

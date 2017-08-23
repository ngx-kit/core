import { Inject, Injectable } from '@angular/core';
import { defMerge, defPick, defToggle, StyleDef } from '@ngx-kit/styler';
import { KitComponentStyle } from '../../../core/meta/component';
import { kitTheme } from '../../../core/meta/tokens';
import { KitDefaultThemeService } from '../../kit-default-theme.service';
import { Swatch } from '../../meta/params';
import { applyColorSet } from '../../utils/apply-color-set';

@Injectable()
export class KitDefaultButtonStyle implements KitComponentStyle {
  constructor(@Inject(kitTheme) private theme: KitDefaultThemeService) {
  }

  host(state: {
    color: string;
    size: 'xs' | 's' | 'm' | 'l' | 'xs';
    grouped: 'none' | 'horizontal' | 'vertical';
    selected: boolean;
    disabled: boolean;
    loading: boolean;
    link: boolean;
  }): StyleDef {
    const params = this.theme.params;
    const color: Swatch = params.colors.swatches[state.color || 'default'];
    const styles: StyleDef = defMerge([
      {
        border: '1px solid transparent',
        borderRadius: this.theme.params.borders.radius,
        boxShadow: this.theme.params.shadows.element,
      },
      defToggle(state.disabled, {
        cursor: 'default',
        ...applyColorSet({
          background: color.light,
          border: color.light,
          text: color.disabledText,
        }, params.borders.width),
      }, {
        cursor: 'pointer',
        ...applyColorSet({
          background: color.base,
          border: color.base,
          text: color.baseText,
        }, params.borders.width),
        $nest: {
          '&:hover': {
            ...applyColorSet({
              background: color.hover,
              border: color.hover,
              text: color.baseText,
            }, params.borders.width),
          },
          '&:active': {
            ...applyColorSet({
              background: color.active,
              border: color.active,
              text: color.baseText,
            }, params.borders.width),
          },
        },
      }),
      defPick(state.size, {
        xs: {
          padding: `${this.theme.params.grid.v / 8}px ${this.theme.params.grid.h / 2}px`,
          fontSize: '.75rem',
        },
        s: {
          padding: `${this.theme.params.grid.v / 4}px ${this.theme.params.grid.h}px`,
          fontSize: '.9rem',
        },
        m: {
          padding: `${this.theme.params.grid.v / 2}px ${this.theme.params.grid.h * 1.5}px`,
          fontSize: '1rem',
        },
        l: {
          padding: `${this.theme.params.grid.v}px ${this.theme.params.grid.h * 2.5}px`,
          fontSize: '1.15rem',
        },
        xl: {
          padding: `${this.theme.params.grid.v * 2}px ${this.theme.params.grid.h * 4}px`,
          fontSize: '1.5rem',
        },
      }, 'm'),
//      defToggle(state.link, {
//        boxShadow: 'none',
//        paddingLeft: 0,
//        paddingRight: 0,
//        background: 'transparent',
//        borderColor: 'transparent',
//        text: text.background,
//        $nest: {
//          '&:hover': {
//            text: this.theme.colorMod(.05, text.background),
//            background: 'transparent',
//            textDecoration: 'underline',
//          },
//        },
//      }),
      defPick(state.grouped, {
        horizontal: {
          borderRadius: 0,
          $nest: {
            '&:first-child': {
              borderBottomLeftRadius: '3px',
              borderTopLeftRadius: '3px',
            },
            '&:last-child': {
              borderBottomRightRadius: '3px',
              borderTopRightRadius: '3px',
            },
            '&:not(:first-child)': {
              borderLeft: 0,
            },
          },
        },
        vertical: {
          borderRadius: 0,
          $nest: {
            '&:first-child': {
              borderTopRightRadius: '3px',
              borderTopLeftRadius: '3px',
            },
            '&:last-child': {
              borderBottomRightRadius: '3px',
              borderBottomLeftRadius: '3px',
            },
            '&:not(:first-child)': {
              borderTop: 0,
            },
          },
        },
      }),
      defToggle(state.loading, {
        cursor: 'default',
      }),
    ]);
    // @todo restore and use values from params
//    if (state.selected) {
//      if ('background' in styles) {
//        styles.background = darken(.1, styles.background);
//      }
//    }
//    if (state.loading) {
//      if ('background' in styles) {
//        styles.background = lighten(.1, styles.background);
//      }
//      if ('color' in styles) {
//        styles.color = lighten(.1, styles.color as string);
//      }
//    }
    return styles;
  }
}

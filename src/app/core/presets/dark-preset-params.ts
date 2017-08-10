import {
  KitDefaultThemeParamsAccordion,
  KitDefaultThemeParamsAlert,
  KitDefaultThemeParamsAutoComplete,
  KitDefaultThemeParamsBadge,
  KitDefaultThemeParamsButton,
  KitDefaultThemeParamsCheckbox,
  KitDefaultThemeParamsDef,
  KitDefaultThemeParamsDropdownMenu,
  KitDefaultThemeParamsForm,
  KitDefaultThemeParamsInput,
  KitDefaultThemeParamsLoadingBar,
  KitDefaultThemeParamsMenu,
  KitDefaultThemeParamsRadio,
  KitDefaultThemeParamsSelect,
  KitDefaultThemeParamsSpinner,
  KitDefaultThemeParamsTag,
  KitDefaultThemeParamsTextarea,
  KitDefaultThemeParamsToggle,
  KitDefaultThemeParamsTypo,
} from '@ngx-kit/ngx-kit';

export class DarkPresetParams implements KitDefaultThemeParamsDef {
  grid = {
    h: 8,
    v: 8,
  };

  moduleButton: KitDefaultThemeParamsButton = {
    colors: {
      'default': {
        base: {
          background: this.colors.blue2,
          border: this.colors.blue2,
          text: this.colors.white,
        },
        hover: {
          background: this.colors.blue3,
          border: this.colors.blue3,
          text: this.colors.white,
        },
        active: {
          background: this.colors.blue1,
          border: this.colors.blue1,
          text: this.colors.white,
        },
        disabled: {
          background: this.colors.grey5,
          border: this.colors.grey5,
          text: this.colors.grey6,
        },
      },
      primary: {
        base: {
          background: this.colors.purple2,
          border: this.colors.purple2,
          text: this.colors.white,
        },
        hover: {
          background: this.colors.purple3,
          border: this.colors.purple3,
          text: this.colors.white,
        },
        active: {
          background: this.colors.purple1,
          border: this.colors.purple1,
          text: this.colors.white,
        },
        disabled: {
          background: this.colors.grey5,
          border: this.colors.grey5,
          text: this.colors.grey6,
        },
      },
      success: {
        base: {
          background: this.colors.green2,
          border: this.colors.green2,
          text: this.colors.white,
        },
        hover: {
          background: this.colors.green3,
          border: this.colors.green3,
          text: this.colors.white,
        },
        active: {
          background: this.colors.green1,
          border: this.colors.green1,
          text: this.colors.white,
        },
        disabled: {
          background: this.colors.grey5,
          border: this.colors.grey5,
          text: this.colors.grey6,
        },
      },
      warning: {
        base: {
          background: this.colors.orange2,
          border: this.colors.orange2,
          text: this.colors.white,
        },
        hover: {
          background: this.colors.orange3,
          border: this.colors.orange3,
          text: this.colors.white,
        },
        active: {
          background: this.colors.orange1,
          border: this.colors.orange1,
          text: this.colors.white,
        },
        disabled: {
          background: this.colors.grey5,
          border: this.colors.grey5,
          text: this.colors.grey6,
        },
      },
      error: {
        base: {
          background: this.colors.red2,
          border: this.colors.red2,
          text: this.colors.white,
        },
        hover: {
          background: this.colors.red3,
          border: this.colors.red3,
          text: this.colors.white,
        },
        active: {
          background: this.colors.red1,
          border: this.colors.red1,
          text: this.colors.white,
        },
        disabled: {
          background: this.colors.grey5,
          border: this.colors.grey5,
          text: this.colors.grey6,
        },
      },
    },
  };

  get borders() {
    return {
      radius: {
        s: 2,
        m: 6,
        l: 12,
      },
      width: 1,
    }
  }

  get colors() {
    return {
      white: '#fff',
      lightBlue1: '#5cdbff',
      blue1: '#0578ff',
      blue2: '#0080FF',
      blue3: '#05a0ff',
      lightPurple1: '#DCC6E0',
      purple1: '#80459f',
      purple2: '#8E44AD',
      purple3: '#a245c2',
      lightGreen1: '#a5e396',
      green1: '#36b66b',
      green2: '#36C77C',
      green3: '#36dd92',
      lightOrange1: '#fff198',
      orange1: '#ce5c39',
      orange2: '#E15E3A',
      orange3: '#fe5f3b',
      lightRed1: '#ffcdca',
      red1: '#b43b2c',
      red2: '#C0392B',
      red3: '#d73b2b',
      lightGrey1: '#fafafa',
      lightGrey2: '#f4f4f4',
      lightGrey3: '#efefef',
      grey1: '#e2e2e2',
      grey2: '#dadada',
      grey3: '#cacaca',
      grey4: '#b0b0b0',
      grey5: '#8c8c8c',
      grey6: '#707070',
      grey7: '#585858',
      grey8: '#404040',
      dark1: '#090909',
      dark2: '#191919',
      dark3: '#292929',
      dark4: '#383838',
    };
  }

  get moduleAccordion(): KitDefaultThemeParamsAccordion {
    return {
      colors: {
        border: this.colors.grey7,
        title: {
          background: this.colors.dark4,
          text: this.colors.grey2,
        },
        content: {
          background: this.colors.grey8,
          text: this.colors.grey2,
        },
      },
    };
  }

  get moduleAlert(): KitDefaultThemeParamsAlert {
    return {
      titleFontSize: '1.2em',
      colors: {
        info: {
          background: this.colors.lightBlue1,
          border: this.colors.blue1,
          text: `rgba(0,0,0,.7)`,
          closeText: this.colors.blue2,
          titleText: `rgba(0,0,0,.9)`,
        },
        success: {
          background: this.colors.lightGreen1,
          border: this.colors.green1,
          text: `rgba(0,0,0,.7)`,
          closeText: this.colors.green2,
          titleText: `rgba(0,0,0,.9)`,
        },
        warning: {
          background: this.colors.lightOrange1,
          border: this.colors.orange1,
          text: `rgba(0,0,0,.7)`,
          closeText: this.colors.orange2,
          titleText: `rgba(0,0,0,.9)`,
        },
        error: {
          background: this.colors.lightRed1,
          border: this.colors.red1,
          text: `rgba(0,0,0,.7)`,
          closeText: this.colors.red2,
          titleText: `rgba(0,0,0,.9)`,
        },
      },
    };
  }

  get moduleAutoComplete(): KitDefaultThemeParamsAutoComplete {
    return {
      colors: {
        resultItem: {
          base: {
            background: this.colors.grey7,
            border: this.colors.grey6,
            text: this.colors.white,
          },
          hover: {
            background: this.colors.grey5,
            border: this.colors.grey6,
            text: this.colors.white,
          },
          active: {
            background: this.colors.grey6,
            border: this.colors.grey6,
            text: this.colors.white,
          },
        },
      },
    };
  }

  get moduleBadge(): KitDefaultThemeParamsBadge {
    return {
      colors: {
        'default': {
          background: this.colors.blue1,
          border: this.colors.blue1,
          text: this.colors.white,
        },
        primary: {
          background: this.colors.blue1,
          border: this.colors.blue1,
          text: this.colors.white,
        },
        success: {
          background: this.colors.blue1,
          border: this.colors.blue1,
          text: this.colors.white,
        },
        warning: {
          background: this.colors.blue1,
          border: this.colors.blue1,
          text: this.colors.white,
        },
        error: {
          background: this.colors.blue1,
          border: this.colors.blue1,
          text: this.colors.white,
        },
      },
    };
  }

  get moduleCheckbox(): KitDefaultThemeParamsCheckbox {
    return {
      colors: {
        base: {
          background: this.colors.grey7,
          border: this.colors.grey4,
        },
        checked: {
          background: this.colors.grey8,
          border: this.colors.blue1,
          check: this.colors.blue1,
        },
      },
    };
  }

  get moduleDatePicker() {
    return {};
  }

  get moduleDropdownMenu(): KitDefaultThemeParamsDropdownMenu {
    return {
      colors: {
        menu: {
          border: this.colors.grey1,
          background: this.colors.grey7,
        },
      },
    };
  }

  get moduleForm(): KitDefaultThemeParamsForm {
    return {
      colors: {
        error: {
          border: this.colors.red1,
          text: this.colors.red1,
        },
      },
    };
  }

  get moduleInput(): KitDefaultThemeParamsInput {
    return {
      colors: {
        base: {
          background: this.colors.grey6,
          border: this.colors.grey6,
          text: this.colors.white,
        },
        hover: {
          background: this.colors.grey7,
          border: this.colors.grey6,
          text: this.colors.white,
        },
        focus: {
          background: this.colors.grey8,
          border: this.colors.blue1,
          text: this.colors.white,
        },
      },
    };
  }

  get moduleLoadingBar(): KitDefaultThemeParamsLoadingBar {
    return {
      colors: {
        background: this.colors.blue3,
        shadow: this.colors.blue1,
      },
    };
  }

  get moduleMenu(): KitDefaultThemeParamsMenu {
    return {
      titleFontSize: '.9rem',
      colors: {
        item: {
          base: {
            background: 'transparent',
            border: 'transparent',
            text: this.colors.grey6,
          },
          hover: {
            background: 'transparent',
            border: this.colors.grey3,
            text: this.colors.grey6,
          },
          disabled: {
            background: 'transparent',
            border: 'transparent',
            text: this.colors.grey3,
          },
        },
        groupTitle: {
          background: 'transparent',
          text: this.colors.grey5,
        },
        separator: this.colors.grey1,
      },
    };
  }

  get moduleRadio(): KitDefaultThemeParamsRadio {
    return {
      colors: {
        base: {
          background: this.colors.lightGrey2,
          border: this.colors.grey1,
        },
        hover: {
          background: this.colors.lightGrey2,
          border: this.colors.grey3,
        },
        checked: {
          background: this.colors.lightGrey2,
          border: this.colors.blue1,
          dot: this.colors.blue1,
        },
      },
    };
  }

  get moduleSelect(): KitDefaultThemeParamsSelect {
    return {
      colors: {
        select: {
          base: {
            background: this.colors.lightGrey2,
            border: this.colors.grey1,
            text: this.colors.grey7,
          },
          hover: {
            background: this.colors.lightGrey2,
            border: this.colors.grey3,
            text: this.colors.grey7,
          },
          focus: {
            background: this.colors.lightGrey2,
            border: this.colors.blue1,
            text: this.colors.grey8,
          },
        },
        option: {
          base: {
            background: this.colors.lightGrey2,
            border: this.colors.grey1,
            text: this.colors.grey7,
          },
          hover: {
            background: this.colors.blue1,
            border: this.colors.blue1,
            text: this.colors.white,
          },
          selected: {
            background: this.colors.blue1,
            border: this.colors.blue1,
            text: this.colors.white,
          },
        },
      },
    };
  }

  get moduleSpinner(): KitDefaultThemeParamsSpinner {
    return {
      duration: '1.5s',
      size: 50,
      type: 'spin-1',
      colors: {
        'default': this.colors.blue1,
      },
    };
  }

  get moduleTag(): KitDefaultThemeParamsTag {
    return {
      colors: {
        'default': {
          background: this.colors.grey2,
          border: this.colors.grey2,
          text: this.colors.grey8,
        },
        primary: {
          background: this.colors.blue1,
          border: this.colors.blue1,
          text: this.colors.white,
        },
        success: {
          background: this.colors.grey2,
          border: this.colors.grey2,
          text: this.colors.grey8,
        },
        error: {
          background: this.colors.grey2,
          border: this.colors.grey2,
          text: this.colors.grey8,
        },
        warning: {
          background: this.colors.grey2,
          border: this.colors.grey2,
          text: this.colors.grey8,
        },
      },
    };
  }

  get moduleTextarea(): KitDefaultThemeParamsTextarea {
    return {
      colors: {
        base: {
          background: this.colors.lightGrey2,
          border: this.colors.grey1,
          text: this.colors.grey7,
        },
        hover: {
          background: this.colors.lightGrey2,
          border: this.colors.grey3,
          text: this.colors.grey7,
        },
        focus: {
          background: this.colors.lightGrey2,
          border: this.colors.blue1,
          text: this.colors.grey8,
        },
      },
    };
  }

  get moduleToggle(): KitDefaultThemeParamsToggle {
    return {
      colors: {
        base: {
          background: this.colors.lightGrey2,
          border: this.colors.grey1,
          toggle: this.colors.white,
        },
        checked: {
          background: this.colors.blue1,
          border: this.colors.blue2,
          toggle: this.colors.white,
        },
      },
    };
  }

  get moduleTypo(): KitDefaultThemeParamsTypo {
    return {
      fontSize: '13px',
      headingFontSizes: {
        h1: '2.2rem',
        h2: '1.6rem',
        h3: '1.4rem',
        h4: '1.1rem',
        h5: '1rem',
        h6: '.9rem',
      },
      colors: {
        text: {
          background: 'transparent',
          text: this.colors.grey1,
        },
        link: {
          base: {
            background: 'transparent',
            text: this.colors.lightBlue1,
          },
          hover: {
            background: 'transparent',
            text: this.colors.blue2,
          },
          focus: {
            background: 'transparent',
            text: this.colors.blue2,
          },
          visited: {
            background: 'transparent',
            text: this.colors.blue2,
          },
        },
      },
    };
  }

  get shadows() {
    return {
      element: '0 0 2px 0 rgba(50, 50, 50, 0.1)',
      deep: '0 0 20px 0 rgba(50, 50, 50, 0.1)',
      overlay: '0 0 6px 0 rgba(50, 50, 50, 0.1)',
    };
  }

  get transitions() {
    return {
      'default': 'all .3s',
    };
  }
}

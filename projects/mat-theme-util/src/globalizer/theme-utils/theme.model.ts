import { Color, ColorType } from "../color-models/color.model";
import { Palette } from "../color-models/palette.model";

// Default theme applied when none is provided
export enum DEFAULT_THEME {
  PRIMARY = "#023057",
  ACCENT = "#c1c5c8",
  WARN = "#ff0000"
}

// Color Theme Class for updating,
// managing the theme style
export class Theme {
  private primary: Color;
  private accent: Color;
  private warn: Color;

  constructor(private p?: string, private a?: string, private w?: string) {
    this.setPrimary(p);
    this.setAccent(a);
    this.setWarn(w);
  }

  setPrimary(color: string = DEFAULT_THEME.PRIMARY): void {
    this.primary = new Color(color);
    this.buildPalette(this.primary, ColorType.PRIMARY);
  }

  setAccent(color: string = DEFAULT_THEME.ACCENT): void {
    this.accent = new Color(color);
    this.buildPalette(this.accent, ColorType.ACCENT);
  }

  setWarn(color: string = DEFAULT_THEME.WARN): void {
    this.warn = new Color(color);
    this.buildPalette(this.warn, ColorType.WARN);
  }

  private buildPalette(color: Color, type: ColorType) {
    new Palette(color, type).buildPalette().assignPalette();
  }
}

// @TODO EXPERIMENTAL feature for
// applying other theme attributes
// ex. Font-family, border-radius, etc.
// class UIThemeMap<T> {
//   public name: string;
//   private value: T;
//   get = () => this.value;
//   set = (v: T) => (this.value = v);
// }

// @TODO EXPERIMENTAL feature for
// applying other theme attributes
// ex. Font-family, border-radius, etc.
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
// export class Theme {
//   private themeContainer: any = document.querySelector("body");
//   private themeMap: UIThemeMap<any>[];
//   public colorTheme: ColorTheme;

//   setThemeMap(themeMap: UIThemeMap<any>[]): void {
//     this.themeMap = themeMap;
//     this.applyUITheme();
//   }

//   constructor(themeMap?: UIThemeMap<any>[], private basicTheme?: {p?: string, a?: string, w?: string}) {
//     if (!!themeMap) {
//       this.themeMap = themeMap;
//     } else {
//       this.themeMap = [];
//     }
//     if (!!basicTheme) {
//       this.colorTheme = new ColorTheme(this.basicTheme);
//     } else {
//       this.colorTheme = new ColorTheme();
//     }
//   }

//   // Applies theme properties IF they are applied via CSS Attributes
//   private applyUITheme(): void {
//     this.themeMap.map(_map => {
//       const ref = _map.name;
//       this.applyAttr(ref, _map.get());
//       return;
//     });
//   }

//   private applyAttr(ref: string, value: string): void {
//     if (!!ref) {
//       this.themeContainer.style.setProperty(`--${ref}`, `(${value})`);
//     }
//   }

// @TODO EXPERIMENTAL feature for
// applying other theme attributes
// ex. Font-family, border-radius, etc.
// private buildAttr<T>(name: string, val: T): UIThemeMap<T> {
//   const uiMap = new UIThemeMap<T>();
//   uiMap.set(val);
//   uiMap.name = name;
//   return uiMap;
// }
// }

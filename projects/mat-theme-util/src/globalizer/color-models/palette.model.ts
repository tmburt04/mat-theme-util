import { ColorType, Color, ColorFormat } from "./color.model";
import { HSL } from "./color-format.model";
import { ViewChild, ElementRef } from "@angular/core";

// Defines the public input type for the palette type.
export enum PaletteType {
  P = "PRIMARY",
  A = "ACCENT",
  W = "WARN"
}

class HueMap<T> {
  ref: string;
  value: T;
}

class PaletteModel {
  themeContainer = document.querySelector('body');

  private paletteType: string;

  private _50: Color;
  private _100: Color;
  private _200: Color;
  private _300: Color;
  private _400: Color;
  private _500: Color;
  private _600: Color;
  private _700: Color;
  private _800: Color;
  private _900: Color;
  private _A100: Color;
  private _A200: Color;
  private _A400: Color;
  private _A700: Color;

  constructor(private colorMap: HueMap<Color>[], private type?: string) {
    // Sets Palette type (Primary/accent/warn)
    // if it exists
    if (!!this.type) {
      this.paletteType = type;
    } else {
      throw `No Palette type has been set.`;
    }
    // Sets ColorMap (Primary/accent/warn)
    // if it exists
    if (!!this.colorMap && this.colorMap.length > 0) {
      this.colorMap.map(v => {
        this[`_${v.ref}`] = v.value;
      });
    } else {
      throw `Palette could not be generated.`;
    }
  }

  // Assigns the value of the palette based on the
  // format and palette type (Primary, accent, warn)
  // @TODO Make the contrast more dynamic
  public assignPalette = (format: ColorFormat = ColorFormat.HEX) => {
    const t = this.paletteType;
    const themeEl = this.themeContainer;
    if (!!themeEl) {
      themeEl.style.setProperty(`--${t}-50`, this._50.toStr(format));
      themeEl.style.setProperty(`--${t}-100`, this._100.toStr(format));
      themeEl.style.setProperty(`--${t}-200`, this._200.toStr(format));
      themeEl.style.setProperty(`--${t}-300`, this._300.toStr(format));
      themeEl.style.setProperty(`--${t}-400`, this._400.toStr(format));
      themeEl.style.setProperty(`--${t}-500`, this._500.toStr(format));
      themeEl.style.setProperty(`--${t}-600`, this._600.toStr(format));
      themeEl.style.setProperty(`--${t}-700`, this._700.toStr(format));
      themeEl.style.setProperty(`--${t}-800`, this._800.toStr(format));
      themeEl.style.setProperty(`--${t}-900`, this._900.toStr(format));
      themeEl.style.setProperty(`--${t}-A100`, this._A100.toStr(format));
      themeEl.style.setProperty(`--${t}-A200`, this._A200.toStr(format));
      themeEl.style.setProperty(`--${t}-A400`, this._A400.toStr(format));
      themeEl.style.setProperty(`--${t}-A700`, this._A700.toStr(format));
    } else {
      throw `No body element found!`
    }
  };
}

export class Palette {
  palette: PaletteModel;
  constructor(private color: Color, private type: ColorType) { }

  public buildPalette = () => {
    return this.generatePalette(this.color);
  };

  /*
   Generates a color palette given a single color.

   1. Color is parsed to HSL format
   2. Light (HS{L}) is altered for each Palette color
   3. Palette is generated with Color Objects (allowing for use in any color format)

  */
  private generatePalette = (color: Color): PaletteModel => {
    const _color = color.HSL;
    const h = Math.round(_color.h);
    const s = Math.round(_color.s);
    const l = Math.round(_color.l);
    if (isNaN(h) || isNaN(s) || isNaN(l)) {
      throw new TypeError("Invalid input");
    }
    if (h < 0 || h > 360) {
      throw new RangeError(
        `Hue must be an integer within [0, 360]; given ${h}%`
      );
    }
    if (s < 0 || s > 100) {
      throw new RangeError(
        `Saturation must be an integer within [0, 100]; given ${s}%`
      );
    }
    if (l < 0 || l > 100) {
      throw new RangeError(
        `Lightness must be an integer within [0, 100]; given ${l}`
      );
    }

    const hueMapset: HueMap<Color>[] = this.generateAlterations(l).map(
      (map: HueMap<number>) => {
        const _color: Color = new Color(new HSL(h, s, map.value));
        return {
          ref: map.ref,
          value: _color
        };
      }
    );

    return new PaletteModel(hueMapset, this.type);
  };

  // Generates color palette based on the formula
  // provided by @leodido (https://github.com/leodido/material-palette)
  private minimax = val => Math.min(100, Math.max(0, val));

  private generateAlterations = (l: number): HueMap<number>[] => [
    {
      ref: "50",
      value: this.minimax(l + 52)
    },
    {
      ref: "100",
      value: this.minimax(l + 37)
    },
    {
      ref: "200",
      value: this.minimax(l + 26)
    },
    {
      ref: "300",
      value: this.minimax(l + 12)
    },
    {
      ref: "400",
      value: this.minimax(l + 6)
    },
    {
      ref: "500",
      value: l
    },
    {
      ref: "600",
      value: this.minimax(l - 6)
    },
    {
      ref: "700",
      value: this.minimax(l - 12)
    },
    {
      ref: "800",
      value: this.minimax(l - 18)
    },
    {
      ref: "900",
      value: this.minimax(l - 24)
    },
    {
      ref: "A100",
      value: this.minimax(l + 24)
    },
    {
      ref: "A200",
      value: this.minimax(l + 16)
    },
    {
      ref: "A400",
      value: this.minimax(l - 1)
    },
    {
      ref: "A700",
      value: this.minimax(l - 12)
    }
  ];
}

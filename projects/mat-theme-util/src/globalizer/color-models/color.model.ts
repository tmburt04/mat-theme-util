import { ParseHEX, ParseHSL, ParseRGB } from "./formater.util";
import { Hex, RGB, HSL } from "./color-format.model";

enum ColorType {
  PRIMARY = "P",
  ACCENT = "A",
  WARN = "W"
}

// Defines the types of ColorFormats
export enum ColorFormat {
  HEX = "HEX",
  RGB = "RGB",
  HSL = "HSL"
}

class Color {
  protected _hex: Hex;
  protected _rgb: RGB;
  protected _hsl: HSL;

  constructor(val: Hex | RGB | HSL | string) {
    if (
      !(val instanceof Hex) &&
      !(val instanceof RGB) &&
      !(val instanceof HSL)
    ) {
      this.parseStr(val);
    } else {
      this.set(val);
    }
  }

  get RGB() {
    return this._rgb;
  }
  get HEX() {
    return this._hex;
  }
  get HSL() {
    return this._hsl;
  }

  public get(type: ColorFormat = ColorFormat.HEX): Hex | RGB | HSL {
    if (type === ColorFormat.HEX) {
      return this.HEX;
    } else if (type === ColorFormat.RGB) {
      return this.RGB;
    } else if (type === ColorFormat.HSL) {
      return this.HSL;
    } else {
      throw `Invalid type for color.`;
    }
  }

  public toStr(type: ColorFormat = ColorFormat.HEX): string {
    if (type === ColorFormat.HEX) {
      return this.HEX.parse();
    } else if (type === ColorFormat.RGB) {
      return this.RGB.parse();
    } else if (type === ColorFormat.HSL) {
      return this.HSL.parse();
    } else {
      throw `Invalid type for color.`;
    }
  }

  public parseStr(str: string): void {
    const validHex = ParseHEX.TEST(str);
    let _color;
    if (validHex) {
      _color = new Hex(str);
    }
    this.set(_color);
  }

  public set(val: Hex | RGB | HSL | string): void {
    if (val instanceof Hex) {
      this._hex = val;
      this._rgb = ParseHEX.RGB(val);
      this._hsl = ParseHEX.HSL(val);
    } else if (val instanceof RGB) {
      this._hex = ParseRGB.HEX(val);
      this._rgb = val;
      this._hsl = ParseRGB.HSL(val);
    } else if (val instanceof HSL) {
      this._hex = ParseHSL.HEX(val);
      this._rgb = ParseHSL.RGB(val);
      this._hsl = val;
    } else {
      throw `Invalid input format for color.`;
    }
  }
}

export { ColorType, Color };

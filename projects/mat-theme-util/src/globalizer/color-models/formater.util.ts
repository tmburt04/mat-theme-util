// Color Utility functions had to be exported to their
// own document to prevent circular dependencies

import { Hex, RGB, HSL } from "./color-format.model";

export const REGEX = {
  HEX: {
    PARSE: /^#?([a-fA-F0-9]{1,2})([a-fA-F0-9]{1,2})([a-fA-F0-9]{1,2})$/i,
    TEST: `^#?(([a-fA-F0-9]{2}){3}|([a-fA-F0-9]{1}){3})$`
  }
}

/*
RGB Utilities
=====================================================
=====================================================
*/

const rgb2Hex = (rgb: RGB): Hex => {
  const parseHex = v => {
    const hex = v.toString(16);
    return hex.length === 1 ? `0${hex}` : hex;
  };

  const _r = parseHex(rgb.r);
  const _g = parseHex(rgb.g);
  const _b = parseHex(rgb.b);

  return new Hex(`#${_r}${_g}${_b}`);
};

const rgb2Hsl = (rgb: RGB): HSL => {
  let h = 0,
    s = 0,
    l = 0;

  // Make r, g, and b fractions of 1
  const _r = (rgb.r /= 255);
  const _g = (rgb.g /= 255);
  const _b = (rgb.b /= 255);

  // Find greatest and smallest channel values
  const cmin = Math.min(_r, _g, _b),
    cmax = Math.max(_r, _g, _b),
    delta = cmax - cmin;

  if (delta == 0) h = 0;
  // Red is max
  else if (cmax == _r) h = ((_g - _b) / delta) % 6;
  // Green is max
  else if (cmax == _g) h = (_b - _r) / delta + 2;
  // Blue is max
  else h = (_r - _g) / delta + 4;

  h = Math.round(h * 60);

  // Make negative hues positive behind 360°
  if (h < 0) h += 360;

  // Calculate lightness
  l = (cmax + cmin) / 2;

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1);
  l = +(l * 100).toFixed(1);

  return new HSL(h, s, l);
};

const ParseRGB = {
  HEX: rgb2Hex,
  HSL: rgb2Hsl
};
/*
HEX Utilities
=====================================================
=====================================================
*/

const hex2RGB = (hex: Hex): RGB => {
  let r, g, b;
  const result = REGEX.HEX.PARSE.exec(hex.parse());
  if (!!result) {
    r = parseInt(result[1], 16);
    g = parseInt(result[2], 16);
    b = parseInt(result[3], 16);
  }
  return new RGB(r, g, b);
};

const hex2Hsl = (hex: Hex): HSL => {
  const rgb: RGB = hex2RGB(hex);
  return ParseRGB.HSL(rgb);
};

const testHex = str => {
  return new RegExp(REGEX.HEX.TEST).test(str);
};

const ParseHEX = {
  RGB: hex2RGB,
  HSL: hex2Hsl,
  TEST: testHex
};

/*
HSL Utilities
=====================================================
=====================================================
*/

const hsl2RGB = (hsl: HSL): RGB => {
  // Must be fractions of 1
  const h = hsl.h;
  const s = hsl.s / 100;
  const l = hsl.l / 100;

  const c = (1 - Math.abs(2 * l - 1)) * s,
    x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
    m = l - c / 2;
  let r = 0,
    g = 0,
    b = 0;

  if (0 <= h && h < 60) {
    r = c;
    g = x;
    b = 0;
  } else if (60 <= h && h < 120) {
    r = x;
    g = c;
    b = 0;
  } else if (120 <= h && h < 180) {
    r = 0;
    g = c;
    b = x;
  } else if (180 <= h && h < 240) {
    r = 0;
    g = x;
    b = c;
  } else if (240 <= h && h < 300) {
    r = x;
    g = 0;
    b = c;
  } else if (300 <= h && h < 360) {
    r = c;
    g = 0;
    b = x;
  }
  r = Math.round((r + m) * 255);
  g = Math.round((g + m) * 255);
  b = Math.round((b + m) * 255);

  return new RGB(r, g, b);
};

const hsl2Hex = (hsl: HSL) => {
  const rgb: RGB = hsl2RGB(hsl);
  return ParseRGB.HEX(rgb);
};

const ParseHSL = {
  RGB: hsl2RGB,
  HEX: hsl2Hex
};

export { ParseHEX, ParseHSL, ParseRGB };

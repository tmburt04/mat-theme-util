import {
  Component,
  Input,
  Output,
  EventEmitter,
  forwardRef
} from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { REGEX } from "../../globalizer/color-models/formater.util";
@Component({
  selector: "app-color-picker",
  templateUrl: "./color-picker.component.html",
  styleUrls: ["./color-picker.component.scss"],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorPickerComponent),
      multi: true
    }
  ]
})
export class ColorPickerComponent implements ControlValueAccessor {
  regex: string = REGEX.HEX.TEST;

  @Input("paletteType") paletteType;

  onChg;

  red;
  green;
  blue;

  _staging: string;
  _hexColor;
  get hexColor() {
    const _r: string = this.parseHex(this.red);
    const _g: string = this.parseHex(this.green);
    const _b: string = this.parseHex(this.blue);
    this._hexColor = `${_r}${_g}${_b}`.toUpperCase();
    return this._hexColor;
  }
  set hexColor(str) {
    this._staging = str;
  }

  get rgb() {
    return `rgb(${this.red}, ${this.green}, ${this.blue})`;
  }

  setRGB() {
    setTimeout(() => {
      this.updateRGB(this._staging);
    }, 1500);
  }

  updateRGB(str: string): void {
    const parse = hex => parseInt(hex, 16);
    const valid = new RegExp(REGEX.HEX.TEST).test(str);
    if (valid) {
      this._hexColor = str;
      const map = REGEX.HEX.PARSE.exec(str);
      this.red = parse(map[1]);
      this.green = parse(map[2]);
      this.blue = parse(map[3]);
    }
  }

  previewPalette() {
    this.onChg(this.hexColor);
  }

  parseHex = v => {
    if (v != null) {
      if (typeof v === "string") {
        v = parseInt(v);
      }
      const hex = v.toString(16);
      return hex.length > 1 ? hex : `${hex}${hex}`;
    }
    return "FF";
  };

  writeValue(str: string): void {
    this.updateRGB(str);
  }
  registerOnChange(fn: any): void {
    this.onChg = (val: string) => {
      let hex = val;
      if (val.indexOf("#") === -1) {
        hex = `#${hex}`;
      }
      fn(hex);
    };
  }
  registerOnTouched(fn: any): void {}
}

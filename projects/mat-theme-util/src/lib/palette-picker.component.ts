import { Component, Input, forwardRef } from "@angular/core";
import { ThemeUtilService } from "./theme-util.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

@Component({
  selector: "mat-palette-picker",
  templateUrl: "./palette-picker.component.html",
  styleUrls: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PalettePickerComponent),
      multi: true
    }
  ]
})
export class PalettePickerComponent implements ControlValueAccessor {
  isObjectInput: boolean;

  chgFn;

  get value(): any {
    return this.themeStr();
  }
  set value(v: any) {
    if (!!v && v !== this.themeStr()) {
      this.writeValue(v);
      this.chgFn(v);
    }
  }

  _primary: string;
  get primary() {
    return this._primary;
  }
  set primary(str: string) {
    this._primary = str;
    this.theme.setPrimaryPalette(str);
    this.updateTheme();
  }
  _accent: string;
  get accent() {
    return this._accent;
  }
  set accent(str: string) {
    this._accent = str;
    this.theme.setAccentPalette(str);
    this.updateTheme();
  }
  _warn: string;
  get warn() {
    return this._warn;
  }
  set warn(str: string) {
    this._warn = str;
    this.theme.setWarnPalette(str);
    this.updateTheme();
  }

  constructor(public theme: ThemeUtilService) {}

  updateTheme() {
    this.chgFn(this.themeStr());
  }

  themeStr() {
    const theme = {
      primary: this._primary,
      accent: this._accent,
      warn: this._warn
    };
    return new BaseTheme(theme);
  }

  writeValue(str: string | object): void {
    this.isObjectInput = typeof str === "object";
    const theme = new BaseTheme(str);
    this._primary = theme.primary;
    this._accent = theme.accent;
    this._warn = theme.warn;
  }

  registerOnChange(fn: any): void {
    // Intercept the chgFn to return the type received initially
    this.chgFn = val => {
      const obj = this.isObjectInput ? val : JSON.stringify(val);
      fn(obj);
    };
  }

  registerOnTouched(fn: any): void {}
  _colorCode: string;

  @Input("colorCode")
  get colorCode() {
    return this._colorCode;
  }
}

enum DEFAULT {
  P = "#D3D3D3",
  A = "#5D5D5D",
  W = "#ff0000"
}

export class BaseTheme {
  public primary: string = DEFAULT.P;
  public accent: string = DEFAULT.A;
  public warn: string = DEFAULT.W;

  constructor(obj: string | object) {
    if (!!obj) {
      if (typeof obj === "string") {
        this.parseObj(JSON.parse(obj));
      } else {
        this.parseObj(obj);
      }
    }
  }

  private parseObj(obj) {
    if (!!obj) {
      this.primary = obj.primary ? obj.primary : DEFAULT.P;
      this.accent = obj.accent ? obj.accent : DEFAULT.A;
      this.warn = obj.warn ? obj.warn : DEFAULT.W;
    }
  }
}

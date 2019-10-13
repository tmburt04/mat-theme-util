import { Component, Input, forwardRef } from "@angular/core";
import { ThemeUtilService } from "./theme-util.service";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: "mat-palette-picker",
  template: `
  <div class="col3-xl col3-lg col3-md col2-sm col2-xs">
    <app-color-picker paletteType="Primary" [(ngModel)]="primary"></app-color-picker>
    <app-color-picker paletteType="Accent" [(ngModel)]="accent"></app-color-picker>
    <app-color-picker paletteType="Warn" [(ngModel)]="warn"></app-color-picker>
</div>
  `,
  styles: [],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PalettePickerComponent),
      multi: true
    }
  ]
})
export class PalettePickerComponent implements ControlValueAccessor {

  chgFn;

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

  constructor(
    public theme: ThemeUtilService
  ) {
  }

  updateTheme() {
    const theme = {
      primary: this._primary,
      accent: this._accent,
      warn: this._warn,
    }
    this.chgFn(JSON.stringify(theme));
  }

  writeValue(str): void {
    console.log(str)
    const theme = new BaseTheme(str);
    this._primary = theme.primary;
    this._accent = theme.accent;
    this._warn = theme.warn;
  }

  registerOnChange(fn: any): void {
    this.chgFn = fn;
  }

  registerOnTouched(fn: any): void { }
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

  constructor(str: string) {
    if (!!str) {
      const parsed = JSON.parse(str);
      if (!!parsed) {
        this.primary = parsed.primary ? parsed.primary : DEFAULT.P;
        this.accent = parsed.accent ? parsed.accent : DEFAULT.A;
        this.warn = parsed.warn ? parsed.warn : DEFAULT.W;
      }
    }
  }
}

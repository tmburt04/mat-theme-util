import { Component, OnInit, Input } from "@angular/core";
import { ThemeUtilService } from "./theme-util.service";
import { ParseHEX } from "../globalizer/color-models/formater.util";
import { PaletteType } from "../globalizer/color-models/palette.model";

@Component({
  selector: "mat-palette-picker",
  template: `
    <app-color-picker
      (colorChange)="assignPalette($event)"
      [color]="colorCode"
    ></app-color-picker>
  `,
  styles: []
})
export class PalettePickerComponent {
  _colorCode: string;
  @Input("colorCode")
  get colorCode() {
    return this._colorCode;
  }

  set colorCode(str: string) {
    const valid = ParseHEX.TEST(str);
    if (valid) {
      this._colorCode = str;
    } else {
      throw `Invalid 'colorCode' format. Please provide the color in 'Hex' format.`;
    }
  }

  _palettetype: PaletteType;
  @Input("paletteType")
  get paletteType() {
    return this._palettetype;
  }
  set paletteType(type: PaletteType) {
    this._palettetype = type;
  }

  constructor(private themer: ThemeUtilService) {}

  assignPalette(_color: string) {
    if (this._palettetype === PaletteType.P) {
      this.themer.setPrimaryPalette(_color);
    }
    if (this._palettetype === PaletteType.A) {
      this.themer.setAccentPalette(_color);
    }
    if (this._palettetype === PaletteType.W) {
      this.themer.setWarnPalette(_color);
    }
  }
}

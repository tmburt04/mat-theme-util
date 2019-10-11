import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "app-color-picker",
  templateUrl: "./color-picker.component.html",
  styleUrls: ["./color-picker.component.scss"]
})
export class ColorPickerComponent {
  _color: string;
  @Input("color")
  get color() {
    return this._color;
  }
  set color(val) {
    this._color = val;
  }
  @Output() colorChange: EventEmitter<any> = new EventEmitter<any>();

  constructor() {}
}

import { NgModule } from "@angular/core";
import { PalettePickerComponent } from "./palette-picker.component";
import { ColorPickerComponent } from "./color-picker/color-picker.component";

const COMPONENTS = [PalettePickerComponent, ColorPickerComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [],
  exports: COMPONENTS
})
export class ThemeUtilModule {}

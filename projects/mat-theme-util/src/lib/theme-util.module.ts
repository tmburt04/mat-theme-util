import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { PalettePickerComponent } from "./palette-picker.component";
import { ColorPickerComponent } from "./color-picker/color-picker.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const COMPONENTS = [PalettePickerComponent, ColorPickerComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
  ],
  exports: COMPONENTS,
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ]
})
export class ThemeUtilModule {}

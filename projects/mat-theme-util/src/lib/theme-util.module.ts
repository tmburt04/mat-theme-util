import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { PalettePickerComponent } from "./palette-picker.component";
import { ColorPickerComponent } from "./color-picker/color-picker.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material';

const COMPONENTS = [PalettePickerComponent, ColorPickerComponent];

@NgModule({
  declarations: COMPONENTS,
  imports: [
    FormsModule,
    BrowserAnimationsModule,
    BrowserModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  exports: COMPONENTS,
})
export class ThemeUtilModule {}

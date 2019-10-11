import { Component } from "@angular/core";
import { ThemeUtilService } from "projects/mat-theme-util/src/public-api";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  primary = "#5F121F";
  accent = "#2F7F89";
  warn = "#ff0000";

  constructor(private themeUtil: ThemeUtilService) {
    this.themeUtil.initTheme(this.primary, this.accent, this.warn);
  }

  updatePrimary(hexCode: string) {
    this.themeUtil.setPrimaryPalette(hexCode);
    // this.themeUtil.setAccentPalette(hexCode);
    // this.themeUtil.setWarnPalette(hexCode);
  }
}

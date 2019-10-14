import { Component } from "@angular/core";
import { ThemeUtilService } from '../../dist/mat-theme-util';

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  theme = {
    primary: "#5D5D5D",
    accent: "#d3d3d3",
    warn: "#ff0000"
  };

  constructor(private themeUtil: ThemeUtilService) {
    this.themeUtil.initTheme(this.theme.primary, this.theme.accent, this.theme.warn);
  }

  updatePrimary() {
    this.themeUtil.setPrimaryPalette(this.theme.primary);
  }

  updateAccent() {
    this.themeUtil.setAccentPalette(this.theme.accent);
  }

  updateWarn() {
    this.themeUtil.setWarnPalette(this.theme.warn);
  }
}

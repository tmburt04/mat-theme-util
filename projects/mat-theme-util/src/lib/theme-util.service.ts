import { Injectable } from "@angular/core";
import { Theme } from "../globalizer/theme-utils/theme.model";

@Injectable({
  providedIn: "root"
})
export class ThemeUtilService {
  private colorTheme: Theme;

  public initTheme(primary?: string, accent?: string, warn?: string) {
    this.colorTheme = new Theme(primary, accent, warn);
  }

  public setPrimaryPalette(str) {
    this.colorTheme.setPrimary(str);
  }

  public setAccentPalette(str) {
    this.colorTheme.setAccent(str);
  }

  public setWarnPalette(str) {
    this.colorTheme.setWarn(str);
  }
}

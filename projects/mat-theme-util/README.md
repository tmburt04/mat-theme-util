# Material Theme Util

This library is a interface for Angular Material UI Library and custom colors. The intended purpose it serves is to provide a dynamic solution for changing Angular Material theme colors on the fly _and_ offer the ability to set the colors with any hex code.

This library _should_ seamlessly integrate with most Angular Material applications - requiring very little (if any) modification on the Material Side.

## Release Notes

## v0.2

**v0.2.2**

- Support for `padding-unset`
- Removed logging

**v0.2.1**

- More Effective regex for Hex codes
- Dead code removal
  **v0.2.0**
- New UI for ColorPicker/PalettePicker
- Support for both a stringified and parsed JSON Theme object for the `<mat-palette-picker>` formControl value.

### Pre-reqs

- Angular CLI
- Angular Material
- A good understanding of both.

---

## Integration

### 1. Install Material Theme Util package

### 2. Import the following packages in your AppModule

```javascript
...
import { ThemeUtilModule, ThemeUtilService } from 'mat-theme-util';

@NgModule({
  imports: [
    ...
    ThemeUtilModule
  ],
  providers: [
    ThemeUtilService
  ]
  ...
})
export class AppModule { }
```

### 3. Choose the designated HTML Element that you want to contain the theme

```html
...
<body #THEME_CONTAINER>
  ...
</body>
```

### 4. Import the following stylesheets

`./styles.scss`

```scss
@import "~@angular/material/theming";
@include mat-core();
@import "~mat-theme-util/theme-util";
```

> No material theme should be imported, defined or set.

### Usage

#### - Theme Initialization

`app.component.ts`

```javascript
...
  primary = "#5F121F";
  accent = "#2F7F89";
  warn = "#ff0000";

  constructor(private themeUtil: ThemeUtilService) {
    this.themeUtil.initTheme(
      this.primary,
      this.accent,
      this.warn
    );
  }
...
```

#### - Setting Palette Colors

`app.component.ts`

```javascript
...
  updatePrimary(hexCode: string) {
    this.themeUtil.setPrimaryPalette(hexCode);
    // this.themeUtil.setAccentPalette(hexCode);
    // this.themeUtil.setWarnPalette(hexCode);
  }
...
```

> This code can be used in any component the **ThemeUtilService** is autowired

## Additional Features

### Color Extensions

| class           | Function                                                                         |
| --------------- | -------------------------------------------------------------------------------- |
| `primary-bg`    | Sets background to the **Primary** Color, and the text as a contrast color       |
| `accent-bg`     | Sets background to the **Accent** Color, and the text as a contrast color        |
| `warn-bg`       | Sets background to the **Warn** Color, and the text as a contrast color          |
| `primary-color` | Sets text color to the **Primary** Color, and the background as a contrast color |
| `accent-color`  | Sets text color to the **Accent** Color, and the background as a contrast color  |
| `warn-color`    | Sets text color to the **Warn** Color, and the background as a contrast color    |

> These classes will stay up to date with the dynamic theming.

### CSS Grids Framework

#### Responsive Layout

- `hide`

  > Preset layout class, setting the 'display' of the element to 'none'. **Supports extensions**

- `show`

  > Preset layout class, resetting the 'display' of the element. **Supports extensions**

- `col{XX}`

  > Preset layout class, with the 'XX' denoting the columns allocated for. (this can be nested)

  | XX           | Columns | Function      | Extensions\* |
  | ------------ | ------- | ------------- | ------------ |
  | `1`          | 1       | 1fr (> 100px) | X            |
  | `2`          | 2       | 1fr (> 100px) | X            |
  | `3`          | 3       | 1fr (> 100px) | X            |
  | `4`          | 4       | 1fr (> 50px)  | X            |
  | `5`          | 5       | 1fr (> 50px)  | X            |
  | `6`          | 6       | 1fr (> 40px)  | X            |
  | `-auto-fill` | \*      | 1fr (> 25px)  |              |
  | `-auto-fit`  | any     | 1fr (> 25px)  |              |
  | `aa`         | 2       | auto, auto    | x            |
  | `a1`         | 2       | auto, 1fr     | x            |
  | `1a`         | 2       | 1fr, auto     | x            |
  | `1-2`        | 2       | 1fr, 2fr      | x            |
  | `2-1`        | 2       | 2fr, 1fr      | x            |
  | `1-3`        | 2       | 1fr, 3fr      | x            |
  | `3-1`        | 2       | 3fr, 1fr      | x            |
  | `2-3`        | 2       | 2fr, 3fr      | x            |
  | `3-2`        | 2       | 3fr, 2fr      | x            |

\* Extensions can be used for setting specific styles for different viewports

#### Extensions

| Viewport | Min    | Max    | Example   |
| -------- | ------ | ------ | --------- |
| `-xs`    | -      | 600px  | `col1-xs` |
| `-sm`    | 600px  | 768px  | `col1-sm` |
| `-md`    | 768px  | 992px  | `col1-md` |
| `-lg`    | 992px  | 1200px | `col1-lg` |
| `-xl`    | 1200px | -      | `col1-xl` |

---

#### Other Extensions

\*The following can only be used with `col-` classes

| Name    | Function              | Example        |
| ------- | --------------------- | -------------- |
| `-wide` | increases col/row gap | `col1-xs-wide` |

### Margin

- `margin{1-6}`

  Preset margin class, with the number denoting the 'rem'

- `vmargin{1-6}`

  Preset vertical margin class, with the number denoting the 'rem'

- `hmargin{1-6}`

  Preset horizontal margin class, with the number denoting the 'rem'

- `margin-unset`

  Preset margin class, setting the margin to 'unset'

### Padding

- `padding{1-6}`

  Preset padding class, with the number denoting the 'rem'

- `vpadding{1-6}`

  Preset vertical padding class, with the number denoting the 'rem'

- `hpadding{1-6}`

  Preset horizontal padding class, with the number denoting the 'rem'

- `padding-unset`

  Preset padding class, setting the padding to 'unset'

---

---

### Package Versioning

- Angular CLI: 8.1.3
- Node: 12.6.

#### Inspired by:

- [@adamaso](https://stackblitz.com/edit/native-theming-form-medium)
- [@leodido](https://github.com/leodido/material-palette)

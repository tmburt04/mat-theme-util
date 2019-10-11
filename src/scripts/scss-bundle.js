const fs = require('fs-extra');
const concat = require('concat');

(async function build() {
  const style = [
    "./projects/mat-theme-util/src/globalizer/theme-utils/theme.definition.scss",
    "./projects/mat-theme-util/src/globalizer/theme-utils/theme.functions.scss",
    "./projects/mat-theme-util/src/globalizer/theme-utils/theme.assignment.scss",
    "./projects/mat-theme-util/src/globalizer/theme-utils/theme.responsive.scss",
    "./projects/mat-theme-util/src/globalizer/theme-utils/theme.scss",
  ];
  await fs.ensureDir('./dist/mat-theme-util');
  await concat(style, './dist/mat-theme-util/theme-util.scss');
})()

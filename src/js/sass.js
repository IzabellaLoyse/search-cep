const sass = require('sass');

const result = sass.compile('./src/sass/style.scss', {
  outputStyle: 'compressed',
  sourceMap: true,
  sourceMapContents: true,
  sourceMapEmbed: true,
  sourceMapRoot: './src/sass',
});

console.log(result.css.toString());

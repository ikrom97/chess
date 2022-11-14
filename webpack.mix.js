// eslint-disable-next-line @typescript-eslint/no-var-requires
const mix = require('laravel-mix');

mix.browserSync({
  proxy: 'http://127.0.0.1:8000'
});

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel applications. By default, we are compiling the CSS
 | file for the application as well as bundling up all the JS files.
 |
 */

mix.ts('resources/react/index.tsx', 'public/js/app.min.js').react()
  .ts('resources/react/admin/index.tsx', 'public/js/admin.min.js').react()
  .less('resources/less/style.less', 'public/css/style.min.css')
  .sourceMaps()
  .webpackConfig({
    devtool: 'source-map'
  })
  .options({
    processCssUrls: false
  })
  .less('resources/less/admin/style.less', 'public/css/admin.min.css')
  .sourceMaps()
  .webpackConfig({
    devtool: 'source-map'
  })
  .options({
    processCssUrls: false
  })
  .version();

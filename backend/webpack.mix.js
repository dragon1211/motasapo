const mix = require('laravel-mix');

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

// mix.js('resources/js/app.js', 'public/js')
//     .postCss('resources/css/app.css', 'public/css', [
//         require('postcss-import'),
//         require('tailwindcss'),
//     ]);

// mix.js('resources/js/app.js', 'public/js')

mix.js('resources/js/app.js', 'public/js')
    .ts('resources/tsx/app.tsx', 'public/js')
    // .ts('resources/tsx/views/components/CategoryLists.tsx', 'public/js')
    .sass('resources/sass/app.scss', 'public/css')
    .react();

if (mix.inProduction()) {
    mix.version();
}

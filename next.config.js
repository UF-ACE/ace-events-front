const sass = require('@zeit/next-sass')
const css = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withFonts = require('next-fonts');

module.exports = withPlugins(
  [
    [css, {}],
    [sass, {}],
    [optimizedImages, {
      handleImages: ['jpeg', 'png'],
      optimizeImages: true
    }],
    [withFonts, {}]
  ],
  {
    compress: true,
    target: 'server',
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    },
    devIndicators: {
      autoPrerender: false,
    }
  }
)

const sass = require('@zeit/next-sass')
const css = require('@zeit/next-css')
const withPlugins = require('next-compose-plugins')
const optimizedImages = require('next-optimized-images')
const withFonts = require('next-fonts');
const withOffline = require('next-offline')

module.exports = withPlugins(
  [
    [sass, {}],
    [css, {}],
    [optimizedImages, {
      handleImages: ['jpeg', 'png'],
      optimizeImages: true
    }],
    [withFonts, {}],
    [withOffline, {}]
  ],
  {
    compress: true,
    target: 'server',
    exportPathMap: function() {
      return {
        '/': { page: '/' }
      };
    }
  }
)

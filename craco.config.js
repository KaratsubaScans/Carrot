// craco.config.ts
// eslint-disable-next-line
module.exports = {
  style: {
    postcss: {
      plugins: [
        // eslint-disable-next-line
        require('tailwindcss'),
        // eslint-disable-next-line
        require('autoprefixer'),
      ],
    },
  },
}
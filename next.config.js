const images = require('remark-images');
const emoji = require('remark-emoji');
const withMDX = require('@zeit/next-mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [images, emoji]
  }
});
const withTypescript = require('@zeit/next-typescript');

module.exports = withTypescript(
  withMDX({
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdx'],
  }),
);

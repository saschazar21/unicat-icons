const images = require("remark-images");
const emoji = require("remark-emoji");
const highlight = require("rehype-highlight");
const withCSS = require("@zeit/next-css");
const withPlugins = require("next-compose-plugins");
const withMDX = require("@zeit/next-mdx")({
  extension: /\.mdx?$/,
  options: {
    rehypePlugins: [highlight],
    remarkPlugins: [images, emoji]
  }
});

const plugins = [
  [withCSS],
  [
    withMDX,
    {
      pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"]
    }
  ]
];

module.exports = withPlugins([...plugins], {
  // enter config here
  exportTrailingSlash: true
});

const path = require("path");

/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Desafio Hubla`,
  },
  plugins: [
    "gatsby-plugin-sitemap",
    "@chakra-ui/gatsby-plugin",
    {
      resolve: `gatsby-plugin-alias-imports`,
      options: {
        alias: {
          "@atoms": path.resolve(__dirname, "src/components/atoms"),
          "@molecules": path.resolve(__dirname, "src/components/molecules"),
          "@organisms": path.resolve(__dirname, "src/components/organisms"),
        },
        extensions: ["js", "jsx", "ts", "tsx"],
      },
    },
  ],
};

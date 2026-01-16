module.exports = function(eleventyConfig) {
  // Copy assets folder to output
  eleventyConfig.addPassthroughCopy("assets");

  // Copy scripts folder to output
  eleventyConfig.addPassthroughCopy("scripts");

  // Watch for changes
  eleventyConfig.addWatchTarget("assets/");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
      data: "_data"
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk"
  };
};

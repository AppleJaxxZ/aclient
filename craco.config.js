// craco.config.js
module.exports = {
  style: {
    sass: {
      loaderOptions: {
        additionalData: `
            @import "src/scss/_mixins.scss";
          `,
      },
    },
  },
};

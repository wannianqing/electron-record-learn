module.exports = {
  lintOnSave:false,
  css:{
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/assets/styles/variables.scss";'
      }
    }
  },
}
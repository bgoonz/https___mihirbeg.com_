module.exports = {
  rootDir: __dirname,
  buildModules: [
    { handler: require('../../../') }
       // With options
       [ '@nuxtjs/netlify-files', {
         /* module options */ } ]
  ]
}

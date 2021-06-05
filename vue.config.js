module.exports = {
  transpileDependencies: ['vuetify'],
  publicPath: process.env.NODE_ENV === 'production' ? '/lotto/' : '/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '행운의 로또 추출기'
      return args
    })
  },
}

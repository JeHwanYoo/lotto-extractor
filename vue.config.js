module.exports = {
  transpileDependencies: ['vuetify'],
  publicPath: process.env.NODE_ENV === 'production' ? '/lotto/' : '/',
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = '행운의 로또 추출기'
      args[0].description = '당신에게 행운의 로또 번호를 알려줍니다.'
      args[0].imageURL =
        'https://jehwanyoo.net/lotto/android-chrome-192x192.png'
      args[0].siteURL = 'https://jehwanyoo.net/lotto/'
      return args
    })
  },
}

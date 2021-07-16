module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        'assets': '@/assets',
        'common': '@/common',
        'network': '@/network',
        'views': '@/views',
        'components': '@/components',
      }
    }
  },
  css: {
    loaderOptions: {
      postcss: {
        plugin: [
          require("postcss-px-to-viewport")({
            autoprefixer: {},
            "postcss-px-to-viewport": {
              viewportWidth: 375,
              viewportHeight: 667,  // 宽高，对应的是设计稿的宽高
              unitPrecision: 5,  // 指定`px`转为视窗单位值的小数位数（很多时候无法整除）
              viewportUnit: 'vw',  // 指定要转换成的视窗单位，建议使用vw
              selectorBlackList: ['.ignore', '.tab-bar', '.tab-bar-item'],  // 指定不需要转换的类
              minPixelValue: 1,  // 小于或等于`1px`不转换为视窗单位
              mediaQuery: false,  // 是否允许在媒体查询中转换`px`
              exclude: [/TabBar/]  //指定不要转换的文件，数组内应该是正则表达式
            }
          })
        ]
      }
    }
  }
}

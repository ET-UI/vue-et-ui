// const HOST = process.env.HOST;
// const PORT = process.env.PORT && Number(process.env.PORT);
const PROJECT_NAME = 'demo';

module.exports = {
  // publicPath: '/demo/',
  outputDir: './dist',
  pages: {
    index: {
      // page 的入口
      entry: 'src/main.js',
      // 模板来源
      template: 'public/index.html',
      // 在 dist/index.html 的输出
      filename: 'index.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'Index Page',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index']
    }
  },
  lintOnSave: false,
  devServer: {
    allowedHosts: [
      `${PROJECT_NAME}-dev.etcchebao.com`,
      `${PROJECT_NAME}-test.etcchebao.com`,
      `${PROJECT_NAME}.etcchebao.com`,
    ],
  },
  css: {
    loaderOptions: {
      postcss: {
        plugins: [
          // 厂商前缀
          require('autoprefixer')({}),
          // 把px单位换算成rem单位
          require("postcss-pxtorem")({
            rootValue: 40, // 换算的基数(设计图750的根字体为32)
            selectorBlackList: [".van"],// 要忽略的选择器并保留为px。
            propList: ["*"], //可以从px更改为rem的属性。
            minPixelValue: 2 // 设置要替换的最小像素值。
          })
        ]
      }
    }
  },
  transpileDependencies: ['dom7', 'swiper']
}

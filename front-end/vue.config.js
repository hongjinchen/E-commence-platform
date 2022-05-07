/*
 * @Description: 配置文件
 */
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/dist/' : '/',
  devServer: {
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:80/', // 本地后端地址
        // target: 'http://101.132.181.9:3000/', // 线上后端地址
        changeOrigin: true, //允许跨域
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}

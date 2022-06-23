module.exports = {
  // 前端解决跨域问题
  devServer: {
    proxy: {
      //解决跨域问题
      "/api": {
        // 此处的写法，目的是为了 将 /api 替换成 https://autumnfish.cn/
        // target: "https://autumnfish.cn/",
        target: "http://8.129.39.190:3000/",
        // target: 'http://mobilecdnbj.kugou.com/v3',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};

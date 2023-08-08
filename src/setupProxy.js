const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    ['/api', '/rest'],
    createProxyMiddleware({
      target: process.env.REACT_APP_PROXY,
      changeOrigin: true
    })
  );
};

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    '/api', // The prefix for the requests to be proxied (e.g., /api/users)
    createProxyMiddleware({
      target: 'http://192.168.1.123:6886', // The URL of the target API server
      changeOrigin: true, // Required for the API server to recognize the request as coming from the proxy
    })
  );
};
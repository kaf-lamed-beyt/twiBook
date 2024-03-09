import httpProxy from "http-proxy";

export const config = {
  api: {
    externalResolver: true,
    bodyParser: false,
  },
};

// @ts-ignore
export default function middleman(req, res) {
  new Promise((resolve, reject) => {
    const proxy: httpProxy = httpProxy.createProxy();

    proxy.once("proxyRes", resolve).once("error", reject).web(req, res, {
      changeOrigin: true,
      target: process.env.NEXT_PUBLIC_PROXY_TARGET,
    });
  });
}

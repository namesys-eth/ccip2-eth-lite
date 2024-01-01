/** @type {import('next').NextConfig} */
const env = process.env.NODE_ENV
const nextConfig = {
	distDir: "out",
	output: env === 'production' ? 'export' : 'standalone',
	reactStrictMode: true,
	basePath: "/ccip2-eth-lite",
	assetPrefix: "/ccip2-eth-lite/",
	...(env === 'production' && {
		images: {
			loader: 'akamai',
			path: '',
		}
	})
}

module.exports = nextConfig

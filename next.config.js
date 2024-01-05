/** @type {import('next').NextConfig} */
const env = process.env.NODE_ENV
const nextConfig = {
	distDir: "out",
	output: env === 'production' ? 'export' : 'standalone',
	reactStrictMode: true,
	basePath: env !== 'production' ? "" : "/ccip2-eth-lite",
	assetPrefix: env !== 'production' ? "" : "/ccip2-eth-lite/",
	...(env === 'production' && {
		images: {
			loader: 'akamai',
			path: '',
		}
	}),
	exportPathMap: async function (defaultPathMap) {
		return {
			'/': { page: '/' },
			'/profile': { page: '/profile' },
		}
	}
}

module.exports = nextConfig

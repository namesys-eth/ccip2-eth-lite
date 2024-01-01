/** @type {import('next').NextConfig} */
const env = process.env.NODE_ENV
const nextConfig = {
	distDir: "out",
	output: env === 'production' ? 'export' : 'standalone',
	reactStrictMode: true,
	assetPrefix: "ccip2-eth-lite/", // [!] Must edit this for different NODE_ENV
	...(env === 'production' && {
		images: {
			loader: 'akamai',
			path: '',
		}
	})
}

module.exports = nextConfig

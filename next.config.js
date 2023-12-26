/** @type {import('next').NextConfig} */
const env = process.env.NODE_ENV
const nextConfig = {
	distDir: "out",
	output: env === 'production' ? 'export' : 'standalone',
	reactStrictMode: true,
	assetPrefix: "",
	images: {
		loader: env === 'production' ? 'akamai' : 'default',
		path: '',
	}
}

module.exports = nextConfig

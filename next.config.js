/** @type {import('next').NextConfig} */
const nextConfig = {
	distDir: "out",
	output: 'export',
	reactStrictMode: true,
	assetPrefix: "",
	images: {
		loader: 'akamai',
		path: '',
	},
	webpack5: true
}

module.exports = nextConfig

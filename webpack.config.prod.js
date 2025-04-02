const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
	mode: "production",
	module: {
		rules: [
			{
				test: /\.css$/,
				use: [
					MiniCssExtractPlugin.loader,
					"css-loader",
					{
						loader: "postcss-loader",
						options: {
							postcssOptions: {
								plugins: [
									require("cssnano")({
										preset: [
											"default",
											{
												discardComments: true,
											},
										],
									}),
								],
							},
						},
					},
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: "./index.html",
		}),
		new CopyPlugin({
			patterns: [
				{ from: "img", to: "img" },
				{ from: "css", to: "css" },
				{ from: "js/vendor", to: "js/vendor" },
				{ from: "icon.svg", to: "icon.svg" },
				{ from: "favicon.ico", to: "favicon.ico" },
				{ from: "robots.txt", to: "robots.txt" },
				{ from: "icon.png", to: "icon.png" },
				{ from: "404.html", to: "404.html" },
				{ from: "about.html", to: "about.html" },
				{ from: "notice.html", to: "notice.html" },
				{ from: "qa.html", to: "qa.html" },
				{ from: "examination.html", to: "examination.html" },
				{ from: "site.webmanifest", to: "site.webmanifest" },
			],
		}),
		new MiniCssExtractPlugin({
			filename: "css/style.css",
		}),
	],
});

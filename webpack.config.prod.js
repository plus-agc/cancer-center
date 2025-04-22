const fs = require("fs");
const path = require("path");
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
		// 自動的に全HTMLファイルを読み込む
		...fs.readdirSync(__dirname)
			.filter((file) => path.extname(file) === ".html")
			.map((file) => new HtmlWebpackPlugin({
				template: `./${file}`,
				filename: file,
			})),
		new CopyPlugin({
			patterns: [
				{ from: "img", to: "img" },
				{ from: "css", to: "css" },
				{ from: "file", to: "file" },
				{ from: "js/vendor", to: "js/vendor" },
				{ from: "icon.svg", to: "icon.svg" },
				{ from: "favicon.ico", to: "favicon.ico" },
				{ from: "robots.txt", to: "robots.txt" },
				{ from: "icon.png", to: "icon.png" },
				{ from: "site.webmanifest", to: "site.webmanifest" },
			],
		}),
		new MiniCssExtractPlugin({
			filename: "css/style.css",
		}),
	],
});

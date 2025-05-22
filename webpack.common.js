const path = require("node:path");

module.exports = {
	entry: {
		app: "./js/app.js",
		examination: "./js/examination.js",
	},
	output: {
		path: path.resolve(__dirname, "dist"),
		clean: true,
		filename: "./js/[name].js",
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ["style-loader", "css-loader", "postcss-loader"],
			},
		],
	},
};

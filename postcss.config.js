module.exports = {
	plugins: [
		require("cssnano")({
			preset: [
				"default",
				{
					discardComments: true, // すべてのコメントを削除（保護コメント含む）
				},
			],
		}),
	],
};

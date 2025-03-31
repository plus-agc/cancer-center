document.addEventListener("DOMContentLoaded", function () {
	// すべてのドロップダウンリンクを選択
	var dropdowns = document.querySelectorAll(".dropdown");

	dropdowns.forEach(function (dropdown) {
		var dropdownMenu = dropdown.querySelector(".dropdown-menu");
		var dropdownToggle = dropdown.querySelector(".dropdown-toggle");

		// マウスが乗ったときにドロップダウンメニューを表示
		dropdown.addEventListener("mouseenter", function () {
			dropdownMenu.classList.add("is-active");
		});

		// マウスが離れたときにドロップダウンメニューを非表示
		dropdown.addEventListener("mouseleave", function () {
			dropdownMenu.classList.remove("is-active");
		});

		// ドロップダウントグルがクリックされたときはリンク先に遷移
		// イベントの伝播を止めず、デフォルトの挙動（リンク遷移）を許可
		dropdownToggle.addEventListener("click", function (event) {
			// デフォルトの挙動を維持（リンク先に遷移する）
			// preventDefault()を呼び出さないことで、通常のリンクとして機能
		});
	});

	// タッチデバイス対応
	// タッチデバイスではホバーが機能しないため、少し異なる挙動にする
	if ("ontouchstart" in window) {
		dropdowns.forEach(function (dropdown) {
			var dropdownMenu = dropdown.querySelector(".dropdown-menu");
			var dropdownToggle = dropdown.querySelector(".dropdown-toggle");
			var isMenuOpen = false;

			// メニュー表示状態を追跡するためのフラグ
			dropdown.addEventListener("touchstart", function (event) {
				if (!isMenuOpen && event.target === dropdownToggle) {
					// メニューが閉じていて、トグルがタップされた場合
					event.preventDefault(); // リンク遷移を一時的に防止
					isMenuOpen = true;

					// 他のすべてのメニューを閉じる
					dropdowns.forEach(function (otherDropdown) {
						if (otherDropdown !== dropdown) {
							otherDropdown
								.querySelector(".dropdown-menu")
								.classList.remove("is-active");
						}
					});

					// このメニューを開く
					dropdownMenu.classList.add("is-active");
				} else if (isMenuOpen && event.target === dropdownToggle) {
					// メニューが開いていて、再度トグルがタップされた場合
					// デフォルトの挙動を許可（リンク遷移する）
					isMenuOpen = false;
				}
			});
		});

		// メニュー外をタップした場合、すべてのメニューを閉じる
		document.addEventListener("touchstart", function (event) {
			var clickedInsideDropdown = false;

			dropdowns.forEach(function (dropdown) {
				if (dropdown.contains(event.target)) {
					clickedInsideDropdown = true;
				}
			});

			if (!clickedInsideDropdown) {
				dropdowns.forEach(function (dropdown) {
					dropdown
						.querySelector(".dropdown-menu")
						.classList.remove("is-active");
				});
			}
		});
	}
});

document.addEventListener("DOMContentLoaded", function () {
	// ヘッダーの高さを取得して、CSS変数に設定する関数
	function setHeaderHeight() {
		const header = document.querySelector(".header");
		if (header) {
			const headerHeight = header.offsetHeight;
			document.documentElement.style.setProperty(
				"--header-height",
				headerHeight + "px",
			);

			// デバッグ用（必要に応じてコメントアウト）
			console.log("Header height:", headerHeight);
		}
	}

	// 初期実行
	setHeaderHeight();

	// リサイズ時に再計算
	window.addEventListener("resize", setHeaderHeight);

	// ウィンドウの読み込みが完了した後にも実行（画像などが読み込まれた後）
	window.addEventListener("load", setHeaderHeight);

	// ヘッダーの内容が変わる可能性がある場合（例：動的コンテンツ）
	// 適切なイベントをここに追加（例：カスタムイベント）
});

document.querySelector(".toggle-button").addEventListener("click", function () {
	var moreContent = document.querySelector(".more-content");
	if (
		moreContent.style.display === "none" ||
		moreContent.style.display === ""
	) {
		moreContent.style.display = "block";
		this.textContent = "続きを閉じる";
	} else {
		moreContent.style.display = "none";
		this.textContent = "続きを表示";
	}
});

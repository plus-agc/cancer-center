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
		dropdownToggle.addEventListener("click", function (event) {
			// イベントの伝播を止めず、デフォルトの挙動（リンク遷移）を許可
		});
	});

	// タッチデバイス対応
	if ("ontouchstart" in window) {
		dropdowns.forEach(function (dropdown) {
			var dropdownMenu = dropdown.querySelector(".dropdown-menu");
			var dropdownToggle = dropdown.querySelector(".dropdown-toggle");
			var isMenuOpen = false;

			dropdown.addEventListener("touchstart", function (event) {
				if (!isMenuOpen && event.target === dropdownToggle) {
					event.preventDefault();
					isMenuOpen = true;

					dropdowns.forEach(function (otherDropdown) {
						if (otherDropdown !== dropdown) {
							otherDropdown.querySelector(".dropdown-menu").classList.remove("is-active");
						}
					});

					dropdownMenu.classList.add("is-active");
				} else if (isMenuOpen && event.target === dropdownToggle) {
					isMenuOpen = false;
				}
			});
		});

		document.addEventListener("touchstart", function (event) {
			var clickedInsideDropdown = false;

			dropdowns.forEach(function (dropdown) {
				if (dropdown.contains(event.target)) {
					clickedInsideDropdown = true;
				}
			});

			if (!clickedInsideDropdown) {
				dropdowns.forEach(function (dropdown) {
					dropdown.querySelector(".dropdown-menu").classList.remove("is-active");
				});
			}
		});
	}

	// ヘッダーの高さを取得して、CSS変数に設定
	function setHeaderHeight() {
		const header = document.querySelector(".header");
		if (header) {
			const headerHeight = header.offsetHeight;
			document.documentElement.style.setProperty("--header-height", headerHeight + "px");
		}
	}

	setHeaderHeight();
	window.addEventListener("resize", setHeaderHeight);
	window.addEventListener("load", setHeaderHeight);

	// コンテンツの表示/非表示
	document.querySelector(".toggle-button").addEventListener("click", function () {
		var moreContent = document.querySelector(".more-content");
		if (moreContent.style.display === "none" || moreContent.style.display === "") {
			moreContent.style.display = "block";
			this.textContent = "続きを閉じる";
		} else {
			moreContent.style.display = "none";
			this.textContent = "続きを表示";
		}
	});
});
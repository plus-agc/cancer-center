document.addEventListener("DOMContentLoaded", () => {
	// ページが examination.html でなければ early return（検査系の処理を避ける）
	if (!location.pathname.includes("examination.html")) return;
	// ドロップダウンメニューの動作を設定
	const dropdowns = document.querySelectorAll(".dropdown");

	for (const dropdown of dropdowns) {
		const dropdownMenu = dropdown.querySelector(".dropdown-menu");
		const dropdownToggle = dropdown.querySelector(".dropdown-toggle");

		// マウスが乗ったときにドロップダウンメニューを表示
		dropdown.addEventListener("mouseenter", () => {
			dropdownMenu.classList.add("dropdown-menu--active");
		});

		// マウスが離れたときにドロップダウンメニューを非表示
		dropdown.addEventListener("mouseleave", () => {
			dropdownMenu.classList.remove("dropdown-menu--active");
		});

		// ドロップダウントグルがクリックされたときの動作（現在は空）
		dropdownToggle.addEventListener("click", (event) => { });
	}

	// タッチデバイスでのドロップダウンメニューの動作を設定
	if (
		"ontouchstart" in window &&
		window.matchMedia("(min-width: 768px)").matches
	) {
		for (const dropdown of dropdowns) {
			const dropdownMenu = dropdown.querySelector(".dropdown-menu");
			const dropdownToggle = dropdown.querySelector(".dropdown-toggle");
			let isMenuOpen = false;

			// タッチイベントでドロップダウンメニューを開閉
			dropdown.addEventListener("touchstart", (event) => {
				if (!isMenuOpen && event.target === dropdownToggle) {
					event.preventDefault();
					isMenuOpen = true;

					// 他のドロップダウンメニューを閉じる
					for (const otherDropdown of dropdowns) {
						if (otherDropdown !== dropdown) {
							otherDropdown
								.querySelector(".dropdown-menu")
								.classList.remove("dropdown-menu--active");
						}
					}

					// 現在のドロップダウンメニューを開く
					dropdownMenu.classList.add("dropdown-menu--active");
				} else if (isMenuOpen && event.target === dropdownToggle) {
					isMenuOpen = false;
				}
			});
		}

		// タッチイベントでドロップダウンメニュー外をクリックした場合に閉じる
		document.addEventListener("touchstart", (event) => {
			let clickedInsideDropdown = false;

			for (const dropdown of dropdowns) {
				if (dropdown.contains(event.target)) {
					clickedInsideDropdown = true;
				}
			}

			if (!clickedInsideDropdown) {
				for (const dropdown of dropdowns) {
					dropdown
						.querySelector(".dropdown-menu")
						.classList.remove("dropdown-menu--active");
				}
			}
		});
	}

	// ヘッダーの高さを取得してCSS変数に設定
	const setHeaderHeight = () => {
		const header = document.querySelector(".header");
		if (header) {
			const headerHeight = header.offsetHeight;
			document.documentElement.style.setProperty(
				"--header-height",
				`${headerHeight}px`,
			);
		}
	};

	// ページ読み込み時とリサイズ時にヘッダーの高さを設定
	setHeaderHeight();
	window.addEventListener("resize", setHeaderHeight);
	window.addEventListener("load", setHeaderHeight);

	// 「続きを表示」ボタンの動作を設定
	const toggleButton = document.querySelector(".toggle-button");
	if (toggleButton) {
		toggleButton.addEventListener("click", () => {
			const moreContent = document.querySelector(".more-content");
			if (
				moreContent.style.display === "none" ||
				moreContent.style.display === ""
			) {
				moreContent.style.display = "block";
				toggleButton.textContent = "閉じる";
			} else {
				moreContent.style.display = "none";
				toggleButton.textContent = "続きを表示";
			}
		});
	}

	// 「トップに戻る」ボタンの表示/非表示を設定
	const backToTop = document.getElementById("backToTop");
	if (backToTop) {
		window.addEventListener("scroll", () => {
			if (window.scrollY > 300) {
				backToTop.classList.add("back-to-top--visible");
			} else {
				backToTop.classList.remove("back-to-top--visible");
			}
		});
	}

	// 画像の遅延読み込みと幅・高さの設定
	for (const img of document.querySelectorAll("img")) {
		img.setAttribute("loading", "lazy");

		if (!img.hasAttribute("width") || !img.hasAttribute("height")) {
			const tempImg = new Image();
			tempImg.src = img.src;
			tempImg.onload = () => {
				if (!img.hasAttribute("width")) {
					img.setAttribute("width", this.naturalWidth);
				}
				if (!img.hasAttribute("height")) {
					img.setAttribute("height", this.naturalHeight);
				}
			};
		}
	}

	// アンカーリンクのスムーズスクロールを設定
	for (const anchor of document.querySelectorAll('a[href^="#"]')) {
		anchor.addEventListener("click", (e) => {
			const targetId = anchor.getAttribute("href");
			if (targetId.length > 1) {
				const targetElement = document.querySelector(targetId);
				if (targetElement) {
					e.preventDefault();
					const offset = 100;
					const top =
						targetElement.getBoundingClientRect().top +
						window.pageYOffset -
						offset;
					window.scrollTo({
						top,
						behavior: "smooth",
					});
				}
			}
		});
	}

	// 「エキスパートパネルとは？」ボタンの動作を設定
	const expertButton = document.getElementById("expertButton");

	if (expertButton) {
		const summaryText = expertButton.previousElementSibling;

		if (summaryText) {
			let expanded = false;

			expertButton.addEventListener("click", (e) => {
				e.preventDefault();
				if (!expanded) {
					summaryText.textContent =
						"エキスパートパネルとは、がんゲノム医療において遺伝子情報を解析し、専門家によって最適な治療法を協議する会議のことです。";
					expertButton.textContent = "閉じる";
					expanded = true;
				} else {
					summaryText.textContent =
						"　がん医療は日進月歩で大きく変化してきています。そして今、遺伝子情報に基づく個別化治療が始まり、がんゲノム医療として新たな時代を迎えています。がんの原因は遺伝子の変異にあります。";
					expertButton.textContent = "エキスパートパネルとは？";
					expanded = false;
				}
			});
		}
	}
});

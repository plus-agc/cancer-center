document.addEventListener("DOMContentLoaded", function () {
	// すべてのドロップダウンリンクを選択
	var dropdowns = document.querySelectorAll(".dropdown");

	dropdowns.forEach(function (dropdown) {
		var dropdownMenu = dropdown.querySelector(".dropdown-menu");
		var dropdownToggle = dropdown.querySelector(".dropdown-toggle");

		// ドロップダウンリンクがクリックされたときに表示/非表示を切り替える
		dropdownToggle.addEventListener("click", function (event) {
			event.preventDefault(); // リンクのデフォルト動作を無効にする
			event.stopPropagation(); // 他の親要素へのクリック伝播を防止

			// ドロップダウンメニューが表示されていなければ、リンク先に遷移
			if (!dropdownMenu.classList.contains("is-active")) {
				window.location.href = dropdownToggle.getAttribute("href");
			}

			// ドロップダウンメニューをトグル
			dropdownMenu.classList.toggle("is-active");
		});
	});

	// メニュー外をクリックした場合、すべてのメニューを閉じる
	document.addEventListener("click", function (event) {
		dropdowns.forEach(function (dropdown) {
			var dropdownMenu = dropdown.querySelector(".dropdown-menu");
			if (!dropdown.contains(event.target)) {
				dropdownMenu.classList.remove("is-active");
			}
		});
	});
});

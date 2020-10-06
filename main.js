/* main.js */

var canvas;

window.onload = () => {
	document.getElementById("readImage").addEventListener("change", loadLocalImage, false);
}

// 読み込みボタンを押すと画像が読み込まれる
const loadLocalImage = (event) => {
	var target = event.target;
	if (!target.files.length) {
		alert("ファイルが選択されていません");
		return -1;
	}
	points = [];
	loadImage(event.target);
}

// canvasに画像をロードする
const loadImage = (input) => {
	// 描画領域の初期化
	clearImage();
	// 選択したファイルの読み込み
	const file = input.files[0];
	const reader = new FileReader();
	reader.readAsDataURL(file);
	reader.onload = () => {
		// 読み込んだ画像をセットする
		const src_data = reader.result;
		let img = new Image();
		img.src = src_data;
		img.onload = () => {
			let src = cv.imread(img);
			cv.imshow(canvas, src);
			src.delete();
		}
	}
}

// 画像を削除する
const clearImage = () => {
	let image_area = document.getElementById("image_area");
	while (image_area.firstChild) {
		image_area.removeChild(image_area.firstChild);
	}
	canvas = document.createElement("canvas");
	image_area.appendChild(canvas);
}

// Escを押すと画像を削除
document.addEventListener("keydown", event => {
	if (event.code == "Escape") {
		clearImage();
		points = [];
	}
})

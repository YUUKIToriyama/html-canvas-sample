/* main.js */

// 読み込みボタンを押すと画像が読み込まれる
const loadLocalImage = (event) => {
	var target = event.target;

	if (!target.files.length) {
		alert("ファイルが選択されていません");
		return;
	}

	var file = target.files[0];

	const canvas = document.getElementById("picture");
	if (canvas.getContext) {
		const context = canvas.getContext("2d");
		const image = new Image();
		const filereader = new FileReader();

		filereader.onload = (ev) => {
			image.onload = () => {
				var width = image.naturalWidth;
				var height = image.naturalHeight;
				canvas.setAttribute("width", width);
				canvas.setAttribute("height", height);
				context.drawImage(image, 0, 0);
			
			}
			image.src = ev.target.result;
		}
		filereader.readAsDataURL(file);
	}
}

document.getElementById("readImage").addEventListener("change", loadLocalImage, false);

// canvasに画像をロードする
window.onload = () => {
	const canvas = document.getElementById("picture");
	const context = canvas.getContext("2d");

	const image = new Image();
	image.src = "images/imagemagick.png";
	image.onload = () => {
		var width = image.naturalWidth;
		var height = image.naturalHeight;
		canvas.setAttribute("width", width);
		canvas.setAttribute("height", height);
		context.drawImage(image, 0, 0);
	}
}

// マウスで座標を取得
const canvas = document.getElementById("picture");
canvas.addEventListener("click", (ev) => {
	var rect = ev.target.getBoundingClientRect();
	var x = ev.clientX - rect.left;
	var y = ev.clientY - rect.top;
	console.log(`${x},${y}`);
})

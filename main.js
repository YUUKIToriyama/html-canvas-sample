/* main.js */

var zoom;
var canvas;
var points = [];

window.onload = () => {
	zoom = 1;
	document.getElementById("readImage").addEventListener("change", loadLocalImage, false);
}

// 読み込みボタンを押すと画像が読み込まれる
const loadLocalImage = (event) => {
	var target = event.target;
	if (!target.files.length) {
		alert("ファイルが選択されていません");
		return;
	}
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
	reader.onload = (ev) => {
		// 読み込んだ画像をセットする
		const src_data = ev.target.result;
		let img = new Image();
		img.src = src_data;
		img.onload = (e) => {
			// canvas要素を用意し読み込んだ画像を貼り付ける
			const image = e.target;
			let cv = document.createElement("canvas");
			cv.width = image.naturalWidth;
			cv.height = image.naturalHeight;
			let ct = cv.getContext("2d");
			ct.drawImage(image, 0, 0);
			let data = ct.getImageData(0, 0, cv.width, cv.height);
			// 描画領域に作成したcanvas要素を追加する
			document.getElementById("image_area").appendChild(cv);
			// canvas変数の設定
			canvas = document.querySelector("canvas");
			canvas.addEventListener("click", (ev) => drawSquare(canvas, ev));
			zoom = canvas.clientWidth / image.naturalWidth;
		}
	}
	//downloadCSV.disabled = false;
}

const clearImage = () => {
	let image_area = document.getElementById("image_area");
	while (image_area.firstChild) {
		image_area.removeChild(image_area.firstChild);
	}
	//downloadCSV.disabled = true;
}

// マウスで四角形領域を描く
// 配列points内に頂点の情報を追加していく
const drawSquare = (canvas, event) => {
		let context = canvas.getContext("2d");
		let n = points.length;
		if (n < 4) {
			var rect = event.target.getBoundingClientRect();
			var x = (event.clientX - rect.left) / zoom;
			var y = (event.clientY - rect.top) / zoom;
			console.log(x,y);
	
			context.beginPath();
			context.arc(x, y, 5 / zoom, 0, Math.PI * 2, 0);
			context.fill();
			context.stroke();
			
			points.push({"x": Math.floor(x), "y": Math.floor(y)});
			if (n > 0) {
				context.lineWidth = 2 / zoom;
				context.beginPath();
				context.moveTo(points[n-1]["x"], points[n-1]["y"]);
				context.lineTo(points[n]["x"], points[n]["y"]);
				context.closePath();
				context.stroke();
				if (n == 3) {
					context.beginPath();
					context.moveTo(points[3]["x"], points[3]["y"]);
					context.lineTo(points[0]["x"], points[0]["y"]);
					context.closePath();
					context.stroke();
	
					const output = document.getElementById("output");
					output.value = JSON.stringify(points, null, "\t");
				}
			}
		} else {
			var dialogResult = window.confirm("既に4点指定しています。「キャンセル」を押すとこのダイアログは閉じます。「OK」を押すと画面は初期化されます。");
			if (dialogResult == true) {
				clearImage();
			}
		}
}

// Escを押すと画像を削除
document.addEventListener("keydown", event => {
	if (event.code == "Escape") {
		clearImage();
	}
})

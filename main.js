/* main.js */

var canvas;
var scale = 1;
var src;
var working;
let fillColor, strokeColor;

window.onload = () => {
	document.getElementById("readImage").addEventListener("change", loadLocalImage, false);
	fillColor = new cv.Scalar(255,255,0);
	strokeColor = new cv.Scalar(255,255,10);
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
			// opencv.jsの機能を使ってcanvasに画像を描画
			src = cv.imread(img);
			working = src.clone();
			cv.imshow(canvas, src);
			//src.delete();
			// 画像の実際のサイズと表示のサイズの比を取っておく
			scale = canvas.clientWidth / img.naturalWidth;
			// canvasにイベントリスナーを設定
			canvas.addEventListener("click", (ev) => drawSquare(ev));
		}
	}
}

// マウスでポイントを取る
// 配列points内に頂点の情報を追加していく
var points = [];
const drawSquare = (event) => {
	let n = points.length;
	if (n < 4) {
		let rect = event.target.getBoundingClientRect();
		let x = (event.clientX - rect.left) / scale;
		let y = (event.clientY - rect.top) / scale;
		let p = new cv.Point(parseInt(x),parseInt(y));
		console.log(x,y);

		// クリックした位置にマーカーを描画
		cv.circle(working, p, 10, fillColor, cv.FILLED);
		// 配列pointsに点の情報を格納
		points.push(p);
		
		// 2点目からはその点とその前の点とを結ぶ線分を描く
		if (0 < n) {
			cv.line(working, points[n - 1], points[n], strokeColor, 2, cv.LINE_AA, 0);
		}

		// 4点指定したら最初の点と最後の点を結び、四角形にする
		if (n == 3) {
			cv.line(working, points[3], points[0], strokeColor, 2, cv.LINE_AA, 0);
		}

		// 描画
		cv.imshow(canvas, working);
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

// 画像処理(サンプル)
const convertColor = () => {
	let src = cv.imread(canvas);
	let dst = new cv.Mat();
	cv.cvtColor(src, dst, cv.COLOR_RGB2GRAY);
	cv.imshow(canvas, dst);
}

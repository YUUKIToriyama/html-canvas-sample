/* main.js */

var zoom = 1;
// 読み込みボタンを押すと画像が読み込まれる
const loadLocalImage = (event) => {
	var target = event.target;
	if (!target.files.length) {
		alert("ファイルが選択されていません");
		return;
	}
	loadAnImage();
}

document.getElementById("readImage").addEventListener("change", loadLocalImage, false);

// canvasに画像をロードする
const loadAnImage = () => {
	var inputFile = document.getElementById("readImage");
	var file = inputFile.files[0];

	const image = new Image();
	const filereader = new FileReader();
	filereader.onload = (ev) => {
		image.onload = () => {
			zoom = 500 / image.naturalWidth;
			var width = 500;
			var height = zoom * image.naturalHeight;
			canvas.setAttribute("width", width + "px");
			canvas.setAttribute("height", height + "px");
			context.scale(zoom, zoom);
			context.drawImage(image, 0, 0);	
		}
		image.src = ev.target.result;
	}
	filereader.readAsDataURL(file);
	points = [];
}


// マウスで四角形領域を描く
var points = [];
const canvas = document.getElementById("picture");
const context = canvas.getContext("2d");
canvas.addEventListener("click", (ev) => {
	let n = points.length;
	if (n < 4) {
		var rect = ev.target.getBoundingClientRect();
		var x = (ev.clientX - rect.left) / zoom;
		var y = (ev.clientY - rect.top) / zoom;

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
			initializeCanvas();
		}
	}
})


// キャンバスを初期化する函数
const initializeCanvas = () => {
	context.clearRect(0, 0, canvas.width / zoom, canvas.height / zoom);
	loadAnImage();
}

document.addEventListener("keydown", event => {
	if (event.code == "Escape") {
		initializeCanvas();
	}
})

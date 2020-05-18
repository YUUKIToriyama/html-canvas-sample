/* main.js */

var zoom;
// 読み込みボタンを押すと画像が読み込まれる
const loadLocalImage = (event) => {
	var target = event.target;

	if (!target.files.length) {
		alert("ファイルが選択されていません");
		return;
	}

	/*
	var file = target.files[0];

	const canvas = document.getElementById("picture");
	if (canvas.getContext) {
		const context = canvas.getContext("2d");
		const image = new Image();
		const filereader = new FileReader();

		filereader.onload = (ev) => {
			image.onload = () => {
				zoom = 500 / image.naturalWidth;
				var width = 500;
				var height = zoom * image.naturalHeight;
				canvas.setAttribute("width", width + "px");
				canvas.setAttribute("height", height);
				context.scale(zoom, zoom);
				context.drawImage(image, 0, 0);
			
			}
			image.src = ev.target.result;
		}
		filereader.readAsDataURL(file);
	}
	*/
	points = {};
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
			canvas.setAttribute("height", height);
			context.scale(zoom, zoom);
			context.drawImage(image, 0, 0);	
		}
		image.src = ev.target.result;
	}
	filereader.readAsDataURL(file);
}


// マウスで四角形領域を描く
var points = {};
const canvas = document.getElementById("picture");
const context = canvas.getContext("2d");
canvas.addEventListener("click", (ev) => {
	let n = Object.keys(points).length;
	if (n < 4) {
		var rect = ev.target.getBoundingClientRect();
		var x = (ev.clientX - rect.left) / zoom;
		var y = (ev.clientY - rect.top) / zoom;

		context.beginPath();
		context.arc(x, y, 5 / zoom, 0, Math.PI * 2, 0);
		context.fill();
		context.stroke();
		
		points[n] = [x, y];
		if (n > 0) {
			context.lineWidth = 2 / zoom;
			context.beginPath();
			context.moveTo(points[n-1][0], points[n-1][1]);
			context.lineTo(points[n][0], points[n][1]);
			context.closePath();
			context.stroke();
			if (n == 3) {
				context.beginPath();
				context.moveTo(points[3][0], points[3][1]);
				context.lineTo(points[0][0], points[0][1]);
				context.closePath();
				context.stroke();

				const output = document.getElementById("output");
				output.value = JSON.stringify(Object.values(points), null, "\t");
			}
		}
	} else {
		alert("指定できるのは四点までです");
	}
})


// Escキーが押されたら四角形領域を初期化する
document.addEventListener("keydown", event => {
	if (event.code == "Escape") {
		points = {};
		context.clearRect(0, 0, canvas.width / zoom, canvas.height / zoom);
		loadAnImage();
	}
})

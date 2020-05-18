/* main.js */

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

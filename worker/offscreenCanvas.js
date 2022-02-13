const WIDTH = 1920;
const HEIGHT = 1080;
let offscreen, ctx;

onmessage = function (e) {
	const { action, user, screen } = e.data;
	
	switch(action) {
		case 'init':
			offscreen = new OffscreenCanvas(WIDTH, HEIGHT);
			ctx = offscreen.getContext("2d");
			break;
		case 'render':
			ctx.drawImage(screen, 0, 0, WIDTH, HEIGHT);
			ctx.drawImage(user, WIDTH/2, HEIGHT/2, WIDTH/2, HEIGHT/2);
			
			const imageBitmap = offscreen.transferToImageBitmap();
			postMessage({imageBitmap: imageBitmap}, [imageBitmap]);
			
			break;
		default:
			break;
	}
}

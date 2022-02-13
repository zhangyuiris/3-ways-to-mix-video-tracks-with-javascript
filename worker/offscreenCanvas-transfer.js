const WIDTH = 1920;
const HEIGHT = 1080;
let ctx;

onmessage = function (e) {
	const { action, offscreen, screen, user } = e.data;
	
	switch(action) {
		case 'init':
			ctx = offscreen.getContext("2d");
			break;
		case 'render':
			ctx.drawImage(screen, 0, 0, WIDTH, HEIGHT);
			ctx.drawImage(user, WIDTH/2, HEIGHT/2, WIDTH/2, HEIGHT/2);
			break;
		default:
			break;
	}
}

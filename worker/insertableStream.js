const WIDTH = 1920;
const HEIGHT = 1080;
let offscreen = new OffscreenCanvas(WIDTH, HEIGHT);
let ctx = offscreen.getContext('2d');

onmessage = function (e) {
	const { cameraReadable, screenReadable, mixedWritable } = e.data;
	mix(cameraReadable, screenReadable, mixedWritable);
}

function mix(cameraReadable, screenReadable, mixedWritable) {
	const screenReader = screenReadable.getReader();
	let screenFrame;
	const transformer = new TransformStream({
		async transform(cameraFrame, controller) {
			screenReader.read().then(frame => {
				if (screenFrame) {
					screenFrame.close();
				}
				screenFrame = frame.value;
			});
			if (screenFrame) {
				ctx.drawImage(screenFrame, 0, 0, WIDTH, HEIGHT);
			}
			ctx.drawImage(cameraFrame, WIDTH / 2, HEIGHT / 2, WIDTH / 2, HEIGHT / 2);

			const mixedFrame = new VideoFrame(offscreen);
			cameraFrame.close();
			controller.enqueue(mixedFrame);
		}
	});
	
	cameraReadable.pipeThrough(transformer).pipeTo(mixedWritable);
}

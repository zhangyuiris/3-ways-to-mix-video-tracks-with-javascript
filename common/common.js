
export const WIDTH = 1920;
export const HEIGHT = 1080;

const constraints = {
	video: {
		width: WIDTH,
		height: HEIGHT
	},
	audio: false
}

export async function getUserStream() {
	return await navigator.mediaDevices.getUserMedia(constraints)
}

export async function getScreenStream() {
	return await navigator.mediaDevices.getDisplayMedia(constraints);
}


# 3 WebRTC Hybrid Local Video Streaming Solutions

## background

When users use WebRTC to make audio and video calls, they often turn on camera and screen sharing, or other types of custom media streams at the same time. Therefore, users may push two or more video streams.

The most common scenario may be as shown below, where users turn on their own camera and screen sharing at the same time:

![01.png](./assets/01.png)

When two video streams are pushed locally at the same time, both the sender and the receiver will increase bandwidth consumption. If we want to reduce bandwidth costs, the most common solution is to mix two video streams, and only push one or pull one, which can reduce a lot of bandwidth usage.

Next, we will introduce several methods to introduce how to implement local mixed video streaming locally in the browser without relying on the backend.

The code repository address of this article: [Click to visit](https://github.com/zhangyuiris/3-ways-to-mix-video-tracks-with-javascript) .

# Scheme 1: Use Canvas to draw two video streams

## Implementation ideas:

- Capture the video stream of the camera
- Capture screen streams for screen sharing
- Draw two video streams on Canvas
- Capture mixed video stream from Canvas
- Streaming video...

![02.png](./assets/02.png)

##Demo

Click to visit [Demo](https://mix-video-tracks.vercel.app/1_Canvas.html).

# Scheme 2: OffScreenCanvas + Worker communication video frame

`OffscreenCanvas` provides a `Canvas` object that can be rendered offscreen. It works in both `window` and `Web Worker` environments. It is an experimental new feature, mainly used to improve the rendering performance and experience of Canvas 2D/3D drawing applications and H5 games.

![03.png](./assets/03.png)

## Implementation ideas:

- Capture the video stream of the camera
- Capture screen streams for screen sharing
- In the worker thread, create an OffscreenCanvas
- Convert the current screen of the video stream and screen stream into an ImageBitmap object and pass it to the Worker
- Create an ImageBitmap object after the OffscreenCanvas is drawn, and pass the ImageBitmap object to the main thread
- After the main thread receives the ImageBitmap object, it draws the ImageBitmap to the Canvas object
- Capture mixed video stream from Canvas
- Streaming video...

![04.png](./assets/04.png)

In demo 2-1, use Canvas' CanvasRenderingContext2D context

In demo 2-2, use Canvas's ImageBitmapRenderingContext context

In demo 2-3, use Canvas's transferControlToOffscreen

##Demo

Click to visit: [2-1](https://mix-video-tracks.vercel.app/2_1_OffscreenCanvas.html), [2-2](https://mix-video-tracks.vercel.app/2_2_OffscreenCanvas. html), [2-3](https://mix-video-tracks.vercel.app/2_3_OffscreenCanvas.html)

# Option 3: Use WebRTC Insertable Streams + Worker

WebRTC Insertable Streams adds some new APIs that allow developers to do the following with media data:

- Allow users to manually process data without breaking the normal WebRTC processing pipeline
- Allows data processing using WASM technology
- Allows the use of Web Worker technology to process data and avoid blocking the main thread
- Allow end-to-end data encryption and decryption to avoid security and privacy leakage risks (avoid man-in-the-middle attacks without trusting the SFU server)

The data of MediaStreamTrack can be consumed by MediaStreamTrackProcessor and then exposed ReadableStream :

- In case of VideoTrack, you will access the [VideoFrame](https://w3c.github.io/webcodecs/#videoframe) object
- In the case of AudioTrack, you will access the [AudioData](https://w3c.github.io/webcodecs/#audiodata-interface) object,

MediaStreamTrackGenerator can create a WritableStream, and generator can also be used as the source of MediaStreamTrack.

We can use TransformStream to stream data between ReadableStream and WritableStream, the flow chart is as follows:

![08.png](./assets/08.png)

Some API compatibility:

![05.png](./assets/05.png)

![06.png](./assets/06.png)

## Implementation ideas

- Capture the video stream of the camera
- Capture screen streams for screen sharing
- A processor that generates two streams
- Transmit two-stream readable data to Worker
- Draw the videoFrame of the two streams on the Canvas
- Get the latest videoFrame from Canvas to generate the final video stream
- Streaming video...

![07.png](./assets/07.png)

##Demo

Click to visit [Demo](https://mix-video-tracks.vercel.app/3_Insertable%20Stream.html).

# Replenish

## API Compatibility

OffscreenCanvas is currently supported after Chrome 69 /Edge 79

Insertable Streams is currently supported after Chrome/Edge 94

Therefore, the compatibility of each browser needs to be taken into account when actually using it.

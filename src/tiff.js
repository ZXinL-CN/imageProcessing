
import * as Tiff from 'browser-tiff.js';
import * as UTIF from 'utif';

console.log('hello world!!!');

fetch('./public/01.tif')
    .then(response => {
        console.log(response);
        return response.arrayBuffer()
    })
    .then(buffer => {
        console.log(buffer);
        
        console.time();
        const ifds = UTIF.decode(buffer);
        UTIF.decodeImage(buffer, ifds[0]);
        const rgba = UTIF.toRGBA8(ifds[0]);
        const imageData = new ImageData(new Uint8ClampedArray(rgba), ifds[0].width, ifds[0].height);
        console.timeEnd();

        const canvas = document.createElement('canvas');
        canvas.width = 500;
        canvas.height = 400;

        const ctx = canvas.getContext('2d');
        // ctx.putImageData(imageData, 0, 0);
        createImageBitmap(imageData).then(imgBitmap => {
            // 将ImageBitmap对象绘制到Canvas上下文中，缩放以适应canvas的大小
            ctx.drawImage(imgBitmap, 0, 0, canvas.width, canvas.height);
        });
        document.body.appendChild(canvas);
    });

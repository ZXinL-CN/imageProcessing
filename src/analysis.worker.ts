import * as UTIF from 'utif';
console.log(self);

self.onmessage = ({ data }) => {
    console.log(data);
    const { buffer } = data;
    
    console.time();
    const ifds = UTIF.decode(buffer);
    UTIF.decodeImage(buffer, ifds[0]);
    const rgba = UTIF.toRGBA8(ifds[0]);
    const imageData = new ImageData(new Uint8ClampedArray(rgba), ifds[0].width, ifds[0].height);
    console.timeEnd();

    createImageBitmap(imageData).then(imgBitmap => {
        // 将ImageBitmap对象绘制到Canvas上下文中，缩放以适应canvas的大小
        // ctx?.drawImage(imgBitmap, 0, 0, canvas.width, canvas.height);
        self.postMessage({
            imgBitmap
        })
    });

}

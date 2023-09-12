
import * as Tiff from 'browser-tiff.js';

console.log('hello world!!!');

fetch('./public/01.tif')
    .then(response => {
        console.log(response);
        return response.arrayBuffer()
    })
    .then(buffer => {
        console.log(buffer);
        var tiff = new Tiff({ buffer: buffer });
        var canvas = tiff.toCanvas();
        if (canvas) {
            document.getElementById('canvas').appendChild(canvas);
        }
    });
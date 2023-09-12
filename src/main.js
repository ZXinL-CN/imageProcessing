
import Tiff from 'tiff.js';

console.log('hello world!!!');

fetch('./public/01.tif')
  .then(response => response.arrayBuffer())
  .then(buffer => {
    var tiff = new Tiff({ buffer: buffer });
    var canvas = tiff.toCanvas();
    if (canvas) {
      document.body.appendChild(canvas);
    }
  });
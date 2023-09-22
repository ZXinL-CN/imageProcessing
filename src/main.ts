
import './tiff';
// import './getfiletype';

false && fetch('./public/014.tif')
    .then(response => {
        console.log(response);
        return response.arrayBuffer()
    }).then(buffer => {

        const worker = new Worker(new URL('./analysis.worker.ts', import.meta.url));
        worker.postMessage({
            buffer
        });

        worker.onmessage = ({ data }) => {
            console.log(data);
            const { imgBitmap } = data;
            const canvas = document.createElement('canvas');
            canvas.width = 500;
            canvas.height = 400;

            const ctx = canvas.getContext('2d');
            ctx?.drawImage(imgBitmap, 0, 0, canvas.width, canvas.height);
            document.body.appendChild(canvas);
        };

    });



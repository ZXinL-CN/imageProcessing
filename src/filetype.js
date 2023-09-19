const filetypes = {
    "474946383761": "image/gif",
    "474946383961": "image/gif",
    "89504e470d0a1a0a": "image/png",
    "ffd8": "image/jpeg",
    "52494646xxxxxx57454250": "image/webp",
    "52494646xxxxxx4156": "video/avi",
    "464C56": "video/flv",
    "00000018": "video/mp4",
    "00000020": "video/mp4",
    "52494646,4143": "ani",
    "52494646,4344": "cda",
    "52494646,514c": "qcp"
}

const upload = document.getElementById('upload');
upload.addEventListener('change', function (e) {
    const file = e.target.files[0];
    console.log(file);
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = (e) => {
        const buffer = e.target.result;
        const headers = getHeaders(buffer);
        console.log(getType(headers));
    }
});

function getHeaders(buffer) {
    return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padEnd(2, 0)).join('');
}

function getType(headers = '') {
    const header3 = headers.substring(0, 3 * 2);
    const header4 = headers.substring(0, 4 * 2);
    const header6 = headers.substring(0, 6 * 2);
    const header16 = headers.substring(0, 16 * 2);
    console.log(header3, header4, header16);
    let type = filetypes[header3] || filetypes[header4] || filetypes[header6] || filetypes[header16] || '';
    if (!type) {
        Object.keys(filetypes).forEach((key) => {
            if (type) return;
            if (key.includes('x')) {
                const reg = new RegExp(key.replace(/x+/, '(\\d)+'));
                console.log(reg);
                console.log(reg.test(header16));
                if (reg.test(header16)) {
                    type = filetypes[key];
                }
            }
        })
    }
    return type;
}
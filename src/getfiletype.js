import { filetypes } from './filetypes';

const upload = document.getElementById('upload');
upload.addEventListener('change', handleFileUpload);

function handleFileUpload(e) {
    const file = e.target.files[0];
    console.log(file);
    const fileReader = new FileReader();
    fileReader.readAsArrayBuffer(file);
    fileReader.onload = handleFileLoad;
}

function handleFileLoad(e) {
    const buffer = e.target.result;
    const header32 = getHeaders(buffer).substring(0, 32 * 2);
    console.log(getType(header32));
}

function getHeaders(buffer) {
    return Array.from(new Uint8Array(buffer)).map(byte => byte.toString(16).padStart(2, '0')).join('');
}

function getType(headers = '') {
    for (const [type,pattern] of Object.entries(filetypes)) {
        const regex = new RegExp(pattern);
        if (regex.test(headers)) {
            return type;
        }
    }
    return '';
}

// function getType(headers = '') {
//     const header2 = headers.substring(0, 2 * 2);
//     const header3 = headers.substring(0, 3 * 2);
//     const header4 = headers.substring(0, 4 * 2);
//     const header6 = headers.substring(0, 6 * 2);
//     const header8 = headers.substring(0, 8 * 2);
//     const header16 = headers.substring(0, 16 * 2);
//     console.log(header2, header3, header4, header6, header8, header16);
//     let type = filetypes[header2] || filetypes[header3] || filetypes[header4] || filetypes[header6] || filetypes[header8] || filetypes[header16] || '';
//     if (!type) {
//         Object.keys(filetypes).forEach((key) => {
//             if (type) return;
//             if (key.includes('x')) {
//                 const reg = new RegExp(key.replace(/x+/, '(\\d)+'));
//                 console.log(reg);
//                 console.log(reg.test(header16));
//                 if (reg.test(header16)) {
//                     type = filetypes[key];
//                 }
//             }
//         });
//     }
//     return type;
// }
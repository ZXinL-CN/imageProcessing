const OPFSBtn = document.getElementById('OPFS');

const pickerOpts = {
    types: [
        {
            description: "请选择一个文件",
            accept: {
                "*/*": [".txt",],
            },
        },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
};
let fileHandle;

OPFSBtn?.addEventListener('click', function (e) {
    getFile();
})

async function getFile() {
    // 打开文件选择器，解构返回的数组中的第一个元素
    [fileHandle] = await window.showOpenFilePicker(pickerOpts);
    console.log(fileHandle);
    // 操作 fileHandle 的后续代码
    const fileData = await fileHandle.getFile();
    console.log(fileData);
    console.log(await fileData.text());

    const hasWithWrite = await verifyPermission(fileHandle, true);
    console.log(hasWithWrite);
    if (hasWithWrite) {
        const contents = 'hello' + ' 🍕🍔'.repeat(36);
        // Get a writable stream.
        const writable = await fileHandle.createWritable();
        // Write the contents of the file to the stream.
        await writable.write(contents);
        // Close the stream, which persists the contents.
        await writable.close();
        console.log('✅File contents written to file');
    }
}

// fileHandle 是一个 FileSystemFileHandle
// withWrite 是一个布尔值，如果要求写入则需传入 true

async function verifyPermission(fileHandle, withWrite) {
    const opts = {};
    if (withWrite) {
        opts.mode = "readwrite";
    }

    // 检查是否已经拥有相应权限，如果是，返回 true。
    if ((await fileHandle.queryPermission(opts)) === "granted") {
        return true;
    }

    // 为文件请求权限，如果用户授予了权限，返回 true。
    if ((await fileHandle.requestPermission(opts)) === "granted") {
        return true;
    }

    // 用户没有授权，返回 false。
    return false;
}


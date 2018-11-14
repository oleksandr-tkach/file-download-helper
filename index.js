const FileSaver = require('file-saver');

class FileDownloadHelper {
    /**
     * @param {string} b64Data Base64 file
     * @param {string} type File type
     * @param {string} filename File name
     */
    static download(b64Data, type, filename) {
        const b64toBlob = (b64, contentType = '', sliceSize = 512) => {
            const byteCharacters = atob(b64);
            const byteArrays = [];
            for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
                const slice = byteCharacters.slice(offset, offset + sliceSize);
                const byteNumbers = new Array(slice.length);
                for (let i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            const blob = new Blob(byteArrays, { type: contentType });
            return blob;
        };
        const b = b64toBlob(b64Data, type);
        FileSaver.saveAs(b, filename);
    }

    /**
     * @param {Blob} blob Blob file
     * @param {string} filename File name
     */
    static downloadBlob(blob, filename) {
        FileSaver.saveAs(blob, filename);
    }
}

module.exports = FileDownloadHelper;

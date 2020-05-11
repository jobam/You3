import process from "child_process";

const downloaderCommand = 'youtube-dl';
const destDirectory = '../converted';


export class VideoConverter {
    public static getfilename(url: string): Promise<string> {
        return new Promise((resolve, reject) => {
            let args = ` --extract-audio --audio-format mp3 --get-filename "${url}"`;
            let filename;
            process.exec(downloaderCommand + args, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                filename = stdout;
                console.log(`filename is: ${filename}`);
                resolve(filename);
            });
        });
    }

    public static downloadFile(url: string, filename: string): Promise<string> {
        return new Promise((resolve, reject) => {
            const destFilePath = `${destDirectory}/${filename}`;
            const args = ` --extract-audio --audio-format mp3 --continue -f bestaudio "${url}" -o "${destFilePath}"`;
            process.exec(downloaderCommand + args, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    return;
                }
                if (stderr) {
                    console.log(`stderr: ${stderr}`);
                    return;
                }
                console.log(`stdout: ${stdout}`);
                resolve(destFilePath.replace('.webm', '.mp3'));
            });
        });
    }
}

// module.exports = {
//     getfilename: url => new Promise((resolve, reject) => {
//         let args = ` --extract-audio --audio-format mp3 --get-filename "${url}"`;
//         let filename;
//         process.exec(downloaderCommand + args, (error, stdout, stderr) => {
//             if (error) {
//                 console.log(`error: ${error.message}`);
//                 return;
//             }
//             if (stderr) {
//                 console.log(`stderr: ${stderr}`);
//                 return;
//             }
//             filename = stdout;
//             console.log(`filename is: ${filename}`);
//             resolve(filename);
//         });
//     }),
//     downloadFile: function (url, filename) {
//         return new Promise((resolve, reject) => {
//             const destFilePath = `${destDirectory}/${filename}`;
//             const args = ` --extract-audio --audio-format mp3 --continue -f bestaudio "${url}" -o "${destFilePath}"`;
//             process.exec(downloaderCommand + args, (error, stdout, stderr) => {
//                 if (error) {
//                     console.log(`error: ${error.message}`);
//                     return;
//                 }
//                 if (stderr) {
//                     console.log(`stderr: ${stderr}`);
//                     return;
//                 }
//                 console.log(`stdout: ${stdout}`);
//                 resolve(destFilePath.replace('.webm', '.mp3'));
//             });
//         });
//     },
// };

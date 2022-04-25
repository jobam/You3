import WebSocket from "ws";
import Fs from "fs";
import {VideoConverter} from "./converter/video-converter";

const port = 8080;
const wss = new WebSocket.Server({port: port});

export enum MessageTypes {
    convert = "convert",
    resultFileName = "resultFileName"
}

console.log('server is listening on port %s', port);

wss.on('connection', function connection(ws, req) {
    const ip = req.connection.remoteAddress;
    console.log(ip + ' connected');

    ws.on('message', function incoming(message: any) {
        message = JSON.parse(message);
        if (message.type === MessageTypes.convert) {
            convertVideo(message.payload, ws)
        }
    });

    ws.on('close', function disconnected() {
        console.log(ip + ' disconnected');
    });
});

function convertVideo(url: string, ws: WebSocket) {
    console.log('url to convert is %s', url);
    VideoConverter.getfilename(url).then((filename) => {
        console.log('1. Getting Filename ' + filename);
        console.log('2. Downloading and Converting');
        VideoConverter.downloadFile(url, filename).then((convertedFilePath) => {
            console.log('converted filepath is %s', convertedFilePath);
            Fs.readFile(convertedFilePath.replace('\n', ''), (err, data) => {
                if (err) {
                    console.log(err)
                }
                ws.send(JSON.stringify({
                    type: MessageTypes.resultFileName,
                    payload: filename.replace('.webm', '.mp3')
                }));
                ws.send(data);
            });
        })
    });
}

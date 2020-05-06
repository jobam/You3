const WebSocket = require('ws');
const Converter = require('./converter/download-video');
const Fs = require('fs');
var Blob = require('blob');


const wss = new WebSocket.Server({port: 8080});

MessageTypes = {
    convert: "convert",
    resultFileName:"resultFileName"
};

console.log('server is listening');

wss.on('connection', function connection(ws, req) {
    const ip = req.connection.remoteAddress;
    console.log(ip + ' connected');

    ws.on('message', function incoming(message) {
        message = JSON.parse(message);
        if (message.type === MessageTypes.convert) {
            convertVideo(message.payload, ws)
        }
    });

    ws.on('close', function disconnected() {
        console.log(ip + ' disconnected');
    });
});

function convertVideo(url, ws) {
    console.log('url to convert is %s', url);
    Converter.getfilename(url).then((filename) => {

        Converter.downloadFile(url, filename).then((convertedFilePath) => {
            console.log('converted filepath is %s', convertedFilePath);
            Fs.readFile(convertedFilePath.replace('\n',''), (err, data) => {
                if (err) {
                    console.log(err)
                }
                ws.send(JSON.stringify({type:MessageTypes.resultFileName, payload:filename.replace('.webm','.mp3')}));
                ws.send(data);
            });
        })
    });
}

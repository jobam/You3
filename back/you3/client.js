const WebSocket = require('ws');

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', function open() {
    console.log('connected');
    ws.send(JSON.stringify({type: 'convert', payload: 'https://www.youtube.com/watch?v=EY2CGLWpkuI'}));
});

ws.on('message', function incoming(data) {
    let deserializedData;
    let fileName = '';
    try{
        deserializedData = JSON.parse(data);
        fileName = deserializedData.payload;
    }catch (e) {
        console.log('file is here buddy with name %s', fileName);
        const pdfBlob = new Blob([data], {type: "audio/mpeg3"});
        const url = webkitURL.createObjectURL(pdfBlob);
        window.open(url);
    }
    console.log(data);
});

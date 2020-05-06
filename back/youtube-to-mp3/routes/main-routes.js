var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var downloader = require('../converter/download-video');

function downloadFile(url, res) {
  downloader.getfilename(url).then((fileName) => {
    console.log('converting...');
    downloader.downloadFile(url, fileName).then((downloadedFileResult) => {
      console.log('file is downloaded: ' + downloadedFileResult);

      const formatedFileName = fileName.replace('.webm', '.mp3').trim();
      res.setHeader(
        'content-disposition',
        `attachment; filename=${formatedFileName}`
      );
      res.setHeader('content-type', 'audio/mpeg');
      res.setHeader('access-control-expose-headers', content - disposition);

      filePath = path.join(__dirname, '../converted/', `${formatedFileName}`);
      res.download(filePath);
      // var filestream = fs.createReadStream(filePath);
      // filestream.pipe(res);
    });
  });
}

router.get('/api/convert-video', function (req, res, next) {
  const url = 'https://www.youtube.com/watch?v=bRHU9D8Hv-M';
  downloadFile(url, res);
});

router.post('/api/convert-video', function (req, res, next) {
  const url = req.body.videoUrl;
  console.log(req.body);
  downloadFile(url, res);
});

module.exports = router;

const express = require('express');
const upload = require('multer')({ dest: 'uploads/' });
const path = require('path');
const fs = require('fs');
const port = 8000;
let app = express();
app.set('port', port);
app.use('/', express.static(path.join(__dirname, 'public')));
app.post('/upload', upload.single('file'), (req, res) => {
 if (!req.file) {
 res.send("没有找到文件");
 return;
 }
 
 //获取上传的文件信息
 console.log('======文件信息========');
 console.log('encoding: ' + req.file.encoding);
 console.log('mimetype: ' + req.file.mimetype);
 console.log('size: ' + (req.file.size / 1024).toFixed(2) + 'KB');
 console.log('fileoriginalname: ' + req.file.originalname);
 console.log('filename: ' + req.file.filename);
 console.log('path: ' + req.file.path);
 
 // 文件名需要重命名，这里保持上传后的文件名
 let oldPath = path.join(__dirname, req.file.path);
 let newPath = path.join(__dirname, 'uploads/' + req.file.filename);
 fs.rename(oldPath, newPath, (err) => {
 if (err) {
  res.send("上传文件错误" );
  console.log(err);
 } else {
  res.send("上传文件成功" );
 }
 });
});
app.listen(port, () => {
 console.log("localhost:" + port);
});

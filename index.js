var https = require('https');
var fs = require('fs');
var url = require('url');
var path = require('path');

const options = {
  key: fs.readFileSync('/Users/zxm/privkey.pem'),
  cert: fs.readFileSync('/Users/zxm/server.pem')
};

https.createServer(options, function (request, response) {
    var pathname = url.parse(request.url).pathname;
    console.log("pathname", pathname);

    if(pathname.indexOf('.js') != -1) {
        response.writeHead(200, {'Content-Type': 'text/javascript'});
        var renderData = fs.readFileSync(path.resolve(path.join(__dirname, pathname)));
    	response.write(renderData.toString());
    } else if(pathname.indexOf('.dat') != -1) {
        response.writeHead(200, {'Content-Type': 'application/octet-stream'});
        var renderData = fs.readFileSync(path.resolve(path.join(__dirname, pathname)));
        response.write(renderData);
    } else {
        response.writeHead(200, {'Content-Type': 'text/html'});
        var renderData = fs.readFileSync('index3.html');
        // var renderData = fs.readFileSync(path.resolve(path.join(__dirname, "/js-aruco/samples/webcam/webcam.html")));
    	response.write(renderData.toString());
    }

	response.end();
}).listen(8800);

console.log('Server running at https://127.0.0.1:8800/');

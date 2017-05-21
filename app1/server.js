'use strict'

/*

// Using http node_module
let http = require('http');
//Defining port
const port = 8080;
//creating http server
http.createServer(function (req, res){
	res.writeHead(200, {'content-type':'text/plain'});
	res.end('Hello Node!');
}).listen(port);
console.log('Node is running on ' + port);

*/

// Serving Simple HTML Files in Node.


let http = require('http');
let url = require('url');
let path = require('path');
let fs = require('fs');

const port = 8080;

let mimeTypes = {
	"html" : "text/html",
	"jpeg" : "image/jpeg",
	"jpg" : "image/jpg",
	"png" : "image/png",
	"js" : "text/javascript",
	"css" : "text/css"
}

//Creating a Server
http.createServer(function (req, res){
	let uri = url.parse(req.url).pathname;
	let fileName = path.join(process.cwd(),unescape(uri));
	console.log('Loading ' + uri);
	let stats;

	try{
		stats = fs.lstatSync(fileName);	
	} catch(e) {
		res.writeHead(404, {'content-type' : 'text/plain'});
		res.write('404 - File Not Found');
		res.end();
		return;
	}

	//Check if file/directory
	if(stats.isFile()){
		let mimeType = mimeTypes[path.extname(fileName).split(".").reverse()[0]];
		res.writeHead(200, {'content-type' : mimeType});
		let fileStream = fs.createReadStream(fileName);
		fileStream.pipe(res);	
	} else if(stats.isDirectory()){
		res.writeHead(302, {'Location' : 'index.html'});
		res.end();
	} else {
		res.writeHead(500, {'content-type' : 'text/plain'});
		res.write('502 - Internal Error');
		res.end();
	}
}).listen(port);













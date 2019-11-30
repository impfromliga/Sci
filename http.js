if(!Array.prototype.flatMap) Array.prototype.flatMap= function(f){return this.reduce((acc, x) => acc.concat( f(x) ), [])}; //flatMap polyfill

//sub html serv helper:
var {readFile} = require('fs').promises;
var server= require('http').createServer(async function(req, res){
	console.log({url:req.url});
	var url = (req.url=='/') ? '/index.html' : req.url;
	var ext = (url.match(/\.\w*$/)||[''])[0];
	if(ext==='')url+=(ext='.html');
	var typ = {
		'.manifest':'text/cache-manifest',
		'.html':'text/html',
		'.htm':'text/html',
		'.css':'text/css',
		'.xml':'text/xml',
		'.txt':'text/plain',
		'.js':'application/javascript',
		'.json':'text/json',
		'.mjs':'application/javascript',
		'.ttf':'application/x-font-ttf',
		'.woff':'application/font-woff',
		'.ogg':'application/ogg',
		'.zip':'application/zip',
		'.pdf':'application/pdf',
		'.tar':'application/x-tar',
		'.rar':'application/x-rar-compressed',
		'.flw':'application/x-shockwave-flash',
		'.gz':'application/gzip',
		'.ico':'image/vnd.microsoft.icon',
		'.png':'image/png',
		'.jpg':'image/jpeg',
		'.gif':'image/gif',
		'.svg':'image/svg+xml',
		'.webp':'image/webp',
		'.mp3':'audio/mpeg',
		'.webm':'audio/webm',
	}[ext];
	console.log({ext,typ});
	if(typ) try {
		var file = await readFile('./'+url);
		res.writeHead(200, {'Content-Type': typ});
		return res.end(file);
	} catch (e){
		console.error(e);
	}
	res.writeHead(404, {'Content-Type': 'text/html'});
	res.end('404 - Not Found');
}).listen(80);
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');


http.createServer((req, res) => {
    
    if (req.method === 'GET') {
        const isFile = (path) => fs.lstatSync(path).isFile();
        let currentUrl = req.url;
        const fullPath = path.join(process.cwd(), req.url);
        console.log(fullPath);
        if (isFile(fullPath)) {
            
            res.writeHead(200, 'OK', {
                'Content-Type': 'text/html',
                });
            return fs.createReadStream(filePath).pipe(res);
        }

        let linksArray = [];
        const list = fs.readdirSync(fullPath);
        list.forEach((file) => {
            let filePath = path.join(process.cwd(), currentUrl);
            console.log(filePath);
            let htmlLink = `<a href="${filePath}">${file}</a><br/>`;
            linksArray.push(htmlLink + "\n");
        })

        const string = fs.readFileSync(path.join(__dirname, 'index.html'), 'utf-8').replace("string", linksArray.join(""));
    
        res.writeHead(200, 'OK', {
            'Content-Type': 'text/html',
        });
        res.end(string);
    }

}).listen(3000, 'localhost');
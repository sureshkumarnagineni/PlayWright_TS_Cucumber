const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const server = http.createServer((req, res) => {
    // Default to cucumber-report.html
    let filePath = 'Reports/cucumber-html/cucumber-report.html';
    
    if (req.url !== '/') {
        // Handle static file requests
        const parsedUrl = url.parse(req.url);
        filePath = path.join('Reports', 'cucumber-html', parsedUrl.pathname === '/' ? 'cucumber-report.html' : parsedUrl.pathname.slice(1));
    }
    
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            res.end(`<h1>404 - File not found</h1><p>${filePath}</p>`);
        } else {
            const ext = path.extname(filePath);
            let contentType = 'text/html';
            if (ext === '.json') contentType = 'application/json';
            if (ext === '.css') contentType = 'text/css';
            if (ext === '.js') contentType = 'text/javascript';
            if (ext === '.png') contentType = 'image/png';
            if (ext === '.jpg' || ext === '.jpeg') contentType = 'image/jpeg';
            if (ext === '.gif') contentType = 'image/gif';
            
            res.writeHead(200, { 
                'Content-Type': contentType,
                'Cache-Control': 'no-cache, no-store, must-revalidate, max-age=0',
                'Pragma': 'no-cache',
                'Expires': '0'
            });
            res.end(data);
        }
    });
});

server.listen(3000, () => {
    console.log('\n✅ Cucumber HTML Report Server');
    console.log('📊 Open: http://localhost:3000\n');
});

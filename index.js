const fs = require('fs');
const url = require('url');
const http = require('http');
const replaceTemplate = require('./modules-js/replaceTemplate');

const data = fs.readFileSync('./data/data.json', 'utf-8');
const dataObj = JSON.parse(data);

const templateOverview = fs.readFileSync('./templates/template-overview.html', 'utf-8');
const templateProduct = fs.readFileSync('./templates/template-product.html', 'utf-8');
const templateCard = fs.readFileSync('./templates/template-card.html', 'utf-8');

let server = http.createServer((req, res) => {
    const { query, pathname } = url.parse(req.url, true);

    if (pathname === '/' || pathname === '/overview') {
        res.writeHead(200, { 'Content-type': 'text/html' });
        const cardsHtml = dataObj.map(el => replaceTemplate(templateCard, el)).join(' ');
        const output = templateOverview.replace('{%PRODUCT_CARDS%}', cardsHtml);
        res.end(output);
    }
    else if (pathname === '/product') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        const output = replaceTemplate(templateProduct, dataObj[query.id]);
        res.end(output);
    }
    else if (pathname === '/api') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(dataObj);
    }
    else {
        res.writeHead(404, {
            'Content-Type': 'text/html'
        });
        res.end('<h1>Page not Found</h1>')
    }
})

server.listen(3000, 'Localhost', (err) => {
    console.log('Hosted on port 3000!');
})







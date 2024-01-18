import http from 'http';
const PORT = 3000;

const rotas = {
    "/": "Daniel'",
}

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(rotas[req.url] || "rota não encontrada");
});

server.listen(PORT, () => {
    console.log('Server running at http://localhost:3000/');
});

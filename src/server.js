const net = require('net');
const port = 7070;
const host = '127.0.0.1';
const readLine = require('readline');
const server = net.createServer();
const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
});
server.listen(port, host, () => {
    let sockets = [];

    server.on('connection', (sock) => {
        console.log(`CONNECTED: ${sock.remoteAddress}:${sock.remotePort}`);
        sockets.push(sock);
        rl.on('line', (line) => {
            sock.write(line);
        })
        sock.on('data', (data) => {
            console.log(`\n${sock.remoteAddress}:${sock.remotePort} said \n${data}\n`);
        });
        sock.on('close', (data) => {
            let index = sockets.findIndex((o) => {
                return o.remoteAddress === sock.remoteAddress && o.remotePort === sock.remotePort;
            });
            if(index !== -1) {
                sockets.slice(index, 1);
            }
            console.log(`CLOSED: ${sock.remoteAddress}:${sock.remotePort}`);
        });
    });
    console.log(`TCP Server is running on port ${port}`);
});

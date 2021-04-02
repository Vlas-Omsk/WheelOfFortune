const server = require('./server');
const websocket = require('./websocket');
const chat = require('./chat');
const wheel = require('./wheel');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const port = 48670;

chat.init(websocket);
wheel.init(websocket);
websocket.init(server);

server.server.listen(port, () => console.log("Server started"));

rl.on('line', (input) => {
    try {
        console.log(eval(input));
    } catch(ex) {
        console.log(ex.name + ': ' + ex.message);
    }
});
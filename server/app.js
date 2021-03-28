const server = require('./server');
const websocket = require('./websocket');

const port = 48670;

websocket.init(server);

server.server.listen(port, () => console.log("Server started"));
const WebSocket = require("ws");
const validator = require("./validator");

const onProcessMessage = [];
const onInit = {};
const onStartListening = [];

let webSocketServer;
let server;

function getUnixNow() {
    return (+ new Date());
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function sendForEach(msg) {
    msg = JSON.stringify(msg);
    webSocketServer.clients.forEach(client => client.send(msg));
}

function send(client, msg) {
    msg = JSON.stringify(msg);
    client.send(msg);
}

function error(ws, reqtype, error) {
    send(ws, {
        type: 'error',
        reqtype,
        error
    })
}

function init(ws) {
    var initialize = {
        type: 'init'
    };
    for (var key in onInit) {
        initialize[key] = onInit[key](ws);
    }
    send(ws, initialize)
}

function processMessage(ws, msg) {
    for (var i = 0; i < onProcessMessage.length; i++)
        onProcessMessage[i](ws, msg);
}

function addOnInit(name, callback) {
    onInit[name] = callback;
}

function addOnProcessMessage(callback) {
    onProcessMessage.push(callback);
}

function addOnStartListening(callback) {
    onStartListening.push(callback);
}

module.exports = {
    getUnixNow,
    getRandomInt,
    getserver: () => server,
    sendForEach,
    send,
    error,
    addOnInit,
    addOnProcessMessage,
    addOnStartListening
}

module.exports.init = function(_server) {
    server = _server;
    webSocketServer = new WebSocket.Server({ server: server.server, path: '/' });

    for (var i = 0; i < onStartListening.length; i++)
        onStartListening[i]();

    webSocketServer.on('connection', ws => {
        ws.on('message', msg => {
            msg = JSON.parse(msg);
            processMessage(ws, msg);
        });

        ws.on("error", e => error(ws, 'internal', e));

        init(ws);
    });
}
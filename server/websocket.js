const WebSocket = require("ws");
const validator = require("./validator");

const history = [];
const bets = [
    {bid: 0, title: "2x", color: "#666", users: []},
    {bid: 1, title: "3x", color: "#c8354e", users: []},
    {bid: 2, title: "5x", color: "#45b5da", users: []},
    {bid: 3, title: "50x", color: "#ffc870", users: []}
];
const partCount = 54;
const degPerPart = 360 / partCount;
const updateTime = 30000;
const blueParts = [6, 8, 16, 18, 26, 28, 36, 38, 46, 48];

let degrees = 0;
let webSocketServer;
let lastsend = getUnixNow();
let server;

//#region Wheel methods
function getUnixNow() {
    return (+ new Date());
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

function pushHistory(val) {
    history.unshift({
        id: history.length + 1,
        winnumber: val
    });
}

function getWheelIdByDeg(deg) {
    return Math.floor(deg / degPerPart) + 1;
}

function getWinBet(id) {
    if (id == 27)
        return bets[3];
    else if (blueParts.indexOf(id) !== -1)
        return bets[2];
    else if (id % 2 === 0)
        return bets[1];
    else
        return bets[0];
}
//#endregion

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
    send(ws, {
        type: 'init',
        history: history.filter((val, i) => i < 100),
        bets,
        time: updateTime - (getUnixNow() - lastsend),
        degrees
    })
}

function bet(ws, msg) {
    if (validator.validate([
        {value: msg.token, error: "Empty token"},
        {value() { return validator.isEmpty(msg.coins) || Number(msg.coins) == Number.NaN || Number(msg.coins) <= 0 }, error: "Incorrectly entered amount of coins"},
        {value() { return Number(msg.bid) < 0 || Number(msg.bid) >= bets.length }, error: "Invalid bid"}
    ], (err) => error(ws, 'bet', err))) return;

    var user = server.findUserByToken(msg.token);
    if (validator.validate([
        {value: user, error: "Invalid token"},
        {value() { return user.coins - msg.coins < 0 }, error: "Need more gold"}
    ], (err) => error(ws, 'bet', err))) return;

    var index = bets[msg.bid].users.push({uid: user.uid, username: user.username, coins: msg.coins}) - 1;
    bets[msg.bid].users[index].id = index;
    user.coins -= msg.coins;

    sendForEach({
        type: 'addbet',
        bid: msg.bid,
        userbet: {uid: user.uid, username: user.username, coins: msg.coins}
    });
    send(ws, {
        type: 'addbetprivate',
        coins: user.coins
    });
}

function processMessage(ws, msg) {
    switch (msg.command) {
        case 'init':
            init(ws);
            break;
        case 'bet':
            bet(ws, msg);
            break;
        case 'update':
            if (validator.isEmpty(msg.token))
                return send(ws, {
                    type: 'error',
                    reqtype: 'update',
                    error: "Empty token"
                });
            var user = server.findUserByToken(msg.token);
            send(ws, {
                type: 'update',
                username: user.username,
                coins: user.coins
            });
            break;
    }
}

module.exports.init = function(_server) {
    server = _server;
    webSocketServer = new WebSocket.Server({ server: server.server })

    setInterval(() => {
        console.log("[WS] Send spin");

        var windegree = getRandomInt(0, 361) * 3;
        degrees += windegree;
        while (degrees > 360)
            degrees -= 360;
        var winnumber = getWheelIdByDeg(degrees);
        pushHistory(winnumber);

        var bet = getWinBet(winnumber);
        var multiple = Number(bet.title.slice(0, -1));
        for (var id = 0; id < bet.users.length; id++) {
            var buser = bet.users[id];
            var user = server.users[buser.uid];
            user.coins += buser.coins * multiple;
        }

        for (var bid = 0; bid < bets.length; bid++)
            bets[bid].users = [];

        lastsend = getUnixNow();
        sendForEach({
            type: 'spin',
            time: updateTime,
            winnumber,
            windegree
        });
    }, updateTime);

    webSocketServer.on('connection', ws => {
        ws.on('message', msg => {
            msg = JSON.parse(msg);
            processMessage(ws, msg);
        });

        ws.on("error", e => error(ws, 'internal', e));

        init(ws);
    });
}
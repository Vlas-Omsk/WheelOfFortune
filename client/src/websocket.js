import { spinWheel, showToast } from '@/methods'
import { data } from '@/data'

var ws = null;
const address = "ws://" + window.location.host + "/";

export function connect() {
    if (ws != undefined && ws.readyState === WebSocket.OPEN)
        return;
        console.log(address);
    ws = new WebSocket(address);

    ws.onopen = function() {
        console.log('[WS] Connected')
    };
    ws.onclose = function(eventclose) {
        console.log('[WS] Disconnected: ' + eventclose.reason + ' (' + eventclose.code + ')');
        setTimeout(() => {
            console.log('[WS] Reconnect');
            ws = new WebSocket(address);
        }, 2000);
    }
    ws.onmessage = function(msg) {
        msg = JSON.parse(msg.data);
        processMessage(msg);
    }
}

function send(msg) {
    msg = JSON.stringify(msg);
    if (ws != undefined && ws.readyState === WebSocket.OPEN)
    ws.send(msg);
}

function processMessage(msg) {
    switch (msg.type) {
        case 'init':
            data.history = msg.history;
            data.bets = msg.bets;
            data.wheelRoteteDegree = msg.degrees
            data.currentTime = msg.time / 1000;
            break;
        case 'spin':
            spinWheel(msg.windegree, msg.winnumber);
            data.currentTime = msg.time / 1000;
            break;
        case 'addbet':
            console.log(data.bets[msg.bid]);
            data.bets[msg.bid].users.push(msg.userbet);
            break;
        case 'addbetprivate':
            data.account.coins = msg.coins;
            break;
        case 'update':
            data.account.username = msg.username;
            data.account.coins = msg.coins;
            break;
        case 'error':
            showToast(msg.error);
            break;
    }
}

export function init() {
    send({
        command: 'init'
    });
}

export function bet(coins, bid) {
    send({
        command: 'bet',
        token: data.account.token,
        bid,
        coins
    });
}

export function update() {
    send({
        command: 'update',
        token: data.account.token
    });
}
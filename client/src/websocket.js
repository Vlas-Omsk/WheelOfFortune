import { spinWheel, showToast } from '@/methods'
import { data } from '@/data'

var ws = null;
let address;
const listeners = [];
if (data.debug)
    address = "ws://10.0.0.103:48670/";
else
    address = "ws://" + window.location.host + "/";

export function connect() {
    if (ws != undefined && ws.readyState === WebSocket.OPEN)
        return;
    ws = new WebSocket(address);

    ws.onopen = function() {
        console.log('[WS] Connected')
    };
    ws.onclose = function(eventclose) {
        console.log('[WS] Disconnected: ' + eventclose.reason + ' (' + eventclose.code + ')');
        setTimeout(() => {
            console.log('[WS] Reconnect');
            connect();
        }, 5000);
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
            // Wheel
            data.history = msg.wheel.history;
            data.bets = msg.wheel.bets;
            data.wheelRoteteDegree = msg.wheel.degrees
            data.nextSpinAt = msg.wheel.nextSpinAt;

            // Chat
            data.messages = msg.chat.messages;
            break;
        case 'spin':
            spinWheel(msg.windegree, msg.winnumber);
            data.nextSpinAt = msg.nextSpinAt;
            break;
        case 'addbet':
            data.bets[msg.bid].users.push(msg.userbet);
            break;
        case 'addbetprivate':
            data.account.coins = msg.coins;
            break;
        case 'update':
            data.account.username = msg.username;
            data.account.coins = msg.coins;
            break;
        case 'addmessage':
            if (!data.isChatOpened)
                data.isNewMessagesAwailable = true;
            var insertAfter = -1,
                deleteCount = 0;
            for (var i = 0; i < data.messages.length; i++) {
                if (data.messages[i].id == msg.message.id - 1 && data.messages.length > i + 1)
                    insertAfter = i;
                if (data.messages[i].id == msg.message.id) {
                    deleteCount = 1;
                    insertAfter = i;
                }
            }

            if (insertAfter == -1)
                data.messages.unshift(msg.message);
            else
                data.messages.splice(insertAfter, deleteCount, msg.message);
            break;
        case 'error':
            showToast(msg.error);
            break;
    }
    for (var i = 0; i < listeners.length; i++)
        if (listeners[i] && listeners[i].type == msg.type)
            listeners[i].callback(msg);
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

export function addmessage(content) {
    send({
        command: 'addmessage',
        content,
        token: data.account.token
    });
}

export function getusers(startswith) {
    send({
        command: 'getusers',
        startswith
    });
}

export function on(type, id, callback) {
    listeners.push({type, id, callback});
}

export function off(id) {
    for (var i = 0; i < listeners.length; i++)
        if (listeners[i] && listeners[i].id == id)
            delete listeners[i];
}
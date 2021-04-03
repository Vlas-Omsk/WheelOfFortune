const validator = require("./validator");

let websocket;

const messages = [];
    // {id:0, uid:0, username:'Lorem ipsum', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    // {id:1, uid:0, username:'123qwe', content:'The quick brown fox jumps over the lazy dog'},
    // {id:2, uid:0, username:'Lorem ipsum', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    // {id:3, uid:0, username:'123qwe', content:'The quick brown fox jumps over the lazy dog'},
    // {id:4, uid:0, username:'Lorem ipsum', content:'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'},
    // {id:5, uid:0, username:'123qwe', content:'The quick brown fox jumps over the lazy dog'}

function init(ws) {
    return {
        messages: messages.filter((val, i) => i < 100),
    }
}

function processMessageContent(value) {
    return value.replace(/@(\S+)/g, (val) => {
        var name = val.slice(1);
        var user = websocket.getserver().findUserByName(name);
        if (user)
            return `<a href="/profile/${user.uid}" class="user-reference">@${name}</a> `;
        return val;
    })
}

function addmessage(ws, msg) {
    if (validator.validate([
        {value: msg.token, error: "Empty token"},
        {value: msg.content, error: "Empty message"},
    ], (err) => websocket.error(ws, 'addmessage', err))) return;

    var content = processMessageContent(msg.content.trim());
    var user = websocket.getserver().findUserByToken(msg.token);
    if (validator.validate([
        {value: user, error: "Invalid token"},
        {value: content, error: "Empty message"},
        {value: () => content.length > 140, error: "Message too large"}
    ], (err) => websocket.error(ws, 'addmessage', err))) return;

    var message = {
        id: messages.length + 1,
        uid: user.uid,
        username: user.username,
        content,
        time: websocket.getUnixNow()
    };
    messages.unshift(message);

    websocket.sendForEach({
        type: 'addmessage',
        message
    })
}

function processMessage(ws, msg) {
    switch (msg.command) {
        case 'init':
            init(ws);
            break;
        case 'addmessage':
            addmessage(ws, msg);
            break;
    }
}

module.exports = {
    messages
}

module.exports.init = function(_websocket) {
    websocket = _websocket;

    websocket.addOnInit('chat', init);
    websocket.addOnProcessMessage(processMessage);
}
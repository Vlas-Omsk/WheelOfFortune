const http = require("http");
const express = require("express");
const fs = require("fs");
const path = require("path");
const validator = require("./validator");

const app = express();
const server = http.createServer(app);
const startCoins = 30000;
const users = [];
const tokens = [];

function generateToken(username) {
    var token = null;
    do {
        token = username + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    } while (findUserByToken(token));
    return token;
}

function getCookie(cookiestring, name) {
    if (validator.isEmpty(cookiestring))
        return null;
    let matches = cookiestring.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : 0;
}

function findUserByToken(token) {
    for (var i = 0; i < tokens.length; i++)
        if (tokens[i].token == token)
            return users[tokens[i].uid];
}

function findUserByName(name) {
    for (var i = 0; i < users.length; i++)
        if (users[i].username == name)
            return users[i];
}

function setTokenCookie(res, token) {
    var expiryDate = new Date();
    expiryDate.setMonth(expiryDate.getMonth() + 1);
    res.cookie('token', token, {
        expires: expiryDate,
        // sameSite: 'Strict',
        httpOnly: true,
        path: '/api/'
    });
}

function deleteTokenCookie(res) {
    res.cookie('token', 'deleted', {
        maxAge: 0,
        // sameSite: 'Strict',
        httpOnly: true,
        path: '/api/'
    });
}

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', 'http://10.0.0.103:8080');
    res.header('Vary', 'Origin');
    res.header('X-Frame-Options', 'SAMEORIGIN');
    res.header('X-Xss-Protection', '1');
    res.header('X-Content-Type-Options', 'nosniff');
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    )
    next()
});

app.post('/api/signup', function (req, res) {
    if (validator.validate([
        {value: req.body, error: "Empty form"},
        {value: req.body.username, error: "Empty username"},
        {value: req.body.password, error: "Empty password"}
    ], (error) => res.status(400).send({error}) )) return;

    for (var i = 0; i < users.length; i++) {
        var item = users[i];
        if (item.username == req.body.username) {
            return res.status(400).send({
                error: "Account alredy exists"
            });
        }
    }

    var uid = users.push({
        username: req.body.username,
        password: req.body.password,
        coins: startCoins
    }) - 1;
    var user = users[uid];
    user.uid = uid;

    var token = generateToken(user.username);
    tokens.push({
        uid,
        token
    });
    setTokenCookie(res, token);
    return res.send({
        uid: user.uid,
        username: user.username,
        token,
        coins: user.coins
    });
});

app.post('/api/signin', function (req, res) {
    if (validator.validate([
        {value: req.body, error: "Empty form"},
        {value: req.body.username, error: "Empty username"},
        {value: req.body.password, error: "Empty password"}
    ], (error) => res.status(400).send({error}) )) return;

    var user = null, uid = 0;
    for (; uid < users.length; uid++) {
        var item = users[uid];
        if (item.username == req.body.username && item.password == req.body.password) {
            user = item;
            break;
        }
    }

    if(!user)
        return res.status(400).send({
            error: "Account not found"
        });
    
    var token = generateToken(user.username);
    tokens.push({
        uid,
        token
    });
    setTokenCookie(res, token);
    return res.send({
        uid: user.uid,
        username: user.username,
        token,
        coins: user.coins
    });
});

app.post('/api/signout', function (req, res) {
    deleteTokenCookie(res);
    return res.send({});
});

app.post('/api/check', function (req, res) {
    var token = getCookie(req.headers.cookie, 'token');
    if (validator.validate([
        {value: token, error: "Empty token"}
    ], (error) => {
        deleteTokenCookie(res);
        res.status(400).send({error});
    })) return;

    var user = findUserByToken(token);

    if (!user) {
        deleteTokenCookie(res);
        return res.status(400).send({
            error: "Invalid token"
        });
    }

    return res.send({
        uid: user.uid,
        username: user.username,
        token,
        coins: user.coins
    });
});

app.options('*', function(req, res) {
    res.send();
});

app.get('*', function(req, res) {
    if (req.path == '/' || req.path == '/login') {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    } else if (
        req.url.endsWith('.svg') || 
        req.url.endsWith('.css') || 
        req.url.endsWith('.js') ||
        req.url.endsWith('.ico')
    ) {
        res.sendFile(path.join(__dirname, '../client/dist/' + req.path));
    } else {
        res.status(403).send();
    }
});

module.exports = {
    app,
    server,
    users,
    findUserByToken,
    findUserByName
}
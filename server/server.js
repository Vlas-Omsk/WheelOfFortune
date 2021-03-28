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
    return username + 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

function findUserByToken(token) {
    var user = null;
    for (var i = 0; i < tokens.length; i++)
        if (tokens[i].token == token)
            user = users[tokens[i].uid];
    return user;
}

app.use(express.json());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
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
    return res.send({
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
    return res.send({
        username: user.username,
        token,
        coins: user.coins
    });
});

app.options('*', function(req, res) {
    res.send();
});

app.get('*', function(req, res) {
    if (req.path == '/') {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    } else {
        res.sendFile(path.join(__dirname, '../client/dist/' + req.path));
    }
});

module.exports = {
    app,
    server,
    users,
    findUserByToken
}
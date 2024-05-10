"use strict";
const User = require("../../models/User");

const output = {
    home: (req, res) => {
        res.render("./home/index");
    },
    login: (req, res) => {
        res.render("./home/login");
    },
};


const process = {   // 프론트엔드쪽 
    login: (req, res) => {
        const user = new User(req.body);
        const response = user.login();
        return res.json(response);
    },
};

module.exports = {
    output, 
    process,
};
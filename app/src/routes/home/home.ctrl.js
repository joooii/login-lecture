"use strict";
const User = require("../../models/User");

const output = {
    home: (req, res) => {
        res.render("./home/index");
    },
    login: (req, res) => {
        res.render("./home/login");
    },
    register: (req, res) => {
        res.render("./home/register");
    },
};


const process = {   // 프론트엔드쪽 
    login: async (req, res) => {
        const user = new User(req.body);
        const response = await user.login();
        return res.json(response);
    },
    register: async (req, res) => {
        const user = new User(req.body);
        const response = await user.register();
        return res.json(response);
    },
};

module.exports = {
    output, 
    process,
};
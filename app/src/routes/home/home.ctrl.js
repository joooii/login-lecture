"use strict";
const UserStorage = require("../../models/UserStorage");    // UserStorage 가져오기
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
        const id = req.body.id,
            pw = req.body.pw;

        const users = UserStorage.getUsers("id", "pw"); // id, pw만 불러올 수 있음

        const response = {};
        if (users.id.includes(id)) {
            const idx = users.id.indexOf(id);
            if (users.pw[idx] === pw) {
                response.success = true;
                return res.json(response);
                };
            }

        response.success = false;
        response.msg = "로그인에 실패하셨습니다.";
        return res.json(response);
    },
};

module.exports = {
    output, 
    process,
};
"use strict";

const fs = require("fs").promises;

class UserStorage {
    static #getUserInfo(data, id) {     // 은닉화 -> private한 함수는 항상 최상단에 올려줘야 함
        const users = JSON.parse(data);
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // => [id, psword, name]
        const userInfo = usersKeys.reduce((newUser, info) => {
          newUser[info] = users[info][idx];
          return newUser;
        }, {});
    
        return userInfo;
      }

    static #getUsers (data, isAll, fields) {
        const users = JSON.parse(data);
        if (isAll) return users;

        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }

    // 데이터 은닉화(#users) -> 메서드로 전달해줘야 함
    static getUsers(isAll, ...fields) {
        return fs
        .readFile("./src/databases/users.json")
        .then((data) => {
          return this.#getUsers(data, isAll, fields);
        })
        .catch(console.error);
    }
    // (...변수명)에 파라미터로 넘긴 데이터들이 배열 형태로 들어오게 됨
    // newUsers에는 fields라고 하는 초기값이 들어감
    // 그 다음 변수들은 field에 들어감
    // hasOwnProperty: users에 field가 해당하는 key 값이 있는지 물어보는 것

    static getUserInfo(id) {
        return fs
        .readFile("./src/databases/users.json")
        .then((data) => {
          return this.#getUserInfo(data, id);
        })
        .catch(console.error);
    }

    static async save(userInfo) {
        const users = await this.getUsers(true);    // 데이터 추가
        if (users.id.includes(userInfo.id)) {
            throw "이미 존재하는 아이디입니다.";
        }
        users.id.push(userInfo.id);
        users.name.push(userInfo.name);
        users.pw.push(userInfo.pw);
        fs.writeFile("./src/databases/users.json", JSON.stringify(users));  // 문자열 object type으로 변경
        return { success: true };
    }
}

module.exports = UserStorage;
"use strict";

class UserStorage {
    // static: 다른 js 파일에서 class 자체에서 users 접근하고자 할 때 선언
    static #users = {   // #users: 외부에서 users를 불러올 수 없음!!!
        id: ["kim", "ju", "hee"],
        pw: ["1", "1", "2"],
        name: ["김", "주", "희"],
    };
    // 데이터 은닉화(#users) -> 메서드로 전달해줘야 함
    static getUsers(...fields) {
        const users = this.#users;
        const newUsers = fields.reduce((newUsers, field) => {
            if (users.hasOwnProperty(field)){
                newUsers[field] = users[field];
            }
            return newUsers;
        }, {});
        return newUsers;
    }
    // (...변수명)에 파라미터로 넘긴 데이터들이 배열 형태로 들어오게 됨
    // newUsers에는 fields라고 하는 초기값이 들어감
    // 그 다음 변수들은 field에 들어감
    // hasOwnProperty: users에 field가 해당하는 key 값이 있는지 물어보는 것

    static getUserInfo(id) {
        const users = this.#users;
        const idx = users.id.indexOf(id);
        const usersKeys = Object.keys(users); // => [id, pw, name]와 같은 배열이 만들어짐
        const userInfo = usersKeys.reduce((newUser, info) => {
            newUser[info] = users[info][idx];
            return newUser;
        }, {});

        return userInfo;
    }
}

module.exports = UserStorage;
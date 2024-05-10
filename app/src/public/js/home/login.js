"use strict";

const id = document.querySelector("#id"),
    pw = document.querySelector("#pw"),
    loginBtn = document.querySelector("button");

loginBtn.addEventListener("click", login);  // login 버튼 누르면 login 함수 출력

function login() {
    const req = {
        id: id.value,
        pw: pw.value,
    };

    fetch("/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
    })
    .then((res) => res.json())
    .then((res) => {
        if (res.success) {
            location.href = "/";
        } else {
            alert(res.msg);
        }
    })
    .catch((err) => {
        console.error("로그인 중 에러 발생");
    })
}
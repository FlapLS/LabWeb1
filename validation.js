let form = document.querySelector('.send_form'),
    y = document.getElementById('inputYZone'),
    x,
    r;
function checkY() {
    let yVal = y.value.replace(',', '.');
    if (yVal.trim() === "" || !isFinite(yVal) || (yVal <= -3 || yVal >= 5)) {
        y.classList.add("input_err");
        return false;
    }
    return true;
}
function checkX() {
    let buttons_x = document.querySelectorAll(".x_buttons");
    if (x === undefined) {
        buttons_x.forEach(buttons_x => buttons_x.classList.add("input_err"));
        return false;
    }
    buttons_x.forEach(buttons_x => buttons_x.classList.remove("input_err"));
    return true;
}
function checkR() {
    let buttons_r = document.querySelectorAll(".r_buttons");
    if (r === undefined) {
        buttons_r.forEach(buttons_r => buttons_r.classList.add("input_err"));
        return false;
    }
    buttons_r.forEach(buttons_r => buttons_r.classList.remove("input_err"));
    return true;
}
function changeR(rValue) {
    let buttonR = document.getElementById("r_" + rValue);
    if (!buttonR.classList.contains("selR")) {
        r = rValue;
        let oldSelectedButton = document.querySelector(".selR");
        if (oldSelectedButton !== null)
            oldSelectedButton.classList.remove("selR");
        buttonR.classList.add("selR");
        checkR();
    } else {
        r = undefined;
        buttonR.classList.remove("selR");
    }
}
function changeX(xValue) {
    let buttonX = document.getElementById("x_" + xValue);
    if (!buttonX.classList.contains("selX")) {
        x = xValue;
        let oldSelectedButton = document.querySelector(".selX");
        if (oldSelectedButton !== null)
            oldSelectedButton.classList.remove("selX");
        buttonX.classList.add("selX");
        checkX();
    } else {
        x = undefined;
        buttonX.classList.remove("selX");
    }
}
form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (checkX() && checkY() && checkR()) {
        let formData = new FormData();
        formData.append("x", x);
        formData.append("y", y.value.replace(',', '.'));
        formData.append("r", r);

        let xhr = new XMLHttpRequest();
        xhr.onloadend = function () {
            if (xhr.status === 200) {
                document.querySelector(".result_table").innerHTML = xhr.response;
            } else console.log("status: ", xhr.status)
        };
        xhr.open("POST", "script.php");
        xhr.send(formData);


    }

});
y.addEventListener("input", function () {
    y.classList.remove("input_err");
});
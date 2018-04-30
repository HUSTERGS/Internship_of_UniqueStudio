DanmuPlayer.prototype.getDanmu = function (time) {
    time = parseInt(time);
    console.log(time);
    var text = document.querySelector(".danmu-input").value;
    if (text.length === 0) {
        return;
    }
    if (text.length > 255) {
        alert("弹幕字数过多！");
        return;
    }
    text = text.replace(/&/g, "&gt;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\n/g, "<br>");
    //对文字进行处理
    var myColor = randomColor();
    var textObject = { value: text, color: myColor, time: time };
    that.danmuData[time] = textObject;//储存弹幕数据，用于传输给使用者
    //localStorage.setItem(time, textObject);//用于显示
}

DanmuPlayer.prototype.sendDanmu = function (time) {
    var height = video.offsetHeight * 0.95;
    var bullet = document.createElement("div");
    var left = bullet.offsetLeft;
    bullet.setAttribute("class", "bullet");
    bullet.textContent = danmuData[time].value;
    bullet.style.color = danmuData[time].color;
    bullet.style.height = "15px";
    bullet.style.top = danmuData[time].top || (Math.random() * height) + "px";
    danmuData[time].top = bullet.style.top;
    bullet.style.zIndex = 9999;
    danmuDiv.appendChild(bullet);
    setTimeout(function () {
        bullet.style.right = "150%";
    }, 500);
    setTimeout(function () {
        bullet.parentNode.removeChild(bullet);
    }, 6500);
    var sendBullet = new Event("danmuSent");
    sendBullet.self = bullet;
    fire(sendBullet);
}

DanmuPlayer.prototype.onOrOff = function () {
    if (danmuShowed) {
        danmuShowed = false;
        target.removeChild(danmuDiv);
        this.textContent = "打开弹幕";
    } else {
        danmuShowed = true;
        target.appendChild(danmuDiv);
        this.textContent = "关闭弹幕";
    }
}

function randomColor() {
    var num1 = Math.floor(Math.random() * 255);
    var num2 = Math.floor(Math.random() * 255);
    var num3 = Math.floor(Math.random() * 255);
    return "rgb(" + num1 + "," + num2 + "," + num3 + ")";
}

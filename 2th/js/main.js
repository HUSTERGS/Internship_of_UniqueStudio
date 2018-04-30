var DanmuPlayer = function (target, setings) {

    EventTarget.call(this);
    
    //传入一个对象以及相关的配置信息
    this.defaultSetings = {
        width: "600px",
        height: "400px",
        opacity: 0.8,
        littleWindowHeight: "200px",
        littleWindowWidth: "300px",
        littleWindowRight: 0,
        littleWindowTop: 0,
        useArray: false,
        arrayData: null,
    }

    
    this.danmuData = {};
    //用于存放弹幕信息
    this.setings = setings;
    this.target = target;
    var that = this;
    //接受数组作为弹幕来源
    if (setings.useArray || defaultSetings.useArray){
        for (let i = 0; i < setings.arrayData.length; i++){
            that.danmuData[setings.arrayData[i].time] = {
                time: setings.arrayData[i].time,
                value: setings.arrayData[i].text.replace(/&/g, "&gt;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\"/g, "&quot;").replace(/\n/g, "<br>"),
                color: setings.arrayData[i].color || randomColor(),
                top: setings.arrayData[i].top
            }
        }
    }

    

    //设置基本样式
    //target.cssText = "position: relative; width: " + setings.width + "height: " + setings.height + "overflow: hidden";
    target.classList.add("dammu-player");
    target.style.position = "relative";
    target.style.width = setings.width || this.defaultSetings.width;
    target.style.height = setings.height || this.defaultSetings.height;


    //弹幕层
    this.danmuDiv = document.createElement("div");
    this.danmuDiv.setAttribute("class", "danmu-div");
    this.danmuDiv.style.opacity = setings.opacity || 0.8;


    this.video = document.createElement("video");
    this.video.setAttribute("class", "danmu-video");
    this.video.setAttribute("src", setings.src);
    //视频部分

    this.danmuOuting = document.createElement("div");
    this.danmuOuting.setAttribute("class", "danmu-player");
    //弹幕输出部分

    this.progress = document.createElement("div");
    this.progress.setAttribute("class", "video-progress");
    //进度条整体

    this.currentProgress = document.createElement("div");
    this.currentProgress.setAttribute("class", "current-progress");
    //目前的进度

    this.progressHandle = document.createElement("div");
    this.progressHandle.setAttribute("class", "porgress-handle");
    //进度条上的控制小圆

    this.buffered = document.createElement("div");
    this.buffered.setAttribute("class", "bufferd");
    //缓冲区域

    this.mainCtrl = document.createElement("div");
    this.mainCtrl.setAttribute("class", "main-ctrl");
    //视频控制部分

    //var danmuCtrl = document.createElement("div");
    //danmuCtrl.setAttribute("class", "danmu-ctrl");
    //弹幕控制部分

    this.playbtn = document.createElement("div");
    this.playbtn.setAttribute("class", "playbtn");
    //播放按钮

    this.voice = document.createElement("div");
    this.voice.setAttribute("class", "voice");
    
    //this.mainVoice = document.createElement("div");
    //this.mainVoice.setAttribute("class", "main-voice");

    this.voiceCtrl = document.createElement("input");
    this.voiceCtrl.setAttribute("class", "voice-ctrl");
    this.voiceCtrl.setAttribute("type", "range");
    this.voiceCtrl.setAttribute("min", "0");
    this.voiceCtrl.setAttribute("max", "100");
    //声音控制

    this.currentTime = document.createElement("div");
    this.currentTime.setAttribute("class", "current-time");
    //当前时间
    this.slash = document.createElement("span");
    this.slash.setAttribute("class", "slash");

    this.totalTime = document.createElement("div");
    this.totalTime.setAttribute("class", "total-time");
    //总时间

    this.danmuIn = document.createElement("input");
    this.danmuIn.setAttribute("type", "text");
    this.danmuIn.setAttribute("class", "danmu-input");
    //弹幕输入

    this.sendbtn = document.createElement("div");
    this.sendbtn.setAttribute("class", "send-danmu");
    //发送弹幕

    this.onOrOff = document.createElement("div");
    this.onOrOff.setAttribute("class", "on-or-off");
    //弹幕选项

    this.fullScreen = document.createElement("div");
    this.fullScreen.setAttribute("class", "full-screen");
    //全屏选项

    this.closeBtn = document.createElement("div");
    this.closeBtn.setAttribute("class", "close-btn");

    this.currentProgress.appendChild(this.progressHandle);
    this.progress.appendChild(this.currentProgress);
    //this.mainVoice.appendChild(this.voice);
    //this.mainVoice.appendChild(this.voiceCtrl);
    this.mainCtrl.appendChild(this.progress);
    this.mainCtrl.appendChild(this.playbtn);
    //this.mainCtrl.appendChild(this.mainVoice);
    this.mainCtrl.appendChild(this.voice);
    this.mainCtrl.appendChild(this.voiceCtrl);
    this.mainCtrl.appendChild(this.currentTime);
    this.mainCtrl.appendChild(this.slash);
    this.mainCtrl.appendChild(this.totalTime);
    this.mainCtrl.appendChild(this.danmuIn);
    this.mainCtrl.appendChild(this.sendbtn);
    this.mainCtrl.appendChild(this.onOrOff);
    this.mainCtrl.appendChild(this.fullScreen);
    target.appendChild(this.video);
    target.appendChild(this.danmuOuting);
    target.appendChild(this.closeBtn);
    target.appendChild(this.mainCtrl);
    target.appendChild(this.danmuDiv);
    //添加控件

    //初始化一些内容
    this.currentTime.textContent = "0:00";
    this.slash.textContent = "/";
    this.fullScreen.textContent = "全屏播放";
    this.onOrOff.textContent = "关闭弹幕";
    this.danmuIn.placeholder = "您可以在这里输入弹幕吐槽哦~";
    this.sendbtn.textContent = "发送>";

    this.openLittleWindow = false;
    this.duration = this.video.duration;
    //this.current = 0;
    this.danmuPlayerFullSreen = false;
    this.danmuShowed = true;
    this.isloop = false;
    //this.danmuSize = 0;
    //this.danmuColor = setings.defaultColor;
    //this.danmuPosition = 0;
    
    this.getDanmu = function (time) {
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
    //产生随机颜色给弹幕文字
    function randomColor() {
        var num1 = Math.floor(Math.random() * 255);
        var num2 = Math.floor(Math.random() * 255);
        var num3 = Math.floor(Math.random() * 255);
        return "rgb(" + num1 + "," + num2 + "," + num3 + ")";
    }

    //发送弹幕函数
    this.sendDanmu = function (time) {
        var height = that.video.offsetHeight * 0.95;
        var bullet = document.createElement("div");
        var left = bullet.offsetLeft;
        bullet.setAttribute("class", "bullet");
        bullet.textContent = that.danmuData[time].value;
        bullet.style.color = that.danmuData[time].color;
        bullet.style.height = "15px";
        bullet.style.top = that.danmuData[time].top || (Math.random() * height) + "px";
        that.danmuData[time].top = bullet.style.top;
        bullet.style.zIndex = 9999;
        that.danmuDiv.appendChild(bullet);
        setTimeout(function () {
            bullet.style.right = "150%";
        }, 500);
        setTimeout(function () {
            bullet.parentNode.removeChild(bullet);
        }, 6500);
        var sendBullet = new Event("danmuSent");
        sendBullet.self = bullet;
        that.fire(sendBullet);
    }

    this.onOrOff.addEventListener("click", function () {
        if (that.danmuShowed) {
            that.danmuShowed = false;
            //that.danmuDiv.style.opacity = 0;
            target.removeChild(that.danmuDiv);
            this.textContent = "打开弹幕";
        } else {
            that.danmuShowed = true;
            //that.danmuDiv.style.opacity = setings.opacity || defaultSetings.opacity;
            target.appendChild(that.danmuDiv);
            this.textContent = "关闭弹幕";
        }
    });
    //播放暂停
    this.playPause = function () {
        if (that.video.paused) {
            that.video.play();
            that.playbtn.style.backgroundImage = "url(img/pause.png)"
        } else {
            that.video.pause();
            that.playbtn.style.backgroundImage = "url(img/play.png)"
        }
    }

    //添加播放暂停事件
    this.playbtn.addEventListener("click", that.playPause);

    this.video.addEventListener("ended", function () {
        that.playbtn.style.backgroundImage = "url(img/play.png)"
    });

    this.danmuDiv.addEventListener("click", that.playPause);

    //静音以及音量改变事件
    this.mute = function () {
        if (that.video.muted) {
            that.video.muted = false;
            that.voice.style.backgroundImage = "url(img/voice.png)";
        } else {
            that.video.muted = true;
            that.voice.style.backgroundImage = "url(img/mute.png)";
        }
    }

    

    this.volumeChange = function () {
        if (that.video.muted || that.video.volume == 0) {
            that.voice.style.backgroundImage = "url(img/mute.png)";
        } else {
            that.voice.style.backgroundImage = "url(img/voice.png)";
        }
    }

    this.video.addEventListener("volumechange", that.volumeChange);
    this.voice.addEventListener("click", that.mute);

    this.voiceCtrl.addEventListener("change", function(){
        that.video.volume = this.value / 100;
    })


    //设置总时间
    this.setTotalTime = function () {
        var durationMin = parseInt(that.video.duration / 60);
        var durationsec = parseInt(that.video.duration % 60) < 10 ? "0" + parseInt(that.video.duration % 60) : parseInt(that.video.duration % 60);
        that.totalTime.textContent = durationMin + ":" + durationsec;
    }

    //主计时器
    var mainTimer = setInterval(function () {
        var myTime = that.video.currentTime;
        var curMin = parseInt(myTime / 60);
        var curSec = parseInt(myTime % 60) < 10 ? "0" + parseInt(myTime % 60) : parseInt(myTime % 60);
        that.currentTime.textContent = curMin + ":" + curSec;
        var percentage = myTime / that.video.duration;
        that.currentProgress.style.width = (percentage * 100) + "%";
        myTime = parseInt(myTime);
        if (that.danmuData[myTime]) {
            that.sendDanmu(myTime);
        }
        that.setTotalTime();
    }, 1000);

    //获取元素到左侧以及到上面的距离
    var getOffsetLeft = function (obj) {
        var tmp = obj.offsetLeft;
        var val = obj.offsetParent;
        while (val != null) {
            tmp += val.offsetLeft;
            val = val.offsetParent;
        }
        return tmp;
    }

    var getOffsetTop = function (obj) {
        var tmp = obj.offsetTop;
        var val = obj.offsetParent;
        while (val != null) {
            tmp += val.offsetTop;
            val = val.offsetParent;
        }
        return tmp;
    }


    //进度条点击事件
    this.progress.addEventListener("click", function (e) {
        //var progress = document.querySelector(".video-progress");
        var length = that.progress.clientWidth;
        var pos = e.pageX - getOffsetLeft(that.progress);
        var percentage = pos / length;
        that.currentProgress.style.width = (percentage * 100) + "%";
        that.video.currentTime = percentage * that.video.duration;
    })

    //全屏事件
    this.fullScreen.addEventListener("click", function () {
        if (that.danmuPlayerFullSreen) {
            document.webkitExitFullscreen();
            target.style.width = setings.width || that.defaultSetings.width;
            target.style.height = setings.height || that.defaultSetings.height;
            that.danmuPlayerFullSreen = false;
            that.fullScreen.textContent = "全屏播放";
        } else {
            if (target.requestFullscreen) {
                target.requestFullscreen();
            } else if (target.mozRequestFullScreen) {
                target.mozRequestFullScreen();
            } else if (target.webkitRequestFullscreen) {
                target.webkitRequestFullscreen();
            } else if (target.msrequestFullScreen) {
                target.msrequestFullScreen();
            }
            target.style.width = "100vw";
            target.style.height = "100vh";
            that.danmuPlayerFullSreen = true;
            that.fullScreen.textContent = "退出全屏";
        }
    })

    //发送弹幕按钮点击事件
    this.sendbtn.addEventListener("click", function () {
        var myTime = that.video.currentTime;
        that.getDanmu(myTime);
        if (that.danmuData[myTime]) {
            that.sendDanmu(myTime);
        }
    });


    this.danmuIn.onkeydown = function () {
        var myTime = that.video.currentTime;
        if (event.keyCode == 13) {
            that.getDanmu(myTime);
        }
        if (that.danmuData[myTime]) {
            that.sendDanmu(myTime);
        }
    }

    //悬浮窗事件
    var ha = target.offsetTop + target.offsetHeight;
    window.addEventListener("scroll", function () {
        if (this.scrollY > ha + 500 && ! that.openLittleWindow) {
            target.style.position = "fixed";
            target.style.width = setings.littleWindowWidth || that.defaultSetings.littleWindowWidth;
            target.style.height = setings.littleWindowHeight || that.defaultSetings.littleWindowHeight;
            target.style.top = setings.littleWindowTop || that.defaultSetings.littleWindowTop;
            target.style.right = setings.littleWindowRight || that.defaultSetings.littleWindowRight;
            that.openLittleWindow = true;
            that.closeBtn.style.display = "inherit"
            that.danmuDiv.removeEventListener("click", that.playPause);
            that.voiceCtrl.style.display = "none";
            that.danmuIn.style.display = "none";
            that.sendbtn.style.display = "none";
        } else if (this.scrollY <= ha + 500 && that.openLittleWindow){
            target.style.position = "relative";
            target.style.width = setings.width || that.defaultSetings.width;
            target.style.height = setings.height ||that.defaultSetings.height;
            target.style.left = "auto";
            target.style.top = "auto";
            that.openLittleWindow = false;
            that.closeBtn.style.display = "none";
            target.style.display = "inherit";
            that.danmuDiv.addEventListener("click", that.playPause);
            that.voiceCtrl.style.display = "inline-block";
            that.danmuIn.style.display = "inline-block";
            that.sendbtn.style.display = "inline-block";
        }
    })

    //窗口拖动
    target.onmousedown = function (ex) {
        if (!that.openLittleWindow) {
            return;
        }
        var x = ex.clientX - getOffsetLeft(target);
        var y = ex.clientY - getOffsetTop(target);
        //var x = ex.clientX - target.offsetLeft;
        //var y = ex.clientY - target.offsetTop;
        document.onmousemove = function (e) {
            var l = e.clientX - x;
            var t = e.clientY - y;
            if (l < 0) {
                l = 0;
            } else if (l > document.documentElement.clientWidth - target.offsetWidth) {
                l = document.documentElement.clientWidth - target.offsetWidth;
            }
            if (t < 0) {
                t = 0;
            } else if (t > document.documentElement.clientHeight - target.offsetHeight) {
                t = document.documentElement.clientHeight - target.offsetHeight;
            }
            target.style.left = l + "px";
            target.style.top = t + "px";
            var windowMoveEv = new Event('floatWindowMove');
            windowMoveEv.self = target;
            windowMoveEv.positionX = l;
            windowMoveEv.positionY = t;
            that.fire(windowMoveEv);
        }
        document.onmouseup = function () {
            document.onmousemove = null;
            document.onmouseup = null;
        }
        return false;
    }
    //关闭悬浮窗
    this.closeBtn.addEventListener("click", function(){
        target.style.display = "none";
        var windowClose = new Event('windowClosed');
        that.fire(windowClose);
    })

    


}

DanmuPlayer.prototype = new EventTarget();
DanmuPlayer.prototype.constructor = DanmuPlayer;

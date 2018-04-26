
var firstpage = document.querySelector(".firstpage");
var secondpage = document.querySelector(".secondpage");
var arrow = document.querySelector(".arrow");
var biglogo = document.querySelector(".big-logo-container");
var container = document.querySelector(".headcontainer")
var midtext = document.querySelector(".midtext");
var big = document.querySelector(".bigbig");

window.addEventListener("load", function () {
    var height = document.documentElement.scrollTop;
    if (height === 0) {
        arrow.style.opacity = 1;
        biglogo.style.opacity = 1;
    }
})

window.addEventListener("mousewheel", function (event) {
    var height = document.documentElement.scrollTop;
    console.log(height);
    if (event.wheelDelta < 0) {
        if (height === 0) {
            if (document.querySelector(".jsselected2"))
                firstpage.classList.remove("jsselected2");
            firstpage.classList.add("jsselected1");
        }
    }
    else if (event.wheelDelta > 0) {
        if (height === 0) {
            if (document.querySelector(".jsselected1"))
                firstpage.classList.remove("jsselected1");
            firstpage.classList.add("jsselected2");
        }
    }

    if (event.wheelDelta < 0 && height === 0) {
        arrow.style.opacity = 0;
        biglogo.style.opacity = 0;
    } else if (event.wheelDelta > 0 && height === 0) {
        arrow.style.opacity = 1;
        biglogo.style.opacity = 1;
    }
    if (height >= 0 && height < 900) {
        if (document.querySelector(".jsselected4"))
            container.classList.remove("jsselected4")
        container.classList.add("jsselected3");
    }
    if (height === 0 && event.wheelDelta > 0) {
        if (document.querySelector(".jsselected3"))
            container.classList.remove("jsselected3")
        container.classList.add("jsselected4");
    }
    if (height > 720) {
        if (document.querySelector(".jsselected3"))
            container.classList.remove("jsselected3")
        container.classList.add("jsselected4");
    }

    if (event.wheelDelta > 0) {
        if (height > 1900 && height < 2550) {
            if (document.querySelector(".jsselected7"))
                midtext.classList.remove("jsselected7");
            midtext.classList.add("jsselected6");
        } else {
            if (document.querySelector(".jsselected6"))
                midtext.classList.remove("jsselected6");
            midtext.classList.add("jsselected7");
        }
    } else {
        if (height > 1700 && height < 2400) {
            if (document.querySelector(".jsselected7"))
                midtext.classList.remove("jsselected7");
            midtext.classList.add("jsselected6");
        } else {
            if (document.querySelector(".jsselected6"))
                midtext.classList.remove("jsselected6");
            midtext.classList.add("jsselected7");
        }
    }

    if (height > 636) {
        document.querySelector(".blacklayer1").classList.add("jsselected5");
    }
    if (height > 1000) {
        document.querySelector(".blacklayer2").classList.add("jsselected5");
        document.querySelector(".blacklayer3").classList.add("jsselected5");
        document.querySelector(".blacklayer4").classList.add("jsselected5");
    }
    if (height > 1900) {
        document.querySelector(".blacklayer5").classList.add("jsselected5");
    }
    if (height > 2200) {
        document.querySelector(".blacklayer6").classList.add("jsselected5");
        document.querySelector(".blacklayer7").classList.add("jsselected5");
        document.querySelector(".blacklayer8").classList.add("jsselected5");
    }
    if (height > 2800) {
        this.document.querySelector(".part1").classList.add("jsselectedleft1");
        this.document.querySelector(".part3").classList.add("jsselectedright1");
    }
    if (height > 5200) {
        this.document.querySelector(".controler1").classList.add("jsselectedleft2");
        this.document.querySelector(".controler2").classList.add("jsselectedright2");
    }
    if (height > 5600) {
        this.document.querySelector(".rightpart").classList.add("jsselectedright3");
    }
    if (height > 6000) {
        document.querySelector(".blacklayer9").classList.add("jsselected5");
        document.querySelector(".upblacklayer4").classList.add("jsselectedup");
    }
    if (height > 6700) {
        document.querySelector(".upblacklayer2").classList.add("jsselectedup");
        document.querySelector(".upblacklayer1").classList.add("jsselectedup");
        document.querySelector(".blacklayer10").classList.add("jsselected5");
        document.querySelector(".blacklayer11").classList.add("jsselected5");
        document.querySelector(".blacklayer12").classList.add("jsselected5");
    }
    if (height > 7180) {
        document.querySelector(".upblacklayer3").classList.add("jsselectedup");
    }
    if (height > 7600) {
        document.querySelector(".blacklayer13").classList.add("jsselected5");
        document.querySelector(".upblacklayer5").classList.add("jsselectedup");
        document.querySelector(".upblacklayer6").classList.add("jsselectedup");
    }

})

arrow.addEventListener("click", function () {
    if (document.querySelector(".jsselected2"))
        firstpage.classList.remove("jsselected2");
    firstpage.classList.add("jsselected1");
    arrow.style.opacity = 0;
    biglogo.style.opacity = 0;
})

//以下为新添加内容
var blackBg = document.querySelector(".black-bg");
var openBtn = document.querySelector(".pic-3");
var closeBtn = document.querySelector(".close-btn");
var sliders = document.querySelector(".sliders");
var sliderContainer = document.querySelector(".slider-container");
var newWindow = document.querySelector(".new-window");
var newWindowOpened = false;

openBtn.addEventListener("click", function () {
    blackBg.classList.add("black-bg-selected");
    closeBtn.style.pointerEvents = "auto";
    newWindow.style.pointerEvents = "auto";
    this.style.pointerEvents = "none";
    newWindow.classList.add("sliders-selected");
    newWindowOpened = true;
    // clearTime();
    myTime(1, 0);
})

function myTime(num, num2) {
    var second = (arguments.length === 2);
    switch (num) {
        case 1: {
            timeID1 = setTimeout(function () {
                slideColor(1);
                slideImage(1);
            }, second ? num2 * 6000 : 0);
        }
        case 2: {
            timeID2 = setTimeout(function () {
                slideColor(2);
                slideImage(2);
            }, second ? (num2 + 1) * 6000 : 6000);
        }
        case 3: {
            timeID3 = setTimeout(function () {
                slideColor(3);
                slideImage(3);
            }, second ? (num2 + 2) * 6000 : 12000);
        }
        case 4: {
            timeID4 = setTimeout(function () {
                slideColor(4);
                slideImage(4);
            }, second ? (num2 + 3) * 6000 : 18000);
        }
        case 5: {
            timeID5 = setTimeout(function () {
                closeTheBtn();
            }, second ? (num2 + 4) * 6000 : 24000);
            /*timeID6 = setTimeout(function () {
                sliderContainer.style.transform = "translate(0,0)";
            }, second ? (num2 + 4) * 6000 + 100 : 24100)*/
        }
    }
}

function closeTheBtn() {
    blackBg.classList.remove("black-bg-selected");
    closeBtn.style.pointerEvents = "none";
    newWindow.style.pointerEvents = "none";
    openBtn.style.pointerEvents = "auto";
    newWindow.classList.remove("sliders-selected");
    newWindowOpened = false;
    clearTime();
    if (document.querySelector(".buttom-selected"))
        document.querySelector(".buttom-selected").classList.remove("buttom-selected");
    setTimeout(function(){sliderContainer.style.transform = "translate(0,0)";}, 500);
}

closeBtn.addEventListener("click", closeTheBtn);

function openEvent() {
    blackBg.classList.add("black-bg-selected");
    closeBtn.style.pointerEvents = "auto";
    openBtn.style.pointerEvents = "none";
    newWindow.classList.add("slider-selected");
    newWindowOpened = true;
}

function slideImage(num) {
    if (num === 1) {
        sliderContainer.style.transform = "translate(0,0)";
    } else if (num === 2) {
        sliderContainer.style.transform = "translate(-105%,0)";
    } else if (num === 3) {
        sliderContainer.style.transform = "translate(-210%,0)";
    } else if (num === 4) {
        sliderContainer.style.transform = "translate(-315%,0)";
    }
}

function slideColor(num) {
    if (num === 1 || num === 2 || num === 3 || num === 4) {
        if (document.querySelector(".buttom-selected"))
            document.querySelector(".buttom-selected").classList.remove("buttom-selected");
        document.querySelector(".nav" + num + " .inner-red").classList.add("buttom-selected");
    }
}

document.querySelector(".nav1").addEventListener("click", function () {
    slideColor(1);
    slideImage(1);
    clearTime();
    myTime(1, 0);
});

document.querySelector(".nav2").addEventListener("click", function () {
    slideColor(2);
    slideImage(2);
    clearTime();
    myTime(2, -1);
});

document.querySelector(".nav3").addEventListener("click", function () {
    slideColor(3);
    slideImage(3);
    clearTime();
    myTime(3, -2);
});

document.querySelector(".nav4").addEventListener("click", function () {
    slideColor(4);
    slideImage(4);
    clearTime();
    myTime(4, -3);
});

function clearTime() {
    /*if (timeID1)
        clearTimeout(timeID1);
    if (timeID2)
        clearTimeout(timeID2);
    if (timeID3)
        clearTimeout(timeID3);
    if (timeID4)
        clearTimeout(timeID4);
    if (timeID5)
        clearTimeout(timeID5);
    if (timeID6)
        clearTimeout(timeID6);*/

    clearTimeout(timeID1);
    clearTimeout(timeID2);
    clearTimeout(timeID3);
    clearTimeout(timeID4);
    clearTimeout(timeID5);
    //clearTimeout(timeID6);
}


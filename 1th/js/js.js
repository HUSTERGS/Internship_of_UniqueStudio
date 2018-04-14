
var firstpage = document.querySelector(".firstpage");
var secondpage = document.querySelector(".secondpage");
var arrow = document.querySelector(".arrow");
var biglogo = document.querySelector(".big-logo-container");
var container = document.querySelector(".headcontainer")
var midtext = document.querySelector(".midtext");
var big = document.querySelector(".bigbig");

window.addEventListener("load", function () {
    var height = document.documentElement.scrollTop;
    if (height == 0) {
        arrow.style.opacity = 1;
        biglogo.style.opacity = 1;
    }
})

window.addEventListener("mousewheel", function (event) {
    var height = document.documentElement.scrollTop;
    console.log(height);
    if (event.wheelDelta < 0) {
        if (height == 0) {
            if (document.querySelector(".jsselected2"))
                firstpage.classList.remove("jsselected2");
            firstpage.classList.add("jsselected1");
        }
    }
    else if (event.wheelDelta > 0) {
        if (height == 0) {
            if (document.querySelector(".jsselected1"))
                firstpage.classList.remove("jsselected1");
            firstpage.classList.add("jsselected2");
        }
    }

    if (event.wheelDelta < 0 && height == 0) {
        arrow.style.opacity = 0;
        biglogo.style.opacity = 0;
    } else if (event.wheelDelta > 0 && height == 0) {
        arrow.style.opacity = 1;
        biglogo.style.opacity = 1;
    }
    if (height >= 0 && height < 900) {
        if (document.querySelector(".jsselected4"))
            container.classList.remove("jsselected4")
        container.classList.add("jsselected3");
    }
    if (height == 0 && event.wheelDelta > 0) {
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


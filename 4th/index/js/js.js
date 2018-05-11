window.addEventListener("load", function() {
    document.querySelector(".status-square").classList.add("square-selected");
    document.querySelector(".status-line").classList.add("logo-selected");
    document.querySelector(".logo-kin").classList.add("logo-selected");
    document.querySelector(".logo-d").classList.add("logo-selected");
    document.querySelector(".logo-le").classList.add("logo-selected");
})

document.querySelector(".main-page").addEventListener("pointermove", function(event) {
    var target = document.querySelector(".hover-div");
    var x = event.clientX - target.offsetWidth * 0.5;
    var y = event.clientY - target.offsetHeight * 0.5;
    target.style.left = x + "px";
    target.style.top = y + "px";
})


var container = document.querySelector(".content-container");
var currentpic = 1;
var changebtnleft = document.querySelector(".left-btn img");
var changebtnright = document.querySelector(".right-btn img");

changebtnleft.addEventListener("pointerdown", function(){
    this.src = "../切图/Banner2/01/btn_leftclick.png";
})

changebtnleft.addEventListener("pointerup", function(){
    this.src = "../切图/Banner2/01/btn_left.png";
    switch(currentpic) {
        case 1: break;
        case 2: container.style.transform = "translateX(0)";
                currentpic = 1;
                break;
        case 3: container.style.transform = "translateX(-100%)";
                currentpic = 2;
                break;
    }
})

changebtnright.addEventListener("pointerdown", function(){
    this.src = "../切图/Banner2/01/btn_rightclick.png";
})

changebtnright.addEventListener("pointerup", function(){
    this.src = "../切图/Banner2/01/btn_right.png";
    switch(currentpic) {
        case 1: container.style.transform = "translateX(-100%)";
                currentpic = 2;
                break;
        case 2: container.style.transform = "translateX(-200%)";
                currentpic = 3;
                break;
        case 3: break;
    }
})

function slidePic1(){
    container.style.transform = "translateX(-100%)";
}


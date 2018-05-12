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
var currentpage = 1;
var changebtnleft = document.querySelector(".left-btn img");
var changebtnright = document.querySelector(".right-btn img");
var topbtn = document.querySelector(".top-tag img");
var kindlebtn = document.querySelector(".kindle-tag img");
var mainbtn = document.querySelector(".main-tag img");
var searchbtn = document.querySelector(".search-tag img");


changebtnleft.addEventListener("pointerdown", function(){
    this.src = "../切图/Banner2/01/btn_leftclick.png";
})

changebtnright.addEventListener("pointerdown", function(){
    this.src = "../切图/Banner2/01/btn_rightclick.png";
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

topbtn.addEventListener("pointerdown", function(){
    this.src = "../切图/nav/Top选中.png";
    $("html,body").animate({scrollTop: $("#main").offset().top}, 1000);
    currentpage = 1;
})

topbtn.addEventListener("pointerup", function() {
    this.src = "../切图/nav/Top.png";
})

kindlebtn.addEventListener("pointerdown", function(){
    this.src = "../切图/nav/Kindle选中.png";
    $("html,body").animate({scrollTop: $("#read-feel").offset().top}, 1000);
    currentpage = 2;
})

kindlebtn.addEventListener("pointerup", function() {
    this.src = "../切图/nav/Kindle.png";
})

mainbtn.addEventListener("pointerdown", function(){
    this.src = "../切图/nav/Main选中.png";
    $("html,body").animate({scrollTop: $("#advantages").offset().top}, 1000);
    currentpage = 3;
})

mainbtn.addEventListener("pointerup", function() {
    this.src = "../切图/nav/Main.png";
})

searchbtn.addEventListener("pointerdown", function(){
    this.src = "../切图/nav/Search选中.png";
    $("html,body").animate({scrollTop: $("#know-more").offset().top}, 1000);
    currentpage = 4;
})

searchbtn.addEventListener("pointerup", function() {
    this.src = "../切图/nav/Search.png";
})


window.addEventListener("mousewheel", function(event){
    if (! document.documentElement.scrollTop  === 0) currentpage = 1;
    if (document.documentElement.scrollTop === window.innerHeight) currentpage = 2;
    if (document.documentElement.scrollTop === 2 * window.innerHeight) currentpage = 3;
    if (document.documentElement.scrollTop === 3 * window.innerHeight) currentpage = 4;
    if (document.documentElement.scrollTop <= 3 * window.innerHeight){
        if (event.wheelDelta < 0) {
            if (currentpage == 1){
                $("html,body").animate({scrollTop: $("#read-feel").offset().top}, 1000);
                currentpage = 2;
            }
            else if (currentpage === 2) {
                $("html,body").animate({scrollTop: $("#advantages").offset().top}, 1000);
                currentpage = 3;
            }
            else if (currentpage === 3) {
                $("html,body").animate({scrollTop: $("#know-more").offset().top}, 1000);
                currentpage = 4;
            }
        }
        else if (event.wheelDelta > 0) {
            if (currentpage == 2) {
                $("html,body").animate({scrollTop: $("#main").offset().top}, 1000);
                currentpage = 1;
            }
            else if (currentpage === 3) {
                $("html,body").animate({scrollTop: $("#read-feel").offset().top}, 1000);
                currentpage = 2;
            }
            else if (currentpage === 4) {
                $("html,body").animate({scrollTop: $("#advantages").offset().top}, 1000);
                currentpage = 3;
            }
        }
    }
})
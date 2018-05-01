let p = new MyPromise(function(resolve, reject){
    setTimeout(function(){
        let num = Math.random()
        if (num > 0.5) {
            resolve(num)
        }else {
            reject(num);
        }
    }, 1000)
});

p.then(function(num){
    console.log("大于0.5的数字：" + num);
}, function(num){
    console.log("小于0.5的数字：" + num)
});
function myPromise(executor) { //executor是一个执行器（函数）
    let _this = this; //先缓存this以免后面指针混乱
    _this.status = "pending"; //默认状态为等待状态
    _this.value = undefined; //成功时要传递给成功回调的数据，默认为undefined
    _this.reason = undefined; //失败时要传递给失败回调的原因，默认也是undefined
    _this.onRejectedCallbacks = [];
    _this.onResolvedCallbacks = [];
    
    function resolve(value) {
        if (_this.status === "pending") {
            _this.status = "resolve";
            _this.value = value;
            _this.onResolvedCallbacks.forEach(function (fn) {
                fn();
            })
        }
    }

    function reject(reason) {
        if (_this.status === "pending") {
            _this.status = "rejected";
            _this.reason = reason;
            _this.onRejectedCallbacks.forEach(function (fn) {
                fn();
            })
        }
    }
    try {
        executor(resolve, reject);
    } catch (e) {
        reject(e);
    }
    //executor(resolve, reject);
}

myPromise.prototype.then = function (onFullfilled, onRejected) {

    onFullfilled = typeof onFullfilled === 'function' ? onFullfilled : function (value) {
        return value;
    }

    onRejected = typeof onRejected === 'function' ? onRejected : function (err) {
        throw err;
    }
    let _this = this;
    let promise2;
    if (_this.status === "resolved") {
        promise2 = new myPromise(function (resolve, rejected) {
            setTimeout(function () {
                try {
                    let x = onFullfilled(_this.value);
                    resolvePromise(promise2, x, resolve, rejected);
                } catch (e) {
                    reject(e);
                }
            })
        })
    }

    if (_this.status === "rejected") {
        promise2 = new myPromise(function (rejected, resolve) {
            setTimeout(function () {
                try {
                    let x = onRejected(_this.reason);
                    resolvePromise(promise2, x, resolve, rejetced);
                } catch (e) {
                    rejetct(e);
                }
            })
        })
    }
    if (_this.status === "pending") {
        promise2 = new myPromise(function (resolve, reject) {
           _this.onResolvedCallbacks.push(function() {
               setTimeout(function() {
                   try {
                       let x = onFullfilled(_this.value);
                       resolvePromise(promise2, x, resolve, reject);
                   } catch(e) {
                       rejetct(e);
                   }
               })
           })
           _this.onRejectedCallbacks.push(function() {
               setTimeout(function() {
                   try {
                       let x = onRejected(_this.reason);
                       resolvePromise(promise2, x, resolve, reject);
                   } catch(e) {
                       reject(e);
                   }
               })
           })
        })

    }
    /*if (_this.status === "resolved") {
        onFullfilled(_this.value);
    }*/
    /*if (_this.status === "rejected") {
        onRejected(_this.reason);
    }*/
    return promise2;
}

myPromise.prototype.catch = function(callback) {
    return this.then(null, callback);
}
myPromise.all = function(promises) {
    return new myPromise(function(resolve, reject) {
        let arr = [];
        let i = 0;
        function processData(index, y) {
            arr[index] = y;
            if (++i === promises.length) {
                resolve(arr);
            }
            for (let i = 0; i < promises.length; i++){
                promises[i].then(function(y) {
                    processData(i, y);
                }, reject)
            }
        }
    })
}


function resolvePromise(promise2, x, resolve, reject) {
    if (promise2 === x) {
        return reject(new TypeError('循环引用'))
    }

    let called;

    if (x !== null && (typeof x === 'object' || typeof x === 'function')) {
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, function(y){
                    if (called) return;
                    called = true;
                    resolvePromise(promise2, y, resolve, reject);
                }, function(err) {
                    if (called) return;
                    called = true;
                    reject(err);
                })
            } else {
                resolve(x);
            }
        } catch (e) {
            if (called) return;
            called = true;
            rejecte(e);
        }
    } else {
        resolve(x);
    }
}

myPromise.resovle = function(value) {
    return new myPromise(function(resolve, reject) {
        resolve(value);
    })
}

myPromise.reject = function(reason) {
    return new myPromise(function(resolve, reject){
        reject(reason);
    })
}
/*myPromise.prototype.deferred = function(){
    let dfd = {};
    dfd.promise = new myPromise(function(resolve, reject){
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}*/
//module.exports = myPromise;
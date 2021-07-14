//async //with promises //chaining

let fs = require("fs");
 
console.log("Before");

    //2k
let f1KaPromise= fs.promises.readFile("f1.txt");

//10k->pending - f1 ke success callback ka promise hai ye
let thenKapromise = f1KaPromise.then(function(data){
console.log("Content "+data);
})

thenKapromise.then(function(){
    let f2KaPromise = fs.promises.readFile("f2.txt");
    return f2KaPromise;
})
.then(function(data){ //f2 ka promise ka scb
    console.log("Content "+data);
}) 
.then(function(){ //f2 ka promise ke scb ke baad kya kruga

    let f3KaPromise = fs.promises.readFile("f3.txt");
    return f3KaPromise;
})
.then(function(data){
    console.log("Content "+ data);
})

let fs = require("fs");



console.log("Before");
 

fs.readFile("./f1.txt",cb); 

function cb(error,data)
{
    console.log("Content "+data);
}

console.log("after");
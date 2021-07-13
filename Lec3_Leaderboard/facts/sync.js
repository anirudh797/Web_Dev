let fs = require("fs");



console.log("Before");
 

let f1KaData = fs.readFileSync("./f1.txt");

console.log("Content "+f1KaData);

console.log("after");
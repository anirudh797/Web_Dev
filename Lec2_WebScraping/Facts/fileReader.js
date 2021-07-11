let fs = require("fs");
let cheerio = require("cheerio");


let data = fs.readFileSync("./index.html");
console.log(data+" ");

let ch = cheerio.load(data);

let h1data = ch("h1").text();
console.log(h1data); 
//async tasks, parallely read

let fs = require("fs");

console.log("Before");
fs.readFile("./f1.txt",cb1);
fs.readFile("./f2.txt",cb2);
fs.readFile("./f3.txt",cb3);

function cb1(err,data)
{
    console.log("Content1 "+data);
}

function cb2(err,data)
{
    console.log("Content 2 "+data);
}

function cb3(err,data)
{
    console.log("Content 3 "+data);
}

console.log("After");
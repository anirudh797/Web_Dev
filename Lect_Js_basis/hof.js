 function getFirstName(name)
 {
     name = name.split(" ");
     return name[0];
 }

 function getLastName(name)
 {
     name = name.split(" ");
     return name[1];
 }

 function fun(name, sayHi) //higher order function
 {
     let a = sayHi(name);
     console.log(a+" Says hi");
 }


 fun("Steve Rogers",getFirstName);
 fun("Steve Rogers",getLastName);
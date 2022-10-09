/*
This is a 
block comment
*/

let num = 100;  //integer
// ^ integer

function foo() {
    console.log(num);
    let num1 = 200;   // won't be able to call this outside function
};

// now call the function:
foo();

// sometimes unnamed functions are useful
let anonFun = function() {
    console.log("hello");
};

// immediately invoked functions ("iffies"?)
// can't call this ever again
(function() {
    console.log("Hello");
})();

// anonymous function immediately invoked using an arrow
(() => console.log(69))();

let bar = () => console.log(num)

bar();

// arrays can contain all different things
let arr = ["foo", 123, ["zar", "car"]];

// overwrite contents of an array
arr[1] = "barbar";

// indexing starts at 0 
console.log(arr[1]);  // btw seemingly these semicolons are optional

arr.push("par");
console.log(arr)

arr.splice(2, 1) // "start at the item in index 2 and remove 1 item"
console.log(arr)

let newArr = ["cow", "turtle", "goat"];

// loop babyyy
// using "of" gives you the value
for (let item of newArr) {
    console.log(item);
}

// using "in" gives you the iterator #
for (let i in newArr) {
    console.log(i + " " + newArr[i])
}

// can also use "each"
newArr.forEach((item, i) => console.log(i + " " + item))


// Now let's talk about OBJECTS

// similar to python dictionaries 
let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter"
}

// two ways to access contents of object
console.log(obj1.job)
console.log(obj1["job"])

// change something
obj1.job = "Barista"
console.log(obj1.job)

// loop through all properties
for (let key in obj1) {
    let value = obj1[key];
    console.log(`This pair is ${key}: ${value}`)  // "string template literal"
}

// some people still use old string template literal:
let str = "Hello " + "Bob" + " more text here "
console.log(str)

// Another for loop
for (let i = 0; i <10; i ++) {  // "as long as i is less than 10 iterate it"
    console.log(i)
}

let val = 89

if (val > 80){
    console.log("good")
} else if (val > 50) {
    console.log("okay")
} else {
    console.log("terrible")
}

// "ternary statement", just an else (idk.. should be "binary")
let y = (val >= 80) ? console.log("good") : console.log("bad")

// documemt is a keyword meaning the html doc this is loaded into
let newVar = document.getElementById("example"); // we named our div example

// appending..?
newVar.innerHTML += "<h1>hello world</><p><h4>new paragraph</p>"


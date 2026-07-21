// 1- converting String to Number
/*
let txt = "123";
let num = Number(txt);
console.log(num += 7);
*/

//==========================================================================

// 2- Check if a value is falsy and return 'Invalid'
/*
let falsy = 0 || undefined || "" || null || NaN;
if (!falsy) {
    console.log("Invalid");
}
*/

// ==========================================================================

// 3- Print all numbers => 1 to 10, skipping even numbers using continue
/*
for (let i = 1; i <= 10; i++) {
    if (i % 2 == 0) {
        continue;
    }
    console.log(i);
}
*/

// ===========================================================================

// 4- array of numbers and return only the even numbers using filter
/*
const numbers = [1, 2, 3, 4, 5];
const filteredNumbers = numbers.filter(num => num % 2 == 0);
console.log(filteredNumbers);
*/

// ===========================================================================

// 5- spread operator to merge two arrays, and return the merged array
/* const firstNumbers = [1, 2, 3];
 const secondNumbers = [4, 5, 6];
 const combinedNumbers = [...firstNumbers, ...secondNumbers];
 console.log(combinedNumbers);
*/

// another solution
/*
const firstNumbers = [1, 2, 3];
const secondNumbers = [4, 5, 6];
function combinedNumbers(arr1, arr2) {
    let mergedArray = [...arr1, ...arr2];
    return mergedArray;
}
console.log(combinedNumbers(firstNumbers, secondNumbers));
*/

// ===========================================================================

// 6- switch statement to return the day of the week given a number
/*
let days = 2;
switch (days) {
    case 1:
        console.log("Sunday");
        break;
    case 2:
        console.log("Monday");
        break;
    case 3:
        console.log("Tuesday");
        break;
    case 4:
        console.log("Wednesday");
        break;
    case 5:
        console.log("Thursday");
        break;
    case 6:
        console.log("Friday");
        break;
    case 7:
        console.log("Saturday");
        break;
    default:
        console.log("Invalid day");
}
*/

// ===========================================================================

// 7- array of strings and return their lengths using map
/*
const txt = ["a", "ab", "abc"];
const txtLength = txt.map(str => str.length);
console.log(txtLength);
*/

// ===========================================================================

// 8- a function that checks if a number is divisible by 3 and 5
/*
let num = 15;
division(num);
function division(num) {
    if (num % 3 == 0 && num % 5 == 0) {
        console.log("Divisible by both");
    } else {
        console.log("Not divisible by both");
    }
}
*/

// ===========================================================================

// 9- arrow function that takes a number and returns its square
/*
const square = (num) => {
    return num * num;
}
console.log(square(5));
*/

// ===========================================================================

// 10- a function that destruct an object, returns a formatted string
/*
const person = { name: "John", age: 25 }
function destructurePerson(person) {
    const { name, age } = person;
    return `${name} is ${age} years old`;
}
console.log(destructurePerson(person));
*/

// ===========================================================================

// 11- accepting multiple parameters using rest operator and returning their sum
/*
function multiParam(...n) {
    return n.reduce((sum, currentNum) => sum + currentNum, 0);
}
console.log(multiParam(1, 2, 3));
*/

// ===========================================================================

// 12- a function that returns a promise, resolves after 3 sec with a 'Success' msg
/*
function future() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Success");
        }, 3000);
    });
}
future().then(result => console.log(result));
*/

// ===========================================================================

// 13- a function to find the largest number in an array
/*
const numbers = [1, 3, 7, 2, 4];
for (let i = 0; i < numbers.length; i++) {
    let largest = Math.max(...numbers);
    console.log(largest);
    break;
}
*/
// another solution
/*
const num = [1, 3, 7, 2, 4];
let largest = num[0];
for (let i = 1; i < num.length; i++) {
    if (num[i] > largest) {
        largest = num[i];
    }
}
console.log(largest);
*/

// ===========================================================================
// 14- function that takes an object and returns an array containing only its keys
/*
function getObjKeys(obj) {
    return Object.keys(obj);
}
console.log(getObjKeys({ name: "John", age: 30 }));
*/

// ===========================================================================
// 15- function that splits a string into an array of words based on spaces
/*
const txt = "The quick brown fox";
function modifiedTxt(txt) {
    const newTxt = txt.split(" ");
    console.log(newTxt);
}
modifiedTxt(txt);
*/
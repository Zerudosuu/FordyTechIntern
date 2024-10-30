/* 
!! 1. Core JavaScript Concepts
Goal: Build familiarity with JavaScript fundamentals to ensure they have a strong foundation.
Topics to Cover:
Variables, data types, and operators
Functions, including arrow functions
Conditional statements (if, switch)
Loops (for, while, forEach, etc.)
ES6+ syntax:
let and const
Destructuring
Spread/rest operators (...)
Template literals
Promises and basic asynchronous operations (e.g., fetch)
*/

// Variables, data types, and operators
let thisIsLetVariable = 5; // let variable value depends on the assigned value. This example is let as number;
var b = "string"; // var variable value can be changed. This example is var as string;

thisIsLetVariable = "hotdog";
console.log(thisIsLetVariable); // let and var are mutable variables, it can be changed.

const THISISCONTANSTANTVARIABLE = 5; // const variable value cannot be changed. This example is const as number; and it is immutable.

//!! In important Note it is recommended to use of let and const instead of var because of the scope of the variable. it is a function scope and older way of declaring a variable.

// Data types
let number = 5; // number data type
let string = "string"; // string data type
let boolean = true; // boolean data type
let object = { key: "value" }; // object data type

// Operators
let addition = 5 + 5; // addition operator
let subtraction = 5 - 5; // subtraction operator
let multiplication = 5 * 5; // multiplication operator

// Division operator
let division = 5 / 5; // division operator

// Remainder operator
let remainder = 5 % 5; // remainder operator

// Increment and decrement operators
let increment = 5;
increment++; // increment operator
let decrement = 5;
decrement--; // decrement operator

// Functions, including arrow functions
function functionName() {
  console.log("functionName");
}

const arrowFunction = () => {
  console.log("arrowFunction");
}; // arrow functions are now the sugested use to delcare a function because of its capabilities. arrow functions can be used one time as a callback so that you wont declare a new function to execute something.

() => {}; // this is an example of an arrow function that is not assigned to a variable. its called anonymouse function since it doesnt have name this is mostly use for callbacks and async functions

// Conditional statements (if, switch)

if (true) {
  console.log("true");
} else {
  console.log("false");
}

let numberToCheck = 5;

switch (numberToCheck) {
  case 1:
    console.log("1");
    break;
  case 2:
    console.log("2");
    break;
  default:
    console.log("default");
}

// Loops (for, while, forEach, etc.)
for (let i = 0; i < 5; i++) {
  console.log(i);
}

let i = 0;
while (i < 5) {
  console.log(i);
  i++;
}

let array = [1, 2, 3, 4, 5];
array.forEach((element) => {
  console.log(element);
});

// ES6+ syntax: let and const
let letVariable = 5;

const constVariable = 5;

letVariable = "hotdog"; // Allowed as let variable is mutable

constVariable = "hotdog"; // Not allowed as const variable is immutable

const user = {
  name: "Alice",
  age: 25,
  location: "New York",
};

const { name, age, location } = user;

console.log(name);
console.log(age);
console.log(location);

//instead of looping to get the key  value pairs we destructure it so that it can be easily accessed.

const thisIsSampleFunction = ({ name, age, location }) => {
  console.log(name);
  console.log(age);
  console.log(location);
};

thisIsSampleFunction(user); // will print Alice, 25, New York

// however if there are lot of objects in array for example like this
const users = [
  {
    name: "Alice",
    age: 25,
    address: { city: "New York", zip: "10001" },
  },
  {
    name: "Bob",
    age: 30,
    address: { city: "Los Angeles", zip: "90001" },
  },
];

// to access it all you need to loop over it using loops or forEach or other loop method.
users.forEach(({ name, age, address }) => {
  console.log(name);
  console.log(age);
  console.log(address.city);
});
// this will loop through the array of objects and display them.

// Spread/rest operators (...)
const arr1 = [1, 2, 3];
const arr2 = [4, 5, 6];
const combinedArray = [...arr1, ...arr2]; // [1, 2, 3, 4, 5, 6]

let user1 = {
  name: "Alice",
  age: 25,
  address: { city: "New York", zip: "10001" },
};

user1 = {
  ...user1,
  age: 26,
};
console.log(user1); // { name: 'Alice', age: 26, address: { city: 'New York', zip: '10001' } }

// Template literals
const nameExample = "Alice";
const ageExample = 25;

const greeting = `Hello, my name is ${nameExample}. I am ${ageExample} years old.`;

console.log(greeting); // Hello, my name is Alice. I am 25 years old.

// Promises and basic asynchronous operations (e.g., fetch)
const fetchData = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("Data fetched successfully!");
    }, 2000);
  });
};

fetchData()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log(error);
  });
// Promise chaining and error handling. In this example, fetchData() is called and then it is resolved or rejected based on the response. If the response is successful, it prints the data. If the response is not successful, it prints the error.

// Async/await
const fetchDataAsync = async () => {
  try {
    const data = await fetchData("Add URL here"); // but to access the data you need to parse it to JSON file. if you are fetching from URL
    const response = await data.Json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

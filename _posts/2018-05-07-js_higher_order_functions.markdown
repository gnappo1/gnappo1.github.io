---
layout: post
title:      "JS: Higher Order Functions "
date:       2018-05-07 11:57:48 +0000
permalink:  js_higher_order_functions
---


This blog post is the first of a series of technical posts that will explore some of the core concepts of JavaScript. The subject will shift from very specific cases and patterns, to higher-level abstactions and concepts along the way. 
What I would like to talk about today are higher order functions, and in particular why should we use them and how they will make your code more concise, readable, reusable and easy to test.

Any function that takes a function as an argument or/and returns a function, is called higher order function. The definition relies on the concept of first-class functions in JavaScript: functions are treated as objects and therefore can be passed as arguments to other functions, assigned to variables or returned from other functions.

This is an extremely powerful tool that makes JavaScript perfectly equipped for **Functional Programming** ( **FP**), a programming paradigm that avoids mutability and side-effects and uses pure functions, function composition, currying, partial application and other patterns to achieve higher levels of abstraction, for more readable programs with less boilerplate.
It's a declarative programming paradigm which means that instead of describing *how* to perform a certain computation, its control flow, it abstracts away all the lower-level operations and describes *what* a computation should perform.
If you're not familiar with some of these concepts don't get discouraged, in the next blog posts I will analize each of them individually to show how to integrate them and write better code! 

**Passing Functions as Arguments**

If you're familiar with the concept of asynchronous requests and event handlers, then you heard of callbacks before . A callback is a function (often anonymous) that gets executed at the end of an operation, once all of the other operations have been completed so that the program keeps executing while waiting for a result. It's usually passed as last argument of the function and takes the return value of the event/operation in order to perform some data manipulation on it.
You can see by yourself how time-consuming operations no longer slow down the whole user experience, but are handled by the callbacks and only at the appropriate time returned.

```
function simpleExample(condition, callback) {
  if (condition) {
	  return callback();
	}
}

example(7 > 3,  function () {
  console.log("Yeah, of course 7 is greater than 3!")
});

//Yeah, of course 7 is greater than 3!
//But we could also pass a named function as callback

function callback() {
  console.log("Yeah, of course 7 is greater than 3!")
}

example(7 > 3,  callback());
//Yeah, of course 7 is greater than 3!


```


The special ability to replace an inline function with an already defined and named function, opens up to many opportunities. We can build specific single-tasked functions that can be combined between each other and shared across the application to avoid useless repetitions and keep your code D.R.Y. !

**Returning Functions**

As I mentioned before, functions can also be the return value of another function. This allows you to create functions that can be used as templates to create new functions!  Let's look at an example:

```
function add(a) {
  return b => a + b;
}

let sumToFive = add(5);
let sumToTwo = add(2);

console.log( sumToFive(3) ); // 8
console.log( sumToTwo(3) ); // 5

```
Or again:

```
function add(a, b) {
  return b => a + b;
}

let sumToTen = add(10);
console.log( sumToTen(12) ); // 22

```

How is all of this possible? Well, it turns out JavaScript has a pretty loose policy about the number of arguments passed on function invocation! If you pass less arguments than those your functions are meant to receive, JavaScript will assign ***undefined*** to all the missing arguments while in the case of more arguments than necessary, JS will simply ignore the arguments in eccess. Once we create a binding to hold the return value (a function) of our add() function, we can simply call the variable just defined passing it the missing arguments. 


JavaScript also provides us with built-in higher-order operations on arrays, abstracting common patterns like filtering, working with the existing elements to create a new array of transformed elements or, for example, return a unique value from the combination of all the elements in the array.

The **filter** method accepts a callback function. Each element of the array is individually analyzed, and if it returns true once tested against the filter, it will populate the newly created and returned array. In addition to the individual array elements, the callback also has access to the index of the current element and the full array. This function is ***pure***. It does not modify the array it is given!

```
//ES6

let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
const evens = array.filter(num => num % 2 == 0);
console.log(evens)  

// [0, 2, 4, 6, 8]
```

The **map** method transforms an array by applying a function to all of its elements and building a new array from the returned values. It accepts three values in the callback function, namely: the current item of the array, current index of the current item and the entire array.
Let's take a closer look:

```
//simple function that increases all values in the array by 1
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
const add1 = array.map(n => ++n);
console.log(add1)  
​
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
```

The **reduce** method starts with a collection and a variable with an initial value. You then iterate over the collection and append (or add) the values to the variable. The function Array.prototype.reduce(function(total, currentValue, currentIndex, arr), initialValue) returns a single value:

```
let array = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9 ];
const sum = array.reduce((prev, curr) => prev + curr);
console.log(sum);
​
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ];
```

When the array has more than 0 elements, you can omit the initialValue argument and will automatically start from the beginning of the array.

The previous three higher order functions allow us to get rid of the imperative loops that are less readable, less concise and more prone to errors. Let's work on a last example that makes use of a combination of them versus a lower-level loop:

```
const friends = [
 { name: "Anthony Edward Stark", age: 56, sex: "Male" },
 { name: "Robert Bruce Banner", age: 43, sex: "Male" },
 { name: "Steven Rogers", age: 38, sex: "Male" },
 { name: "Natasha Alianovna Romanoff", age: 34, sex: "Female" }
];

const superPowers = ["Robert Bruce Banner", "Steven Rogers"];
const addSuperPowers = (friend) => {
  friend.superPowers = superPowers.includes(friend.name);
  return friend;
}

const isBetween35And50 = (friend) => friend.age >= 35 && friend.age <= 50;
const totalAgeBetween35And50 = (sum, friend) => {
  return sum + friend.age;
};

const friendsWithSuperPowersBetween35And50 = friends.map(addSuperPowers).filter(isBetween35And50);

const totalAgeFriendsWithSuperPowersisBetween35And50 = friendsWithSuperPowersBetween35And50.reduce(totalAgeBetween35And50, 0);

console.log(friendsWithSuperPowersBetween35And50) 
// [ {name: "Robert Bruce Banner", age: 43, sex: "Male", superPowers: true},
{name: "Steven Rogers", age: 38, sex: "Male", superPowers: true} ]

console.log(totalAgeFriendsWithSuperPowersisBetween35And50) 
// 81
```

Now that you know how to use them, practise composing them to write better code!
In the next blog posts I'll analyze other common Functional Programming patterns, so make sure to stay tuned!

Thanks for reading! 🤓


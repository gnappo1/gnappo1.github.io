---
layout: post
title:      "JS: Partial Application & Currying"
date:       2018-05-14 07:02:12 -0400
permalink:  js_partial_application_and_currying
---


Last week we talked about higher-order functions and I mentioned some of the most used patterns in functional programming. Today, we'll focus on what partial application and currying are and how could we benefit by using them!

**Partial Application**


Let's take a look at the definition that Wikipedia provides:

> In computer science, partial application (or partial function application) refers to the process of fixing a number of arguments to a function, producing another function of smaller arity.  


The arity is simply the number of arguments that a function takes. What the definition says is that you apply to the function fewer arguments than it was given upon declaration, and it returns a function that takes the remaining arguments. 

```
//ES6 Syntax

const mappingCollection = (fn, collection) => collection.map(fn);
mappingCollection(x => x * x, [ 0, 12, 25 ]);     // [0, 144, 625]


const partiallyMapCollection = (fn) => collection => functionalMap(fn, collection);

const squareCollectionEl = partiallyMapCollection(x => x * x);
squareCollectionEl([ 0, 12, 25 ]);     // [0, 144, 625]
```

One important thing to keep in mind is that a partially applied function will always delegate to the original function upon invocation. The same result could be achieved using *bind()*:

```
const multiply = (a, b) => a * b;
const identity = multiply.bind(null, 1);

identity(7) // 7
```

The first argument always refers to the current context (*this*). In our case, we only wanted to partially apply the value 1 to the current context without changing it, that's why we passed *null*. As you'll notice from the following example, bind always fixes the arguments from left to right:

```
const fullName = (firstName, lastName) => firstName + ' ' + lastName;
const john = fullName.bind(null, 'John');

john('Cabot') // "John Cabot"
```

There are also several Javascript libraries providing useful production-ready functional helpers, like Underscore.js, Lodash, and Ramda. There are some differences between each other and I'll probably write a blog post about some of the pros and cons of each of these libraries later on. For now, let's just say that the same operations we did so far could be achieved using *** .partial(func, [partials])*** in Lodash/Underscore:

```
const fullName = (firstName, lastName) => firstName + ' ' + lastName;
const john = _.partial(fullName, 'John');

john('Cabot') // "John Cabot"
```

**Currying**


Currying is the technique of transforming the evaluation of a function that takes multiple arguments into evaluating multiple functions, each with an arity of 1, until all of the arguments have been applied. In this chain, each new function that gets returned is well aware of the arguments already passed thanks to *closures* and **will delegate to the original function only when all the arguments have been provided**. This means that if fewer arguments have been provided, the return value will be a new function that takes in the missing arguments.

```
const add = a => b => c => a + b + c;
const add10 = add(10);
const add10And20 = add10(20)

// If we try to call add10And20 without providing the last argument, the function containing the missing parameter would be returned!

console.log(add10And20)   // c => a + b + c

//Let's pass it the last argument
add10And20(30)    //60

//Or using .curry(func, [arity=func.length]) in Lodash

const add = (a, b, c) => a + b + c;
const curried = _.curry(add);

// They are all equivalent!

curried(10, 20, 30);    //  60 
curried(10, 20)(30);    //  60
curried(10)(20, 30);    //  60
curried(10)(20)(30);    //  60
```
However, if we tried to pass fewer parameters while partially applying, the result wouldn't be the same:

```
const add = (a, b, c) => a + b + c;

const add10 = _.partial(add, 10);

add10(20);
// Here we invoke the function with fewer args and since partial application defers to the original function
// it is equivalent to: add(10, 20, undefined) and an error will be printed out.

```

Currying and partial application are widely used, especially when it comes to function composition! Function composition will be the subject of my next blog post and I'll explain how what we discussed today helps us writing complex functions combining pure, curried, smaller functions.



![](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWfReNpGV_9CvpTESFC_D3o27vMimJFal46DrJ3yP9rmm1Wrw)


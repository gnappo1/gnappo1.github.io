---
layout: post
title:      "JS:  Pure Functions"
date:       2018-05-29 02:06:58 +0000
permalink:  js_pure_functions
---


In a previous post, I briefly mentioned pure functions when talking about Functional Programming without really digging into their meaning or their use.
The time has arrived, and as you'll see, there's nothing to be afraid of! 
Pure functions are functions that:

* Given the **same input**, will always return the **same output**.
* Has no **side effects**.

Let's take a second to think about what we're asking here. We want a function that returns the same output no matter how many times we invoke it passing that specific input. This means that our function is totally independent of any external mutable state or data, it only relies on its arguments. 

The second condition prevents us from having any effects on anything that's beyond our function's scope. Some of these effects might be modifying a variable's value, making HTTP requests, printing out some data or manipulating the DOM. Pure functions always return something, so a good rule of thumb for detecting impure functions is a function that manipulates data without returning anything. 

Getting the current date/time or using **Math.random()**, are also examples of impure functions.
Math.random() for example, produces different outputs each time is invoked and obviously doesn't respect our conditions:

```
Math.random()  //  0.29591616561008416
Math.random()  //  0.45041863644706925
Math.random()  //  0.14212078864165845
```

Let's take a look at an example of pure functions using the Math built-in object:

```
Math.sqrt(3) //  1.7320508075688772
Math.sqrt(3) //  1.7320508075688772
Math.sqrt(3) //  1.7320508075688772

// Now, we could maybe build a function to find the hypotenuse of a rectangle triangle using Pythagoras' theorem

const Hypotenuse = (a, b) => Math.sqrt(a * a + b * b);     // Which is the equivalent of Math.hypot()

Hypotenuse(3, 4) // 5
Hypotenuse(3, 4) // 5
Hypotenuse(3, 4) // 5

```

Clearly, not all functions can be pure. Some functions need to be responsible for some data manipulations or state changes. So the question is when should we use them and why? Well, let's start from the why. Solely relying on their arguments and being independent of the outside world, pure functions are easily testable. As long as we know the arguments passed, we are able to predict the return value which makes them useful for Function Composition (FC). Furthermore, whatever state-related bugs we might end up having in the future within our application, it will not affect our function! About when to use them, the answer is when you don't need your function to produce a side effect and you want to write reusable, clean code.

Let's write a few examples:

```
const doubleIt = x => x * 2;

const priceAfterSales = (percentage, price) => price - price * percentage / 100;

const convertCurrency = (amount, changeRate) => {
  return amount * changeRate;
};

```

There are a few additional benefits of using pure functions that are worth exploring!

**Referential Transparency**

Wikipedia provides the following definition:

> An expression is said to be referentially transparent if it can be replaced with its corresponding value without changing the program's behavior. As a result, evaluating a referentially transparent function gives the same value for same arguments.

 
*Pure functions or pure expressions are consequently referentially transparent*. 
This doesn't imply though that all impure functions are referentially opaque ( simply not transparent ). A counter-example might be a numeric input taken from the user ( therefore, it will be an impure function) and multiplied by 0. We could easily replace the expression with 0 since that would be the only possible return value.

**Idempotency**

There is more than one definition, one is related to function composition and does not apply to this example. The one which does apply, says that a function or operation is *idempotent* if the result of executing it multiple times with a given input is the same as calling it once with that input. 
It simply means that I can call that function as many times as I want, safely, and it will always return the same value!
*Pure functions are idempotent*!

**Deterministic Process**

It's a process that given a particular input, will produce always the same output.
As you can see, the two definitions are similar, which means that pure functions are also *deterministic*.

**Memoization**

Once again, let's take a look at Wikipedia's definition:

> In computing, memoization or memoisation is an optimization technique used primarily to speed up computer programs by storing the results of expensive function calls and returning the cached result when the same inputs occur again.

Memoization reduces our function's cost in terms of time, by returning a cached result. On the other hand, it increases our space cost, since we have to store the results somewhere.

How does memoization apply to pure functions? Well, suppose we have a very big pure function that has an expensive computation process. Knowing that pure functions always return the same value provided the same input, we could store the result of the first function call, and use it as a reference for future function calls.


**Conclusion**

We saw how many benefits we could get from using pure functions, but also that not all functions have to be pure.
Try to digest the new concepts and practice writing your own pure functions. If you're interested in seeing pure functions applied to Function Composition, check out my blog post [JS: Function Composition](https://matteopiccini.com/js_function_composition)!

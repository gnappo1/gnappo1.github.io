---
layout: post
title:      "JS: Closures"
date:       2018-06-04 04:24:38 +0000
permalink:  js_closures
---

*A closure is the combination of a function, bundled with its lexical environment*. What's that supposed to mean? How do I create a closure? Well, you probably created closures many times without realizing it! Every time you nest a function inside another function and expose it (you return it or assign it to other functions), you create a closure. The inner function has access to any variables and parameters defined in 3 different scopes (**Scope Chain**):

* **Local** scope, It's own scope.
* **Parent** scope, outer function's scope.
* **Global** scope.

Our inner function takes a snapshot of the outer function's variables and stores them by reference. This way when they get updated, our closure can see the updates. The real magic of closures is that they can access the outer function's variables even after the outer function is returned. 
Some of the main applications of closures are event handlers and callbacks, object data privacy, function composition, partial application, and currying.

Alright, enough talks. Let's write some code!


```
//In this example, our closure gets returned when the outer function is returned

const outerFunction = () => {
  let secret = "I'm private.";
  
  const innerFunction = () => {
    return secret += " Through closures though, I can still be accessed and modified.";
  }
  
  return innerFunction();
}

console.log(secret)    //  undefined 
outerFunction()  // I'm private. Through closures though, I can still be accessed and modified. 

```


We could also return our closure after the outer function gets returned:



```
const outerFunction = () => {
  let secret = "I'm private.";
  
  const innerFunction = () => {
    return secret += " Through closures though, I can still be accessed and modified.";
  }
  
  return innerFunction;
}

const closure = outerFunction();
closure()     // I'm private. Through closures though, I can still be accessed and modified.
```


We said that closures' beneficial effects extend to currying and partial applying. If you're not familiar with these concepts or want to find out more about them, check out my blog post [JS: Partial Application & Currying](http://matteopiccini.com/js_partial_application_and_currying). 

Let's take a look at a pretty standard example:


```
const sum = a => {
  return b => {
      return a + b
    }
}

// Or the inline version: const sum = a => b => a + b;

const add1 = sum(1);
const add5 = sum(5);

add1(25)  // 26
add5(1) // 6
```

Here add1 and add5 are closures. They both have access to the variable 'a', but their lexical environments have different values stored for it! This is important since each of the two functions creates its own references to the outer function's variable, which grants them independent access to it. 

Closure can also be used to expose public functions that have access to private functions and variables. This is known as Module pattern and is used to mock the concept of classes so that we're able to include both public and private methods and variables inside a single object. 


```
const receipt = (items) => {

  const tot = (items) => items.reduce((acc, curr) => acc += curr.price, 0);   //private function
    
    const addTaxes = (amount) => amount + (amount * 0.23);   //private function
    
    return {
      totalBill: () => addTaxes(tot(items))   // public function
    }
}

const dinner = receipt([ {name: "Pizza", price: 9}, {name: "Pasta alla Carbonara", price: 12}, {name: "Beer", price: 4}]);

dinner.totalBill()  // 30.75

dinner.tot  //undefined, can't access private function

dinner.addTaxes  //undefined, can't access private function
```


We could also rewrite the example using an IIFE, immediately-invoked function expression:


```
const receipt = ( (items) => {

  const tot = (items) => items.reduce((acc, curr) => acc += curr.price, 0);   //private function
    
    const addTaxes = (amount) => amount + (amount * 0.23);   //private function
    
    return {
      totalBill: () => addTaxes(tot(items))   // public function
    }
}) ([ {name: "Pizza", price: 9}, {name: "Pasta alla Carbonara", price: 12}, {name: "Beer", price: 4}])

receipt.totalBill()  // 30.75

```


I hope this blog post helped you understand what closures are and how to use them. As always, my advice is to go practice writing your own and maybe dive deeper into some of the topics discussed.

See y'all next week!



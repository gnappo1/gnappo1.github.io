---
layout: post
title:  "Variables and Methods in Ruby"
date:   2017-05-02 07:12:24 +0000
---


These are two fundamental concepts in Ruby that every programmer needs to have very clear in his mind:

**Variables** store a value and assign a name to it for reference purposes, this is why it's always good practice to use names related to the value stored. 

**Methods** in Ruby are very similar to what, in other languages, are called 'functions'. They wrap up 
together a certain set of expressions into a single unit, accessible in different parts of your program.


Ruby is an **Object Oriented Language**, which means you for sure heard somewhere that ***everything*** (or almost everything) ***in* *Ruby is an object***! Objects are instances of a certain class, which works as an abstraction: think about all the wonderful types of cars you see around. Those are all instances of a certain bigger category, the class Car: they all share common data (given by the variables) and behaviours (defined by the methods) inherited from the class but then might have some cool unique features that sets them apart from the others. 

Of course before accessing any variables or methods you need to define them, otherwise you'll see a nice **NameError** printed out on your screen saying "Uninitialized method or local variable" most of times... Wait, why did I say most of times? Let's first introduce the different types of variables that Ruby has:

* **Local variables**: have a ***local scope***, which means they can't be accessed elsewhere but where they have been defined and always start with a lower case letter or an underscore.
* **Instance variables**: have an ***instance scope*** , which is related to the specific instance of a class the object *self* refers to. This means that two instances of the same class can have different values for a specific instance variable! In Ruby they are always private and to define them, their name must be preceded by "**@**" (e.g. @age = 15).
* **Class variables**: have a class 'scope', which means all instances of the class share the same value for that variable and changing it would alter its value for all the object instances. To define them, their name must be preceded by '**@@**'.
* **Global variables**: have a 'global' scope, which means they are accessible from anywhere in the program. Using them is strongly discouraged because they can also be changed anywhere in your code and that makes the bugs-hunt very difficult when you have thousands of line of code. Use '**$**' before the variable name to define a global variable.
* **Constants**: are values that, as the word says, should not be changed once assigned. However, Ruby allows the programmer to change their value after printing a warning message. Constants can have class or global scope, depending if they have been defined inside a class (or module) or not. Can be accessed from outiside the class or module using the ***scope operator*** '::' this way:   **classname**::**constantname** or just  ::**constantname** for those defined out of a class. They can't be defined inside methods and start with an uppercase character (or entirely uppercase e.g. AGE = 2). 
* **Sudo-variables**: special category of variables that seem local variables but behave like constants, whose value cannot be assigned (e.g. **self**, **true**, **false**, **nil**).

To answer the question about the **NameError**: globals and instance variables have the default **nil** return value until they are initialized and this is why they don't raise the **NameError**.
Recognizing what scope a variable has is pretty obvious simply looking at the way it starts but you can also use the method #*class* on the variable name.



Talking about methods there are a few things to keep in mind:

* They are defined by encapsulating all the code inside the keywords **def** and **end**.
* If their name is made out of more than one word, then you use the underscore to connect these words.
* A parameter is the variable passed in when the method is defined, while the arguments are the data you pass into the method's parameters when you call the method on an object.
* They can accept 0,1 or more parameters depending on your needs. You can also set default parameters (e.g. **def   call_me_maybe(number='0123456789')** to have a default value in case the method is evoked without passing in the argument.
* A method is called on an object using a '**.**' (e.g. age**.** increase_by_one).
* In the example above, 'age' is called *'**receiver**'* and it's explicit. When the method seems to be called without a receiver it means the receiver is implicit. The implicit receiver is always **self**.
* Methods always have a return value of the last statement executed unless an **explicit return** comes before it.
* You can use the keyword **return** before the line of code to return a specific value *explicitly* ( of course it wouldn't make much sense using it in the last line of code considering what just said on the point above).
* Watch out using return inside a block, it always breaks the block in the exact moment the required condition is satisfied for the first time without executing the rest of your code.
* Ruby has many built-in methods, for more info check https://ruby-doc.org/core-2.2.0/Array.html.
* You can pass blocks to methods encapsulating them inside the keywords **do** and **end** or using the **{}** notation.
* Methods can be chained.
* There are instance methods and class methods. The former ones can only be called on instances of the class while the latters on the class itself. It's always good practise to ask yourself who's responsible for the behaviour the method is defining before deciding between the two. Class methods are identified by the use of self before the method name: *def **self**.method_name*. 

Methods are a major part of programming in Ruby, knowing how a certain method behaves is crucial to become a Ruby programmer since you'll be using them constantly. This is meant to be a short guideline through some of the concepts related to variables and methods, so take your time to google around to find out more about them.


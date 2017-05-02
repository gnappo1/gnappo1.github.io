---
layout: post
title:  "Ruby Operators "
date:   2017-05-02 11:14:43 +0000
---


I remember how the first time a couple of these concepts gave me a hard time, so I thought it might be useful to write them down in case this might help someone else still struggling with them!


Ruby Assignment Operators:
```

### 1.  " = "   assigns the argument on the right of the equal sign, to the one on the left.

### 2.  " += " adds the arguments from opposite sides of the equal sign and then assigns the result to the argument on the left (e.g. a += b ---> a = a + b ).

### 3. " -= " subtracts arguments from opposite side (order: left - right) of the equal sign and then assigns the result to the argument on the left (e.g. a -= b ---> a = a - b ).

### 4. " *= " multiplies the arguments from opposite sides of the equal sign and then assigns the result to the argument on the left (e.g. a * = b ---> a = a * b ).

### 5. " /= " divides the arguments from opposite sides (order: left - right) of the equal sign and then assigns the result to the argument on the left (e.g. a /= b ---> a = a / b ).

### 6. " %= " evaluates the modulus of the division between left (first) and right (second) argument and then assigns the result to the argument on the left ( e.g. a %= b ---->  a = a % b).

### 7. " **= " evaluates exponential calculation on arguments (left element --> base, right element --> exponent) and assigns the value to the argument on the left ( e.g. a **= b ---> a = a**b also commonly indicated as a = a^b).

```

Ruby Comparison Operators:
```

### 1. " == " Compares two arguments and returns true if they are the same (e.g. 3 == 7 FALSE    25 == 25.0 TRUE)

### 2. " != "  Compares two arguments and returns true if they are NOT equal (e.g. 3 != 7 TRUE    a != a FALSE)

### 3. " > "  Checks if the left argument is greater than the right one, if yes then the condition becomes true (e.g. 4 > 3 TRUE, 4 > 4 FALSE)

### 4. " >= " Checks if the left argument is greater than or equal to the right one, if yes then the condition becomes true (e.g. 4 >= 4 TRUE)

### 5. " < "   Checks if the left argument is smaller than the right one, if yes then the condition becomes true (e.g. 4 < 5 TRUE, 4 < 4 FALSE)

### 6. " <= " Checks if the left argument is smaller than or equal to the right one, if yes then the condition becomes true (e.g. 4 <= 4 TRUE)

### 7. " <=> " Returns 0 if the first argument equals the second, 1 if the first argument is greater than the second, -1 if the first argument is less than the second and 'nil' if they're not comparable. It's called spaceship operator.

### 8. " === " Known as Case Equality Operator, I personally call this the "belongs to" operator. Will return true if it makes sense to consider the argument to the right as belonging (subset) to the one on the left (e.g. (0..4) === 3 TRUE)

### 9. " eql? " Returns True if receiver and  argument have both same type and equal values (e.g. 25 (integer) == 25.0 (float) FALSE)

### 10. " equal? " Returns True if receiver and argument have the same object id (are the same object).
```


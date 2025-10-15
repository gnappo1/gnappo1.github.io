# JS: Higher-Order Functions — 2025 Edition
Updated on 2025-10-13

Higher-order functions (HOFs) are functions that **take functions as arguments** and/or **return functions**. They’re a natural consequence of JavaScript’s **first-class functions**—we can pass them around, store them, and return them like any other value.

**Why they matter (2025):**
- Expressive, **declarative** data flows
- Less mutation, fewer edge cases
- Easy to test in isolation
- Composable “pipelines” you can reason about

---

## 1) Passing functions in

Callbacks are everywhere—events, timers, promises, and array helpers.

```js
function when(condition, thenDo) {
  if (condition) return thenDo()
}

when(7 > 3, () => console.log('Yep, 7 > 3'))
```

Named callbacks read even better and are easier to test:

```js
function cheer(){ console.log('Yep, 7 > 3') }
when(7 > 3, cheer)
```

---

## 2) Returning functions (closures + factories)

Returning a function lets you **capture state** and generate specialized functions.

```js
function add(a) {
  return (b) => a + b   // `a` is remembered by the returned function
}

const add5 = add(5)
const add2 = add(2)

console.log(add5(3)) // 8
console.log(add2(3)) // 5
```

You’ll hear this called **currying** or **partial application** (related ideas): build tailored utilities by fixing some arguments now, the rest later.

### Live demo (runs in-page)

<play-js title="Closure factory">
const add = (a) => (b) => a + b
const add10 = add(10)
console.log(add10(12)) // 22
</play-js>

---

## 3) Array HOFs you’ll use daily

### `filter` — keep items matching a predicate (pure; doesn’t alter the array)
```js
const xs = [0,1,2,3,4,5,6,7,8,9]
const evens = xs.filter(n => n % 2 === 0)
console.log(evens) // [0,2,4,6,8]
```

### `map` — transform each item (also pure)
```js
const xs = [0,1,2,3]
const plus1 = xs.map(n => n + 1)
console.log(plus1) // [1,2,3,4]
```
> Tip: prefer `n + 1` over `++n` in examples—clearer intent.

### `reduce` — fold to a single value
```js
const xs = [0,1,2,3,4,5,6,7,8,9]
const total = xs.reduce((sum, n) => sum + n, 0)
console.log(total) // 45
```

---

## 4) Composition example (immutable style)

Keep originals unchanged to avoid surprising side effects.

```js
const friends = [
  { name: 'Anthony Edward Stark', age: 56, sex: 'Male' },
  { name: 'Robert Bruce Banner', age: 43, sex: 'Male' },
  { name: 'Steven Rogers', age: 38, sex: 'Male' },
  { name: 'Natasha Alianovna Romanoff', age: 34, sex: 'Female' }
]

const powered = new Set(['Robert Bruce Banner', 'Steven Rogers'])

const addSuperPowers = (f) => ({ ...f, superPowers: powered.has(f.name) })
const is35to50       = (f) => f.age >= 35 && f.age <= 50
const sumAge         = (sum, f) => sum + f.age

const withPowersInRange = friends.map(addSuperPowers).filter(is35to50)
const totalAge           = withPowersInRange.reduce(sumAge, 0)

console.log(withPowersInRange)
console.log(totalAge) // 81
```

### Live demo

<play-js height="280" title="Map + Filter + Reduce (immutable)">
const friends = [
  { name: 'Anthony Edward Stark', age: 56, sex: 'Male' },
  { name: 'Robert Bruce Banner', age: 43, sex: 'Male' },
  { name: 'Steven Rogers', age: 38, sex: 'Male' },
  { name: 'Natasha Alianovna Romanoff', age: 34, sex: 'Female' }
]
const powered = new Set(['Robert Bruce Banner', 'Steven Rogers'])
const addSuperPowers = (f) => ({ ...f, superPowers: powered.has(f.name) })
const is35to50 = (f) => f.age >= 35 && f.age <= 50
const sumAge = (sum, f) => sum + f.age
const withPowersInRange = friends.map(addSuperPowers).filter(is35to50)
const totalAge = withPowersInRange.reduce(sumAge, 0)
console.log(withPowersInRange)
console.log(totalAge)
</play-js>

---

## 5) Common patterns built with HOFs

**once(fn)** — call a function at most once.
```js
function once(fn){
  let called = false, result
  return (...args) => {
    if (!called){ called = true; result = fn(...args) }
    return result
  }
}
```

**compose** — right-to-left function composition.
```js
const compose = (...fns) => (x) => fns.reduceRight((v, f) => f(v), x)

// usage:
const trim = s => s.trim()
const upper = s => s.toUpperCase()
const shout = compose(s => s + '!', upper, trim)
console.log(shout('  hello  ')) // HELLO!
```

**map via reduce** — shows how HOFs interrelate.
```js
const mapR = (xs, fn) => xs.reduce((acc, x, i) => (acc.push(fn(x, i, xs)), acc), [])
console.log(mapR([1,2,3], n => n*2)) // [2,4,6]
```

---

## 6) When not to use HOFs

- **Hot inner loops** where allocation matters (measure first).
- When local, intentional mutation is clearer and contained.
- If a simple `for` is genuinely more readable for your team.

---

## Practice

1. Implement `debounce(fn, ms)` returning a debounced function.
2. Write `pipe(...fns)` (left-to-right composition).
3. Re-implement `filter` using `reduce`.

### Starter: debounce

<play-js height="280" title="debounce(fn, ms)">
function debounce(fn, ms){
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn(...args), ms)
  }
}

// Try: resize-like spam
let count = 0
const onEvent = debounce(() => console.log('fired', ++count), 300)
for (let i = 0; i < 5; i++) onEvent()
</play-js>

---

**Takeaway:** Higher-order functions encourage small, composable units that model *what* you want rather than *how* to loop. They’re a cornerstone of clear, modern JavaScript.

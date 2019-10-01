## Name the main time complexities

2. O(1) - Constant time
3. O(n) - Linear time
4. O(n^2) - Quadratic time
5. O(n^c) - Polynomial time
6. O(log n) - Logarithmic time
7. O(n log n) - Linearithmic
8. O(2^n) - Exponential time
9. O(n!) - Factorial time

## Summarize what time complexity means

How runtime scales as the input grows. The O function is the growth rate function of the input size n.

## Give a couple examples of Constant time stuffs

1. Find if a number is odd or even

    ```javascript
    function isEvenOrOdd(n) {
        return n % 2 ? 'Odd' : 'Even';
        }
    ```
2. Primitive operations like sum, multiply, division, bit shift have constant runtime

3. Lookup tables

    ```javascript
    const dictionary = {the: 22038615, be: 12545825, and: 10741073, of: 10343885, a: 10144200, in: 6996437, to: 6332195 /* ... */};

    function getWordFrequency(dictionary, word) {
        return dictionary[word];
    }
    ```

## What's the lookup complexity of a hash table?

On average it is O(1)... at worst it could be O(n) because hashing algorithms can have collisions, meaning multiple values have the same address thus they have to be stored as a linked list

## Give an example of a linear time problem

Find max number in an unsorted array...

    ```javascript
    function findMax(n) {
    let max;
    let counter = 0;

    for (let i = 0; i < n.length; i++) {
        counter++;
        if(max === undefined || max < n[i]) {
        max = n[i];
        }
    }

    console.log(`n: ${n.length}, counter: ${counter}`);
    return max;
    }
    ```

## Give an example of a Quadratic Time algorithm... what is quadratic time?

Check if an array has duplicates....

    ```javascript
    function hasDuplicates(n) {
    const duplicates = [];
    let counter = 0;

    for (let outter = 0; outter < n.length; outter++) {
        for (let inner = 0; inner < n.length; inner++) {
        counter++;

        if(outter === inner) continue;

        if(n[outter] === n[inner]) {
            return true;
        }
        }
    }

    console.log(`n: ${n.length}, counter: ${counter}`);
    return false;
    }
    ```

Bubble Sort:

    ```javascript
    function sort(n) {
    for (let outer = 0; outer < n.length; outer++) {
        let outerElement = n[outer];

        for (let inner = outer + 1; inner < n.length; inner++) {
        let innerElement = n[inner];

        if(outerElement > innerElement) {
            // swap
            n[outer] = innerElement;
            n[inner] = outerElement;
            // update references
            outerElement = n[outer];
            innerElement = n[inner];
        }
        }
    }
    return n;
    }
    ```

## Give example of polynomial time algorithm?

Triple nested loop....
Find the solutions for a multiple variable equation like 3x + 8z + 9y = 79

    ```javascript
    function findXYZ(n) {
    const solutions = [];

    for(let x = 0; x < n; x++) {
        for(let y = 0; y < n; y++) {
        for(let z = 0; z < n; z++) {
            if( 3*x + 9*y + 8*z === 79 ) {
            solutions.push({x, y, z});
            }
        }
        }
    }

    return solutions;
    }

    console.log(findXYZ(10)); // => [{x: 0, y: 7, z: 2}, ...]
    ```

## Give an example of a logarithmic time algorithm

Log time is O(log n)

The standard example is binary searches / Divide and Conquer algorithms

Binary search example:

    ```javascript
    function indexOf(array, element, offset = 0) {
    // split array in half
    const half = parseInt(array.length / 2);
    const current = array[half];

    if(current === element) {
        return offset + half;
    } else if(element > current) {
        const right = array.slice(half);
        return indexOf(right, element, offset + half);
    } else {
        const left = array.slice(0, half)
        return indexOf(left, element, offset);
    }
    }

    const directory = ["Adrian", "Bella", "Charlotte", "Daniel", "Emma", "Hanna", "Isabella", "Jayden", "Kaylee", "Luke", "Mia", "Nora", "Olivia", "Paisley", "Riley", "Thomas", "Wyatt", "Xander", "Zoe"];
    console.log(indexOf(directory, 'Hanna'));   // => 5
    console.log(indexOf(directory, 'Adrian'));  // => 0
    console.log(indexOf(directory, 'Zoe'));     // => 18
    ```

This is a recursive formula

## What is the master method for recursive algorithms?

Finding the runtime for recursive alforithms is not as easy as counting the operations. This method helps u do that...

When analyzing recursive algorithms, we care about these three things:

- The runtime of the work done outside the recursion (line 3-4): O(1)
- How many recursive calls the problem is divided (line 11 or 14): 1 recursive call. Notice only one or the other will happen, never both.
- How much n is reduced on each recursive call (line 10 or 13): 1/2. Every recursive call cuts n in half.

Master method formula is...

    ```
    T(n) = a T(n/b) + f(n)
    ```
where:

- n: the size of the recursion problem. duh? :)
- a: the number of sub-problems. For our case, we only split the problem into another subproblem.
- b: the factor by which n is reduced. For our example, we divide n in half each time.
- f(n): the running time outside the recursion. E.g., O(1)

## Apply the Master Method to recursive binary search

The binary search algorithm slit n on half until a solution is found or array is exhausted. So, using the Master Method:

T(n) = a T(n/b) + f(n)

1) Find a, b and f(n) and replace it in the formula:

a: the number of sub-problems. For our example, we only split the problem into another subproblem. So a=1.
b: the factor by which n is reduced. For our case, we divide n in half each time. Thus, b=2.
f(n): the running time outside the recursion: O(1).
Thus,

T(n) = T(n/2) + O(1)

2) Compare the runtime executed inside and outside the recursion:

Runtime of the work done outside the recursion: f(n). E.g. O(1).
Runtime of work done inside the recursion given by this formula nlogba. E.g. O(nlog21) = O(n0) = O(1).
3) Finally, getting the runtime. Based on the comparison of the expressions from the previous steps, find the case it matches.

As we saw in the previous step the work outside and inside the recursion has the same runtime, so we are in case 2.

O(nlogba log(n))

Making the substitution we get:

O(nlog21 log(n))

O(n0 log(n))

O(log(n)) 👈 this is running time of a binary search

## Give an example of a Linearithmic algorithm

Linearithmic means O(n log n)

Mergesort... in three steps:

1. We are going to divide the array recursively until the elements are two or less.
2. We know how to sort two items, so we sort them iteratively (base case).
3. The final step is merging: we merge in taking one by one from each array such that they are in ascending order.

    ```javascript
    function sort(n) {
    const length = n.length;
    // base case
    if(length === 1) {
        return n;
    }
    if(length === 2) {
        return n[0] > n[1] ? [n[1], n[0]] : [n[0], n[1]];
    }
    // slit and merge
    const mid = length/2;
    return merge(sort(n.slice(0, mid)), sort(n.slice(mid)));
    }

    function merge(a = [], b = []) {
    const merged = [];
    // merge elements on a and b in asc order. Run-time O(a + b)
    for (let ai = 0, bi = 0; ai < a.length || bi < b.length;) {
        if(ai >= a.length || a[ai] > b[bi]) {
        merged.push(b[bi++]);
        } else {
        merged.push(a[ai++]);
        }
    }

    return merged;
    }
    ```

## Do the Master Method on MErge sort

We are going to apply the Master Method that we explained above to find the runtime:

1) Let’s find the values of: T(n) = a T(n/b) + f(n)

a: The number of sub-problems is 2 (line 12). So, a = 2.
b: Each of the sub-problems divides n in half. So, b = 2
f(n): The work done outside the recursion is the function merge, which has a runtime of O(n) since it visits all the elements on the given arrays.
Substituting the values:

T(n) = 2 T(n/2) + O(n)

2) Let’s find the work done in the recursion: nlogba.

nlog22

n1 = n

3) Finally, we can see that recursion runtime from step 2) is O(n) and also the non-recursion runtime is O(n). So, we have the case 2 : O(nlogba log(n))

O(nlog22 log(n))

O(n1 log(n))

O(n log(n)) 👈 this is running time of the merge sort

## Give an example of Exponential time 

Exponential time is O(2^n)

Subsets of a set (find all distinct sets of a set)

    ```javascript
    getSubsets('') // =>  ['']
    getSubsets('a') // => ['', 'a']
    getSubsets('ab') // => ['', 'a', 'b', 'ab']
    ```

Notice the pattern:
- The first returns an empty element.
- The second case returns the empty element + the 1st element.
- The 3rd case returns precisely the results of 2nd case + the same array with the 2nd element b appended to it.

    ```javascript
    function getSubsets(n = '') {
    const array = Array.from(n);
    const base = [''];

    const results = array.reduce((previous, element) => {
        const previousPlusElement = previous.map(el => {
        return `${el}${element}`;
        });
        return previous.concat(previousPlusElement);
    }, base);

    console.log(`getSubsets(${n}) // ${results.slice(0, 15).join(', ')}... `);
    console.log(`n: ${array.length}, counter: ${results.length};`);
    return results;
    }
    ```

## Give an example of Factorial time...

Factorial time is O(n!)

Write a functio nthat computes all different words that can be formed fiven a string

If a string is length 1, return it... else use recursion to divide the problem into smaller problems until you get to length 1...

    ```javascript
    function getPermutations(string, prefix = '') {
    if(string.length <= 1) {
        return [prefix + string];
    }

    return Array.from(string).reduce((result, char, index) => {
        const reminder = string.slice(0, index) + string.slice(index+1);
        result = result.concat(getPermutations(reminder, prefix + char));
        return result;
    }, []);
    }
    ```
## _Questions derived from techsith on youtube_

## Name lifecycle methods and their purpose

_First mention that lifecylce methods are changing. Some methods have been deprecated since version 16. Also, React hooks handle lifecyle methods completely differently_

_There are two phases within the lifecyicle methods:_
- Initial render, and
- Rerender

### Initial Render
1. Constructor
The first lifecyle to run, only runs once to set initial state. This is the only place you can set that original state (using this.state)
2. getDerivedStateFromProps
This is a replacement for ComponentWillReceiveProps, which is being deprecated. 
This is a **static method** that runs right after the constructor initializes state.
It has a role in the intial render and re-render stage.
This is a static method because you don't want the user to access the this keyword... static methods are class methods not instance methods, so you can't use this.someMethodName... you can't directly set state using this.setState.
You can use it to change state by **returning** a new state, or for no change you return null.
This  method is rarely used.
3. Render 
This is where you return your JSX, the body of your component. It's required.
4. componentDidMount
This runs after the component has mounted/the DOM is ready

### Re-render

1. static getDerivedStateFromProps
2. shouldComponentUpdate
Here you decide if a component really needs to be re-rendered on a state change. Whenever somebody runs setState the component re-renders... but you could be setting the same state again, so do you really need to re-render?
This will give you access to your previous state and new state and compare them, then **return true** if you want a re-render or **false** if not.
3. Render
4. getSnapshotBeforeUpdate
This can be called the pre-commit phase. Mount happens after this method... if you need to do something just before render you can do it here.
**This replaced componentWillUpdate**
This is useful because React recently introduced lazy loading.. meaning there may be something that occurs after render (like from scrolling or window resize) you need to remember where stuff was before.
5. componentDidUpdate
You do similar things here as componentDidMount
6. componentWillUnmount
This is when the component unmounts, you can do something here if you want to just before this happens.

## Why do we use arrow functions in React?

In React you can use onclick handlers, which is not actually a class method but a class property. The difference is...
The function created by an arrow function doesn't have its own keyword... if you use a normal function then it can't access this.setState, for example, unless you bind it to the class scope.
With an arrow function, the function takes "this" from its **lexical scope.**
Arrow methods are relatively newer javascript thingy (ES6 vs ES5)

## How do you prevent components from re-rendering?

1. shouldComponentUpdate()
This method is part of the re-render cycle... compare prev state to new state and return true or false to decide whether to re-render given that state
2. React.PureComponent
With a pure component shouldComponentUpdate would be redundant... this type of component shallow compares prev state with new state and if there's no difference it will not re-render
3. React.memo
This can be used to create a purely presentationaly component using a technique called memoization

## Explain Error Boundaries?

In React if you want to catch errors in your components there are multiple ways to do it. This is one of those ways.
In javascript you can do a try-catch block... this is similar.
Looks like:

<ErrorBoundaryComp>
    <MyComp />
</ErrorBoundaryComp>

These components have two special lifecyle hooks:
1. static getDerivedStateFromError
    Here you can have a fallback componenet-- because of the error your component won't render, and this could be rendered instead (probably some kind of error message)
2. componentDidCatch
    In this method you can log the error

## Best lifecylce method for making API calls?

API calls typically update the state and re-render the component. You will want to be sure your DOM is already ready to go. So, the best method is **componentDidMount**

## React Patterns

1. Context-API pattern
    Passing props into a deeply nested component is messy. The context API allows you to access need props using a Provider-Consumer wrapper so you don't have to do this prop drilling
2. Render props
    Just uses children as functions... instead of passing a component as component you pass it as function
3. Presentation component
    Stateless function components... as opposed to stateful components with functionality typically called **Container Components**

## Why would you use React in your project?

Why not Angular, Vue, Ember? The decision is case-by-case...
Where are you in the product lifecycle? Which framework is changing a lot or about to change in the middle of your product cycle?
Angular and Ember are easy to configure but hard to use... 
Angular has everything built-in, whereas with React you have to piece everything together custom.
Also React is functional programming, you use a lot of javascript. If your engineers are sharp with javascript this is the framework for you.

## What is css-in-js pattern?
CSS is global... so changing one part can easily change another unintentionally...
Since react is all JS you can pass JS object as css, which does inline css which does not pollute other parts...
Another advantage of inline css is you can conditianally render styles based on props and also common styles are easily shared because they're JS objects which can be imported in any file.

## Why can't you update state directly without setState()?

setState will always trigger re-rendering, which is good because you want to re-render on state changes typically.
setState creates a copy of the state and then adds to it/changes it, rather than directly changing the state.

## How many ways can you conditionally render in React?
1. An **if statement**
    if (isLiar) {
        return <PantsOnFire/>
    }
    return <YouAreNice/>
2. An **&& expression**
    {isLiar  &&
        <PantsOnFire/>
    }

    Will render <PantsOnFire/> if isLiar is true
3. A **ternary expression**
    {isLiar ? (
        <PantsOnFire/>
    ) : (
        <YouAreNice/>
    )}

## What are Fragments and why do we use them?
Whenever you render a component you only render a single child. Can't do this...

render() {
    return(
        <ChildA />
        <ChildB />
        <ChildC />
    )
}

You can use:

render() {
    return(
    <React.Fragment>
        <ChildA />
        <ChildB />
        <ChildC />
    <React.Fragment>
    )
}

## How to do code-splitting in React?

When the React code compiles, the bundler bundles your entire application into one file which is typically large.
That can be problematic if you have a big project. This could make your initial load slow. 
React introduced code-splitting to let you split the bundle into multiple bundles... 
React introduced **Dynamic Import** or **Lazy Loading** or **code-splitting**...

const LazyComponent = React.lazy(() => import(`./lazyComponent'))

Now your main app is loaded and this is loading **asynchronously**

You can provide a fallback component this way:

<Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
</Suspense>

## What are some alternatives to Redux?

1. mobX - popular alternative to Redux
2. apollo client + graphQL - Apollo is typically used by people using graphQL
3. RxJS

## What is redux middleware?

The concept of middleware is to add a layer to do some action on your data or something before continuing on.
In redux you:
    - **Dispatch Actions** from your UI
    - Which go through a **reducer** to apply some change to them
    - which is stored as global state in the redux **store**

You may be updating the store simultaneously as you're **making the same change on your database with a post request to your server**
If something goes wrong with your Post (an asyconchronous activity unlike updating the store) and the two get out of synch, that's bad.
So you could have middleware to intercept the action and make it wait for a successful response from the server. Only when you know that POST worked, do you dispatch the action to the reducer to update your store.

## What is the difference btween redux-saga and redux-thunk?

They're both redux middleware.
They do the same thing but differently.

Redux thunk creates an **action creator** which interceptions the action from the UI and stipulates what functions to call on it (middleware) before sending it on to the reducer, then the store.

Often this **action creator** will do something asynchronous like a call to your server, **using a Promise.** When the Promise resolves, the action will continue on to  the reducer then store.

**SAGA works a little differently**... but does basically the same thing, but it receives in an action and sends a different action.

SAGA uses a special **generator function** like this:

    function* gen(){
        yield doFirst()
        yield doSecond()
    }
Things are synchronous in the generator function, **not asynchronous**... the first runs then the second.
In SAGA you can cancel actions.


## _React Interview skills portion from techsith_

## How do you optimize a React app?

_Remember to ask questions_

How big is the application? What does it do? What is the performance problem we're solving? 
Is it slow? 
Crashing? 
Bundle size is big? What's going on here?

**If the problem is speed** use a Profiler API on the app to find bottlenecks.
One of the biggest problems is **unneccsary re-renders**

If your package size is huge, you can use lazy loadings for certain routes

Your APIS may be slow, which could require a server-side improvement

Maybe your team is using wrong methods to update state 
(**think of immutability!!**)

Your assets may be loading slowly (CDN issues)... in this case you may need someting different on the server side.

You could convert unnecessary class components to functional components

Arrow functions are better then bound handlers

External packages can analyze application speed to tell you what's going on

## Explain the Virtual DOM

How to update the DOM efficiently is an age-old question. React solved this problem with the **virtual DOM**.
Updating the DOM is expensive because you have to **re-paint** everything on the DOM.

There are two solutions-- make the DOM updates faster, and update less often. **React solves both problems**

React has its own DOM tree created during the initial render, called the Virtual DOM... 

## List the three lifcycle methods now being deprecated as **unsafe**

1. componentWillMount
2. componentWillReceiveProps
3. componentWillUpdate

These are being deprecated as part of the ongoing reimplementation of React's core algorithm. This reimplementation project is called **React Fiber**

## Projects

Common approaches:
1. Fix this for me:
###Things to look for
- There may be some handlers not bound to the class
- State may not be updating properly..
- There could be typos
_Do's and Don'ts_:
- Carefully read the code first
- Ask questions
- Don't hurt
2. Add functionality
- Given a tic-tac-toe game already working but you can't yet check the winner...
- Games are commonly asked questions
- Ask questions... design on paper. Don't start coding until you know the solution
3. Build it from scratch
- Most common is build the todo list, show the list, add items, remove items
- Always componentize
- Don't make it fancy with CSS
- If you have time write test cases in jest












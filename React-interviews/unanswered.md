## Name lifecycle methods and their purpose

Constructor -- runs once to set initial state
getDerivedStateFromProps (previously componentWillReceiveProps) --
    this is a static method that runs right after constructor initilaizes. It has a role in the intiila render and re-renders...
    It's a static method because you don't want the user to access this keyword... static methods are class methods not instance methods so you can't use this keyword... but you can still change state by returning a new state or null
getSnapshotBefore...
called pre-commit phase, mount occurs after. This replaced ccomponentWillUpdate...
this is useful because React recently introduced lazy loading, meaning sthere may be something that occurs after render (like scrolling) and you want to remember what position you were in....
render() -- the body of your component where you return your JSX
ComponentDidMount -- Runs after the component has mounted, the DOM is ready

ComponentWillUpdate -- has been deprecated in favor of getSnapshotBeforeUpdate to be used with componentDidUpdate

shouldComponentUpdate() -- main role is to tell the app whether it should re-renderif the state is updated but hasn't changed... gives access to prev state and new state to compare, then return true for re-render or false for not

ComponentWillUnmount

## Why do we use arrow functions in React?

Arrow functions don't have their own this keyword, they derive it from their lexical scope, meaning you don't need to bind functions in the constructor 
In React you can use onclick handlers, which is not actually a class method but a class property..

## How do you prevent components from re-rendering?

componentShouldUpdate() compares prev state to new state and returns true or false 
React.PureComponent -- makes shouldComponentUpdate redundant... this type of component shallow compares prev state with new state and if there's no difference will not render
React.memo -- can be used for purely presentaational component using a technique called memoization

## Explain Error Boundaries?

In React you can catch errors in your components multiple ways, one is similar to a javascript try-catch block and goes like this:

```javascript
<ErrorBoundaryComp>
    <MyComp />
</ErrorBoundaryComp>
```

These components have two special lifecyle hooks:
-statice getDerivedStateFromError
    Here you can have a fallback componenet... if an error prevents your component from rendering this is rendered instead (porbably rendering some kind of error message)
-componentDidCatch
 in this method you can log the error

## Best lifecylce method for making API calls?

componentDidMount... API calls typically update state and cause a re-render, so you want to be sure the DOM is already ready for that.

## React Patterns

1. Context-API pattern -- Passing props into deeply nested components... avoids prop-drilling problems by creating a state store, then using a Provider-Consumer wrapper (higher order functions) to share global state
2. Render props
    Just uses children as functions instead of passing a component you pass a function
3. Presentation component
    stateless function components... as opposed to stateful container components

## Why would you use React in your project?

Case-by-case...
Where are you in the product lifecycle? how often is the library changing?
Angular and Ember are easy to configure but hard to use... Angular has everything built-in
React is functional programming, all javascript... if you're good with javascript it's good for you... lighter weight

## What is css-in-js pattern?

CSS is global, which can cause problems if you have collissions... Since React is all in JSS you can pass a JS object as CSS, which does inline css which does not effect global css...
Another advantage of inline css is you can conditionally render styles based on props... also common styles are easily shared as they are objects that can be imported anywwhere

## Why can't you update state directly without setState()?

It's discouraged to mutate state. setState will always trigger a re-render on state changes... setState creates a copy of the state and then replaces it.

## How many ways can you conditionally render in React?

1. if statement
    ```javascript
    if (isOpen) {
        return(
            <Modal />
        )
    return null
    }
    ```

2. && expression

    ```javascript
    {isOpen &&
        <Modal />
    }
    ```

3. ternary operator

    ```javascript
    {isOpen ? (
        return (
            <Modal />
        )
    )} : (
        return null
    )}
    ```

## What are Fragments and why do we use them?

Components always render a single child... So you can wrap in React.Fragment or <></>

<></> is syntactic sugar... if you need a key in your fragment you have to use Fragment.

## How to do code-splitting in React?

When the React code compiles, the bundler bundles your entire application into one file which can be real big... that can make for a slow inital load...
React introduced code splitting to let you split the bundle into multiple bundles...
This is called Dynamic Import or Lazy Loading or Code-Splitting...

```javascript
const LazyComponent = React.lazy(() => import(`./lazyComponent`))
```

This is loaded asynchronously while your main app loads...

You can provide a fallback component this way...

```javascript
<Suspense fallback={<div>Loading...</div>}>
    <LazyComponent />
</Suspense>

```
## What are some alternatives to Redux?

1. mobX 
2. apollo client + graphQL
3. RxJS

## What is redux middleware?

Redux middleware will essentially intercept actions and do something with them before they are dispatched to the store... Often you will be sending an action to the store to update state while at the same time sending the same update asynchronously to your server so your database reflects the same changes... it's helpful to have middleware that makes double sure both operations occurred so you don't become out of synce... The middleware can pause the progress of the action until it receives a positive response from the server (ie the POST worked )
Only then do you dispatch the action to the reducer to update the store

## What is the difference btween redux-saga and redux-thunk?

They're both redux middleware

Redux thunk creates an action creator which interpts the action from theUI and stipulates functions to call before sending that action to the reducer then the store
Often this action creatore will do something asycnhromise like call your server using a Promise... when the promise relsoves, action will continue to the reducer then the store

SAGA uses a generator function which takes the incoming action then sounds out a different action... it does that in a serial fashion(synchronous)... in saga you can cancel actions

## How do you optimize a React app?

First ask how big is it? What does it do? What are the problems we're having? Is it slow? crashing? bundle size is too big?

If the problem is speed use a Profiler API to find our bottlnecks... a big problem can be unneccsary re-redners

if you package size is huge you could try lazy loadings for some routes

Your APIs may be slow, which would entail something on the server side needing to be imporved

Maybe your team used the wrong methods to update state (violated immutability?)

Your assets may be loading too slow (CDN issues), which could be a server side issue

YOu could convert unnecessary class components to functional components (lighter weight)

Arrow functions are better than bound handlers...



## Explain the Virtual DOM

How to update the DOM is an age old question because re-paints are expensive, you have to completely re-paint the entire DOM... React resolved this with the Virtula DOM which keeps its own representation of the DOM tree on the initial renderr and then makes updates to it after state changing by comparing what is different "diffing" and changing only that part.

## List the three lifcycle methods now being deprecated as **unsafe**

componentWillMount --getSnapshotBeforeUpdate
componentWillReceiveProps -- deriveStateFromProps
componentWillUpdate -- shoudlCOmponentUpdate

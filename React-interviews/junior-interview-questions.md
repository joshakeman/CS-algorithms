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





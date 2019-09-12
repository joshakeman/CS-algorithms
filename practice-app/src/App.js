import React, { Component } from 'react';
import './App.css';

import Todo from './components/Todo'
import Form from './components/Form'

class App extends Component  {

  constructor(props) {
    super(props)

    this.state = {
      todos: []
    }
  }

  componentDidMount() {
    
    const todos = [
      {
        name: 'todo 1',
        description: 'description 1',
        id: 1
      },
      {
        name: 'todo 2',
        description: 'description 2',
        id: 2
      },
      {
        name: 'todo 3',
        description: 'description 3',
        id: 3
      },
    ]

    this.setState({
      todos: todos 
    })
  }

  addTodo = (todo) => {
    this.setState({
      todos: [...this.state.todos, todo]
    })
  }

  deleteTodo = (id) => {
    let copy = this.state.todos.filter(todo => todo.id !== id)

    this.setState({
      todos: copy
    })
  }

  moveUp = (id) => {
      let copy = this.state.todos
      let selected = copy.find(obj => obj.id === id)
      let selectedIndex = copy.indexOf(selected)


      // console.log(copy[selectedIndex], copy[selectedIndex - 1])
      if (selectedIndex > 0) {
        let temp = copy[selectedIndex -1]
        copy[selectedIndex - 1] = copy[selectedIndex]
        copy[selectedIndex] =  temp
        console.log(copy)
  
        this.setState({
          todos: copy,
          calledSet: true
        })
      }
  }

  moveDown = (id) => {
    console.log('move down fired')
    let copy = this.state.todos
    let selected = copy.find(obj => obj.id === id)
    let selectedIndex = copy.indexOf(selected)


    // console.log(copy[selectedIndex], copy[selectedIndex - 1])
    console.log(copy.length)
    if (selectedIndex < copy.length - 1) {
      let temp = copy[selectedIndex + 1]
      copy[selectedIndex + 1] = copy[selectedIndex]
      copy[selectedIndex] =  temp
      console.log(copy)

      this.setState({
        todos: copy,
        calledSet: true
      })
    }
}

  render() {

    const { todos } = this.state;

    return (
      <div className="App">
        {todos ? (
          todos.map(todo => {
            return (
              <Todo info={todo} deleteTodo={this.deleteTodo} moveUp={this.moveUp} moveDown={this.moveDown} key={todo.id} />
            )
            })
        ) : (
          null
        )}
        <Form addTodo={this.addTodo}/>
      </div>
    );
  }
}

export default App;

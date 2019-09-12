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

  render() {

    const { todos } = this.state;

    // const toDoList = todos.map(todo => {
    //   return (
    //     <Todo info={todo} key={todo.id} />
    //   )
    //   })

    return (
      <div className="App">
        {todos ? (
          todos.map(todo => {
            return (
              <Todo info={todo} deleteTodo={this.deleteTodo} key={todo.id} />
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

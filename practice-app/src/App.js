import React, { Component } from 'react';
import './App.css';

import Todos from './components/Todos'

class App extends Component  {

  state = {
    todos: [
      {id: 1, content: 'Buy milk'},
      {id: 2, content: 'Play Mario Kart'}
    ]
  }

  deleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => todo.id !== id)
    this.setState({
      todos
    })
  }



  render() {

    return (
      <div className="App">
        <h1>Todo List</h1>
        <Todos todos={this.state.todos} deleteTodo={this.deleteTodo} />
      </div>
    );
  }
}

export default App;

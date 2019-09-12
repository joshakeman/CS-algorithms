import React, { Component } from 'react'

export class Form extends Component {

    constructor(props) {
        super(props)
        this.state = {
            name: '',
            description: ''
        }
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleSubmit = (e) => {
        e.preventDefault()
        let newTodo = this.state
        newTodo.id = Math.random()
        this.props.addTodo(this.state)

        this.setState({
            name: '',
            description: ''
        })
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input
                    type="text"
                    name="name"
                    value={this.state.name}
                    placeholder="Todo name"
                    onChange={this.handleChange}
                    />
                    <input
                    type="text"
                    name="description"
                    value={this.state.description}
                    placeholder="Todo description"
                    onChange={this.handleChange}
                    />
                    <button>Add Todo</button>
                </form>
                
            </div>
        )
    }
}

export default Form

import React from 'react'

export default function Todos({todos, deleteTodo}) {

    const todoList = todos.length ? (
        todos.map(todo => {
            return (
                <div key={todo.id}>
                    <span onClick={() => deleteTodo(todo.id)}>
                        {todo.content}
                    </span>
                </div>
            )
        })
    ) : (
        <p>You have no todo's left</p>
    )
    // comment
    // comment two
    
    return (
        <div>
            {todoList}
        </div>
    )
}

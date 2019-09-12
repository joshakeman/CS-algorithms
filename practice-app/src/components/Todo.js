import React from 'react'

export default function Todo( {info : { name, description, id }, deleteTodo} ) {
    // const { name, description } = props.info;
    return (
        <div>
            <h3>{name}</h3>
            <p>{description}</p>

            <button onClick={() => deleteTodo(id)}>Delete</button>
        </div>
    )
}

import React from 'react'

export default function Todo( {info : { name, description, id }, deleteTodo, moveUp, moveDown} ) {
    // const { name, description } = props.info;
    return (
        <div>
            <h3>{name}</h3>
            <p>{description}</p>

            <button onClick={() => deleteTodo(id)}>Delete</button>
            <p onClick={()=> moveUp(id)}>UP</p>
            <p onClick={()=> moveDown(id)}>DOWN</p>
        </div>
    )
}

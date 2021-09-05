import React from 'react';

class Todo extends React.Component{
    render(){
        return(
            <div className="todo">
                <li className={`todo-item ${this.props.completed ? "completed" : ""}`}>{this.props.text}</li>
                <button className="complete-btn" onClick={() => this.props.completeHandler(this.props.id)}><i className="fas fa-check"></i></button>
                <button className="trash-btn" onClick={() => this.props.deleteTodoHandler(this.props.id)}><i className="fas fa-trash"></i></button>
            </div>
        )
    }
}

export default Todo;
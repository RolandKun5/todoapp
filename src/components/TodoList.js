import React from 'react';
import Todo from './Todo';

class TodoList extends React.Component{
    render(){
        return(
            <div className="todo-container">
                <ul className="todo-list">
                    {Object.keys(this.props.filteredTodos).map(key => <Todo key={key} id={key} text={this.props.filteredTodos[key].text} completed={this.props.filteredTodos[key].completed} deleteTodoHandler={this.props.deleteTodoHandler} completeHandler={this.props.completeHandler} /> )}                    
                </ul>
            </div>
        )
    }
}

export default TodoList;
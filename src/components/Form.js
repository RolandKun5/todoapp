import React from 'react';

class Form extends React.Component{    
    render(){
        return(
            <form onSubmit={this.props.submitTodoHandler}>                
                <div className="input">
                    <input onChange={this.props.inputTextHandler} value={this.props.inputText} type="text" className="todo-input"/>      
                    <button type="submit" className='todo-button'>
                        <i className="fas fa-plus-square"></i>
                    </button> 
                </div>
                <div className="select">
                    <select onChange={this.props.statusHandler} name="todos" className="filter-todo" value={this.props.status}>
                        <option value="all">All</option>
                        <option value="completed">Completed</option>
                        <option value="uncompleted">Uncompleted</option>
                    </select>
                </div>
            </form> 
        )
    }
}

export default Form;
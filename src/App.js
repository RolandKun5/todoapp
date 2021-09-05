import React from 'react';
import './App.css';
import Form from './components/Form';
import TodoList from './components/TodoList';

class App extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputText: '',
            todos: {},
            status: 'all',
            filteredTodos: {}
        };
    }

    _updateStates = (todos,filteredTodos,status) => {
        this.setState({
            todos,
            filteredTodos,
            status
        })
    }
    _filterTodos = (todos,status) => {
        const todosAsArray = Object.entries(todos);
        let filteredTodos = {};
        if(status === 'completed'){
            const completedFilter = todosAsArray.filter(([key,todo]) => todo.completed === true);
            filteredTodos = Object.fromEntries(completedFilter);
        }else if(status === 'uncompleted'){
            const uncompletedFilter = todosAsArray.filter(([key,todo]) => todo.completed === false);
            filteredTodos = Object.fromEntries(uncompletedFilter);
        }else{
            filteredTodos = todos;
        }
        this._updateStates(todos,filteredTodos,status);

    }
    _createNewTodo = () => {
        const todos = {...this.state.todos};
        const status = this.state.status;
        todos[`todo${Date.now()}`] = {text: this.state.inputText, completed: false};
        this._filterTodos(todos,status);
    }
    _clearInputText = () =>{
        this.setState({
            inputText: ''
        });
    }
    _saveLocalTodos = () => {
        localStorage.setItem('todos',JSON.stringify(this.state.todos));
    }
    _getLocalTodos = () => {
        if(localStorage.getItem('todos') === null){
            localStorage.setItem('todos',JSON.stringify([]));
        }else{
            const todoLocal = JSON.parse(localStorage.getItem('todos'));
            const status = 'all';
            this._filterTodos(todoLocal,status);
        }
    }

    inputTextHandler = (e) => {
        const inputText = e.target.value;
        this.setState({
            inputText: inputText
        });
    }
    submitTodoHandler = (e) => {
        e.preventDefault();
        this._createNewTodo();
        this._clearInputText();
    }
    deleteTodoHandler = (id) => {
        const todos = {...this.state.todos};
        const status = this.state.status;
        delete todos[id];
        this._filterTodos(todos,status);
    }
    completeHandler = (id) => {
        const todos = {...this.state.todos};
        const status = this.state.status;
        todos[id].completed = !todos[id].completed;
        this._filterTodos(todos,status);
    }
    statusHandler = (e) => {   
        const todos = {...this.state.todos};
        const status = e.target.value;
        this._filterTodos(todos,status);
    }
    componentDidMount = () => {
        this._getLocalTodos();
    }
    componentDidUpdate = () =>{
        this._saveLocalTodos();
    }

    render(){
        return (
            <div className="App">
                <header>
                    <h1>Todo List</h1>
                </header>
                <main>
                    <Form inputText={this.state.inputText} inputTextHandler={this.inputTextHandler} submitTodoHandler={this.submitTodoHandler} status={this.state.status} statusHandler={this.statusHandler} />
                    <TodoList filteredTodos={this.state.filteredTodos} deleteTodoHandler={this.deleteTodoHandler} completeHandler={this.completeHandler} />
                </main>
            </div>
        );
    }
}

export default App;

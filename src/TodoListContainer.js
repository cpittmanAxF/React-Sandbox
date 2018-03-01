import React from 'react'
import TodoList from './TodoList'
import Tabs from './Tabs'

let nextId = 0;

const todo = (body) => ({
    id: nextId++,
    body,
    completed: false
})


class TodoListContainer extends React.Component {
    state = {
        todos: [],
        filters: ['all', 'pending', 'completed'],
        activeFilter: 'all',
    }

    handleComplete = id => {
        const todos = [...this.state.todos];
        const todo = todos.find(todo => todo.id === id);
        const index = todos.indexOf(todo);
        todos[index] = { ...todo, completed: !todo.completed }

        this.setState(state => ({
            todos
        }))

    }

    handleDelete = id => {
        const todos = [...this.state.todos];
        const todo = todos.find(todo => todo.id === id);
        const index = todos.indexOf(todo);

        todos.splice(index, 1);

        this.setState(state => ({
            todos
        }))
    }

    handleSubmit = value => {
        // console.log(value);
        if (value) {
            const todos = [...this.state.todos];

            const found = todos.find(todo => todo.body === value);

            if (!found) {

                this.setState(state => ({
                    todos: [...state.todos, todo(value)]
                }))
            }
        }
    }

    handleFilterChange = filter => {
        this.setState({ activeFilter: filter, })
    }

    render() {
        const { todos, filters, activeFilter } = this.state

        let filteredTodos = todos

        if (activeFilter === 'pending') {
            filteredTodos = todos.filter(todo => !todo.completed);
        }
        else if (activeFilter === 'completed') {
            filteredTodos = todos.filter(todos => todos.completed);
        }

        return (
            <div>
                <Tabs filters={filters}
                    activeFilter={activeFilter}
                    handleChange={this.handleFilterChange} />
                <TodoList todos={filteredTodos}
                    handleSubmit={this.handleSubmit}
                    handleComplete={this.handleComplete}
                    handleDelete={this.handleDelete} />

            </div>
        )
    }

}

export default TodoListContainer
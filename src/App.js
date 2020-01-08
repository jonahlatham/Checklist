import React, { Component } from 'react'
import './App.css'
import axios from 'axios'

export default class App extends Component {
    state = {
        task: '',
        newTasks: []
    }

    componentDidMount() {
        axios.get('/api/tasks')
            .then((response) => {
                this.setState({
                    newTasks: response.data
                })
                console.log(response.data)
            })
    }

    handleChange = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    handleResponse = (response) => {
        this.setState({
            task: '',
            newTasks: response.data
        })
    }

    handleAdd = () => {
        const body = {
            task: this.state.task
        }
        if (this.state.task.match(/[0-9a-zA-Z]/)) {
            axios.post('/api/tasks', body)
                .then(this.handleResponse)
        } else {
            alert('Please fill in the text box before submitting.')
        }
    }

    handleComplete = (id) => {
        const body = {
            id
        }
        axios.put('/api/tasks', body)
            .then(this.handleResponse)
    }


    handleDelete = (id) => {
        axios.delete(`/api/tasks?id=${id}`)
            .then(this.handleResponse)
    }

    render() {
        const allTasks = this.state.newTasks.map((e) => {
            return (<div className='newTask' style={e.isComplete !== true ? { 'box-shadow': 'inset 0 0 10px #8c2222' } : { 'box-shadow': 'inset 0 0 10px #1d8520' }}>
                <div className='taskWords'>{e.id} -- {e.task}</div>
                <div className='taskButtons'>
                    <button className='button' onClick={() => { this.handleComplete(e.id) }}>Complete</button>
                    <button className='button' onClick={() => { this.handleDelete(e.id) }}>Delete</button>
                </div>
            </div>)
        })
        return (
            <div className='App'>
                <h1>Check List</h1>
                <div className='addNewDiv'>
                    <input className='taskInput' onChange={this.handleChange} type='text' placeholder='Task' name='task' value={this.state.task} />
                    <button className='button' onClick={this.handleAdd}>Add</button>
                </div>
                <div>
                    {allTasks}
                </div>
            </div>
        )
    }
}

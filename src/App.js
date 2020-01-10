import React, { Component } from 'react'
import { connect } from 'react-redux';
import './App.css'
import axios from 'axios'

class App extends Component {

    componentDidMount() {
        axios.get('/api/tasks')
            .then((response) => {
                this.props.dispatch({
                    type: 'TASKS',
                    payload: response.data,
                })
                console.log(response.data)
            })
    }

    handleChange = (event) => {
        this.props.dispatch({
            type: 'TASK',
            payload: event.target.value,
        })
    }

    handleResponse = (response) => {
        this.props.dispatch({
            type: 'TASKS',
            payload: response.data,
        })
    }

    handleAdd = () => {
        const body = {
            task: this.props.task
        }
        if (this.props.task.match(/[0-9a-zA-Z]/)) {
            axios.post('/api/tasks', body)
                .then(this.handleResponse)
                .then(this.props.dispatch({ type: 'SUBMIT' }))
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
        const allTasks = this.props.allTasks.map((e) => {
            return (<div className='newTask' style={e.isComplete !== true ? { 'box-shadow': 'inset 0 0 10px #8c2222' } : { 'box-shadow': 'inset 0 0 10px #1d8520' }}>
                <div className='taskWords'>{e.id} -- {e.task}</div>
                <div className='taskButtons'>
                    <button id='completeButton' className='button' onClick={() => { this.handleComplete(e.id) }}>Complete</button>
                    <button id='deleteButton' className='button' onClick={() => { this.handleDelete(e.id) }}>Delete</button>
                </div>
            </div>)
        })
        return (
            <div className='App'>
                <h1>Check List</h1>
                <div className='addNewDiv'>
                    <input className='taskInput' onChange={this.handleChange} type='text' placeholder='Task' name='task' value={this.props.task} />
                    <button id='addButton' className='button' onClick={this.handleAdd}>Add</button>
                </div>
                <div>
                    {allTasks}
                </div>
            </div>
        )
    }
}
export default connect((storeObject) => { return storeObject })(App)

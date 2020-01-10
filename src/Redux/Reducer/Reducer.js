import { combineReducers } from 'redux'

const task = (state = '', action) => {
    switch (action.type) {
        case 'TASK':
            return action.payload
        case 'SUBMIT':
            return ''
        default:
            return state
    }
}

const allTasks = (state = [], action) => {
    switch (action.type) {
        case 'TASKS':
            return action.payload
        case 'SUBMIT':
            return []
        default:
            return state
    }
}
export default combineReducers({ task, allTasks })
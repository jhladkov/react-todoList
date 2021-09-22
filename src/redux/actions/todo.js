import {
    ACTIVE,
    ACTIVE_MENU,
    CHANGE_TASK,
    CREATE_ERROR,
    CREATE_TASK,
    LOADED,
    RELOADED,
    REMOVE_TASK,
    START,
    TOKEN
} from "../types";
import axios from "axios"



export const createTask = (value, typeTask) => {
    return {
        type: CREATE_TASK,
        payload: value,
        typeTask

    }
}

export const removeTask = (toDoItems, doneItems) => {
    return {
        type: REMOVE_TASK,
        toDoItems,
        doneItems
    }
}

export const changeTask = (toDoItems, doneItems) => {
    return {
        type: CHANGE_TASK,
        toDoItems,
        doneItems
    }
}

export const createError = boolean => {
    return {
        type: CREATE_ERROR,
        payload: boolean
    }
}

export const fetchData = data => {
    return axios.patch(`https://todo-list-react-13c09-default-rtdb.europe-west1.firebasedatabase.app/${localStorage.getItem('idToken') && localStorage.getItem('idToken').split('').splice(1,8).join('')}.json`, {
        data
    })
        .then(data => data)
        .catch(err => console.error(err))
}

export const startLoading = (value) => {
    return {
        type: START,
        payload: value,
    }
}

export const loaded = (value) => {
    return {
        type: LOADED,
        payload: value,
    }
}

export const saveToken = token => {
    return{
        type:TOKEN,
        payload: token
    }
}

export const reloadedData = () => {
    return{
        type:RELOADED
    }
}

export const activeMenuStatus = boolean => {
    return{
        type:ACTIVE_MENU,
        payload: boolean
    }
}


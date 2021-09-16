import {CHANGE_TASK, CREATE_ERROR, CREATE_TASK, LOADED, RELOADED, REMOVE_TASK, START, TOKEN} from "../types";

const initialState = {
    items: [],
    error: false,
    isLoaded: false,
    authorizationToken: null
}

const todo = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_TASK:
            const infoTaskToDo = {
                value: action.payload,
                typeTask: action.typeTask,
            }


            const updateItems = state.items

            updateItems.push(infoTaskToDo)

            return {
                ...state,
                items: updateItems
            }
        case REMOVE_TASK:
            return {
                ...state,
                items: action.toDoItems.concat(action.doneItems)
            }
        case CHANGE_TASK:
            return {
                ...state,
                items: action.toDoItems.concat(action.doneItems)
            }
        case CREATE_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case START:
            if(!action.payload) {
                return state
            }
            return {
                ...state,
                items: action.payload,
            }
        case LOADED:
            return {
                ...state,
                isLoaded: action.payload
            }
        case TOKEN:
            return {
                ...state,
                authorizationToken: action.payload
            }
        case RELOADED:
            return {
                ...state,
                authorizationToken: null,
                items: [],
                isLoaded: false,
                error: false
            }
        default:
            return state
    }
}

export default todo
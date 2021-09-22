import './Home.scss'
import Button from "../../UI/Button/Button";
import {useDispatch, useSelector} from "react-redux";
import {
    changeTask,
    createError,
    createTask,
    fetchData, loaded,
    removeTask,
    startLoading,
} from "../../redux/actions/todo";
import {useEffect, useState} from "react";
import ToDo from "../../components/toDo/toDo";
import Error from "../../components/Error/Error";
import axios from "axios";
import Loader from "../../components/Loader/Loader";


const Home = () => {

    const dispatch = useDispatch()

    const url = `https://todo-list-react-13c09-default-rtdb.europe-west1.firebasedatabase.app/${localStorage.getItem('idToken')?.split('').splice(1, 8).join('')}/data.json`

    let totalValue = useSelector(state => state.todo)

    const getData = () => {
        axios.get(url)
            .then(data => {
                if (data) {
                    dispatch(startLoading(data.data))
                    dispatch(loaded(true))
                }
            })
            .catch(err => console.error(err))
    }

    useEffect(() => {
        getData()
    })


    const toDoItems = totalValue.items && totalValue.items.filter(items => items.typeTask !== 'done')
    const doneItems = totalValue.items && totalValue.items.filter(items => items.typeTask !== 'todo')


    const [inputValue, setValue] = useState('')


    const formPreEventDefault = (event) => {
        event.preventDefault()
    }

    const activationError = () => {
        dispatch(createError(true))
    }

    const handlerAddData = async () => {
        if (inputValue.trim()) {
            try {
                setValue('')
                dispatch(createTask(inputValue, 'todo'))
                await fetchData(totalValue.items)

            } catch (error) {
                activationError(error)
            }

        } else {
            dispatch(createError(true))
        }
    }

    const setInputValue = (event) => {
        setValue(event.target.value)
    }

    const removeTaskItem = async (listItems, id) => {
        try {
            listItems.splice(id, 1)
            const dispatchResult = dispatch(removeTask(toDoItems, doneItems));
            const value = dispatchResult.toDoItems.concat(dispatchResult.doneItems)
            await fetchData(value)
        } catch (error) {
            activationError(error)
        }

    }

    const changeTypeTask = async (listItems, id) => {
        try {
            const item = listItems[id]


            if (item.typeTask === 'todo') {
                toDoItems[id].typeTask = 'done'
                dispatch(changeTask(toDoItems, doneItems))
                await fetchData(totalValue.items)
            } else {
                doneItems[id].typeTask = 'todo'
                dispatch(changeTask(toDoItems, doneItems))
                await fetchData(totalValue.items)
            }
        } catch (error) {
            activationError(error)
        }
    }

    const removeErr = () => {
        dispatch(createError(false))
    }

    return (
        <section className='section manage-task'>

            {!totalValue.isLoaded ? <Loader/> : null}
            {
                totalValue.error ? <Error
                        onClick={removeErr}
                        title='Ошибка'
                        text='Вы ничего не ввели!'
                    />
                    : null
            }

            <div className="container">
                <div className="manage-task-add-task add-task">
                    <form className='add-task-form' onSubmit={event => formPreEventDefault(event)}>
                        <input value={inputValue} onChange={event => setInputValue(event)}
                               className='add-task-input input'
                               type="text"/>
                        <Button
                            onClick={handlerAddData}
                            className='add-task-button button'
                            text='Добавить задачу'
                            type='submit'/>
                    </form>
                </div>

                <div className="manage-task-wrapper">
                    <div className="manage-task-block">
                        <h2 className='manage-task-title title'>ToDo</h2>

                        <div>

                            {toDoItems && toDoItems.length > 0
                                ? toDoItems.map((item, index) => {

                                    return <ToDo
                                        onClickRemove={() => removeTaskItem(toDoItems, index)}
                                        onClickChange={() => changeTypeTask(toDoItems, index)}
                                        key={item.value + index}
                                        text={item.value}
                                    />
                                }) : null
                            }
                            {totalValue.isLoaded && toDoItems.length === 0 ?
                                <div>Вы пока не добавили задачу</div> : null}
                        </div>
                    </div>
                    <div className="manage-task-block">
                        <h2 className='manage-task-title title'>Done</h2>

                        <div>
                            {!totalValue.isLoaded ? <Loader/> : null}
                            {doneItems && doneItems.length > 0
                                ? doneItems.map((item, index) => {
                                    return <ToDo
                                        onClickRemove={() => removeTaskItem(doneItems, index)}
                                        onClickChange={() => changeTypeTask(doneItems, index)}
                                        className='done'
                                        key={item.value + index}
                                        text={item.value}
                                    />
                                }) : null
                            }
                            {totalValue.isLoaded && doneItems.length === 0 ?
                                <div>Вы пока не добавили задачу</div> : null}

                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}


export default Home
import './toDo.scss'
import Button from "../../UI/Button/Button";

const ToDo = props => {

    return (
        <div className={`manage-task-block-inner ${props.className ? props.className : '' }`}>
            <p className={props.className}>{props.text}</p>

            <div>
                <Button
                    onClick={props.onClickChange}
                    text='Выполнено'
                    type='button'
                    className='manage-task-block-done-task add-task-button todo button'
                />

                <Button
                    onClick={props.onClickRemove}
                    text='Удалить'
                    type='button'
                    className='manage-task-block-remove-task add-task-button remove-todo button'/>
            </div>
        </div>

    )
}

export default ToDo
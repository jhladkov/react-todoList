import './Button.scss'

const Button = props => {
    return(
        <button disabled={props.disabled} onClick={props.onClick} className={props.className} type={props.type}>{props.text}</button>

    )
}

export default Button
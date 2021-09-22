import './Button.scss'
import PropTypes from 'prop-types'

const Button = props => {
    return(
        <button disabled={props.disabled} onClick={props.onClick} className={props.className} type={props.type}>{props.text}</button>

    )
}

Button.propTypes = {
    text: PropTypes.string,
    className: PropTypes.string,
    type: PropTypes.string,
    onClick: PropTypes.func,
    disabled:PropTypes.bool
}

Button.defaultProps = {
    type: 'button',
    text: '',
    disabled: false,
    className: ''
}

export default Button
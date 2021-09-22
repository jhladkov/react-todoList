import './Error.scss'
import PropTypes from 'prop-types'

const Error = props => {
    return (
        <div className='error-block'>
            <div className="error-block-background" onClick={props.onClick}>

            </div>
            <div className='error-block-inner'>
                <div className='error-block-close' onClick={props.onClick}>&times;</div>
                <div className="error-block-img">
                    <img src="https://png.pngtree.com/png-clipart/20190619/original/pngtree-vector-cancel-icon-png-image_3991605.jpg" alt=""/>
                </div>
                <h2 className='error-block-title'>{props.title}</h2>
                <p className='error-block-info'>{props.text}</p>
            </div>

        </div>
    )
}

Error.propTypes = {
    text: PropTypes.string,
    title: PropTypes.string,
    onClick: PropTypes.func
}

Error.defaultProps = {
    text: 'Ошибка',
    title: 'Ошибка',
}

export default Error
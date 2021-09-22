import {NavLink} from "react-router-dom";
import PropTypes from 'prop-types'


const MenuItem = props => {

    return (
        <li className='header-menu-item'>
            <NavLink onClick={props.onClick} exact activeClassName="selected" to={props.link}>{props.text}</NavLink>
        </li>
    )
}

MenuItem.propTypes = {
    text: PropTypes.string,
    link: PropTypes.string,
    onClick: PropTypes.func
}

export default MenuItem
import {NavLink} from "react-router-dom";


const MenuItem = props => {
    console.log(props)

    return(
        <li className='header-menu-item'>
            <NavLink onClick={() => props.onClick} exact activeClassName="selected" to={props.link}>{props.text}</NavLink>
        </li>
    )
}

export default MenuItem
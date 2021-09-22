import './Menu.scss'
import MenuItem from "../MenuItem/MenuItem";
import {activeMenuStatus} from "../../redux/actions/todo";
import {useDispatch} from "react-redux";




const Menu = props => {
    const dispatch = useDispatch()

    const textMenuItems = [
        'Про проект',
        'Авторизоваться',
        'Зарегестрироваться',
    ]


    const refMenuItems = [
        'about',
        'sign-in',
        'sign-up',
    ]

    if (localStorage.getItem('idToken')) {
        textMenuItems.unshift('Домой')
        refMenuItems.unshift('/')
        textMenuItems.splice(2)

    }

    const exitFromAccount = () => {
        localStorage.removeItem('idToken')
        window.location.reload()
    }

    const activeMenuValue = props.activeMenu

    return (
        <div className={props.className}>

            <nav className='header-menu'>
                {
                    textMenuItems && refMenuItems
                        ? textMenuItems.map((text, index) => {

                            return <MenuItem onClick={() => dispatch(activeMenuStatus(!activeMenuValue))} key={index} text={text} link={refMenuItems[index]}/>

                        }) : <div style={{color: "white"}}>Что-то сломалось :(</div>
                }
                {localStorage.getItem('idToken')
                    ? <li className='header-menu-item' onClick={exitFromAccount}>
                        <a style={{
                            cursor:"pointer"
                        }
                        }>Выйти</a>
                    </li>
                    : null
                }
            </nav>
        </div>
    )
}

export default Menu
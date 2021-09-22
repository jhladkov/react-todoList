import './Menu.scss'
import MenuItem from "../MenuItem/MenuItem";

const Menu = props => {

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


    return (
        <div className={props.className}>

            <nav id={props.id} className='header-menu'>
                {
                    textMenuItems && refMenuItems
                        ? textMenuItems.map((text, index) => {

                            return <MenuItem onClick={props.closeMenu} key={index} text={text} link={refMenuItems[index]}/>

                        }) : <div style={{color: "white"}}>Что-то сломалось :(</div>
                }
                {localStorage.getItem('idToken')
                    ? <li className='header-menu-item' onClick={props.exitFromAccount}>
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
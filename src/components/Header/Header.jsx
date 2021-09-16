import './Header.scss'
import '../../scss/media.scss'

import MenuItem from "../MenuItem/MenuItem";
import Menu from "../Menu/Menu";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {reloadedData} from "../../redux/actions/todo";
import {useHistory} from "react-router-dom";







const Header = () => {
    const [activeMenu, setActiveMenu] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()


    const textMenuItems = [
        'Про проект',
        'Авторизоваться',
        'Зарегистрироваться',
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


    const test = () => {
        console.log('yes')
    }


    const exitFromAccount = () => {
        localStorage.removeItem('idToken')
        dispatch(reloadedData())
        history.push('/sign-up')
    }


    return (
        <header className='header'>
            <div className='container'>
                <div className="header-inner">
                    <div className='header-logo'>ToDo List</div>
                    <nav id='pc' className='header-menu'>
                        {
                            textMenuItems && refMenuItems
                                ? textMenuItems.map((text, index) => {
                                    return <MenuItem onClick={test} key={index} text={text} link={refMenuItems[index]}/>

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
                    <nav id='burger' className={activeMenu ? 'header-menu close' : 'header-menu'}>
                        <div className='menu-burger'  onClick={() => setActiveMenu(!activeMenu)} >
                            <span/>
                        </div>
                    </nav>


                    <Menu className={activeMenu ? 'menu activeMenu' : 'menu'}/>

                </div>
            </div>
            {activeMenu ? <div onClick={() => setActiveMenu(false)} className="blur"/> : null}
        </header>
    )
}

export default Header

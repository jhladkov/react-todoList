import './Header.scss'
import '../../scss/media.scss'

import Menu from "../Menu/Menu";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {activeMenuStatus, reloadedData} from "../../redux/actions/todo";
import {useHistory} from "react-router-dom";

const Header = () => {
    const [activeMenu, setActiveMenu] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const exitFromAccount = () => {
        localStorage.removeItem('idToken')
        dispatch(reloadedData())
        setActiveMenu(false)
        history.push('/sign-up')
    }

    return (
        <header className='header'>
            <div className='container'>
                <div className="header-inner">
                    <div className='header-logo'>ToDo List</div>

                    <Menu exitFromAccount={() => exitFromAccount()} id={'pc'} activeMenu={!activeMenu} className={'header-menu'}/>

                    <nav id='burger' className={activeMenu ? 'header-menu close' : 'header-menu'}>
                        <div className='menu-burger'  onClick={() => {
                            setActiveMenu(!activeMenu)
                            dispatch(activeMenuStatus(!activeMenu))
                        }} >
                            <span/>
                        </div>
                    </nav>


                    <Menu closeMenu={() => {
                        setActiveMenu(false)
                        dispatch(activeMenuStatus(!activeMenu))
                    }} id={'ph'} exitFromAccount={() => exitFromAccount()} activeMenu={activeMenu} className={activeMenu ? 'menu activeMenu' : 'menu'}/>

                </div>
            </div>
            {activeMenu ? <div onClick={() => {
                setActiveMenu(false)
                dispatch(activeMenuStatus(!activeMenu))
            }} className="blur"/> : null}
        </header>
    )
}

export default Header

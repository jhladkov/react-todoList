import './App.scss';
import {Redirect, Route} from "react-router-dom";
import Home from "./pages/Home/Home";
import SignIn from "./pages/Auth/Sign-up/Sign-up";
import Header from "./components/Header/Header";
import About from "./pages/About/About";
import SignUp from "./pages/Auth/Sign-in/Sign-in";
import {useSelector} from "react-redux";


function App() {
    let idToken = useSelector(data => data.todo.authorizationToken)
    if (idToken){
        localStorage.setItem('idToken', JSON.stringify(idToken))
    }
    if (localStorage.getItem('idToken')) {
        idToken = JSON.parse(localStorage.getItem('idToken'))
    }

    return (
        <main className='main'>
            <Header/>
            <div className="main-wrapper">
                <Route path='/' exact component={Home}>
                    {idToken ? null : <Redirect to='sign-up'/>}
                </Route>

                <Route path='/about' exact component={About}/>
                <Route path='/sign-in' exact component={SignIn}>
                    {idToken ? <Redirect to='/'/> : null}
                </Route>
                <Route path='/sign-up' exact component={SignUp}>
                    {idToken ? <Redirect to='/'/> : null}
                </Route>

            </div>
        </main>
    );
}

export default App;

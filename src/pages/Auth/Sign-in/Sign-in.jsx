import axios from "axios";
import './Sign-in.scss'
import {useForm} from "react-hook-form";
import Button from "../../../UI/Button/Button";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {saveToken} from "../../../redux/actions/todo";
import {useHistory} from "react-router-dom";


const SignIn = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [disabledStatus,setDisabledStatus] = useState(false)
    const [error, setErrorForm] = useState(false)
    const dispatch = useDispatch()
    const history = useHistory()

    const onSubmit = (data) => {
        setDisabledStatus(true)
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAv9cyJGy5DBpz59dIN4FbLTTVaDRp3Rrk', {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        })
            .then(data => {
                setDisabledStatus(false)
                if (data) {
                    dispatch(saveToken(JSON.parse(data.request.response).localId))
                    history.push("/");
                }
            })
            .catch(err => {
                if (JSON.parse(JSON.stringify(err)).message === 'Network Error') {
                    setDisabledStatus(false)
                    setErrorForm('Скорее всего у вас проблемы с интернетом :(')
                }else{
                    setDisabledStatus(false)
                    setErrorForm('Не верный email или пароль!')
                }
            })
    }


    return (
        <section className='section sign-in'>
            <div className="container">
                <div className="sign-in-inner inner">
                    <h2 className="sign-in-title title">Зарегистрироваться</h2>

                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        {
                            error
                                ?  <span style={{
                                    color:"red",
                                    textAlign:'center',
                                    marginBottom:20
                                }
                                }>{error}</span>
                                : null

                        }
                        <input placeholder='email' className='sign-in-email input' type="text" {...register('email')}/>
                        {errors.password ? <span style={{
                            textAlign:'center',
                            color:"red",
                            marginBottom:20
                        }}>Пароль должен больше 6 знаков</span> : null}
                        <input placeholder='password' className='sign-in-password input'
                               type="password" {...register('password', {required: true, minLength: 6})} />

                        <Button disabled={disabledStatus} className='button' text='Зарегистрироваться' type="submit"/>
                    </form>
                </div>


            </div>
        </section>
    )
}

export default SignIn
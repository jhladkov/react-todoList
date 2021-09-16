import axios from "axios";
import {useForm} from "react-hook-form";
import Button from "../../../UI/Button/Button";
import {useState} from "react";
import { useHistory } from "react-router-dom";
import {useDispatch} from "react-redux";
import {saveToken} from "../../../redux/actions/todo";


const SignUp = () => {
    const {register, handleSubmit, formState: {errors}} = useForm()
    const [error, setErrorForm] = useState(false)
    const [disabledStatus, setDisabledStatus] = useState(false)
    const dispatch = useDispatch()

    let history = useHistory();


    const onSubmit = data => {
        setDisabledStatus(true)
        axios.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAv9cyJGy5DBpz59dIN4FbLTTVaDRp3Rrk', {
            email: data.email,
            password: data.password,
            returnSecureToken: true
        })
            .then( data => {
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
                } else {
                    setDisabledStatus(false)
                    setErrorForm('Не верный email или пароль!')
                }
            })
    }

    return (
        <section className='section sign-un'>
            <div className="container">
                <div className="sign-un-inner inner">
                    <h2 className="sign-un-title title">Войти</h2>

                    <form className='form' onSubmit={handleSubmit(onSubmit)}>
                        {
                            error
                                ? <span style={{
                                    color: "red",
                                    textAlign: 'center',
                                    marginBottom: 20
                                }
                                }>{error}</span>
                                : null

                        }

                        <input placeholder='email' className='sign-un-email input' type="text" {...register('email')}/>
                        {errors.password ? <span style={{
                            textAlign: 'center',
                            color: "red",
                            marginBottom: 20
                        }}>Пароль должен больше 6 знаков</span> : null}
                        <input placeholder='password' className='sign-un-password input'
                               type="password" {...register('password', {required: true, minLength: 6})} />

                        <Button  disabled={disabledStatus} className='button' text='Войти' type="submit"/>
                    </form>
                </div>


            </div>
        </section>
    )
}

export default SignUp
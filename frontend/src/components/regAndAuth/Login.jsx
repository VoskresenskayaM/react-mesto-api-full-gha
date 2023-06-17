import React from 'react'
import Form from '../Form'
import useForm from '../../hooks/useForm'

function Login({ loginUser }) {

    const { form, errors, handleChange } = useForm({
        email: '',
        password: ''
    })

    function handleSubmit(e) {
        e.preventDefault();
        loginUser(form)
    }

    const emailSpanClassName = `form__input-error  form__input-error_theme_dark  ${errors.email ?
        'form__input-error_active' : ''}`
    const passwordSpanClassName = `form__input-error  form__input-error_theme_dark  ${errors.password ?
        'form__input-error_active' : ''}`

    return (
        <div className='login'>
            <div className='login__form-container'>
                <Form
                    title='Вход'
                    name='formEntr'
                    buttonText='Войти'
                    isFormValid={false}
                    onSubmit={handleSubmit}
                    isRegForm={true}>
                    <input className="form__input  form__input_theme_dark" type="email" name="email"
                        placeholder="Email"
                        value={form.email} onChange={handleChange} />
                    <span className={emailSpanClassName}>{errors.email}</span>
                    <input className="form__input  form__input_theme_dark" type="password" name="password"
                        autoComplete="on" placeholder="Пароль" required minLength="5" maxLength="20"
                        value={form.password} onChange={handleChange} />
                    <span className={passwordSpanClassName}>{errors.password}</span>
                </Form>
            </div>
        </div>
    )
}
export default Login


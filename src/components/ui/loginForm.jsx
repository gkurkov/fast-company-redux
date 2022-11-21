import React, { useEffect, useState } from 'react'
import { validator } from '../../utils/validator'
import TextField from '../common/form/textField'
import CheckBoxField from '../common/form/checkBoxField'
// import { useAuth } from '../../hooks/useAuth'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
// import * as yup from 'yup'
import { getAuthErrors, login } from '../../store/users'

const LoginForm = () => {
    // console.log(process.env)
    const history = useHistory()
    const loginError = useSelector(getAuthErrors())
    // console.log(history.location.state.from.pathname)

    // состояние для всей формы сразу, а не отдельных полей
    const [data, setData] = useState({ email: '', password: '', stayOn: false })
    const [errors, setErrors] = useState({})
    // const { logIn } = useAuth()
    const dispatch = useDispatch()

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    // const validateScheme = yup.object().shape({
    //     password: yup
    //         .string()
    //         .required('Пароль обязателен для заполнения')
    //         .matches(
    //             /(?=.*[A-Z])/,
    //             'Пароль должен содержать хотя бы одну заглавную букву'
    //         )
    //         .matches(
    //             /(?=.*[0-9])/,
    //             'Пароль должен содержать хотя бы одну цифру'
    //         )
    //         .matches(
    //             /(?=.*[!@#$%^&*])/,
    //             'Пароль должен содержать один из символов !@#$%^&*'
    //         )
    //         .matches(/(?=.{8,})/, 'Пароль должен содержать минимум 8 символов'),
    //     email: yup
    //         .string()
    //         .required('Электронная почта обязательна для заполнения')
    //         .email('Email введен не корректно')
    // })

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            }
        },
        password: {
            isRequired: {
                message: 'Пароль обязателен для заполнения'
            }
        }
    }

    useEffect(() => {
        validate()
    }, [data])

    const validate = () => {
        const errors = validator(data, validatorConfig)

        // validateScheme
        //     .validate(data)
        //     .then(() => setErrors({}))
        //     .catch((err) => setErrors({ [err.path]: err.message }))

        // for (const fieldName in data) {
        //     if (data[fieldName].trim() === '') {
        //         errors[fieldName] = `${fieldName} не должно быть пустым`
        //     }
        // }
        setErrors(errors)
        return Object.keys(errors).length === 0 // true or false
    }
    const isValid = Object.keys(errors).length === 0

    const handleSubmit = (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return

        const redirect = history.location.state
            ? history.location.state.from.pathname
            : '/'

        dispatch(login({ payload: data, redirect }))
    }

    return (
        <form onSubmit={handleSubmit}>
            <TextField
                label="Электронная почта"
                // type="text" // по умолчанию обозначили в компоненте значение text
                name="email"
                value={data.email}
                onChange={handleChange}
                error={errors.email}
            />
            <TextField
                label="Пароль"
                type="password"
                name="password"
                value={data.password}
                onChange={handleChange}
                error={errors.password}
            />
            <CheckBoxField
                value={data.stayOn}
                onChange={handleChange}
                name="stayOn"
            >
                Оставаться в системе
            </CheckBoxField>
            {loginError && <p className="text-danger">{loginError}</p>}
            <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Submit
            </button>
            {/* <div>
                <label htmlFor="email">Email</label>
                <input
                    type="text"
                    id="email"
                    name="email"
                    value={data.email}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label htmlFor="password">Пароль</label>
                <input
                    type="password"
                    id="password"
                    name="email"
                    value={data.password}
                    onChange={handleChange}
                />
            </div> */}
        </form>
    )
}

export default LoginForm

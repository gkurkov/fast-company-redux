import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import TextField from '../common/form/textField'
import { useParams } from 'react-router-dom'
import api from '../../api'
import SelectField from '../common/form/selectField'
import RadioField from '../common/form/radioField'
import MultiSelectField from '../common/form/multiSelectField'

const EditForm = () => {
    const { userId } = useParams()

    const [qualities, setQualities] = useState([])
    // const [errors, setErrors] = useState({})
    const [professions, setProfession] = useState({})
    const [user, setUser] = useState()

    useEffect(() => {
        api.professions.fetchAll().then((data) => {
            const professionsList = Object.keys(data).map((professionName) => ({
                label: data[professionName].name,
                value: data[professionName]._id
            }))
            setProfession(professionsList)
        })
        api.qualities.fetchAll().then((data) => {
            const qualitiesList = Object.keys(data).map((optionName) => ({
                label: data[optionName].name,
                value: data[optionName]._id,
                color: data[optionName].color
            }))
            setQualities(qualitiesList)
        })
        // api.qualities.fetchAll().then((data) => setQualities(data))
        api.users.getById(userId).then((data) => setUser(data))
    }, [])

    const handleChange = (target) => {
        // console.log('target', target)
        setUser((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // console.log('if user->user.qualities', user.qualities)
        let NewUserQualities = user.qualities
        if (user.qualities[0].label) {
            NewUserQualities = Object.keys(user.qualities).map(
                (optionName) => ({
                    name: user.qualities[optionName].label,
                    _id: user.qualities[optionName].value,
                    color: user.qualities[optionName].color
                })
            )
        }

        // console.log('newQualities', NewUserQualities)

        // if (user.qualities !== user.init_qualities) {
        user.qualities = NewUserQualities
        // } else {
        //     user.qualities = user.init_qualities
        // }

        const newProfession = professions.filter(
            (prof) => prof.value === user.profession
        )

        if (newProfession[0] !== undefined) {
            user.profession = {
                _id: newProfession[0].value,
                name: newProfession[0].label
            }
        }

        setUser(user)

        if (user) {
            api.users.update(userId, user)
        }
    }

    // (user.qualities.label !== undefined)
    //     ? (userQualities = {
    //           label: user.qualities.name,
    //           value: user.qualities._id,
    //           color: user.qualities.color
    //       })
    //     : user.qualities

    // console.log('if user -> user.qualities', user.qualities)

    if (user) {
        // console.log('edit form if user', user)
        // user.profession = {
        //     value: user.profession._id,
        //     label: user.profession.name
        // }
        // const professionsList = Object.keys(user).map((professionName) => ({
        //     label: user[professionName].name,
        //     value: user[professionName]._id
        // }))
        // setProfession(professionsList)

        // user.init_qualities = user.qualities
        const userQualities = Object.keys(user.qualities).map((optionName) => ({
            label: user.qualities[optionName].name,
            value: user.qualities[optionName]._id,
            color: user.qualities[optionName].color
        }))
        // const userQualities = {}

        // const userQualities = Object.keys(user.qualities).map((optionName) => ({
        //     label: user.qualities[optionName].name,
        //     value: user.qualities[optionName]._id,
        //     color: user.qualities[optionName].color
        // }))

        // const userQualities = {
        //     label: user.qualities.name,
        //     value: user.qualities._id,
        //     color: user.qualities.color
        // }

        return (
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        <form onSubmit={handleSubmit}>
                            <h3 className="mb-4">Edit User</h3>
                            <TextField
                                label="Имя"
                                type="text"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                            />
                            <TextField
                                label="Электронная почта"
                                type="text"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                            />
                            <SelectField
                                label="Выберите вашу профессию"
                                options={professions}
                                name="profession"
                                onChange={handleChange}
                                value={user.profession._id}
                                //     {label: user.profession.name,
                                //      value: user.profession._id}
                                // }
                                // error={errors.profession}
                            />
                            <RadioField
                                options={[
                                    { name: 'Male', value: 'male' },
                                    { name: 'Female', value: 'female' },
                                    { name: 'Other', value: 'other' }
                                ]}
                                value={user.sex}
                                name="sex"
                                onChange={handleChange}
                                label="Выберите ваш пол"
                            />
                            <MultiSelectField
                                options={qualities}
                                onChange={handleChange}
                                defaultValue={userQualities}
                                name="qualities"
                                label="Выберите ваши качества"
                            />
                            <button
                                type="submit"
                                className="btn btn-primary w-100 mx-auto"
                            >
                                Обновить
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
    return 'Loading...'
}

EditForm.propTypes = {
    user: PropTypes.object
}

export default EditForm

import React, { useEffect, useState } from 'react'
// import { useHistory, useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom'
import { validator } from '../../../utils/validator'
// import api from '../../../api'
import TextField from '../../common/form/textField'
import SelectField from '../../common/form/selectField'
import RadioField from '../../common/form/radioField'
import MultiSelectField from '../../common/form/multiSelectField'
import BackHistoryButton from '../../common/backButton'
import { useAuth } from '../../../hooks/useAuth'
import { useQualities } from '../../../hooks/useQualities'
import { useProfessions } from '../../../hooks/useProfession'

const EditUserPage = () => {
    // const { userId } = useParams()
    const history = useHistory()
    const [isLoading, setIsLoading] = useState(true)
    const [data, setData] = useState()
    const { currentUser, updateUserData } = useAuth()
    const { qualities, isLoading: qualitiesLoading } = useQualities()
    const { professions, isLoading: professionLoading } = useProfessions()

    const qualitiesList = qualities.map((q) => ({
        label: q.name,
        value: q._id
    }))

    const professionsList = professions.map((p) => ({
        label: p.name,
        value: p._id
    }))

    const [errors, setErrors] = useState({})
    // const getProfessionById = (id) => {
    //     for (const prof of professions) {
    //         if (prof.value === id) {
    //             return { _id: prof.value, name: prof.label }
    //         }
    //     }
    // }
    // const getQualities = (elements) => {
    //     const qualitiesArray = []
    //     for (const elem of elements) {
    //         for (const quality in qualities) {
    //             if (elem.value === qualities[quality].value) {
    //                 qualitiesArray.push({
    //                     _id: qualities[quality].value,
    //                     name: qualities[quality].label,
    //                     color: qualities[quality].color
    //                 })
    //             }
    //         }
    //     }
    //     return qualitiesArray
    // }

    function getQualitiesListByIds(qualitiesIds) {
        const qualitiesArray = []
        for (const qualId of qualitiesIds) {
            for (const quality of qualities) {
                if (quality._id === qualId) {
                    qualitiesArray.push(quality)
                    break
                }
            }
        }
        return qualitiesArray
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        await updateUserData({
            ...data,
            qualities: data.qualities.map((q) => q.value)
        })
        history.push(`/users/${currentUser._id}`)
        // const { profession, qualities } = data
        // api.users
        //     .update(userId, {
        //         ...data,
        //         profession: getProfessionById(profession),
        //         qualities: getQualities(qualities)
        //     })
        //     .then((data) => history.push(`/users/${data._id}`))
        // console.log({
        //     ...data,
        //     profession: getProfessionById(profession),
        //     qualities: getQualities(qualities)
        // })
    }
    const transformData = (data) => {
        return getQualitiesListByIds(data).map((qual) => ({
            label: qual.name,
            value: qual._id
        }))
        // return data.map((qual) => ({ label: qual.name, value: qual._id }))
    }
    useEffect(() => {
        // setIsLoading(true)
        if (!professionLoading && !qualitiesLoading && currentUser && !data) {
            setData({
                ...currentUser,
                qualities: transformData(currentUser.qualities)
            })
        }
        // api.users.getById(userId).then(({ profession, qualities, ...data }) =>
        //     setData((prevState) => ({
        //         ...prevState,
        //         ...data,
        //         qualities: transformData(qualities),
        //         profession: profession._id
        //     }))
        // )
        // api.professions.fetchAll().then((data) => {
        //     const professionsList = Object.keys(data).map((professionName) => ({
        //         label: data[professionName].name,
        //         value: data[professionName]._id
        //     }))
        //     setProfession(professionsList)
        // })

        // api.qualities.fetchAll().then((data)=>setQualities(data))
        // api.professions.fetchAll().then((data)=>setProfessions(data))

        // api.qualities.fetchAll().then((data) => {
        //     const qualitiesList = Object.keys(data).map((optionName) => ({
        //         value: data[optionName]._id,
        //         label: data[optionName].name,
        //         color: data[optionName].color
        //     }))
        //     setQualities(qualitiesList)
        // })
    }, [professionLoading, qualitiesLoading, currentUser, data])

    useEffect(() => {
        if (data && isLoading) {
            setIsLoading(false)
        }
    }, [data])

    // useEffect(() => {
    //     if (data._id) setIsLoading(false)
    // }, [data])

    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения'
            },
            isEmail: {
                message: 'Email введен некорректно'
            }
        },
        name: {
            isRequired: {
                message: 'Введите ваше имя'
            }
        }
    }
    useEffect(() => {
        validate()
    }, [data])
    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }))
    }
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    const isValid = Object.keys(errors).length === 0
    return (
        <>
            {/* <div className="d-grid gap-2 d-md-block mt-3">
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => history.push(`/users/${data._id}`)}
                >
                    <i className="bi bi-caret-left"></i>
                    НАЗАД
                </button>
            </div> */}
            <div className="container mt-3">
                <BackHistoryButton />
                <div className="row">
                    <div className="col-md-6 offset-md-3 shadow p-4">
                        {!isLoading && Object.keys(professions).length > 0 ? (
                            <form onSubmit={handleSubmit}>
                                <TextField
                                    label="Имя"
                                    name="name"
                                    value={data.name}
                                    onChange={handleChange}
                                    error={errors.name}
                                />
                                <TextField
                                    label="Электронная почта"
                                    name="email"
                                    value={data.email}
                                    onChange={handleChange}
                                    error={errors.email}
                                />
                                <SelectField
                                    label="Выбери свою профессию"
                                    defaultOption="Choose..."
                                    // options={professions}
                                    options={professionsList}
                                    name="profession"
                                    onChange={handleChange}
                                    value={data.profession}
                                    error={errors.profession}
                                />
                                <RadioField
                                    options={[
                                        { name: 'Male', value: 'male' },
                                        { name: 'Female', value: 'female' },
                                        { name: 'Other', value: 'other' }
                                    ]}
                                    value={data.sex}
                                    name="sex"
                                    onChange={handleChange}
                                    label="Выберите ваш пол"
                                />
                                <MultiSelectField
                                    defaultValue={data.qualities}
                                    // options={qualities}
                                    options={qualitiesList}
                                    onChange={handleChange}
                                    name="qualities"
                                    label="Выберите ваши качества"
                                />
                                <button
                                    type="submit"
                                    disabled={!isValid}
                                    className="btn btn-primary w-100 mx-auto"
                                >
                                    Обновить
                                </button>
                            </form>
                        ) : (
                            'Loading...'
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}

export default EditUserPage

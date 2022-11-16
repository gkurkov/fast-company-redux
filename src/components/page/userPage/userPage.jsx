// import React, { useEffect, useState } from 'react'
import React from 'react'
import PropTypes from 'prop-types'
// import api from '../../../api'
import Comments from '../../ui/comments'
import UserCard from '../../ui/userCard'
import QualitiesCard from '../../ui/qualitiesCard'
import MeetingsCard from '../../ui/meetingsCard'
import { useUser } from '../../../hooks/useUsers'
import { CommentsProvider } from '../../../hooks/useComments'

const UserPage = ({ userId }) => {
    // const [user, setUser] = useState()
    // useEffect(() => {
    //     api.users.getById(userId).then((data) => setUser(data))
    // }, [])
    const { getUserById } = useUser()
    const user = getUserById(userId)

    if (user) {
        return (
            <div className="container">
                <div className="row gutters-sm">
                    <div className="col-md-4 mb-3">
                        <UserCard user={user} />
                        <QualitiesCard data={user.qualities} />
                        <MeetingsCard value={user.completedMeetings} />
                    </div>
                    <div className="col-md-8">
                        <CommentsProvider>
                            <Comments />
                        </CommentsProvider>
                    </div>
                </div>
            </div>
        )
    } else {
        return <h1>Loading...</h1>
    }
}

UserPage.propTypes = {
    userId: PropTypes.string.isRequired
}

export default UserPage

// import React, { useState, useEffect } from 'react'
// import api from '../api'
// import PropTypes from 'prop-types'
// import QualitiesList from './qualitiesList.'
// import { useHistory } from 'react-router-dom'

// const UserPage = ({ userId }) => {
//     const [user, setUser] = useState()
//     const history = useHistory()

//     useEffect(() => {
//         api.users.getById(userId).then((data) => setUser(data))
//     }, [])

//     const handleClick = () => {
//         history.push('/users')
//     }

//     if (user) {
//         return (
//             <>
//                 <h2>{user.name}</h2>
//                 <h2>Профессия: {user.profession.name}</h2>
//                 <QualitiesList qualities={user.qualities} />
//                 <h4>Количество встреч: {user.completedMeetings}</h4>
//                 <h4>Rate: {user.rate}</h4>
//                 <button
//                     onClick={() => {
//                         handleClick()
//                     }}
//                 >
//                     Все пользователи
//                 </button>
//             </>
//         )
//     }
//     return 'Loading...'
// }

// UserPage.propTypes = {
//     userId: PropTypes.string
// }
// export default UserPage

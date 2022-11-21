import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import UsersListPage from '../components/page/usersListPage'
import UserPage from '../components/page/userPage'
import EditUserPage from '../components/page/editUserPage'
import { useSelector } from 'react-redux'
import { getCurrentUserId } from '../store/users'
import UsersLoader from '../components/ui/hoc/usersLoader'

const Users = () => {
    const params = useParams()
    const { userId, edit } = params
    const currentUserId = useSelector(getCurrentUserId())

    return (
        <>
            <UsersLoader>

                    <div className="container">
                        <div className="row gutters-sm">
                            {userId ? (
                                edit ? (
                                    userId === currentUserId ? (
                                        <EditUserPage />
                                    ) : (
                                        <Redirect
                                            to={`/users/${currentUserId}/edit`}
                                        />
                                    )
                                ) : (
                                    <UserPage userId={userId} />
                                )
                            ) : (
                                <UsersListPage />
                            )}
                        </div>
                    </div>

            </UsersLoader>
        </>
    )
}

export default Users

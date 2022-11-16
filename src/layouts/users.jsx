import React from 'react'
import { useParams, Redirect } from 'react-router-dom'
import UsersListPage from '../components/page/usersListPage'
import UserPage from '../components/page/userPage'
import EditUserPage from '../components/page/editUserPage'
import UserProvider from '../hooks/useUsers'
import { useAuth } from '../hooks/useAuth'

const Users = () => {
    const params = useParams()
    const { userId, edit } = params
    const { currentUser } = useAuth()
    return (
        <>
            <UserProvider>
                <div className="container">
                    <div className="row gutters-sm">
                        {userId ? (
                            edit ? (
                                userId === currentUser._id ? (
                                    <EditUserPage />
                                ) : (
                                    <Redirect
                                        to={`/users/${currentUser._id}/edit`}
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
            </UserProvider>
        </>
    )
}

export default Users

import React, { useEffect } from 'react'
import { Redirect, Route, Switch } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import Users from './layouts/users'
import NavBar from './components/ui/navBar'
import Main from './layouts/main'
import Login from './layouts/login'
import { ProfessionProvider } from './hooks/useProfession'
import AuthProvider from './hooks/useAuth'
import ProtectedRoute from './components/common/protectedRoute'
// import Edit from './layouts/edit'
// import UsersLayout from './components/usersLayout'
import LogOut from './layouts/logOut'
import { useDispatch } from 'react-redux'
import { loadQualitiesList } from './store/qualities'
import { loadProfessionsList } from './store/professions'

function App() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(loadQualitiesList())
        dispatch(loadProfessionsList())
    }, [])

    return (
        <div>
            <AuthProvider>
                <NavBar />
                {/* <Users /> */}
                <ProfessionProvider>
                    <Switch>
                        <ProtectedRoute
                            path="/users/:userId?/:edit?"
                            component={Users}
                        />
                        <Route path="/login/:type?" component={Login} />
                        {/* <Route
                    path="/users/:userId/edit"
                    render={(user) => <Edit user={user} />}
                /> */}
                        <Route path="/logout" component={LogOut} />
                        <Route path="/" exact component={Main} />
                        <Redirect to="/" />
                    </Switch>
                </ProfessionProvider>
            </AuthProvider>
            <ToastContainer />
        </div>
    )
}

export default App

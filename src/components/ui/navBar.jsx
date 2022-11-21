import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getIsLoggedIn } from '../../store/users'
import NavProfile from './navProfile'

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn())
    return (
        <nav className="navbar bg-light mb-3">
            <div className="container-fluid">
                <ul className="nav">
                    <li className="nav-item">
                        <Link to="/" className="nav-link" aria-current="page">
                            Main
                        </Link>
                    </li>
                    {isLoggedIn && (
                        <li className="nav-item">
                            <Link
                                to="/users"
                                className="nav-link"
                                aria-current="page"
                            >
                                Users
                            </Link>
                        </li>
                    )}
                </ul>
                <div className="d-flex">
                    {isLoggedIn ? (
                        <NavProfile/>
                    ) : (
                        <Link
                            to="/login"
                            className="nav-link"
                            aria-current="page"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    )
}

export default NavBar

import React, { useState, useEffect } from 'react'
import { paginate } from '../../../utils/paginate'
import Pagination from '../../common/pagination'
import PropTypes from 'prop-types'
import GroupList from '../../common/groupList'
// import api from '../../../api'
import SearchStatus from '../../ui/searchStatus'
import UserTable from '../../ui/usersTable'
import _ from 'lodash'
import { useUser } from '../../../hooks/useUsers'
import { useProfessions } from '../../../hooks/useProfession'
import { useAuth } from '../../../hooks/useAuth'

const UsersListPage = () => {
    const { users } = useUser()
    const { currentUser } = useAuth()
    const { isLoading: professionsLoading, professions } = useProfessions()
    const [currentPage, setCurrentPage] = useState(1)
    // const [professions, setProfession] = useState()
    // const [comments, setComments] = useState()
    const [selectedProf, setSelectedProf] = useState()
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState({ path: 'name', order: 'asc' })
    const pageSize = 5
    // const [users, setUsers] = useState()

    // useEffect(() => {
    //     api.users.fetchAll().then((data) => setUsers(data))
    // }, [])

    const handleDelete = (userId) => {
        // setUsers(users.filter((user) => user._id !== userId))
        console.log(userId)
    }
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark }
            }
            return user
        })
        // setUsers(newArray)
    }

    // useEffect(() => {
    //     api.professions.fetchAll().then((data) => setProfession(data))
    // }, [])

    // const [comments, setComments] = useState()
    // useEffect(() => {
    //     api.comments.fetchAll().then((data) => setComments(data))
    // }, [])
    // localStorage.setItem('comments', JSON.stringify(comments))
    // console.log('comments 1', comments)

    useEffect(() => {
        setCurrentPage(1)
    }, [selectedProf, searchQuery])

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex)
    }

    const handleProfessionSelect = (item) => {
        if (searchQuery !== '') setSearchQuery('')
        setSelectedProf(item)
    }

    const handleSearchQuery = ({ target }) => {
        setSelectedProf(undefined)
        setSearchQuery(target.value)
    }

    const handleSort = (item) => {
        setSortBy(item)
    }

    if (users) {
        // const filteredUsers = searchQuery
        //     ? users.filter(
        //           (user) =>
        //               user.name
        //                   .toLowerCase()
        //                   .indexOf(searchQuery.toLowerCase()) !== -1
        //       )
        //     : selectedProf
        //     ? users.filter(
        //           (user) =>
        //               JSON.stringify(user.profession) ===
        //               JSON.stringify(selectedProf)
        //       )
        //     : users
        function filterUser(data) {
            const filteredUsers = searchQuery
                ? data.filter(
                      (user) =>
                          user.name
                              .toLowerCase()
                              .indexOf(searchQuery.toLowerCase()) !== -1
                  )
                : selectedProf
                ? data.filter(
                      (user) =>
                          JSON.stringify(user.profession) ===
                          JSON.stringify(selectedProf)
                  )
                : data
            return filteredUsers.filter((u) => u._id !== currentUser._id)
        }

        const filteredUsers = filterUser(users)
        const count = filteredUsers.length

        const sortedUsers = _.orderBy(
            filteredUsers,
            [sortBy.path],
            [sortBy.order]
        )

        const usersCrop = paginate(sortedUsers, currentPage, pageSize)

        const clearFilter = () => {
            setSelectedProf()
        }

        return (
            <div className="d-flex">
                {professions && !professionsLoading && (
                    <div className="d-flex flex-column flex-shrink-0 p-3">
                        <GroupList
                            selectedItem={selectedProf}
                            items={professions}
                            onItemSelect={handleProfessionSelect}
                        />
                        <button
                            className="btn btn-secondary mt-2"
                            onClick={clearFilter}
                        >
                            {' '}
                            Очистить
                        </button>
                    </div>
                )}
                <div className="d-flex flex-column">
                    <SearchStatus length={count} />
                    <input
                        type="text"
                        name="searchQuery"
                        placeholder="Search..."
                        onChange={handleSearchQuery}
                        value={searchQuery}
                    />
                    {count > 0 && (
                        <UserTable
                            users={usersCrop}
                            onSort={handleSort}
                            selectedSort={sortBy}
                            onDelete={handleDelete}
                            onToggleBookMark={handleToggleBookMark}
                        />
                    )}
                    <div className="d-flex justify-content-center">
                        <Pagination
                            itemsCount={count}
                            pageSize={pageSize}
                            currentPage={currentPage}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </div>
            </div>
        )
    }
    return <h3>Loading...</h3>
}

UsersListPage.propTypes = {
    users: PropTypes.array
}

export default UsersListPage

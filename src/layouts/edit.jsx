import React from 'react'
import EditForm from '../components/ui/editForm'
import PropTypes from 'prop-types'

const Edit = (user) => {
    return <EditForm user={user} />
}

Edit.propTypes = {
    user: PropTypes.object
}
export default Edit

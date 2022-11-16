import React from 'react'
import PropTypes from 'prop-types'

const Arrow = ({ column, selectedSort, columns }) => {
    if (selectedSort.path) {
        if (selectedSort.path === columns[column].path) {
            return (
                <i
                    className={
                        'bi bi-caret' +
                        (selectedSort.order === 'asc'
                            ? '-up-fill'
                            : '-down-fill')
                    }
                ></i>
            )
        }
        return undefined
    }
}

Arrow.propTypes = {
    column: PropTypes.string,
    selectedSort: PropTypes.object,
    columns: PropTypes.object
}
export default Arrow

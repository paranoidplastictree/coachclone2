import React from 'react'
import PropTypes from 'prop-types'

export const Roster = ({ roster }) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Roster</h2>
    <button className='btn btn-primary'>
      + Player
    </button>
    {' '}
    <button className='btn btn-secondary'>
      Cancel
    </button>
  </div>
)
Roster.propTypes = {
  counter: PropTypes.array.isRequired
}

export default Roster

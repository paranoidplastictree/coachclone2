import React from 'react'
import PropTypes from 'prop-types'

export const Games = ({ games }) => (
  <div style={{ margin: '0 auto' }} >
    <h2>Games</h2>
    <div>
      Date | Kickoff | Field | Opponent | Actions
    </div>
    <div>
      09/26/2017 10:30AM Field 3 Team 2 <button className='btn btn-primary'>
      Details
    </button>
    </div>
    <div>
    10/4/2017 09:30AM Field 1 Team 5 <button className='btn btn-primary'>
      Details
    </button>
    </div>
  </div>
)
Games.propTypes = {
  games: PropTypes.array.isRequired
}

export default Games

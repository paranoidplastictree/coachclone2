import React from 'react'
import PropTypes from 'prop-types'

export const Reports = () => (
  <div style={{ margin: '0 auto' }} >
    <h2>Playtime Reports</h2>
    <div>Show Playtimes This Season</div>
    {' '}
    <div>
      <div>Show Playtimes for Game</div>
      <select>
        <option>Game 1</option>
        <option>Game 2</option>
        <option>Game 3</option>
        <option>Game 4</option>
        <option>Game 5</option>
        <option>Game 6</option>
      </select>
    </div>
  </div>
)
Reports.propTypes = {
}

export default Reports

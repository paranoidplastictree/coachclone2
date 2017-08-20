import React from 'react'
import PropTypes from 'prop-types'

function renderPlayerRows(players) {
  const rows = [];
  players.foreach((player) => {
    rows.push(
      <div key={player.id} className="player-row">
        <div className="col">
          <input type="text" placeholder="First Name"/>
        </div>
        <div className="col">
          <input type="text" placeholder="Last Name"/>
        </div>
        <div className="col">
          <button className="btn btn-primary">remove</button>
        </div>
      </div>);
  });

  return rows;
}

export const Roster = ({ roster }) => (
  <div style={{ margin: '0 auto' }} className="roster-container" >
    <h2>Roster</h2>
    <button className='btn btn-primary'>
      + Player
    </button>
    {' '}
    <button className='btn btn-secondary'>
      Cancel
    </button>
    <div className="roster">
      <div className="roster-header">
        <div className="col">First Name</div>
        <div className="col">Last Name</div>
        <div className="col">Action</div>
      </div>
      <div className="new-player player-row">
        <div className="col">
          <input type="text" />
        </div>
        <div className="col">
          <input type="text" />
        </div>
        <div className="col">
          <button className="btn btn-primary">Add</button>
        </div>
      </div>
      <div className="players">
        {renderPlayerRows}
      </div>
      <div className="buttons">
        <button className="btn btn-primary">Apply</button>
        <button className="btn btn-secondary">Cancel</button>
      </div>
    </div>
  </div>
)
Roster.propTypes = {
  players: PropTypes.array
}

export default Roster

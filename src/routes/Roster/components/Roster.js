import React, { Component } from 'react'
import Immutable from 'immutable'
import PropTypes from 'prop-types'

export default class Roster extends Component {
  static propTypes = {
    players: PropTypes.instanceOf(Immutable.List).isRequired,
    newPlayer: PropTypes.instanceOf(Immutable.Map).isRequired,
    isNewPlayerFormVisible: PropTypes.bool.isRequired,
    fetchRosterPlayers: PropTypes.func.isRequired,
    setNewPlayerFirstName: PropTypes.func.isRequired,
    setNewPlayerLastName: PropTypes.func.isRequired,
    createRosterPlayer: PropTypes.func.isRequired
  }

  componentDidMount () {
    const { players } = this.props
    if (!players || players.size > 0) {
      this.props.fetchRosterPlayers()
    }
  }

  handleNewPlayerFirstNameChange (event) {
    this.props.setNewPlayerFirstName(event.target.value)
  }

  handleNewPlayerLastNameChange (event) {
    this.props.setNewPlayerLastName(event.target.value)
  }

  handleCreateNewPlayer () {
    this.props.createRosterPlayer(this.props.newPlayer)
  }

  renderPlayerRows (players) {
    const rows = []
    if (players.size > 0) {
      players.toJS().forEach((player) => {
        rows.push(
          <div key={player.id} className='player-row'>
            <div className='col'>
              <input type='text' placeholder='First Name' />
            </div>
            <div className='col'>
              <input type='text' placeholder='Last Name' />
            </div>
            <div className='col'>
              <button className='btn btn-primary'>remove</button>
            </div>
          </div>)
      })
    }
    return rows
  }

  render () {
    const { players, newPlayer, isNewPlayerFormVisible } = this.props

    return (
      <div style={{ margin: '0 auto' }} className='roster-container' >
        <h2>Roster</h2>
        <button className='btn btn-primary'>
          + Player
        </button>
        {' '}
        <button className='btn btn-secondary'>
          Cancel
        </button>
        <div className='roster'>
          <div className='roster-header'>
            <div className='col'>First Name</div>
            <div className='col'>Last Name</div>
            <div className='col'>Action</div>
          </div>
          <div className='new-player player-row'>
            <div className='col'>
              <input type='text' value={newPlayer.firstName} onChange={this.handleNewPlayerFirstNameChange} />
            </div>
            <div className='col'>
              <input type='text' value={newPlayer.lastName} onChange={this.handleNewPlayerLastNameChange} />
            </div>
            <div className='col'>
              <button className='btn btn-primary'>Add</button>
            </div>
          </div>
          <div className='players'>
            {this.renderPlayerRows(players)}
          </div>
          <div className='buttons'>
            <button className='btn btn-primary'>Apply</button>
            <button className='btn btn-secondary'>Cancel</button>
          </div>
        </div>
      </div>
    )
  }
}

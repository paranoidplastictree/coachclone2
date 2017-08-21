import { createSelector } from 'reselect'

const rosterState = state => state.roster

export const rosterSelector = createSelector(
  [rosterState],
  (roster) => {
    const players = roster.get('players')
    const newPlayer = roster.get('newPlayer')
    const isNewPlayerFormVisible = roster.get('isNewPlayerFormVisible')

    return {
      players,
      newPlayer,
      isNewPlayerFormVisible
    }
  }
)

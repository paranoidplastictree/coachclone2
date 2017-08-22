import { CALL_API_TOKEN } from 'middleware/apiToken'
import Immutable from 'immutable'

// ------------------------------------
// Constants
// ------------------------------------

export const SET_NEW_PLAYER_FIRST_NAME = 'SET_NEW_PLAYER_FIRST_NAME'

export function setNewPlayerFirstName (value) {
  return {
    type: SET_NEW_PLAYER_FIRST_NAME,
    value
  }
}

export const SET_NEW_PLAYER_LAST_NAME = 'SET_NEW_PLAYER_LAST_NAME'

export function setNewPlayerLastName (value) {
  return {
    type: SET_NEW_PLAYER_LAST_NAME,
    value
  }
}

export const FETCH_ROSTER_PLAYERS_REQUEST = 'FETCH_ROSTER_PLAYERS_REQUEST'
export const FETCH_ROSTER_PLAYERS_SUCCESS = 'FETCH_ROSTER_PLAYERS_SUCCESS'
export const FETCH_ROSTER_PLAYERS_FAILURE = 'FETCH_ROSTER_PLAYERS_FAILURE'

export function fetchRosterPlayers () {
  return {
    [CALL_API_TOKEN]: {
      types: [
        {
          type: FETCH_ROSTER_PLAYERS_REQUEST
        },
        {
          type: FETCH_ROSTER_PLAYERS_SUCCESS,
        },
        {
          type: FETCH_ROSTER_PLAYERS_FAILURE
        }
      ],
      endpoint: 'https://httpbin.org/get',
      method: 'GET'
    }
  }
}

export const CREATE_ROSTER_PLAYER_REQUEST = 'CREATE_ROSTER_PLAYER_REQUEST'
export const CREATE_ROSTER_PLAYER_SUCCESS = 'CREATE_ROSTER_PLAYER_SUCCESS'
export const CREATE_ROSTER_PLAYER_FAILURE = 'CREATE_ROSTER_PLAYER_FAILURE'

export function createRosterPlayer (player) {
  return {
    [CALL_API_TOKEN]: {
      types: [
        {
          type: CREATE_ROSTER_PLAYER_REQUEST
        },
        {
          type: CREATE_ROSTER_PLAYER_SUCCESS,
          meta: {
            player: player
          }
        },
        {
          type: CREATE_ROSTER_PLAYER_FAILURE
        }
      ],
      endpoint: 'https://httpbin.org/post',
      method: 'POST',
      body: JSON.stringify({
        player: player
      })
    }
  }
}

export const UPDATE_ROSTER_PLAYER_REQUEST = 'UPDATE_ROSTER_PLAYER_REQUEST'
export const UPDATE_ROSTER_PLAYER_SUCCESS = 'UPDATE_ROSTER_PLAYER_SUCCESS'
export const UPDATE_ROSTER_PLAYER_FAILURE = 'UPDATE_ROSTER_PLAYER_FAILURE'

export function updateRosterPlayer (id, player) {
  return {
    [CALL_API_TOKEN]: {
      types: [
        {
          type: UPDATE_ROSTER_PLAYER_REQUEST
        },
        {
          type: UPDATE_ROSTER_PLAYER_SUCCESS,
          meta: {
            player: player
          }
        },
        {
          type: UPDATE_ROSTER_PLAYER_FAILURE
        }
      ],
      endpoint: 'https://httpbin.org/put',
      method: 'PUT',
      body: JSON.stringify({
        player: player
      })
    }
  }
}

export const DELETE_ROSTER_PLAYER_REQUEST = 'DELETE_ROSTER_PLAYER_REQUEST'
export const DELETE_ROSTER_PLAYER_SUCCESS = 'DELETE_ROSTER_PLAYER_SUCCESS'
export const DELETE_ROSTER_PLAYER_FAILURE = 'DELETE_ROSTER_PLAYER_FAILURE'

export function deleteRosterPlayer (id) {
  return {
    [CALL_API_TOKEN]: {
      types: [
        {
          type: DELETE_ROSTER_PLAYER_REQUEST
        },
        {
          type: DELETE_ROSTER_PLAYER_SUCCESS,
        },
        {
          type: DELETE_ROSTER_PLAYER_FAILURE
        }
      ],
      endpoint: 'https://httpbin.org/delete',
      method: 'DELETE'
    }
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const actions = {
  fetchRosterPlayers,
  createRosterPlayer,
  updateRosterPlayer,
  deleteRosterPlayer,
  setNewPlayerFirstName,
  setNewPlayerLastName
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [SET_NEW_PLAYER_FIRST_NAME]: (state, action) => {
    return state.setIn(['newPlayer', 'firstName'], action.value)
  },
  [SET_NEW_PLAYER_LAST_NAME]: (state, action) => {
    return state.setIn(['newPlayer', 'lastName'], action.value)
  },
  [FETCH_ROSTER_PLAYERS_REQUEST]: (state, action) => {
    return state
  },
  [FETCH_ROSTER_PLAYERS_SUCCESS]: (state, action) => {
    return state.set('roster', action.payload.roster)
  },
  [FETCH_ROSTER_PLAYERS_FAILURE]: (state) => {
    return state
  },
  [CREATE_ROSTER_PLAYER_REQUEST]: (state, action) => {
    return state
  },
  [CREATE_ROSTER_PLAYER_SUCCESS]: (state, action) => {
    return state.mergeDeep({
      players: state.get('players').push(action.meta.player),
      newPlayer: {
        firstName: '',
        lastName: ''
      }
    })
  },
  [CREATE_ROSTER_PLAYER_FAILURE]: (state) => {
    return state
  },
  [UPDATE_ROSTER_PLAYER_REQUEST]: (state, action) => {
    return state
  },
  [UPDATE_ROSTER_PLAYER_SUCCESS]: (state, action) => {
    // TODO: update state to reflect updated player
    return state
  },
  [UPDATE_ROSTER_PLAYER_FAILURE]: (state) => {
    return state
  },
  [DELETE_ROSTER_PLAYER_REQUEST]: (state, action) => {
    return state
  },
  [DELETE_ROSTER_PLAYER_SUCCESS]: (state, action) => {
    // TODO: update state to reflect deleted player
    return state
  },
  [DELETE_ROSTER_PLAYER_FAILURE]: (state) => {
    return state
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = Immutable.fromJS({
  players: [],
  newPlayer: {
    firstName: '',
    lastName: '',
    id: null
  },
  isNewPlayerFormVisible: false
})

export default function rosterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}

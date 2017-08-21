import { CALL_API } from 'redux-api-middleware'
const CALL_API_TOKEN = Symbol('Call API Token')
import { getToken } from 'utils/jwtHelper'

exports.CALL_API_TOKEN = CALL_API_TOKEN

export function apiTokenMiddleware ({ getState }) {
  return (next) => (action) => {
    const callAPIToken = action[CALL_API_TOKEN]

    if (!callAPIToken) {
      return next(action)
    }

    if (!callAPIToken.headers) {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + getToken()
      }

      callAPIToken.headers = headers
    } else {
      callAPIToken.headers['Authorization'] = 'Bearer ' + getToken()
    }

    callAPIToken.credentials = 'same-origin'
    callAPIToken.endpoint = encodeURI(callAPIToken.endpoint)
    action[CALL_API] = callAPIToken
    delete action[CALL_API_TOKEN]

    return next(action)
  }
}

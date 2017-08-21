import decode from 'jwt-decode'
import moment from 'moment'
import {parse} from 'utils/qs'
import {round} from 'utils/helpers'

export function decodeToken (token) {
  try {
    return decode(token)
  } catch (err) {
    logout()
    return null
  }
}

export function getTokenExpirationDate (token) {
  const decoded = decodeToken(token)
  if (decoded === null || !decoded.exp) {
    return null
  }

  // The 0 here is the key, which sets the date to the epoch
  const date = new Date(0)
  date.setUTCSeconds(decoded.exp)
  return date
}

export function getTokenSecondsRemaining (token) {
  const decoded = decodeToken(token)
  if (decoded === null || !decoded.exp) {
    return null
  }

  const startTime = moment()
  const endTime = moment(getTokenExpirationDate(token))
  const duration = moment.duration(endTime.diff(startTime))
  return round(duration.asSeconds(), 0)
}

export function isActivationToken (token) {
  const decoded = decodeToken(token)
  if (decoded === null || decoded.activationToken === undefined || decoded.activationToken === null) {
    return false
  }

  return true
}

export function isTokenExpired (token) {
  const date = getTokenExpirationDate(token)
  if (date === null) {
    return false
  }
  return !(date.valueOf() > new Date().valueOf())
}

export function parseHash (hash) {
  const hashStr = hash.replace(/^#?\/?/, '')
  const parsedQs = parse(hashStr)

  if (!parsedQs.hasOwnProperty('id_token') &&
    !parsedQs.hasOwnProperty('refresh_token')) {
    return null
  }

  if (isTokenExpired(parsedQs.id_token)) {
    return null
  }

  setToken(parsedQs.id_token)
  const profile = decodeToken(parsedQs.id_token)
  setProfile(profile)

  return true
}

export function parseReportHash (hash) {
  const hashStr = hash.replace(/^#?\/?/, '')
  const parsedQs = parse(hashStr)

  if (!parsedQs.hasOwnProperty('id_token') &&
    !parsedQs.hasOwnProperty('refresh_token')) {
    return null
  }

  if (isTokenExpired(parsedQs.id_token)) {
    return null
  }

  const reportData = decodeToken(parsedQs.id_token)
  return reportData
}

export function loggedIn () {
  // Checks if there is a saved token and it's still valid
  const token = getToken()
  if (decodeToken(token) === null) {
    return false
  }

  if (!!token && isActivationToken(token)) {
    return false
  }

  return !!token && !isTokenExpired(token)
}

export function setToken (idToken) {
  // Saves user ID token into local storage
  localStorage.setItem('id_token', idToken)
}

export function setProfile (profile) {
  // Saves profile data to localStorage
  localStorage.setItem('profile', JSON.stringify(profile))
}

export function getProfile () {
  // Retrieves the profile data from localStorage
  const profile = localStorage.getItem('profile')
  return profile ? JSON.parse(localStorage.profile) : {}
}

export function getToken () {
  // Retrieves the user token from localStorage
  return localStorage.getItem('id_token')
}

export function hasPermission (permission) {
  const token = localStorage.getItem('id_token')
  if (!token) {
    return false
  }

  const profile = decodeToken(token)
  if (!profile) {
    return false
  }

  const permissions = profile.permissions
  if (!permissions) {
    return false
  }

  return permissions.includes(permission)
}

export function hasRole (role) {
  const token = localStorage.getItem('id_token')
  if (!token) {
    return false
  }

  const profile = decodeToken(token)
  if (!profile) {
    return false
  }

  const roles = profile.roles
  if (!roles) {
    return false
  }

  return roles.includes(role)
}

export function logout () {
  // Clear user tokens and profile data from localStorage
  localStorage.removeItem('id_token')
  localStorage.removeItem('profile')
}

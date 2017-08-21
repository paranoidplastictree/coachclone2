import Immutable from 'immutable'
import moment from 'moment'

const searchProps = {
  users: ['firstName', 'lastName', 'username', 'email'],
  hospitals: ['name', 'avaSureSalesRepresentative']
}

function doesListHaveText (item, text, context) {
  return searchProps[context].some((prop) => {
    return item.get(prop) !== null ? item.get(prop).toLowerCase().indexOf(text) >= 0 : false
  })
}

export function filterList (items, searchText, context) {
  const lowerCase = searchText.toLowerCase()
  return items.filter((item) => {
    return doesListHaveText(item, lowerCase, context)
  })
}

export function sortList (list, sortBy, descending) {
  const sorted = list.sort((a, b) => {
    const aVal = a.get(sortBy)
    const bVal = b.get(sortBy)

    if (aVal > bVal) {
      return descending ? -1 : 1
    } else if (aVal < bVal) {
      return descending ? 1 : -1
    }
    return 0
  })

  return sorted
}

export function sortDateList (list, descending) {
  const sorted = list.sort((a, b) => {
    const aDate = moment(a)
    const bDate = moment(b)

    if (aDate < bDate) {
      return descending ? 1 : -1
    }
    if (aDate > bDate) {
      return descending ? -1 : 1
    }
    return 0
  })

  return sorted
}

export function roundListToFixed (list, roundBy, digits) {
  const listCopy = list.toJS()
  listCopy.forEach((item) => {
    item[roundBy] = parseFloat(item[roundBy]).toFixed(digits)
  })

  return Immutable.fromJS(listCopy)
}

export function numberWithCommas (value) {
  return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

export function monthValueToDescription (value) {
  switch (value) {
    case 1:
      return 'January'
    case 2:
      return 'Feburary'
    case 3:
      return 'March'
    case 4:
      return 'April'
    case 5:
      return 'May'
    case 6:
      return 'June'
    case 7:
      return 'July'
    case 8:
      return 'August'
    case 9:
      return 'September'
    case 10:
      return 'October'
    case 11:
      return 'November'
    case 12:
      return 'December'
    default:
      return 'Error'
  }
}

export function monthValueToAbbreviation (value) {
  switch (value) {
    case 1:
      return 'Jan'
    case 2:
      return 'Feb'
    case 3:
      return 'Mar'
    case 4:
      return 'Apr'
    case 5:
      return 'May'
    case 6:
      return 'Jun'
    case 7:
      return 'Jul'
    case 8:
      return 'Aug'
    case 9:
      return 'Sep'
    case 10:
      return 'Oct'
    case 11:
      return 'Nov'
    case 12:
      return 'Dec'
    default:
      return 'Error'
  }
}

export function verifyPassword (value) {
  if (value === undefined || value === null) {
    return false
  }

  const REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/
  return REGEX.test(value)
}

export function verifyEmail (value) {
  if (value === undefined || value === null) {
    return false
  }

  const REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
  return REGEX.test(value)
}

export function verifyUsername (value) {
  if (value === undefined || value === null) {
    return false
  }

  const REGEX = /^(?=.{1,})/
  return REGEX.test(value)
}

export function round (value, precision) {
  const multiplier = Math.pow(10, precision || 0)
  return Math.round(value * multiplier) / multiplier
}

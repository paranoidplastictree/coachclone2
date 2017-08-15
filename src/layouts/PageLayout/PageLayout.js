import React from 'react'
import { IndexLink, Link } from 'react-router'
import PropTypes from 'prop-types'
import './PageLayout.scss'

export const PageLayout = ({ children }) => (
  <div className='container text-center'>
    <h1>Coach Clone</h1>
    <IndexLink to='/' activeClassName='page-layout__nav-item--active'>Home</IndexLink>
    {' · '}
    <Link to='/counter' activeClassName='page-layout__nav-item--active'>Counter</Link>
    {' · '}
    <Link to='/roster' activeClassName='page-layout__nav-item--active'>Roster</Link>
    {' · '}
    <Link to='/games' activeClassName='page-layout__nav-item--active'>Games</Link>
    {' · '}
    <Link to='/reports' activeClassName='page-layout__nav-item--active'>Playtime Reports</Link>
    <div className='page-layout__viewport'>
      {children}
    </div>
  </div>
)
PageLayout.propTypes = {
  children: PropTypes.node,
}

export default PageLayout

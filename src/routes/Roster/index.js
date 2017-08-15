import { injectReducer } from '../../store/reducers'

export default (store) => ({
  path : 'roster',
  /*  Async getComponent is only invoked when route matches   */
  getComponent (nextState, cb) {
    /*  Webpack - use 'require.ensure' to create a split point
        and embed an async module loader (jsonp) when bundling   */
    require.ensure([], (require) => {
      /*  Webpack - use require callback to define
          dependencies for bundling   */
      const Roster = require('./containers/RosterContainer').default
      const reducer = require('./modules/roster').default

      /*  Add the reducer to the store on key 'counter'  */
      injectReducer(store, { key: 'roster', reducer })

      /*  Return getComponent   */
      cb(null, Roster)

    /* Webpack named bundle   */
    }, 'roster')
  }
})

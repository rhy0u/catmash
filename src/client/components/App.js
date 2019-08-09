import React from 'react'
import { Switch, Route } from 'react-router-dom'
import * as routes from 'client/routes'
import * as routePaths from 'client/utils/routePaths'

const App = () => {
  return (
    <Switch>
      <Route path={routePaths.home()} component={routes.Home} />
      <Route path={routePaths.ranking()} component={routes.Ranking} />
    </Switch>
  )
}
export default App

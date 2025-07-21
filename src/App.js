import {Route, Switch, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Profile from './components/Profile'
import JobDetails from './components/JobDetails'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'

const ProtectedRoute = ({component: Component, ...rest}) => (
  <Route
    {...rest}
    render={props =>
      Cookies.get('jwt_token') ? (
        <Component {...props} />
      ) : (
        <Redirect to='/login' />
      )
    }
  />
)

const App = () => {
  const token = Cookies.get('jwt_token')
  return (
    <Switch>
      <Route
        exact
        path='/login'
        render={props =>
          token ? <Redirect to='/' /> : <LoginForm {...props} />
        }
      />
      <ProtectedRoute exact path='/' component={Home} />
      <ProtectedRoute exact path='/profile' component={Profile} />
      <ProtectedRoute exact path='/jobs' component={Jobs} />
      <ProtectedRoute exact path='/jobs/:id' component={JobDetails} />
      <Route path='/not-found' component={NotFound} />
      <Redirect to='/not-found' />
    </Switch>
  )
}

export default App

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs'
import Home from './components/Home'
import JobDetails from './components/JobDetails'

import Login from './components/Login'

import './App.css'
import NotFound from './components/NotFound'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />

    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobDetails} />
    <NotFound />
  </Switch>
)

export default App

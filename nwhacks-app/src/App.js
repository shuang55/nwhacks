import './App.css';
import Login from './Components/Login';
import Expenses from './Components/Expenses';
import AllExpenses from './Components/AllExpenses';
import Dashboard from './Components/Dashboard';
import Register from './Components/Register';
import ImgDropzoneDialog from './Components/ImgUploadDialog';
import Logout from './Components/Logout';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
  createMuiTheme
} from "react-router-dom";

export default function App() {
  return (
      <Router>
          <div>
              <Switch>
                  <Route path="/login">
                      <div className="App">
                          <Login />
                      </div>
                  </Route>
                  <Route path="/register">
                      <div className="App">
                          <Register />
                      </div>
                  </Route>
                  <Route path="/expenses">
                      <div className="App">
                          <Expenses />
                      </div>
                  </Route>
                  <Route path="/allexpenses">
                      <div className="App">
                          <AllExpenses />
                      </div>
                  </Route>
                  <Route path="/dashboard">
                      <Dashboard />
                  </Route>
                  <Route path="/logout">
                      <Logout />
                  </Route>
                  <Route path="/">
                      <Redirect to="/login"></Redirect>
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

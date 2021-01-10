import './App.css';
import Login from './Components/Login';
import ExpenseCard from './Components/ExpenseCard';
import Register from './Components/Register';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect
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
                      <ExpenseCard />
                  </Route>
                  <Route path="/">
                      <Redirect to="/login"></Redirect>
                  </Route>
              </Switch>
          </div>
      </Router>
  );
}

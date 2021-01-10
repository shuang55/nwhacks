import './App.css';
import logo from './logo.svg';
import Login from './Components/Login';
import Header from './Components/Header';
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
          <div className="App">
              <Switch>
                  <Route path="/login">
                      <Login />
                  </Route>
                  <Route path="/register">
                      <Register />
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

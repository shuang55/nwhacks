import './App.css';
import logo from './logo.svg';
import Login from './Components/Login';
import Header from './Components/Header';
import ExpenseCard from './Components/ExpenseCard';
import Dashboard from './Components/Dashboard';
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
    <div className="App">
      <Switch>
        <Route path="/login">
          <Header />
          <Login />
        </Route>
        <Route path="/expenses">
          <ExpenseCard />
        </Route>
        <Route path="/dashboard">
          <Dashboard />
        </Route>
        <Route path="/">
          <Redirect to="/login"></Redirect>
        </Route>
      </Switch>
  </div>
  </Router>

  );
}

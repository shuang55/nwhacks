import './App.css';
import logo from './logo.svg';
import Login from './Components/Login';
import Header from './Components/Header';
import ExpenseCard from './Components/ExpenseCard';
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
          <Header />
          <Login />
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

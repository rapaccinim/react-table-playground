import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { MainPage } from "./pages/main";
import { Basic } from "./pages/basic"
import './App.css';

const App = () => {
  return (
    <Router>
      <header className="app-header">
        <img src={process.env.PUBLIC_URL + "/assets/react-table-logo.svg"} className="app-header__logo" />
        <div>React Table playground</div>
        <Link to="/">Home</Link>
        <Link to="/basic">Basic</Link>
      </header>
      <div className="app-container">
          <Switch>
            <Route exact path='/'>
              <MainPage/>
            </Route>
            <Route path='/basic'>
              <Basic/>
            </Route>
          </Switch>
      </div>
    </Router>
  );
}

export default App;

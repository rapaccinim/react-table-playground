/**
 * Main app component.
 */

import { BrowserRouter as Router, Link, Route, Switch } from "react-router-dom";
import { MainPage } from "./pages/main";
import { Basic } from "./pages/basic"
import { Pagination } from "./components/basic-components/pagination"
import { Sorting } from "./components/basic-components/sorting"
import { PaginationAndSorting } from "./pages/pagination-and-sorting"
import { Filter } from "./pages/filter"
import { PaginationSortingFilter } from "./pages/pagination-sorting-filter";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import styled from "styled-components";

const MenuLinks = styled.div`
  & * {
    display: inline-block;
    padding: 20px;
  }
`

const AppContainer = styled.div`
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const App = () => {
  return (
    <Router>
      <AppBar position="static" color="transparent">
      <Toolbar>
        <Link to="/">
          <img alt="React Table and TypeScript logo" src={process.env.PUBLIC_URL + "/assets/react-table-and-typescript-logo.svg"} className="app-header__logo" />
        </Link>
        <MenuLinks>
          <Link to="/basic">Basic Examples</Link>
          <Link to="/pagination-and-sorting">Pagination + Sorting</Link>       
          <Link to="/filter">Filter</Link>
          <Link to="/pagination-sorting-filter">Pagination + Sorting + Filter</Link>     
        </MenuLinks>
        </Toolbar>
      </AppBar>
      <AppContainer>
          <Switch>
            <Route exact path='/'>
              <MainPage/>
            </Route>
            <Route path='/basic'>
              <Basic/>
            </Route>
            <Route path='/pagination'>
              <Pagination/>
            </Route>
            <Route path='/sorting'>
              <Sorting/>
            </Route>
            <Route path='/pagination-and-sorting'>
              <PaginationAndSorting/>
            </Route>
            <Route path='/filter'>
              <Filter/>
            </Route>
            <Route path='/pagination-sorting-filter'>
              <PaginationSortingFilter/>
            </Route>
          </Switch>
      </AppContainer>
    </Router>
  );
}

import React, { Component } from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import 'typeface-roboto';
import Container from '@material-ui/core/Container';
import "./App.css";
import CreateItem from "./components/CreateItem";
import EditItem from "./components/EditItem";
import ItemList from "./components/ItemList";
import Button from '@material-ui/core/Button';


class App extends Component {
  
  render() {
    return (
      <div className="main-container">
      <Router>
        <Container maxWidth="sm" className="content-wrapper">
          <h2>Family Shopping App</h2>
          <nav className="nav-bar">
            <Button className="button">
              <Link to="/" className="nav-link">VIEW ALL ITEMS</Link>
            </Button>
            <Button>
              <Link to="/create" className="nav-link">ADD NEW ITEM</Link>
            </Button>
          </nav>
          <Route path="/" exact component={ItemList} />
          <Route path="/edit/:id" component={EditItem} />
          <Route path="/create" component={CreateItem} />
        </Container >
      </Router>
      </div>
    );
  }
}

export default App;
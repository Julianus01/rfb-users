import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/navbar/navbar.jsx';
import Users from './components/users/users.jsx';
import Home from './components/home/home.jsx';
import Blog from './components/blog/blog.jsx';

class App extends Component {

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Navbar />

            <Route exact path='/' component={Home} />
            <Route exact strict path='/home' component={Home} />
            <Route exact strict path='/blog' component={Blog} />
          </div>
        </Router>
      </div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Login from './Login';
import Message from './Message';

class App extends Component {

  state = { complete: false };

  submit = e => {
    e.preventDefault();
    this.setState({ complete: true });
  };

  render() {
    return (
      < div className="App" >
        {
          this.state.complete ? <Message /> : <Login submit={this.submit} />
        }
        <header className="App-header">
          <nav className="navbar" role="navigation">
            <ul>
              <li className="nav-li"><a href="#!">Home</a></li>
              <li className="nav-li"><a href="#!">About</a></li>
              <li className="nav-li"><a href="#!">Features</a></li>
              <li className="nav-li"><a href="#!">Docs</a></li>
            </ul>
          </nav>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
        </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
        </a>
        </header>
      </div >
    );
  }
}

export default App;

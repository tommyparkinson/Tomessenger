import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useStateValue } from "./StateProvider";
import Media from 'react-media';


function App() {

  const [{user}, dispatch] = useStateValue();

     

  return (

    //BEM naming convention
    <div className="app">
      {!user ? (
        <Login />
      ) : (
      <div className="app__body" id="app__body">
 
      <Media query="(max-width: 767px)">
        {matches => matches ? (
        <Router>
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
              <Sidebar />
            </Route>
          </Switch>
        </Router>
        ) : (
        <Router>
          <Sidebar />
          <Switch>
            <Route path="/rooms/:roomId">
              <Chat />
            </Route>
            <Route path="/">
              <Chat />
            </Route>
          </Switch>
        </Router>
        )}
      </Media>

      </div>
      )}
    </div>
  );
}

export default App;

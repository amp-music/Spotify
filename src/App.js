import './App.css';
import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';

import Home from './Home';
import Callback from './Callback';
import Artist from './Artist';


function App() {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/callback" component={Callback}/>
                <Route path="/:id" component={Artist}/>
            </Switch>
        </Router>
    );
}


export default App;

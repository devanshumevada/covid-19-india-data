import React from 'react';
import {BrowserRouter,Route, Switch} from 'react-router-dom';
import App from './App';
import StateInfo from './state_components/StateInfo';

const Home = () => {
    return (
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App} />
            <Route path="/state/:name" component={StateInfo} />
        </Switch>
    </BrowserRouter>
    );
   
}

export default Home;
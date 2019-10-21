import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';


export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>   
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/new" component={New} />
            </Switch>
        </BrowserRouter>
    );
}

//Por padrão, o comportamento do Router no react, é que ele deixa mais de uma rota ser chamada ao mesmo tempo. O <Switch> 
//vai garantir que apenas uma rota seja executada por vez
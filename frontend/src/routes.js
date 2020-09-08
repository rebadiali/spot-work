import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import New from './pages/New';
import Edit from './pages/Edit';
import EditImg from './pages/EditImg';
//import Bookings from './pages/Bookings';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login} />
                <Route path="/dashboard" component={Dashboard} />
                <Route path="/new" component={New} />
                <Route path="/bookings" component={New} />
                <Route path="/spot/edit/:id" component={Edit} />
                <Route path="/spot/edit-image/:id" component={EditImg} />
            </Switch>
        </BrowserRouter>
    );
}
import React from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';
import history from '#root/helpers/history';
import LoginPage from '#root/pages/LoginPage';
import MainPage from '#root/pages/MainPage';
import RegisterPage from '#root/pages/RegisterPage';


const Routes = () => {
    return (
        <BrowserRouter history={history}>
            <Switch>
                <Route exact path="/" component={MainPage} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
            </Switch>
        </BrowserRouter>
    );
};

export default Routes;
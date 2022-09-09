import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import CardPage from './pages/CardPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Home } />
        <Route exact path="/cart" component={ Cart } />
        <Route exact path="/cardpage/:id" component={ CardPage } />
      </Switch>

    </BrowserRouter>
  );
}

export default App;

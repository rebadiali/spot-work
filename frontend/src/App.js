import React from 'react';

import './App.css';

import logo from './assets/logo.svg';

import Routes from './routes';

function App() {
  

  return (
    <div className="container-new">
      <img src={logo} alt="Spot Work"/>

      <div className="wrapper d-flex justify-content-center">
        <Routes />
      </div>
    </div>
  );
}

export default App;

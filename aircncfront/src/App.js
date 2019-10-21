import React from 'react'; //use state para criarmos o state na nossa aplicação
import './App.css';

import logo from  './assets/logo.svg';

import Routes from './routes'; // e vou colocar minhas rotas dentro do meu content

function App() {
  return (
      <div className="container">
        <img src={logo} alt="AirCnC"/>

        <div className="content">
          <Routes />
        </div>  
      </div>
  );
}

export default App;

import logo from './logo.svg';
import './App.css';

import { ComboBox } from '@carbon/react';


import React, { useState } from 'react';
import Home from './pages/home/home';
import Login from './pages/login/login';

function App() {

  const [isLogged, setLogged] = useState(false);

  if (isLogged) return (<Home/>);
  else return (<Login/>);
}

export default App;

import './App.css';
import React, { useState } from 'react';


import Home from './Pages/Home/home';
import Login from './Pages/Login/login';



function App() {

  const [isAuth, setAuth] = useState(true);

  if (isAuth) return (<Home/>);
  else return (<Login/>);
}

export default App;
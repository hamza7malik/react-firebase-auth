import React, { Component } from 'react';
import './App.css';
import Home from './routes/home/home.routes';
import { Routes, Route } from 'react-router-dom';
import Navigation from './routes/navigation/navigation.component';
import Authentication from './routes/authentication/authentication.route';

//6:50
const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index={true} element={<Home />} />
        <Route path='auth' element={<Authentication />} />
      </Route>
    </Routes>
  );
};

export default App;

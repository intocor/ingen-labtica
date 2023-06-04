import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import './App.css';
import RouterConfig from './RouterConfig';
import Header from './components/Header/Header';

export default function App() {
  return (
    <Router>
    <Header />
    <RouterConfig />
    </Router>
  );
}


import React from 'react';
import {Routes, Route, Navigate} from 'react-router-dom';
import About from './components/About/About';
import LoginPage from './components/LoginPage/LoginPage';
import SignIn from './components/SignInPage/SignInPage';
import LandingPage from './components/LandingPage/LandingPage';
import Labinput from './components/LabInput/LabInput';
import Laboutput from './components/LabOutput/LabOutput';

const RouterConfig = () => {
    return (
        <Routes>
        <Route exact path="/" element={<LandingPage />}></Route>
        <Route exact path="/about" element={<About />} /> 
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/labinput" element={<Labinput />} />
        <Route exact path="/laboutput/:resultid" element={<Laboutput />} />
        <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
};


export default RouterConfig;
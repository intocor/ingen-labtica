import React, { useEffect, useState } from 'react';
import './LoginPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { CgGoogle } from 'react-icons/cg';
import { useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
import { auth } from '../../Firebase';

const LoginPage = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
  
        // Redirect to the labinput page only if user is logged in
        if (user) {
          navigate('/labinput');
        }
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };
  

  return (
    <div className="container-fluid login-background">
      <p className="welcome">Welcome to LabTICA!</p>
      <p className="login-description">Please log in to proceed to your CBC test results and personalized health</p>
      <p className="login-description">recommendations. Our secure platform ensures your privacy and confidentiality.</p>

      <div className="row">
        <div className="col d-flex justify-content-center">
          <button className="btn-login border border-0 rounded-5" onClick={handleGoogleLogin}>
            <CgGoogle />Continue with Google
          </button>
        </div>
      </div>

      <div className="row mt-4"></div>
      <div className="col d-flex justify-content-center">
        <hr className="line1 border border-1 opacity-100" />
        <p className="or mx-3">Or</p>
        <hr className="line1 border border-1 opacity-100" />
      </div>


      <div className="row mt-2">
        <div className="col d-flex justify-content-center">
          <button className="btn-signup border border-0 rounded-5" onClick={() => {
            navigate('/login'); // Corrected navigation to the login page
          }}>
            <CgGoogle />Register with Google
          </button>
        </div>
      </div>

      <div className="signup-link mt-4">
        <p>Don't have an account yet?</p>
      </div>
    </div>
  );
};

export default LoginPage;

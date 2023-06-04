import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min.js';
import React, { useState } from 'react';
import { MdAccountCircle } from 'react-icons/md';
import { auth } from '../../Firebase';
import './Header.css';

function Header() {

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isClicked, setClick] = useState(false);

    const updateUser = (currentUser) => {
        setUser(currentUser);
        setLoading(false);
    };

    auth.onAuthStateChanged(updateUser);

    const handleProfileClick = () => {
        setClick(!isClicked);
    };

    const handleLogout = () => {
        auth.signOut();
        alert("Logged out successfully!")
    };
    return (
        <nav className="navbar navbar-expand-md bg-white">
            <div className="container-fluid">
                <a className="navbar-brand" href="/LandingPage">
                    <img src="/logo-cor.png" />
                </a>
                <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#navbarOffcanvas" aria-controls="navbarOffcanvas" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>


                <div className="offcanvas offcanvas-size-sm offcanvas-end offcanvas-width" tabIndex="-1" id="navbarOffcanvas" aria-labelledby="navbarOffcanvasLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="navbarOffcanvasLabel">Menu</h5>
                        <button type="button" className="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul className="navbar-nav navmargin">
                            <li className="nav-item me-3">
                                <a className="nav-link" href="/">Home</a>
                            </li>
                            <li className="nav-item me-3">
                                <a className="nav-link" href="/labinput">Test</a>
                            </li>
                            <li className="nav-item me-3">
                                <a className="nav-link" href="/about">About</a>
                            </li>
<li className="nav-item d-flex justify-content-center" style={(user || loading) ? { marginRight: loading ? '5.4rem' : '0' } : {}}>
{loading ? (
    <div className="mt-2 spin">
    <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
    </div>
    </div>
) : user ? (
    <div className="spin">
    <div onClick={handleProfileClick}>
        <img src={user.photoURL} id="acc-photo" alt="Profile" className="rounded-circle" />
    </div>
    {isClicked && (
        <div className="acc-dropdown">
        <a className="dropdown-item" href="/login" onClick={handleLogout}>Logout</a>
        </div>
        )}
    </div>
) : (
    <a className="nav-link" href="/login">
        <MdAccountCircle /> Login
    </a>
)}
</li>

                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    );
}

export default Header;
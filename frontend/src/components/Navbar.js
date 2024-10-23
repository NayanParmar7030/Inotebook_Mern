import React, { useContext, useEffect, useState } from 'react';
import { Link, useLocation } from "react-router-dom";
import SignupModal from './SignupModal';
import LoginModal from './LoginModal';
import { useNavigate  } from 'react-router-dom';

import Notescontext from '../context/NotesContext';
const Navbar = () => {
  const location = useLocation();
  const [modalVisible, setModalVisible] = useState(false);
  const [loginModalVisible, setloginModalVisible] = useState(false);

  const NotescontextData = useContext(Notescontext);
  const {logout,tokenData,storeToken} = NotescontextData;
  const navigate  = useNavigate();
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  
  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/');

  }

  const handleLoginCloseModal = () => {
    setloginModalVisible(false);
  };

  const handleLoginOpenModal = () => {
    setloginModalVisible(true)
  }

  const handleLoginData = (token) => {
    if(token){
      storeToken(token);
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Navbar</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/' ? "active" : ''}`} aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/about' ? "active" : ''}`} to="/about">About</Link>
              </li>
            </ul>
            <div className="d-flex">
              {
              !tokenData ? (
                <>
                <button type="button" className="btn btn-light me-2" onClick={handleOpenModal}>Signup</button>
                <button type="button" className="btn btn-light me-2" onClick={handleLoginOpenModal}>Login</button>
                </>
              ):
              <button type="button" className="btn btn-light me-2" onClick={handleLogout}>Logout</button>
              }
              
            </div>
            <SignupModal
              show={modalVisible}
              onClose={handleCloseModal}
            />
            <LoginModal
              show={loginModalVisible}
              onClose={handleLoginCloseModal}
              handleLoginData = {handleLoginData}
            />
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;

import React from 'react';
//import the link component from react-router-dom
import { Link } from 'react-router';
// Import the logo image 
import logo from '../../../assets/images/logo.png';
import loginService from '../../../services/login.service.jsx';
import {useAuth}  from '../../../Context/AuthContext.jsx';
function Header(props) {
  //use the custom hook to access the data in the context
  const {isLogged,setIsLogged,employee}=useAuth();
 
  //console.log(useAuth())
// logout event handler function
const logOut=()=>{
  //call the logout function from the login service
  loginService.logOut();
  //Set the isLogged state to false
  setIsLogged(false);
}

  return (
      <div>
        <header className="main-header header-style-one">
          <div className="header-top">
            <div className="auto-container">
              <div className="inner-container">
                <div className="left-column">
                  <div className="text">Enjoy the Beso while we fix your car</div>
                  <div className="office-hour">Monday - Saturday 7:00AM - 6:00PM</div>
                </div>
                <div className="right-column">
                  {isLogged ? (
                    <div className="link-btn">
                      <div className="phone-number"><strong>Welcome {employee?.employee_first_name}</strong></div>
                    </div>
                  ) : (
                    <div className="phone-number">Schedule Appointment: <strong>+251-920-929-067   </strong> </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="header-upper">
            <div className="auto-container">
              <div className="inner-container">
                <div className="logo-box">
                  <div className="logo"><a href="/"><img src={logo} alt="" /></a>
                  </div>
                </div>
                <div className="right-column">
                  <div className="nav-outer">
                    <div className="mobile-nav-toggler"><img src="assets/images/icons/icon-bar.png" alt="" />
                    </div>
                    <nav className="main-menu navbar-expand-md navbar-light">
                      <div className="collapse navbar-collapse show clearfix" id="navbarSupportedContent">
                        <ul className="navigation">
                          <li className="dropdown"><a href="/">Home</a>
                          </li>
                          <li className="dropdown"><a href="/about">About Us</a>
                          </li>
                          <li className="dropdown"><a href="/services">Services</a>
                          </li>
                          <li><a href="/contact">Contact Us</a></li>
                        </ul>
                      </div>
                    </nav>
                  </div>
                  <div className="search-btn"></div>
                  {isLogged ? (
                    <div className="link-btn">
                      <Link to="/" className="theme-btn btn-style-one blue" onClick={logOut} >Log out</Link>
                    </div>
                  ) : (
                    <div className="link-btn">
                      <Link to="/login" className="theme-btn btn-style-one">Login</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="sticky-header">
            <div className="header-upper">
              <div className="auto-container">
                <div className="inner-container">
                  <div className="logo-box">
                    <div className="logo"><a href="/"><img src="assets/images/custom/logo.png" alt="" /></a>
                    </div>
                  </div>
                  <div className="right-column">
                    <div className="nav-outer">
                      <div className="mobile-nav-toggler"><img src="assets/images/icons/icon-bar.png" alt="" />
                      </div>
  
                      <nav className="main-menu navbar-expand-md navbar-light">
                      </nav>
                    </div>
                    <div className="search-btn"></div>
                    <div className="link-btn"><a href="/login" className="theme-btn btn-style-one">Login</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mobile-menu">
            <div className="menu-backdrop"></div>
            <div className="close-btn"><span className="icon flaticon-remove"></span></div>
  
            <nav className="menu-box">
              <div className="nav-logo"><a href="index.html">
                <img src="assets/images/logo-two.png" alt=""
                  title="" /></a></div>
              <div className="menu-outer">
  
              </div>
  
            </nav>
          </div>
  
          <div className="nav-overlay">
            <div className="cursor"></div>
            <div className="cursor-follower"></div>
          </div>
        </header>
      </div>
    );
  }
  
  export default Header;
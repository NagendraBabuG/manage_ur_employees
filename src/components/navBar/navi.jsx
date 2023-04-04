import React, { useState, useContext, Fragment, Link } from "react";
import { NavLink, Outlet } from "react-router-dom";
import { useCookies } from 'react-cookie'
//import "./navBar.scss"
import './navi.css'
import { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faXmark} from "@fortawesome/free-solid-svg-icons";
import { UserContext } from "../../contexts/userContext"
import { signOutUser } from "../../utils/firebase"
import { Navigate, useNavigate } from "react-router-dom";
import Profile from "../profile/profile";

const Navigation = () => {
  const [mobile, setMobile] = useState(false);
  const [click, setClick] = useState(false);
  const [isLoginned, setLogin] = useState(false);
  const [cookies, setCookie, removeCookie] = useCookies(["nbk"]);
  const handleClick = () => setClick(!click);
  const navigate = useNavigate()
  const { currentUser, setCurrentUser } = useContext(UserContext)
  useEffect(() => {
    if (cookies['nbk']) setLogin(true);
    else setLogin(false)


  }, [cookies])

  console.log(currentUser)
  const signOutHandler = async () => {
    await signOutUser();
    //  removeCookie(["user"])
    removeCookie('nbk')
    console.log('navigting')
    setCurrentUser(null);
    sessionStorage.clear()
    navigate("/signin")
    //<Navigate to='/signin'/>

  }
  const toggleClick = (event) => {
    event.preventDefault()
    setMobile(mobile => !mobile)
  }
  const toggleButtonStyles = {

  }
  return (


    <Fragment>
      <div className="nav-container">

        <div className="logo">
          <NavLink to="/" className="nav-logo">
            EMS

          </NavLink>
        </div>

        <ul className="links" id="navBar-List">
          <li className="nav-item">
            {!isLoginned ? <NavLink

              to="/"

              className="nav-links"
            >
              Home
            </NavLink> : <NavLink to='/dashboard' className='nav-links'>Dashboard</NavLink>}
          </li>
          <li className="nav-item">
            {!isLoginned && <NavLink

              to="/signup"

              className="nav-links"
            >
              Signup
            </NavLink>}
          </li>
          {
          isLoginned&&
          <li className="nav-item">
            <NavLink to='/profile' className='nav-links'>
              Profile
            </NavLink>
          </li>
          }
          <li className="nav-item">
            {
              isLoginned ? (<NavLink

                to="/signin"

                className="nav-links"
                onClick={signOutHandler}
              >
                LogOut
              </NavLink>) : (<NavLink

                to="/signin"

                className="nav-links"
              >
                Signin
              </NavLink>)
            }
          </li>
          
          <li className="nav-item">
            <NavLink

              to="/about"
              className="nav-links"
            >
              About
            </NavLink>
          </li>
        </ul>
        <div className="toggle_button" onClick={toggleClick}>
          <FontAwesomeIcon icon={mobile ? faXmark : faBars} />
        </div>
      </div>
      <div className={`dropdown-menu${mobile ? ' open' : ''}`}>
        <li>
          {!isLoginned ? <NavLink to="/"> Home </NavLink> : <NavLink to='/dashboard'>Dashboard</NavLink>}
        </li>
        <li>
          {!isLoginned && <NavLink to="/signup"> Signup </NavLink>}
        </li>
        <li>
          {
            isLoginned ? (<NavLink to="/signin" onClick={signOutHandler}> SignOut </NavLink>) :
             (<NavLink to="/signin"> Signin </NavLink>)
          }
        </li>
        <li>
          <NavLink to="/about"> About </NavLink>
        </li>
      </div>
      <Outlet />
    </Fragment>


  );
}

export default Navigation;
import React from 'react'
import "./nav.css";
import logo from '../../images/newlogo.svg';
import {Button} from './button/Button';
import { Link, useNavigate, redirect  } from 'react-router-dom';
import { useUser } from '../../UserSession';


export default function Navbar() {
    const navigate = useNavigate ();
    const {user ,setLoggedUser, isAdmin, setAdminStatus} = useUser();

    const handleLogOut =() => {
        setLoggedUser(null);
        setAdminStatus(false);
        navigate('/about');
      }
      const handleLogoClick =() => {
        navigate('/');
      }
      const handleProfileClick =() => {
        navigate('/signin');
      }
    return (
        <div className='navbar'>
            <div className='navbar-container-logo'>
                <img className='logo' src={logo} onClick={handleLogoClick} alt=""/>
                {/* <h2 className='logo-title'>HydroSec</h2> */}
            </div>
            <div className='navbar-container-links'>
                <div className='navbar-links'> 
                    <ul className='custom-ul'><li><Link to='/news' className='custom-link'>News</Link></li></ul>
                    <ul className='custom-ul'><li><Link to='/about' className='custom-link'>About</Link></li></ul>
                    <ul className='custom-ul'><li><Link to='/employee' className='custom-link'>For Employees</Link></li></ul>
                </div>
                <div className='navbar-end-button'>
                    <Link to='/signup'><Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary'>sign up</Button></Link>
                </div>
            </div>
        </div>
    )
}

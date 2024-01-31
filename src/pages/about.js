import React from 'react';
import './about.css'
import { Button } from './components/button/Button';
import about from '../images/about.svg'
import Navbar from './components/nav';

export default function About() {
  return (
    <>
        <Navbar/>
        <div className='about' id="about">
            <div className='about-content'>
                <h1 className='about-header'>About <span className='different-color'>HydroSec</span></h1>
                <p1 className='about-para'>
                    Welcome to <span className='different-color'>HydroSec</span>, where we are redefining the energy landscape with our cutting-edge hydro solutions. At the heart of our commitment lies a dedication to empowering our customers with knowledge and control over their energy consumption.
                </p1>
                <br/>
                <p1 className='about-para'>
                    Security is paramount in our commitment to you. Our platform employs state-of-the-art measures to safeguard your data, ensuring that your information is always secure. You can have confidence in the reliability of our site, knowing that your energy details are protected, allowing you to focus on what matters most – utilizing sustainable energy to power your life.
                </p1>
                <span className='about-buttom'>
                    <Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary' >Learn More</Button>
                </span>
            </div>
            <div className='about-img'>
                <img className='aboutpic' src={about} alt=""/>
            </div>

        </div>
    </>
  )
}

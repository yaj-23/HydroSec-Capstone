import React from 'react';
import './homepage.css'
import { Link } from 'react-router-dom';
import { useUser } from '../UserSession';
import Navbar from './components/nav';
import { Button } from './components/button/Button';
import homepageImg from '../images/homepage.svg';
import transparent from '../images/transparent.svg' ;
import inclusivity from '../images/inclusivity.svg' ;
import security from '../images/security.svg' ;

import Card  from './components/card/Card';
import DailyUsageLineChart from './components/chart/chart';
import dailyUsageData from './components/test-data/dailyUsageDaata';
import monthCostData from './components/test-data/monthCostData';
import MonthlyCostLineChart from './components/chart/monthlychart';
export default function Homepage() {

    const {user ,setLoggedUser} = useUser();
    const testData = dailyUsageData;
    const test2Data = monthCostData;

  return (
    <>
      <Navbar/>
      <div className='homepage-layer1'>
        <div className='homepage-text'>
          <h1 className='header-text'>
            Flowing Progress,<br/>
            Surging Sustainability,<br/>
            <span className='different-color'>Enriching Communities</span>
          </h1>        
        </div>
        <div className='homepage-img'>
          <img className='homepic' src={homepageImg} alt=""/>
        </div>
      </div>
      <div className='homepage-layer2'>
        <div className = "homepage-buttons">
                <Link to='/signup'><Button buttonColor='primary' buttonSize='btn-medium' buttonStyle='btn-primary'>Learn More</Button></Link>
                {user != null && <Link to='/dashboard'><Button buttonColor='secondary' buttonSize='btn-medium' buttonStyle='btn-secondary'>Customer Portal</Button></Link>}
                {user == null && <Link to='/signin'><Button buttonColor='secondary' buttonSize='btn-medium' buttonStyle='btn-secondary'>Customer Portal</Button></Link>}
        </div>
      </div>
      <div className='homepage-layer3'>
        <h1 className='subheader-text'>
          Manage your complete
          <span className='different-color'> energy </span>
          usage online
        </h1>        

        <div className='cards'>
        <Card
          icon={transparent}
          heading="Transparency"
          sentences="We believe in transparency as the foundation of trust, sharing insights openly to foster a community where everyone is informed."
        />
        <Card
          icon={inclusivity}
          heading="Inclusivity"
          sentences="At our core, we embrace diversity and inclusion, uniting perspectives to drive innovation in every ripple of our hydro energy journey."
        />
        <Card
          icon={security}
          heading="Security"
          sentences="We prioritize security, ensuring that our hydro solutions safeguard against any potential threats delivering reliability you can count on."
        />
          
        </div>

      </div>
    </>
  )
}


import React from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faClock } from '@fortawesome/free-solid-svg-icons'; // Import FontAwesome icons
import WeatherDisplay from './WeatherDisplay';

export default function Navbar() {

  const today = new Date();
  let hours = today.getHours();
  let meridiem = "AM"

  if (hours >= 12) {
    meridiem = 'PM';
    if (hours > 12) {
      hours -= 12;
    }
  }
  return (
    <section className='container-fluid p-0'>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container">
          {/* Font Awesome icon for the logo */}
          <NavLink className="navbar-brand" to="/">
            <FontAwesomeIcon icon={faBook} className="logo-icon" style={{ fontSize: '25px', fontWeight: 'bold' }} />
            <span className="logo-text" style={{ fontSize: '35px', fontWeight: 'bold' }}>Journify</span>
          </NavLink>
          <div className='d-flex align-items-center gap-3'>
            {/* WeatherDisplay component is rendered directly */}
            <WeatherDisplay />
            <div className='d-flex p-2 align-items-center'>
              <FontAwesomeIcon icon={faClock} className='weather-icon' />
              <p className='text-light m-0'>{hours.toString().padStart(2, "0")}:</p>
              <p className='text-light m-0'>{today.getMinutes().toString().padStart(2, "0")} {meridiem}</p>
            </div>
          </div>
        </div>
      </nav>
    </section>
  );
}
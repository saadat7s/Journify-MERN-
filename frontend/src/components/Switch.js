import React, { useContext } from 'react';
import { ThemeContext } from '../App';
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Switch.css'

function Switch() {
  const { toggleDarkMode } = useContext(ThemeContext);
  return (
    <>
      {/* <div>
      <label className='toggleBG'>
        <input type='checkbox' onClick={toggleDarkMode} />
        <span className='circle'/>
      </label>
    </div> */}
      <div>
        <label className="toggleBg">
          <input type="checkbox" onClick={toggleDarkMode} />
          <span className="switch">
          </span>
          <span className="selector">
            <FontAwesomeIcon className="Sun" size="lg" icon={faSun} style={{ color: "#f9c815" }} />
            <FontAwesomeIcon className="Moon" size="lg" icon={faMoon} flip="horizontal" />
          </span>
        </label>
      </div>
    </>
  );
}

export default Switch;
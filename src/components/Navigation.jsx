import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import logo from '../assets/images/logo.png';

function Navigation() {
  const location = useLocation();

  const handleNavClick = () => {
    // 네비게이션 클릭 시 페이지 전환 표시
    sessionStorage.setItem('pageTransition', 'true');
  };

  return (
    <nav className="navigation">
      <Link to="/" className="nav-logo" onClick={handleNavClick}>
        <img src={logo} alt="mindforest logo" className="logo-icon" />
      </Link>
      <ul className="nav-menu">
        <li>
          <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`} onClick={handleNavClick}>
            메인
          </Link>
        </li>
        <li>
          <Link to="/service" className={`nav-item ${location.pathname === '/service' ? 'active' : ''}`} onClick={handleNavClick}>
            서비스 소개
          </Link>
        </li>
        <li>
          <Link to="/dictionary" className={`nav-item ${location.pathname === '/dictionary' ? 'active' : ''}`} onClick={handleNavClick}>
            감정 동물 사전
          </Link>
        </li>
        <li>
          <Link to="/execute" className={`nav-item ${location.pathname === '/execute' ? 'active' : ''}`} onClick={handleNavClick}>
            실행하기
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navigation;
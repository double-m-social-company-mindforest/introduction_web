import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './ServiceIntro.css';

function ServiceIntro({ shouldAnimate = false }) {
  const [animate, setAnimate] = useState(false);
  const [hasTransitioned, setHasTransitioned] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // 페이지 전환 상태를 sessionStorage에서 확인
    const isTransition = sessionStorage.getItem('pageTransition') === 'true';
    
    // ServiceIntro 페이지에서는 항상 애니메이션 실행
    // (새로고침, 네비게이션 클릭, 스크롤 전환 모두 포함)
    if (location.pathname === '/service' || isTransition || shouldAnimate) {
      const timer = setTimeout(() => {
        setAnimate(true);
        setHasTransitioned(true);
        // 애니메이션 후 전환 상태 초기화
        sessionStorage.removeItem('pageTransition');
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [shouldAnimate, location.pathname]);

  return (
    <div className="service-intro-page">
      <div className={`service-intro-content ${animate ? 'animate' : ''}`}>
        <p className="subtitle">게임처럼 간편하게 시작하는 상담</p>
        <h1>진짜 나와 마주하는 시간</h1>
        <p className="description">32가지 감정 유형, 나를 닮은 캐릭터와 성장하는 상담 여정</p>
        <p className="detail">심리상담부터 AI 상담, 명상, 감정 일기, 음악, 게임, 미술 치료까지 경험해보세요</p>
      </div>
    </div>
  );
}

export default ServiceIntro;
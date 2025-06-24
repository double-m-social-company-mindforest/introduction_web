import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './HorizontalScroll.css';
import Main from '../pages/Main/Main.jsx';
import ServiceIntro from '../pages/ServiceIntro/ServiceIntro.jsx';
import EmotionDictionary from '../pages/EmotionDictionary/EmotionDictionary.jsx';
import Execute from '../pages/Execute/Execute.jsx';

function HorizontalScroll() {
  const navigate = useNavigate();
  const location = useLocation();
  const containerRef = useRef(null);
  
  const pages = [
    { path: '/', component: Main },
    { path: '/service', component: ServiceIntro },
    { path: '/dictionary', component: EmotionDictionary },
    { path: '/execute', component: Execute }
  ];

  // 초기 인덱스를 현재 경로에 맞게 설정
  const getInitialIndex = () => {
    const index = pages.findIndex(page => page.path === location.pathname);
    return index !== -1 ? index : 0;
  };

  const [currentIndex, setCurrentIndex] = useState(getInitialIndex);
  const [isScrolling, setIsScrolling] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const [showLoader, setShowLoader] = useState(true);
  const [animatePages, setAnimatePages] = useState(new Set());
  const [scrollAccumulator, setScrollAccumulator] = useState(0);
  const scrollThreshold = 100; // 스크롤 임계값

  useEffect(() => {
    const index = pages.findIndex(page => page.path === location.pathname);
    if (index !== -1) {
      setCurrentIndex(index);
    }
    // 초기화 완료 표시
    if (!isInitialized) {
      setIsInitialized(true);
      // 짧은 지연 후 로더 숨김
      setTimeout(() => {
        setShowLoader(false);
      }, 300);
    }
  }, [location.pathname, isInitialized]);

  useEffect(() => {
    const handleWheel = (e) => {
      if (isScrolling || isTransitioning) return;

      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        
        // 스크롤 축적값 업데이트
        const newAccumulator = scrollAccumulator + e.deltaY;
        setScrollAccumulator(newAccumulator);
        
        // 임계값을 넘었을 때만 페이지 전환
        if (Math.abs(newAccumulator) >= scrollThreshold) {
          if (newAccumulator > 0 && currentIndex < pages.length - 1) {
            // 다음 페이지로
            setIsScrolling(true);
            setIsTransitioning(true);
            setScrollAccumulator(0); // 축적값 초기화
            
            setTimeout(() => {
              const nextIndex = currentIndex + 1;
              setCurrentIndex(nextIndex);
              navigate(pages[nextIndex].path);
              setIsTransitioning(false);
              setAnimatePages(prev => new Set([...prev, nextIndex]));
            }, 400);
            
            setTimeout(() => {
              setIsScrolling(false);
            }, 1000);
          } else if (newAccumulator < 0 && currentIndex > 0) {
            // 이전 페이지로
            setIsScrolling(true);
            setIsTransitioning(true);
            setScrollAccumulator(0); // 축적값 초기화
            
            setTimeout(() => {
              const prevIndex = currentIndex - 1;
              setCurrentIndex(prevIndex);
              navigate(pages[prevIndex].path);
              setIsTransitioning(false);
              setAnimatePages(prev => new Set([...prev, prevIndex]));
            }, 400);
            
            setTimeout(() => {
              setIsScrolling(false);
            }, 1000);
          }
        }
        
        // 축적값이 너무 커지지 않도록 제한
        if (Math.abs(newAccumulator) > scrollThreshold * 2) {
          setScrollAccumulator(0);
        }
      }
    };

    // 스크롤 축적값 자동 감소 (일정 시간 후)
    const resetTimer = setTimeout(() => {
      if (Math.abs(scrollAccumulator) > 0) {
        setScrollAccumulator(scrollAccumulator * 0.8); // 20% 감소
      }
    }, 150);

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => {
      window.removeEventListener('wheel', handleWheel);
      clearTimeout(resetTimer);
    };
  }, [currentIndex, isScrolling, isTransitioning, navigate, scrollAccumulator]);

  return (
    <div className="horizontal-scroll-container" ref={containerRef}>
      {/* 로딩 오버레이 */}
      {showLoader && (
        <div className={`loading-overlay ${!isInitialized ? 'visible' : 'fade-out'}`} />
      )}
      
      {/* 메인 콘텐츠 */}
      <div className={`content-wrapper ${isInitialized ? 'fade-in' : ''}`}>
        {pages.map((page, index) => (
          <div 
            key={page.path} 
            className={`page-section ${
              index === currentIndex ? 'active' : ''
            } ${isTransitioning ? 'transitioning' : ''}`}
          >
            <page.component shouldAnimate={animatePages.has(index)} />
          </div>
        ))}
        
        <div className="scroll-indicator">
          {pages.map((_, index) => (
            <div 
              key={index}
              className={`scroll-dot ${index === currentIndex ? 'active' : ''}`}
              onClick={() => {
                if (!isScrolling) {
                  setCurrentIndex(index);
                  navigate(pages[index].path);
                  // 클릭으로 이동할 때도 애니메이션 트리거
                  setAnimatePages(prev => new Set([...prev, index]));
                }
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default HorizontalScroll;
import React from 'react';
import './Main.css';
import titleImage from '../../assets/images/title.png'; // Assuming the image is in this path

function Main() {
  return (
    <div className="main-page">
      <div className="main-content">
        <img src={titleImage} alt="title" className="title" />
        <p className="main-subtitle">나의 마음을 찾아 떠나는 치유의 길</p>
        <button className="start-button">지금 실행하기</button>
      </div>
      <div className="scroll-instruction">
        <span className="scroll-text">스크롤을 내려보세요</span>
        <div className="scroll-arrow">
          <div className="arrow-down"></div>
        </div>
      </div>
    </div>
  );
}

export default Main;
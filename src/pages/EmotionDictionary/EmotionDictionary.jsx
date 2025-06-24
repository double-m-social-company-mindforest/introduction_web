import React, { useState, useEffect } from 'react';
import { emotionTypesService } from '../../services';
import './EmotionDictionary.css';

function EmotionDictionary() {
  const [character, setCharacter] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCharacter();
  }, []);

  const fetchCharacter = async () => {
    try {
      setLoading(true);
      const data = await emotionTypesService.getTypeById(1);
      setCharacter(data.character);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="emotion-dictionary-page loading">로딩중...</div>;
  if (error) return <div className="emotion-dictionary-page error">오류: {error}</div>;
  if (!character) return <div className="emotion-dictionary-page">캐릭터 정보를 불러올 수 없습니다.</div>;

  return (
    <div className="emotion-dictionary-page">
      <div className="character-container">
        <div className="character-info">
          <div className="character-category">
            기복을 굳혀준 캐릭터는 내안경의 감정의 언급술사
          </div>
          <h1 className="character-title">{character.name}</h1>
          <p className="character-greeting">"{character.greeting}"</p>
          <p className="character-description">{character.overview}</p>
          
          <div className="hashtags">
            {character.hashtags.map((tag, index) => (
              <span key={index} className="hashtag">{tag}</span>
            ))}
          </div>
        </div>
        
        <div className="character-image-section">
          <div className="yellow-background"></div>
          <img 
            src={character.image_filename} 
            alt={character.name}
            className="character-image"
          />
        </div>
      </div>
    </div>
  );
}

export default EmotionDictionary;
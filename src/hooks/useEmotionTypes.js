import { useState, useEffect } from 'react';
import { emotionTypesService } from '../services';

// 감정 동물 사전 데이터를 위한 커스텀 훅
export const useEmotionTypes = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAllTypes = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await emotionTypesService.getAllTypes();
      setTypes(data);
    } catch (err) {
      setError(err.message);
      console.error('Failed to fetch emotion types:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchTypeById = async (id) => {
    setLoading(true);
    setError(null);
    
    try {
      const data = await emotionTypesService.getTypeById(id);
      return data;
    } catch (err) {
      setError(err.message);
      console.error(`Failed to fetch emotion type ${id}:`, err);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return {
    types,
    loading,
    error,
    fetchAllTypes,
    fetchTypeById,
    refetch: fetchAllTypes
  };
};

export default useEmotionTypes;
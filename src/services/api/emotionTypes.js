import apiClient from './apiClient';

// 감정 동물 사전 API 서비스
export const emotionTypesService = {
  // 모든 캐릭터 타입 조회 (32가지)
  getAllTypes: async () => {
    try {
      const response = await apiClient.get('/types');
      return response;
    } catch (error) {
      console.error('Failed to fetch emotion types:', error);
      throw error;
    }
  },

  // 특정 타입 조회
  getTypeById: async (id) => {
    try {
      const response = await apiClient.get(`/types/${id}`);
      return response;
    } catch (error) {
      console.error(`Failed to fetch emotion type ${id}:`, error);
      throw error;
    }
  }
};

export default emotionTypesService;
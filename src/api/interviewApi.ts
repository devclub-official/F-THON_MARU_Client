import axios from 'axios';
import type {
  PDFAnalysisResponse,
  QuestionResponse,
  InterviewResult,
} from './types';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
});

export const analyzePDF = async (file: File): Promise<PDFAnalysisResponse> => {
  const formData = new FormData();
  formData.append('file', file);
  
  const response = await api.post<PDFAnalysisResponse>('/analyze-pdf', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  
  return response.data;
};

export const getQuestions = async (skills: string[]): Promise<QuestionResponse[]> => {
  const response = await api.post<QuestionResponse[]>('/questions', { skills });
  return response.data;
};

export const submitAnswers = async (
  answers: { questionId: number; text: string }[]
): Promise<InterviewResult> => {
  const response = await api.post<InterviewResult>('/analyze-answers', { answers });
  return response.data;
};

export const generatePDF = async (result: InterviewResult): Promise<Blob> => {
  const response = await api.post('/generate-pdf', result, {
    responseType: 'blob',
  });
  return response.data;
}; 
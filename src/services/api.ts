import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:3000/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export interface UploadResponse {
  success: boolean;
  message: string;
  data?: {
    questions: Array<{
      id: number;
      text: string;
      followUpQuestions: string[];
    }>;
  };
}

export interface InterviewResponse {
  success: boolean;
  message: string;
  data?: {
    assessment: Array<{
      skill: string;
      score: number;
      strengths: string[];
      weaknesses: string[];
      recommendations: string[];
    }>;
  };
}

export const uploadResume = async (file: File): Promise<UploadResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  const response = await api.post<UploadResponse>("/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const submitAnswer = async (
  questionId: number,
  answer: string
): Promise<InterviewResponse> => {
  const response = await api.post<InterviewResponse>("/interview/answer", {
    questionId,
    answer,
  });
  return response.data;
};

export const generateReport = async (): Promise<Blob> => {
  const response = await api.get("/interview/report", {
    responseType: "blob",
  });
  return response.data;
};

export default api;

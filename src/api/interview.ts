import axios from "axios";
import { ApiRequest, ApiResponse } from "../types/interview";

const API_BASE_URL = "http://10.10.98.81:8080/api/gemini";

export const sendMessage = async (request: ApiRequest): Promise<ApiResponse> => {
  try {
    console.log("API Request:", request);
    const response = await axios.post<ApiResponse>(`${API_BASE_URL}/chat-with-pdf-json`, request);
    console.log("API Response:", response.data);

    // 응답 데이터 검증
    if (!response.data || !Array.isArray(response.data.messages)) {
      throw new Error("Invalid response format from server");
    }

    // 응답에 새로운 메시지가 포함되어 있는지 확인
    const hasNewMessage = response.data.messages.length > request.messages.length;
    if (!hasNewMessage) {
      console.warn("No new messages in response");
    }

    return response.data;
  } catch (error) {
    console.error("API 호출 중 에러 발생:", error);
    if (axios.isAxiosError(error)) {
      console.error("API Error Details:", {
        status: error.response?.status,
        data: error.response?.data,
        headers: error.response?.headers,
      });
    }
    throw error;
  }
};

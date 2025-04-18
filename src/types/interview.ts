export interface Message {
  role: "user" | "assistant";
  content: string;
}

export interface PdfFileData {
  name: string;
  content: string;
}

export interface ApiRequest {
  messages: Message[];
  pdfFileData: PdfFileData;
}

export interface ApiResponse {
  messages: Message[];
}

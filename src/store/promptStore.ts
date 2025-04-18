import { create } from "zustand";

interface Message {
  role: string;
  content: string;
}

interface PromptStoreType {
  pdfBase64: string;
  setPdfBase64: (pdfBase64: string) => void;
  fileName: string;
  setFileName: (fileName: string) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
}

const usePromptStore = create<PromptStoreType>((set) => ({
  pdfBase64: "",
  setPdfBase64: (pdfBase64: string) => set({ pdfBase64 }),
  messages: [],
  setMessages: (messages: Message[]) => set({ messages }),
  fileName: "",
  setFileName: (fileName: string) => set({ fileName }),
}));

export default usePromptStore;

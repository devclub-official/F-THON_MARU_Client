import { create } from "zustand";
import { Message } from "../types/interview";

interface PromptStoreType {
  pdfBase64: string;
  setPdfBase64: (pdfBase64: string) => void;
  fileName: string;
  setFileName: (fileName: string) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
}

const usePromptStore = create<PromptStoreType>((set) => ({
  pdfBase64: "",
  setPdfBase64: (pdfBase64: string) => set({ pdfBase64 }),
  fileName: "",
  setFileName: (fileName: string) => set({ fileName }),
  messages: [],
  setMessages: (messages: Message[]) =>
    set((state) => {
      console.log("Previous messages:", state.messages);
      console.log("New messages:", messages);
      return { messages: [...messages] };
    }),
  addMessage: (message: Message) => set((state) => ({ messages: [...state.messages, message] })),
  clearMessages: () => set({ messages: [] }),
}));

export default usePromptStore;

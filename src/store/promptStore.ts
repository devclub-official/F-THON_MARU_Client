import { create } from "zustand";
import { Message } from "../types/interview";
import { persist } from "zustand/middleware";

interface PromptStoreType {
  pdfBase64: string;
  setPdfBase64: (pdfBase64: string) => void;
  fileName: string;
  setFileName: (fileName: string) => void;
  messages: Message[];
  setMessages: (messages: Message[]) => void;
  addMessage: (message: Message) => void;
  clearMessages: () => void;
  parsedResult: any;
  setParsedResult: (result: any) => void;
}

const usePromptStore = create<PromptStoreType>()(
  persist(
    (set) => ({
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
      addMessage: (message: Message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      clearMessages: () => set({ messages: [] }),
      // 파싱된 결과 관련 함수
      parsedResult: null,
      setParsedResult: (result: any) => set({ parsedResult: result }),
    }),
    {
      name: "prompt-storage", // localStorage에 저장될 키 이름
      partialize: (state) => ({
        // 유지할 상태만 선택
        messages: state.messages,
        parsedResult: state.parsedResult,
        fileName: state.fileName,
      }),
    }
  )
);

export default usePromptStore;

import { create } from "zustand";

interface PdfStore {
  pdfBase64: string;
  answers: string[];
  setPdf: (pdf: string) => void;
  addAnswer: (answer: string) => void;
}

const usePdfStore = create<PdfStore>((set) => ({
  pdfBase64: "",
  answers: [],
  setPdf: (pdf) => set({ pdfBase64: pdf }),
  addAnswer: (answer) =>
    set((state) => ({
      answers: [...state.answers, answer],
    })),
}));

export default usePdfStore;

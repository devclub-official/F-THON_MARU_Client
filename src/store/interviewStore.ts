import { create } from "zustand";

interface InterviewState {
  currentQuestionIndex: number;
  answers: Record<number, string>;
  setAnswer: (questionId: number, answer: string) => void;
  nextQuestion: () => void;
  resetInterview: () => void;
}

const useInterviewStore = create<InterviewState>((set) => ({
  currentQuestionIndex: 0,
  answers: {},

  setAnswer: (questionId, answer) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: answer },
    })),

  nextQuestion: () =>
    set((state) => ({
      currentQuestionIndex: state.currentQuestionIndex + 1,
    })),

  resetInterview: () =>
    set({
      currentQuestionIndex: 0,
      answers: {},
    }),
}));

export default useInterviewStore;

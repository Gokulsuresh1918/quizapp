import { create } from "zustand";

export type configType = {
  numberOfQuestion: number;
  category:string,
  level: string;
  type: string;
  status: string;
  score: number;
};
const defaultConfig = {
  numberOfQuestion: 10,
  category: '',
  level: "",
  type: "",
  status: "",
  score: 0,
};
const useQuiz = create((set) => ({
  config: { ...defaultConfig },
  addLevel: (level: string) =>
    set((state: { config: any }) => ({
      config: { ...state.config, level: level },
    })),
  numberOfQuestion: (count: number) =>
    set((state: { config: any }) => ({
      config: { ...state.config, numberOfQuestion: count },
    })),
  addStatus: (status: string) =>
    set((state: { config: any }) => ({
      config: { ...state.config, status: status },
    })),
  addScore: (score: number) =>
    set((state: { config: any }) => ({
      config: { ...state.config, score: score },
    })),
  addType: (type: string) =>
    set((state: { config: any }) => ({
      config: { ...state.config, type: type },
    })),
  addCategory: (category: string) =>
    set((state: { config: any }) => ({
      config: { ...state.config, category: category },
    })),
}));

export default useQuiz;

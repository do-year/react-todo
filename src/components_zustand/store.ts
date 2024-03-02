import { create } from "zustand";
import { devtools } from "zustand/middleware";

export enum Categories {
  "TO_DO" = "TO_DO",
  "DOING" = "DOING",
  "DONE" = "DONE",
}

export interface IToDo {
  text: string;
  id: number;
  category: Categories;
}

interface IToDoStore {
  toDos: IToDo[];
  category: Categories;
  selectedToDos: IToDo[];
  setCategory: (category: Categories) => void;
  setToDos: (toDo: IToDo) => void;
  selectToDo: (category: Categories) => void;
  changeToDo: (index: number, newToDo: IToDo) => void;
  deleteToDo: (id: number) => void;
}

export const toDoStore = create<IToDoStore>()(
  devtools((set) => ({
    toDos: [],
    category: Categories.TO_DO,
    selectedToDos: [],
    setCategory: (category) => set({ category: category }),
    setToDos: (newToDos) =>
      set((state) => ({ toDos: [...state.toDos, newToDos] })),
    selectToDo: (category) =>
      set((state) => ({
        selectedToDos: state.toDos.filter((toDo) => toDo.category === category),
      })),
    changeToDo: (index, newToDo) =>
      set((state) => ({
        toDos: [
          ...state.toDos.slice(0, index),
          newToDo,
          ...state.toDos.slice(index + 1),
        ],
      })),
    deleteToDo: (id) =>
      set((state) => ({ toDos: state.toDos.filter((toDo) => toDo.id !== id) })),
  }))
);

import { create } from 'zustand';

export const useGameStore = create((set) => ({
  activeMonster: null,
  team: [],
  score: 0,
  
  setActiveMonster: (monster) => set({ activeMonster: monster }),
  addToTeam: (monster) => set((state) => ({
    team: [...state.team, monster].slice(-6), // Max 6 Pokémon
  })),
  removeFromTeam: (monsterId) => set((state) => ({
    team: state.team.filter((m) => m.id !== monsterId),
  })),
  clearTeam: () => set({ team: [] }),
  setScore: (score) => set({ score }),
  addScore: (points) => set((state) => ({
    score: state.score + points,
  })),
}));

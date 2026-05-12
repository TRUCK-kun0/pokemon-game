import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useGameStore = create(
  persist(
    (set, get) => ({
      gameState: 'starter-selection', // 'starter-selection', 'overworld', 'battle'
      activeMonster: null,
      team: [],
      score: 0,
      wildPokemon: null,
      currentPosition: { x: 0, y: 0 },
      
      setGameState: (state) => set({ gameState: state }),
      setActiveMonster: (monster) => set({ activeMonster: monster }),
      
      addToTeam: (monster) => set((state) => ({
        team: [...state.team, monster].slice(-6),
      })),
      
      removeFromTeam: (monsterId) => set((state) => ({
        team: state.team.filter((m) => m.id !== monsterId),
      })),
      
      clearTeam: () => set({ team: [] }),
      setScore: (score) => set({ score }),
      addScore: (points) => set((state) => ({
        score: state.score + points,
      })),
      
      setWildPokemon: (pokemon) => set({ wildPokemon: pokemon }),
      setCurrentPosition: (x, y) => set({ 
        currentPosition: { x, y } 
      }),
      
      resetGame: () => set({
        gameState: 'starter-selection',
        activeMonster: null,
        team: [],
        score: 0,
        wildPokemon: null,
        currentPosition: { x: 0, y: 0 },
      }),
    }),
    {
      name: 'pokemon-game-store',
      version: 1,
    }
  )
);

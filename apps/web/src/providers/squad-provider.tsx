"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";

export type Squad = {
  id: string;
  name: string;
  description?: string;
};

type SquadContextType = {
  squads: Squad[];
  selectedSquad: Squad | null;
  setSelectedSquad: (squad: Squad) => void;
  isLoading: boolean;
};

const SquadContext = createContext<SquadContextType | null>(null);

const STORAGE_KEY = "clawe:selectedSquadId";

// Mock data for now
const mockSquads: Squad[] = [
  { id: "1", name: "Default Squad", description: "Your default agent squad" },
];

export const SquadProvider = ({ children }: { children: ReactNode }) => {
  const [squads] = useState<Squad[]>(mockSquads);
  const [selectedSquad, setSelectedSquadState] = useState<Squad | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load selected squad from localStorage
    const storedId = localStorage.getItem(STORAGE_KEY);
    const squad = squads.find((s) => s.id === storedId) ?? squads[0] ?? null;
    setSelectedSquadState(squad);
    setIsLoading(false);
  }, [squads]);

  const setSelectedSquad = (squad: Squad) => {
    setSelectedSquadState(squad);
    localStorage.setItem(STORAGE_KEY, squad.id);
  };

  return (
    <SquadContext.Provider
      value={{ squads, selectedSquad, setSelectedSquad, isLoading }}
    >
      {children}
    </SquadContext.Provider>
  );
};

export const useSquad = () => {
  const context = useContext(SquadContext);
  if (!context) {
    throw new Error("useSquad must be used within a SquadProvider");
  }
  return context;
};

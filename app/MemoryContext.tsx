import React, { createContext, useContext, useState } from "react";

export interface MonthMemories {
  [day: number]: string;
}

export interface MemoryContextType {
  monthsData: { [month: string]: { memories: MonthMemories; favoriteDay: number | null } };
  setMonthMemories: (month: string, day: number, text: string) => void;
  setFavoriteDay: (month: string, day: number | null) => void;
  getFavoriteMemory: (month: string) => string | null;
}

const MemoryContext = createContext<MemoryContextType | undefined>(undefined);

export function MemoryProvider({ children }: { children: React.ReactNode }) {
  const [monthsData, setMonthsData] = useState<{
    [month: string]: { memories: MonthMemories; favoriteDay: number | null };
  }>({});

  const setMonthMemories = (month: string, day: number, text: string) => {
    setMonthsData((prev) => ({
      ...prev,
      [month]: {
        memories: { ...(prev[month]?.memories || {}), [day]: text },
        favoriteDay: prev[month]?.favoriteDay || null,
      },
    }));
  };

  const setFavoriteDay = (month: string, day: number | null) => {
    setMonthsData((prev) => ({
      ...prev,
      [month]: {
        memories: prev[month]?.memories || {},
        favoriteDay: day,
      },
    }));
  };

  const getFavoriteMemory = (month: string): string | null => {
    const monthData = monthsData[month];
    if (!monthData || monthData.favoriteDay === null) return null;
    return monthData.memories[monthData.favoriteDay] || null;
  };

  return (
    <MemoryContext.Provider value={{ monthsData, setMonthMemories, setFavoriteDay, getFavoriteMemory }}>
      {children}
    </MemoryContext.Provider>
  );
}

export function useMemory() {
  const context = useContext(MemoryContext);
  if (context === undefined) {
    throw new Error("useMemory must be used within MemoryProvider");
  }
  return context;
}

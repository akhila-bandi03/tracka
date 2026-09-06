'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CollegeData } from '@/lib/mock-data';

interface CollegeContextType {
  savedIds: string[];
  compareIds: string[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

export const CollegeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);

  useEffect(() => {
    try {
      const storedSaved = localStorage.getItem('college_saved_ids');
      const storedCompare = localStorage.getItem('college_compare_ids');
      if (storedSaved) setSavedIds(JSON.parse(storedSaved));
      if (storedCompare) setCompareIds(JSON.parse(storedCompare));
    } catch (e) {
      console.error(e);
    }
  }, []);

  const toggleSave = (id: string) => {
    setSavedIds((prev) => {
      const next = prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id];
      localStorage.setItem('college_saved_ids', JSON.stringify(next));
      return next;
    });
  };

  const isSaved = (id: string) => savedIds.includes(id);

  const addToCompare = (id: string) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev;
      if (prev.length >= 3) {
        alert('You can compare up to 3 colleges at a time.');
        return prev;
      }
      const next = [...prev, id];
      localStorage.setItem('college_compare_ids', JSON.stringify(next));
      return next;
    });
  };

  const removeFromCompare = (id: string) => {
    setCompareIds((prev) => {
      const next = prev.filter((item) => item !== id);
      localStorage.setItem('college_compare_ids', JSON.stringify(next));
      return next;
    });
  };

  const isInCompare = (id: string) => compareIds.includes(id);

  const clearCompare = () => {
    setCompareIds([]);
    localStorage.setItem('college_compare_ids', JSON.stringify([]));
  };

  return (
    <CollegeContext.Provider
      value={{
        savedIds,
        compareIds,
        toggleSave,
        isSaved,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
      }}
    >
      {children}
    </CollegeContext.Provider>
  );
};

export const useCollegeContext = () => {
  const context = useContext(CollegeContext);
  if (!context) {
    throw new Error('useCollegeContext must be used within a CollegeProvider');
  }
  return context;
};

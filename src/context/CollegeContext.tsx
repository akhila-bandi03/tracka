'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface SavedComparisonSet {
  id: string;
  name: string;
  collegeIds: string[];
  createdAt: string;
}

interface CollegeContextType {
  savedIds: string[];
  compareIds: string[];
  savedComparisons: SavedComparisonSet[];
  toggleSave: (id: string) => void;
  isSaved: (id: string) => boolean;
  addToCompare: (id: string) => void;
  removeFromCompare: (id: string) => void;
  isInCompare: (id: string) => boolean;
  clearCompare: () => void;
  saveCurrentComparison: (name: string) => void;
  removeSavedComparison: (id: string) => void;
  loadSavedComparison: (collegeIds: string[]) => void;
}

const CollegeContext = createContext<CollegeContextType | undefined>(undefined);

export const CollegeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [savedComparisons, setSavedComparisons] = useState<SavedComparisonSet[]>([]);

  useEffect(() => {
    try {
      const storedSaved = localStorage.getItem('college_saved_ids');
      const storedCompare = localStorage.getItem('college_compare_ids');
      const storedSets = localStorage.getItem('college_saved_comparisons');

      if (storedSaved) setSavedIds(JSON.parse(storedSaved));
      if (storedCompare) setCompareIds(JSON.parse(storedCompare));
      if (storedSets) setSavedComparisons(JSON.parse(storedSets));
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

  const saveCurrentComparison = (name: string) => {
    if (compareIds.length === 0) return;
    const newSet: SavedComparisonSet = {
      id: `set-${Date.now()}`,
      name: name || `Comparison Set (${compareIds.length} Colleges)`,
      collegeIds: [...compareIds],
      createdAt: new Date().toLocaleDateString(),
    };
    setSavedComparisons((prev) => {
      const next = [newSet, ...prev];
      localStorage.setItem('college_saved_comparisons', JSON.stringify(next));
      return next;
    });
  };

  const removeSavedComparison = (id: string) => {
    setSavedComparisons((prev) => {
      const next = prev.filter((s) => s.id !== id);
      localStorage.setItem('college_saved_comparisons', JSON.stringify(next));
      return next;
    });
  };

  const loadSavedComparison = (collegeIds: string[]) => {
    setCompareIds(collegeIds);
    localStorage.setItem('college_compare_ids', JSON.stringify(collegeIds));
  };

  return (
    <CollegeContext.Provider
      value={{
        savedIds,
        compareIds,
        savedComparisons,
        toggleSave,
        isSaved,
        addToCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        saveCurrentComparison,
        removeSavedComparison,
        loadSavedComparison,
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

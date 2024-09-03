import { generateCurrentYearMonth } from '@/lib/utils';
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface StudentsContextType {
  selectedYearMonth: string;
  setSelectedYearMonth: (value: string) => void;
  selectedLocation: string;
  setSelectedLocation: (value: string) => void;
  selectedLessonId: string;
  setSelectedLessonId: (value: string) => void;
  searchName: string;
  setSearchName: (value: string) => void;
  type: 'paid' | 'unpaid';
}

const StudentsContext = createContext<StudentsContextType | undefined>(undefined);

export const useStudentsContext = () => {
  const context = useContext(StudentsContext);
  if (context === undefined) {
    throw new Error('useStudentsContext must be used within a StudentsProvider');
  }
  return context;
};

interface StudentsProviderProps {
  children: ReactNode;
  type: 'paid' | 'unpaid';
}

export const StudentsProvider: React.FC<StudentsProviderProps> = ({ children, type }) => {
  const [selectedYearMonth, setSelectedYearMonth] = useState<string>(generateCurrentYearMonth());
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedLessonId, setSelectedLessonId] = useState<string>('');
  const [searchName, setSearchName] = useState<string>('');

  const value = {
    selectedYearMonth,
    setSelectedYearMonth,
    selectedLocation,
    setSelectedLocation,
    selectedLessonId,
    setSelectedLessonId,
    searchName,
    setSearchName,
    type,
  };

  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
};
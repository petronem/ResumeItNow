// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

type UserSettings = {
  displayName: string;
  defaultTemplate: string;
  // Add other settings as needed
};

export const useLocalStorage = () => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const getSettings = (): UserSettings | null => {
    if (!isClient) return null;
    
    try {
      const settings = localStorage.getItem('userSettings');
      return settings ? JSON.parse(settings) : null;
    } catch (error) {
      console.error('Error reading from localStorage:', error);
      return null;
    }
  };

  const saveSettings = (settings: UserSettings): void => {
    if (!isClient) return;
    
    try {
      localStorage.setItem('userSettings', JSON.stringify(settings));
    } catch (error) {
      console.error('Error saving to localStorage:', error);
    }
  };

  const clearSettings = (): void => {
    if (!isClient) return;
    
    try {
      localStorage.removeItem('userSettings');
    } catch (error) {
      console.error('Error clearing localStorage:', error);
    }
  };

  return {
    getSettings,
    saveSettings,
    clearSettings,
    isClient
  };
};
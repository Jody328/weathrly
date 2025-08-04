import { useState, useCallback } from 'react';
import citiesData from '../data/cities.json';
import type { City } from '../types';

export const useAutocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const updateSuggestions = useCallback((value: string) => {
    setInputValue(value);
    setActiveIndex(-1);
    if (value.length > 1) {
      const filtered = citiesData
        .filter(c => c.city.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 7);
      setSuggestions(filtered);
      setIsSuggestionsVisible(filtered.length > 0);
    } else {
      setSuggestions([]);
      setIsSuggestionsVisible(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsSuggestionsVisible(false);
    setActiveIndex(-1);
  }, []);

  return {
    inputValue,
    suggestions,
    isSuggestionsVisible,
    activeIndex,
    setInputValue,
    setActiveIndex,
    updateSuggestions,
    reset,
  };
};
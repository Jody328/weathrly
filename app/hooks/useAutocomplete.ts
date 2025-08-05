import { useState, useCallback, useEffect, useRef } from 'react';
import citiesData from '../data/cities.json';
import type { City } from '../types';

const popularCities: City[] = [...citiesData]
  .sort((a, b) => parseInt(b.population, 10) - parseInt(a.population, 10))
  .slice(0, 7)
  .map(c => ({ city: c.city, country: c.country }));

const VALID_CITY_REGEX = /^[\p{L}\s'-]+$/u;

export const useAutocomplete = () => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<City[]>([]);
  const [isSuggestionsVisible, setIsSuggestionsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [suggestionsTitle, setSuggestionsTitle] = useState('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsSuggestionsVisible(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const showPopularCities = useCallback(() => {
    if (inputValue === '') {
      setValidationError(null);
      setSuggestions(popularCities);
      setSuggestionsTitle('Popular Cities');
      setIsSuggestionsVisible(true);
    }
  }, [inputValue]);

  const updateSuggestions = useCallback((value: string) => {
    setInputValue(value);
    setActiveIndex(-1);

    if (value && !VALID_CITY_REGEX.test(value)) {
      setValidationError('Please use only letters, spaces, hyphens, or apostrophes.');
      setSuggestions([]);
      setIsSuggestionsVisible(false);
      return;
    }
    setValidationError(null);

    if (value.length > 0) {
      const filtered = citiesData
        .filter(c => c.city.toLowerCase().startsWith(value.toLowerCase()))
        .slice(0, 7);
      setSuggestions(filtered);
      setSuggestionsTitle('Suggestions');
      setIsSuggestionsVisible(filtered.length > 0);
    } else {
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
    suggestionsTitle,
    validationError,
    rootRef,
    setInputValue,
    setActiveIndex,
    updateSuggestions,
    reset,
    showPopularCities,
  };
};
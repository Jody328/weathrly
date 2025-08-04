import { useQuery } from '@tanstack/react-query';
import { useState, useCallback } from 'react';
import { WeatherData } from '../types';

const fetchWeatherByCity = async (city: string): Promise<WeatherData> => {
  if (!city) {
    return Promise.reject(new Error('A city must be provided.'));
  }
  
  const response = await fetch(`/api/weather?city=${city}`);
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || `Could not fetch weather for ${city}`);
  }
  return response.json();
};

export const useWeather = () => {
  const [city, setCity] = useState('cape town');

  const {
    data: weather,
    isPending: isLoading,
    isError,
    error,
  } = useQuery<WeatherData, Error>({
    queryKey: ['weather', city],
    queryFn: () => fetchWeatherByCity(city),
    enabled: !!city, 
    retry: 1,
    staleTime: 1000 * 60 * 10,
  });

  const fetchForCity = useCallback((newCity: string) => {
    setCity(newCity);
  }, []);

  return {
    weather,
    isLoading,
    isError,
    error,
    fetchForCity,
  };
};
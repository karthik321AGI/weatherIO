// src/hooks/useWeather.ts

import { useRecoilState } from 'recoil';
import { weatherState, loadingState, errorState } from '../store/weather';
import { getWeatherData, searchLocations } from '../lib/api';
import { SearchResult } from '../types/weather';

export function useWeather() {
  const [weather, setWeather] = useRecoilState(weatherState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const [error, setError] = useRecoilState(errorState);

  async function searchLocation(query: string): Promise<SearchResult[]> {
    try {
      setLoading(true);
      setError(null);
      return await searchLocations(query);
    } catch (err) {
      setError('Error searching for location');
      return [];
    } finally {
      setLoading(false);
    }
  }

  async function fetchWeatherData(lat: number, lon: number): Promise<void> {
    try {
      setLoading(true);
      setError(null);
      const data = await getWeatherData(lat, lon);
      if (data) {
        setWeather(data);
      } else {
        setError('Unable to fetch weather data');
      }
    } catch (err) {
      setError('Error fetching weather data');
    } finally {
      setLoading(false);
    }
  }

  return {
    weather,
    loading,
    error,
    searchLocation,
    fetchWeatherData,
  };
}
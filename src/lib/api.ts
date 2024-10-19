// src/lib/api.ts

import axios from 'axios';
import { WeatherData, SearchResult } from '../types/weather';

const OPENWEATHER_API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = 'https://api.openweathermap.org';

export async function searchLocations(query: string): Promise<SearchResult[]> {
  try {
    const response = await axios.get(
      `${BASE_URL}/geo/1.0/direct?q=${query}&limit=5&appid=${OPENWEATHER_API_KEY}`
    );

    return response.data.map((item: any) => ({
      name: item.name,
      country: item.country,
      lat: item.lat,
      lon: item.lon,
    }));
  } catch (error) {
    console.error('Error searching locations:', error);
    return [];
  }
}

export async function getWeatherData(lat: number, lon: number): Promise<WeatherData | null> {
  try {
    const currentWeatherResponse = await axios.get(
      `${BASE_URL}/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    const forecastResponse = await axios.get(
      `${BASE_URL}/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${OPENWEATHER_API_KEY}`
    );

    const currentData = currentWeatherResponse.data;
    const forecastData = forecastResponse.data;

    return {
      location: {
        name: currentData.name,
        country: currentData.sys.country,
        lat,
        lon,
      },
      current: {
        temp: currentData.main.temp,
        feels_like: currentData.main.feels_like,
        humidity: currentData.main.humidity,
        wind_speed: currentData.wind.speed,
        description: currentData.weather[0].description,
        icon: currentData.weather[0].icon,
        pressure: currentData.main.pressure,
        uvi: 0, // UVI is not available in the free API
      },
      hourly: forecastData.list.slice(0, 24).map((item: any) => ({
        dt: item.dt,
        temp: item.main.temp,
        feels_like: item.main.feels_like,
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      })),
      daily: processDailyForecast(forecastData.list),
    };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Error fetching weather data:', error.response?.data || error.message);
    } else {
      console.error('Error fetching weather data:', error);
    }
    return null;
  }
}

function processDailyForecast(forecastList: any[]): any[] {
  const dailyData: { [key: string]: any } = {};

  forecastList.forEach((item) => {
    const date = new Date(item.dt * 1000).toDateString();
    if (!dailyData[date]) {
      dailyData[date] = {
        dt: item.dt,
        temp: {
          day: item.main.temp,
          min: item.main.temp,
          max: item.main.temp,
          night: item.main.temp,
        },
        humidity: item.main.humidity,
        wind_speed: item.wind.speed,
        description: item.weather[0].description,
        icon: item.weather[0].icon,
      };
    } else {
      dailyData[date].temp.min = Math.min(dailyData[date].temp.min, item.main.temp);
      dailyData[date].temp.max = Math.max(dailyData[date].temp.max, item.main.temp);
      if (new Date(item.dt * 1000).getHours() >= 12) {
        dailyData[date].temp.day = item.main.temp;
      } else {
        dailyData[date].temp.night = item.main.temp;
      }
    }
  });

  return Object.values(dailyData).slice(0, 7);
}
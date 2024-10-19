// src/store/weather.ts

import { atom } from 'recoil';
import { WeatherData } from '../types/weather';

export const weatherState = atom<WeatherData | null>({
  key: 'weatherState',
  default: null,
});

export const loadingState = atom<boolean>({
  key: 'loadingState',
  default: false,
});

export const errorState = atom<string | null>({
  key: 'errorState',
  default: null,
});
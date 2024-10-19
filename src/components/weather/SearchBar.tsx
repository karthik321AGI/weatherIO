import React, { useState, useEffect, useRef } from 'react';
import { Input } from '../ui/input';
import { useWeather } from '@/hooks/useWeather';
import { SearchResult } from '@/types/weather';
import { Search } from 'lucide-react';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showResults, setShowResults] = useState(false);
  const { searchLocation, fetchWeatherData } = useWeather();
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSearch = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);

    if (value.length >= 3) {
      const searchResults = await searchLocation(value);
      setResults(searchResults);
      setShowResults(true);
    } else {
      setResults([]);
      setShowResults(false);
    }
  };

  const handleSelectLocation = (result: SearchResult) => {
    setQuery(`${result.name}, ${result.country}`);
    setShowResults(false);
    fetchWeatherData(result.lat, result.lon);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto z-50" ref={searchRef}>
      <div className="relative">
        <Input
          type="text"
          placeholder="Search for a city..."
          value={query}
          onChange={handleSearch}
          className="w-full pl-14 pr-4 py-4 text-xl text-gray-700 bg-white bg-opacity-80 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-opacity-100 transition-all duration-300 shadow-lg h-16"
        />
        <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400" size={28} />
      </div>

      {showResults && results.length > 0 && (
        <div className="absolute w-full mt-2 bg-white rounded-xl shadow-xl overflow-hidden transition-all duration-300 ease-in-out max-h-80 overflow-y-auto" style={{ zIndex: 1000 }}>
          {results.map((result, index) => (
            <div
              key={index}
              className="px-6 py-4 hover:bg-blue-50 cursor-pointer transition-colors duration-200 text-gray-700 border-b border-gray-100 last:border-b-0"
              onClick={() => handleSelectLocation(result)}
            >
              <div className="font-semibold">{result.name}</div>
              <div className="text-sm text-gray-500">{result.country}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
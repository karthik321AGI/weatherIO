
import { RecoilRoot } from 'recoil';
import { SearchBar } from './components/weather/SearchBar';
import { CurrentWeather } from './components/weather/CurrentWeather';
import { Forecast } from './components/weather/Forecast';
import { useWeather } from './hooks/useWeather';

function WeatherApp() {
  const { loading, error, weather } = useWeather();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 md:p-8 relative">
      <div className="max-w-7xl mx-auto space-y-8">
        <header className="text-center py-8">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-4 tracking-tighter">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400">
              Weather-IO
            </span>
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-light italic">
            Precision Forecasting Made Simple
          </p>
        </header>

        <div className="relative z-50">
          <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg">
            <SearchBar />
          </div>
        </div>

        <div className="relative z-0">
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-blue-500 mx-auto"></div>
              <p className="mt-6 text-gray-600 text-2xl font-light">Fetching weather data...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-8 bg-red-500 bg-opacity-75 rounded-xl">
              <p className="text-white text-xl">{error}</p>
            </div>
          )}

          {!loading && !error && weather && (
            <div className="space-y-8">
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg">
                <CurrentWeather />
              </div>
              <div className="bg-white bg-opacity-20 backdrop-blur-lg rounded-xl p-6 shadow-lg">
                <Forecast />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <RecoilRoot>
      <WeatherApp />
    </RecoilRoot>
  );
}

export default App;
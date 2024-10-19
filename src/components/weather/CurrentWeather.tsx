
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useWeather } from '@/hooks/useWeather';
import { getWeatherIcon } from '@/lib/utils';
import { Cloud, Droplets, Wind, ThermometerSun } from 'lucide-react';

export function CurrentWeather() {
  const { weather } = useWeather();

  if (!weather) return null;

  const { current, location } = weather;

  return (

    <div className="space-y-6 relative z-0"> {/* Added z-0 here */}
      <div className="text-center">
        <h2 className="text-4xl font-bold bg-gradient-to-r from-fuchsia-400 to-rose-600 bg-clip-text text-transparent">

          {location.name}
        </h2>
        <p className="">{location.country}</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold text-orange-600">Temperature</CardTitle>
            <ThermometerSun className="h-6 w-6 text-orange-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{Math.round(current.temp)}°C</div>
            <p className="text-sm text-slate-500">Feels like {Math.round(current.feels_like)}°C</p>
          </CardContent>
        </Card>

        <Card className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold text-blue-600">Humidity</CardTitle>
            <Droplets className="h-6 w-6 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{current.humidity}%</div>
            <p className="text-sm text-slate-500">Relative humidity</p>
          </CardContent>
        </Card>

        <Card className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold text-emerald-600">Wind Speed</CardTitle>
            <Wind className="h-6 w-6 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-900">{Math.round(current.wind_speed)} km/h</div>
            <p className="text-sm text-slate-500">Current wind speed</p>
          </CardContent>
        </Card>

        <Card className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-bold text-violet-600">Condition</CardTitle>
            <Cloud className="h-6 w-6 text-violet-400" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <img
                src={getWeatherIcon(current.icon)}
                alt={current.description}
                className="w-12 h-12"
              />
              <div>
                <div className="text-xl font-bold text-gray-900 capitalize">{current.description}</div>
                <p className="text-sm text-slate-500">Current weather</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
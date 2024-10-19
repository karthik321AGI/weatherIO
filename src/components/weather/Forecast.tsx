
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useWeather } from '@/hooks/useWeather';
import { formatDate, formatTime, getWeatherIcon } from '@/lib/utils';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const pastelColors = [
  'bg-red-100',
  'bg-yellow-100',
  'bg-green-100',
  'bg-blue-100',
  'bg-indigo-100',
  'bg-purple-100',
  'bg-pink-100',
];

export function Forecast() {
  const { weather } = useWeather();

  if (!weather) return null;

  const hourlyData = weather.hourly.slice(0, 24).map((hour) => ({
    time: formatTime(hour.dt),
    temperature: Math.round(hour.temp),
  }));

  return (
    <div className="space-y-8">
      {/* 24-Hour Forecast Card */}
      <Card className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-gray-800">24-Hour Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={hourlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.1)" />
                <XAxis
                  dataKey="time"
                  stroke="#1f2937"
                  tick={{ fill: '#1f2937' }}
                  style={{ fontSize: '12px' }}
                />
                <YAxis
                  stroke="#1f2937"
                  tick={{ fill: '#1f2937' }}
                  style={{ fontSize: '12px' }}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: 'rgba(255,255,255,0.95)',
                    borderRadius: '8px',
                    border: 'none',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    color: '#1f2937'
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="temperature"
                  stroke="#FCD34D"
                  strokeWidth={2}
                  dot={{ fill: '#FCD34D', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* 7-Day Forecast Card */}
      <Card className="bg-white bg-opacity-90 backdrop-blur-lg shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-cyan-800">7-Day Forecast</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {weather.daily.map((day, index) => (
              <div
                key={day.dt}
                className={`flex flex-col items-center p-3 rounded-lg ${pastelColors[index]} shadow-sm transition-transform hover:scale-105`}
              >
                <div className="font-medium text-gray-700">{formatDate(day.dt)}</div>
                <img
                  src={getWeatherIcon(day.icon)}
                  alt={day.description}
                  className="w-12 h-12 my-2"
                />
                <div className="text-sm">
                  <span className="font-medium text-gray-800">{Math.round(day.temp.max)}°</span>
                  {" / "}
                  <span className="text-gray-600">{Math.round(day.temp.min)}°</span>
                </div>
                <div className="text-xs text-gray-700 mt-1 capitalize">{day.description}</div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default Forecast;
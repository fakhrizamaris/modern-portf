'use client';

import useSWR from 'swr';
import { Cloud, Sun, CloudRain, CloudSnow, Wind, Droplets, Thermometer } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function WeatherWidget() {
  // Using Medan, Indonesia coordinates
  const { data, error, isLoading } = useSWR(
    'https://api.open-meteo.com/v1/forecast?latitude=3.5952&longitude=98.6722&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&timezone=Asia%2FBangkok',
    fetcher,
    { refreshInterval: 300000 } // Refresh every 5 minutes
  );

  if (isLoading) {
    return (
      <div className="bg-[#0a0c10] border border-gray-800/50 rounded-xl p-4 animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-800 rounded"></div>
          <div className="h-4 w-20 bg-gray-800 rounded"></div>
        </div>
        <div className="h-16 bg-gray-800/50 rounded-lg"></div>
      </div>
    );
  }

  if (error || !data?.current) {
    return (
      <div className="bg-[#0a0c10] border border-red-900/30 rounded-xl p-4 text-center">
        <p className="text-red-400 text-xs">Unable to load weather</p>
      </div>
    );
  }

  const current = data.current;
  const weatherCode = current.weather_code;

  // Get weather icon based on WMO weather code
  const getWeatherIcon = (code: number) => {
    if (code === 0 || code === 1) return <Sun className="w-8 h-8 text-yellow-400" />;
    if (code >= 2 && code <= 3) return <Cloud className="w-8 h-8 text-gray-400" />;
    if (code >= 51 && code <= 67) return <CloudRain className="w-8 h-8 text-blue-400" />;
    if (code >= 71 && code <= 77) return <CloudSnow className="w-8 h-8 text-cyan-300" />;
    if (code >= 80 && code <= 99) return <CloudRain className="w-8 h-8 text-blue-500" />;
    return <Cloud className="w-8 h-8 text-gray-400" />;
  };

  const getWeatherDescription = (code: number) => {
    if (code === 0) return 'Clear sky';
    if (code === 1) return 'Mainly clear';
    if (code === 2) return 'Partly cloudy';
    if (code === 3) return 'Overcast';
    if (code >= 51 && code <= 55) return 'Drizzle';
    if (code >= 61 && code <= 65) return 'Rain';
    if (code >= 80 && code <= 82) return 'Rain showers';
    if (code >= 95 && code <= 99) return 'Thunderstorm';
    return 'Cloudy';
  };

  return (
    <div className="bg-gradient-to-br from-[#0a0c10] to-[#0d1117] border border-gray-800/50 rounded-xl p-4 overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-cyan-500/5 rounded-full blur-2xl"></div>

      {/* Header */}
      <div className="flex items-center gap-2 mb-3">
        <div className="p-1.5 bg-cyan-500/10 rounded-lg">
          <Cloud className="w-4 h-4 text-cyan-400" />
        </div>
        <div>
          <h4 className="text-xs font-bold text-white">Weather</h4>
          <p className="text-[10px] text-gray-500">Medan, Indonesia</p>
        </div>
      </div>

      {/* Weather Info */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {getWeatherIcon(weatherCode)}
          <div>
            <div className="text-2xl font-bold text-white">{Math.round(current.temperature_2m)}°C</div>
            <div className="text-[10px] text-gray-400">{getWeatherDescription(weatherCode)}</div>
          </div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="flex gap-4 mt-3 pt-3 border-t border-gray-800/50">
        <div className="flex items-center gap-1.5">
          <Droplets className="w-3.5 h-3.5 text-blue-400" />
          <span className="text-[10px] text-gray-400">{current.relative_humidity_2m}%</span>
        </div>
        <div className="flex items-center gap-1.5">
          <Wind className="w-3.5 h-3.5 text-gray-400" />
          <span className="text-[10px] text-gray-400">{current.wind_speed_10m} km/h</span>
        </div>
      </div>
    </div>
  );
}

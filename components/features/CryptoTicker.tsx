'use client';

import useSWR from 'swr';
import { TrendingUp, TrendingDown, Bitcoin, Coins, RefreshCw, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { useState } from 'react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

interface CryptoData {
  id: string;
  symbol: string;
  name: string;
  current_price: number;
  price_change_percentage_24h: number;
  price_change_percentage_7d_in_currency: number;
  market_cap: number;
  total_volume: number;
  image: string;
}

export default function CryptoTicker() {
  const [currency, setCurrency] = useState<'idr' | 'usd'>('idr');
  const [showMore, setShowMore] = useState(false);

  // Fetch top 10 cryptocurrencies with selected currency
  const { data, error, isLoading, mutate } = useSWR<CryptoData[]>(
    `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=10&page=1&sparkline=false&price_change_percentage=7d`,
    fetcher,
    { refreshInterval: 60000 } // Refresh every 60 seconds
  );

  if (isLoading) {
    return (
      <div className="bg-[#0a0c10] border border-gray-800/50 rounded-xl p-4 animate-pulse">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-4 h-4 bg-gray-800 rounded"></div>
          <div className="h-4 w-24 bg-gray-800 rounded"></div>
        </div>
        <div className="space-y-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-12 bg-gray-800/50 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-[#0a0c10] border border-red-900/30 rounded-xl p-4 text-center">
        <p className="text-red-400 text-xs">Unable to load crypto data</p>
        <button onClick={() => mutate()} className="text-[10px] text-gray-500 mt-2 hover:text-teal-400">
          Try again
        </button>
      </div>
    );
  }

  const formatPrice = (price: number) => {
    if (currency === 'idr') {
      return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      }).format(price);
    }
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const formatMarketCap = (cap: number) => {
    if (currency === 'idr') {
      if (cap >= 1e15) return `Rp ${(cap / 1e15).toFixed(1)}Q`;
      if (cap >= 1e12) return `Rp ${(cap / 1e12).toFixed(1)}T`;
      if (cap >= 1e9) return `Rp ${(cap / 1e9).toFixed(1)}M`;
      return `Rp ${(cap / 1e6).toFixed(1)}Jt`;
    }
    if (cap >= 1e12) return `$${(cap / 1e12).toFixed(1)}T`;
    if (cap >= 1e9) return `$${(cap / 1e9).toFixed(1)}B`;
    return `$${(cap / 1e6).toFixed(1)}M`;
  };

  const displayedCoins = showMore ? data : data?.slice(0, 5);

  return (
    <div className="bg-[#0a0c10] border border-gray-800/50 rounded-xl p-4 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 bg-orange-500/10 rounded-lg">
            <Bitcoin className="w-4 h-4 text-orange-400" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-white">Crypto Market</h4>
            <p className="text-[10px] text-gray-500">Top 10 by Market Cap</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Currency Toggle */}
          <div className="flex bg-gray-800/50 rounded-lg p-0.5">
            <button onClick={() => setCurrency('idr')} className={`px-2 py-1 text-[10px] rounded-md transition-all ${currency === 'idr' ? 'bg-teal-500/20 text-teal-300' : 'text-gray-500 hover:text-gray-300'}`}>
              IDR
            </button>
            <button onClick={() => setCurrency('usd')} className={`px-2 py-1 text-[10px] rounded-md transition-all ${currency === 'usd' ? 'bg-teal-500/20 text-teal-300' : 'text-gray-500 hover:text-gray-300'}`}>
              USD
            </button>
          </div>
          <button onClick={() => mutate()} className="p-1.5 rounded-lg hover:bg-gray-800 text-gray-500 hover:text-teal-400 transition-all" title="Refresh">
            <RefreshCw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 px-2 py-1.5 text-[9px] text-gray-500 uppercase tracking-wider border-b border-gray-800/50 mb-2">
        <div className="col-span-1">#</div>
        <div className="col-span-4">Coin</div>
        <div className="col-span-3 text-right">Price</div>
        <div className="col-span-2 text-right">24h</div>
        <div className="col-span-2 text-right">MCap</div>
      </div>

      {/* Crypto List */}
      <div className="space-y-1 max-h-[280px] overflow-y-auto sidebar-scroll">
        {displayedCoins?.map((coin, idx) => {
          const isPositive24h = coin.price_change_percentage_24h >= 0;
          return (
            <div key={coin.id} className="grid grid-cols-12 gap-2 items-center p-2 bg-[#161b22] rounded-lg border border-gray-800/30 hover:border-gray-700/50 transition-all group">
              {/* Rank */}
              <div className="col-span-1 text-[10px] text-gray-500 font-medium">{idx + 1}</div>

              {/* Coin Info */}
              <div className="col-span-4 flex items-center gap-2">
                <img src={coin.image} alt={coin.name} className="w-5 h-5 rounded-full" />
                <div>
                  <span className="text-[11px] font-bold text-white">{coin.symbol.toUpperCase()}</span>
                  <p className="text-[9px] text-gray-500 truncate max-w-[60px]">{coin.name}</p>
                </div>
              </div>

              {/* Price */}
              <div className="col-span-3 text-right">
                <span className="text-[10px] font-bold text-white">{formatPrice(coin.current_price)}</span>
              </div>

              {/* 24h Change */}
              <div className="col-span-2 text-right">
                <span className={`text-[10px] font-medium flex items-center justify-end gap-0.5 ${isPositive24h ? 'text-green-400' : 'text-red-400'}`}>
                  {isPositive24h ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                  {Math.abs(coin.price_change_percentage_24h).toFixed(1)}%
                </span>
              </div>

              {/* Market Cap */}
              <div className="col-span-2 text-right">
                <span className="text-[9px] text-gray-400">{formatMarketCap(coin.market_cap)}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Show More/Less */}
      {data && data.length > 5 && (
        <button onClick={() => setShowMore(!showMore)} className="w-full mt-3 py-2 text-[10px] text-teal-400 hover:text-teal-300 transition-colors flex items-center justify-center gap-1">
          {showMore ? 'Show less' : `Show ${data.length - 5} more coins`}
        </button>
      )}

      {/* Data Source */}
      <div className="mt-2 pt-2 border-t border-gray-800/50 flex items-center justify-between">
        <span className="text-[9px] text-gray-600">Data from CoinGecko</span>
        <span className="text-[9px] text-gray-600">Updates every 60s</span>
      </div>
    </div>
  );
}

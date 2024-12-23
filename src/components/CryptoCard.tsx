import { Link } from 'react-router-dom';
import { formatCurrency } from '@/lib/utils';

interface CryptoCardProps {
  id: string;
  rank: string;
  symbol: string;
  name: string;
  priceUsd: string;
  changePercent24Hr: string;
}

export function CryptoCard({ id, rank, symbol, name, priceUsd, changePercent24Hr }: CryptoCardProps) {
  const priceChange = parseFloat(changePercent24Hr);
  
  return (
    <Link to={`/asset/${id}`}>
      <div className="neo-brutalist-card p-6 cursor-pointer">
        <div className="flex justify-between items-start mb-4">
          <span className="text-2xl font-bold">#{rank}</span>
          <span className="text-xl font-mono">{symbol}</span>
        </div>
        <h3 className="text-xl font-bold mb-4">{name}</h3>
        <div className="space-y-2">
          <p className="font-mono text-lg">{formatCurrency(parseFloat(priceUsd))}</p>
          <p className={`font-mono ${priceChange >= 0 ? 'text-green-400' : 'text-red-400'}`}>
            {priceChange >= 0 ? '↑' : '↓'} {Math.abs(priceChange).toFixed(2)}%
          </p>
        </div>
      </div>
    </Link>
  );
}
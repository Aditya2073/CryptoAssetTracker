import { useQuery } from '@tanstack/react-query';
import { useParams, Link } from 'react-router-dom';
import { PriceChart } from '@/components/PriceChart';
import { fetchAssetDetails, fetchAssetHistory, formatCurrency } from '@/lib/utils';

export default function AssetDetails() {
  const { id } = useParams<{ id: string }>();

  const { data: assetData, isLoading: isLoadingAsset } = useQuery({
    queryKey: ['asset', id],
    queryFn: () => fetchAssetDetails(id!),
    enabled: !!id,
  });

  const { data: historyData, isLoading: isLoadingHistory } = useQuery({
    queryKey: ['assetHistory', id],
    queryFn: () => fetchAssetHistory(id!),
    enabled: !!id,
  });

  if (isLoadingAsset || isLoadingHistory) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Loading asset details...</h1>
      </div>
    );
  }

  const asset = assetData?.data;
  const history = historyData?.data;

  if (!asset || !history) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-destructive mb-4">Failed to load asset details</p>
        <Link to="/" className="neo-brutalist-button px-6 py-3 inline-block">
          Back to Assets
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mb-8">
        <Link to="/" className="neo-brutalist-button px-6 py-3 inline-block mb-8">
          Back to Assets
        </Link>
        <div className="flex flex-col md:flex-row justify-between items-start gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold mb-2">{asset.name}</h1>
            <p className="text-2xl font-mono">{asset.symbol}</p>
          </div>
          <div className="space-y-2">
            <p className="text-3xl font-mono">{formatCurrency(parseFloat(asset.priceUsd))}</p>
            <p className={`text-xl font-mono ${parseFloat(asset.changePercent24Hr) >= 0 ? 'text-green-400' : 'text-red-400'}`}>
              {parseFloat(asset.changePercent24Hr) >= 0 ? '↑' : '↓'} {Math.abs(parseFloat(asset.changePercent24Hr)).toFixed(2)}%
            </p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="neo-brutalist-card p-6">
            <h3 className="text-lg mb-2">Market Cap</h3>
            <p className="font-mono text-xl">{formatCurrency(parseFloat(asset.marketCapUsd))}</p>
          </div>
          <div className="neo-brutalist-card p-6">
            <h3 className="text-lg mb-2">Volume (24h)</h3>
            <p className="font-mono text-xl">{formatCurrency(parseFloat(asset.volumeUsd24Hr))}</p>
          </div>
          <div className="neo-brutalist-card p-6">
            <h3 className="text-lg mb-2">Supply</h3>
            <p className="font-mono text-xl">{parseInt(asset.supply).toLocaleString()} {asset.symbol}</p>
          </div>
        </div>

        <PriceChart data={history} />
      </div>
    </div>
  );
}
import { useQuery } from '@tanstack/react-query';
import { CryptoCard } from '@/components/CryptoCard';
import { fetchTopAssets } from '@/lib/utils';

export default function Index() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['assets'],
    queryFn: fetchTopAssets,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-8">Loading assets...</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-4">Error</h1>
        <p className="text-destructive">Failed to load crypto assets</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8">
      <div className="mb-12 text-center">
        <h1 className="text-6xl font-extrabold mb-4 text-white neo-brutalist-card inline-block px-6 py-4 border-[3px] border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-none transition-all">
          Crypto Asset Tracker
        </h1>
        <p className="mt-4 text-xl text-muted-foreground">
          Top 50 Cryptocurrencies by Market Cap
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.data.map((asset: any) => (
          <CryptoCard
            key={asset.id}
            id={asset.id}
            rank={asset.rank}
            symbol={asset.symbol}
            name={asset.name}
            priceUsd={asset.priceUsd}
            changePercent24Hr={asset.changePercent24Hr}
          />
        ))}
      </div>
    </div>
  );
}
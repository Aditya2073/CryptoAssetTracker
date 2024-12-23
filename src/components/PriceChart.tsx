import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { formatCurrency } from '@/lib/utils';

interface PriceChartProps {
  data: Array<{
    time: number;
    priceUsd: string;
  }>;
}

export function PriceChart({ data }: PriceChartProps) {
  const chartData = data.map(point => ({
    time: new Date(point.time).toLocaleDateString(),
    price: parseFloat(point.priceUsd)
  }));

  return (
    <div className="h-[400px] w-full neo-brutalist-card p-6">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={chartData}>
          <XAxis 
            dataKey="time" 
            stroke="#fff"
            tickLine={false}
            axisLine={false}
          />
          <YAxis 
            stroke="#fff"
            tickFormatter={(value) => formatCurrency(value)}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (active && payload && payload.length) {
                return (
                  <div className="neo-brutalist-card p-4">
                    <p className="font-mono">{formatCurrency(payload[0].value)}</p>
                    <p className="text-sm text-muted-foreground">{payload[0].payload.time}</p>
                  </div>
                );
              }
              return null;
            }}
          />
          <Area
            type="monotone"
            dataKey="price"
            stroke="#D6BCFA"
            fill="#D6BCFA"
            fillOpacity={0.2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
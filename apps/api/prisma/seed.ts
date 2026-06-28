import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create sample strategies
  const strategies = await prisma.strategy.createMany({
    data: [
      {
        name: 'Long Call',
        description: 'Buy a call option expecting the price to rise',
        type: 'bullish',
        maxProfit: 10000,
        maxLoss: 500,
        probabilityOfProfit: 45,
      },
      {
        name: 'Bull Put Spread',
        description: 'Sell a put and buy a lower put for limited risk',
        type: 'bullish',
        maxProfit: 300,
        maxLoss: 200,
        probabilityOfProfit: 70,
      },
      {
        name: 'Iron Condor',
        description: 'Neutral strategy selling both call and put spreads',
        type: 'neutral',
        maxProfit: 200,
        maxLoss: 300,
        probabilityOfProfit: 65,
      },
      {
        name: 'Long Straddle',
        description: 'Buy both a call and put at same strike for volatility play',
        type: 'volatility',
        maxProfit: 5000,
        maxLoss: 500,
        probabilityOfProfit: 50,
      },
    ],
  });

  console.log(`✅ Created ${strategies.count} strategies`);

  // Create sample assets
  const assets = await prisma.asset.createMany({
    data: [
      {
        symbol: 'BBAS3',
        name: 'Banco do Brasil',
        market: 'BR',
        type: 'stock',
        price: 28.5,
        volatility: 0.35,
      },
      {
        symbol: 'PETR4',
        name: 'Petróleo Brasileiro',
        market: 'BR',
        type: 'stock',
        price: 25.3,
        volatility: 0.42,
      },
      {
        symbol: 'VALE3',
        name: 'Vale',
        market: 'BR',
        type: 'stock',
        price: 60.2,
        volatility: 0.38,
      },
      {
        symbol: 'SPY',
        name: 'S&P 500 ETF',
        market: 'US',
        type: 'etf',
        price: 450.5,
        volatility: 0.18,
      },
      {
        symbol: 'QQQ',
        name: 'Nasdaq ETF',
        market: 'US',
        type: 'etf',
        price: 380.2,
        volatility: 0.22,
      },
    ],
  });

  console.log(`✅ Created ${assets.count} assets`);

  console.log('🎉 Database seed completed!');
}

main()
  .catch((e) => {
    console.error('❌ Seed error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

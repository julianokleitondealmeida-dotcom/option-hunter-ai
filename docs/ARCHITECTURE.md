# Option Hunter AI - Arquitetura

## Visão Geral

Option Hunter AI é uma plataforma de **monorepo** construída com:
- **Backend**: NestJS + TypeScript + PostgreSQL + Redis
- **Frontend**: React + TypeScript + Vite
- **Quantitativa**: Python FastAPI para ML e cálculos complexos
- **Infraestrutura**: Docker, Kubernetes-ready

## 🏗️ Estrutura de Diretórios

```
option-hunter-ai/
├── apps/
│   ├── api/                          # Backend NestJS
│   │   ├── src/
│   │   │   ├── common/               # Shared utilities
│   │   │   ├── modules/
│   │   │   │   ├── auth/             # Autenticação
│   │   │   │   ├── assets/           # Ativos e busca
│   │   │   │   ├── options/          # Opções e cadeias
│   │   │   │   ├── strategies/       # Estratégias
│   │   │   │   ├── portfolio/        # Portfólio
│   │   │   │   ├── alerts/           # Alertas
│   │   │   │   ├── analytics/        # Análise quantitativa
│   │   │   │   └── ai/               # Integração IA
│   │   │   ├── database/
│   │   │   │   ├── migrations/
│   │   │   │   ├── seeds/
│   │   │   │   └── entities/
│   │   │   ├── config/               # Configurações
│   │   │   ├── interceptors/         # Interceptadores
│   │   │   ├── pipes/                # Validação
│   │   │   ├── filters/              # Tratamento de erros
│   │   │   └── main.ts
│   │   ├── test/                     # Testes
│   │   └── package.json
│   │
│   ├── web/                          # Frontend React
│   │   ├── src/
│   │   │   ├── components/
│   │   │   │   ├── layout/
│   │   │   │   ├── assets/
│   │   │   │   ├── options/
│   │   │   │   ├── strategies/
│   │   │   │   ├── simulator/
│   │   │   │   ├── portfolio/
│   │   │   │   └── common/
│   │   │   ├── pages/
│   │   │   ├── hooks/
│   │   │   ├── services/
│   │   │   ├── store/                # Zustand/Redux
│   │   │   ├── utils/
│   │   │   ├── types/
│   │   │   ├── styles/
│   │   │   └── App.tsx
│   │   ├── public/
│   │   └── package.json
│   │
│   ├── mobile/                       # React Native
│   │   ├── src/
│   │   │   ├── screens/
│   │   │   ├── components/
│   │   │   ├── navigation/
│   │   │   ├── services/
│   │   │   └── App.tsx
│   │   └── package.json
│   │
│   └── ml/                           # Python FastAPI
│       ├── src/
│       │   ├── models/               # ML models
│       │   ├── strategies/           # Análise de estratégias
│       │   ├── quantitative/         # Cálculos quantitativos
│       │   ├── endpoints/
│       │   └── main.py
│       ├── requirements.txt
│       └── Dockerfile
│
├── packages/
│   ├── shared/                       # Código compartilhado
│   │   ├── src/
│   │   │   ├── constants/
│   │   │   ├── utils/
│   │   │   ├── validators/
│   │   │   └── helpers/
│   │   └── package.json
│   │
│   ├── types/                        # TypeScript types compartilhados
│   │   ├── src/
│   │   │   ├── api/
│   │   │   ├── domain/
│   │   │   ├── options/
│   │   │   └── strategies/
│   │   └── package.json
│   │
│   └── utils/                        # Utilitários
│       ├── src/
│       └── package.json
│
├── docs/
│   ├── ARCHITECTURE.md               # Este arquivo
│   ├── API.md                        # Documentação da API
│   ├── DEVELOPMENT.md                # Guia de desenvolvimento
│   ├── STRATEGIES.md                 # Estratégias disponíveis
│   ├── DATA_SOURCES.md               # Fontes de dados
│   └── DEPLOYMENT.md                 # Deploy
│
├── .github/
│   └── workflows/                    # CI/CD
│       ├── test.yml
│       ├── lint.yml
│       └── deploy.yml
│
├── docker-compose.yml
├── pnpm-workspace.yaml
├── tsconfig.json
├── package.json
└── README.md
```

## 🔄 Fluxo de Dados

```
┌────────────────────────────────────────────────────────────────────────────┐
│                    User Interface                        │
│  (Web React / Mobile React Native / Dashboard)          │
└────────────────────────────────────┬────────────────────────────────────────┘
                       │ HTTP/WebSocket
┌────────────────────────────────────┴────────────────────────────────────────┐
│              API Gateway (NestJS)                        │
│  - Authentication / Authorization                        │
│  - Request Validation                                    │
│  - Rate Limiting                                         │
└────────────────────────────────────┬────────────────────────────────────────┘
        ┌───────────────────────────┬────────────────────────┐
        │              │              │
┌───────▼──────────┐ ┌──────▼─────────────┐ ┌──▼──────────────────────────┐
│ Asset Module     │ │ Options     │ │ Strategy Module│
│ - Search     │ │ - Chains    │ │ - Detection    │
│ - Quotes     │ │ - Greeks    │ │ - Scoring      │
└────────────┬──────┘ │ - Analytics │ │ - Simulator    │
        │        └────────┬──────────┘ └─┬────────────────────────┘
        └────────────────┬──────────────┴─┘
                       │
        ┌──────────────┼──────────────────┐
        │              │              │
┌───────▼────────┐ ┌──▼──────────┐ ┌──▼─────────────────────┐
│  PostgreSQL  │ │    Redis    │ │  Python ML API │
│  - Entities  │ │  - Cache    │ │  - Greeks      │
│  - History   │ │  - Sessions │ │  - Probability │
│  - Users     │ │  - Alerts   │ │  - Backtest    │
└──────────────┘ └─────────────┘ └────────────────────────┘

        ┌─────────────────────────────────────────────┐
        │  External Data Sources       │
        │  - BRAPI (BR)               │
        │  - Polygon.io (US)          │
        │  - Finnhub, Alpha Vantage   │
        │  - Investidor10, Venda Cob. │
        └─────────────────────────────────────────────┘
```

## 📦 Camadas da Aplicação

### 1. **Presentation Layer** (Frontend)
- React components
- State management (Zustand/Redux)
- Services para API calls
- Responsivo e intuitivo

### 2. **API Layer** (NestJS)
- Controllers (rotas HTTP)
- DTOs (validação)
- Interceptors (logging, transformação)
- Error handling

### 3. **Business Logic Layer** (Services)
- Asset service
- Options service
- Strategy service
- Analytics service
- AI/LLM integration

### 4. **Data Access Layer**
- Repositories (Pattern)
- Database queries
- Cache management

### 5. **External Integration Layer**
- BRAPI client
- Polygon.io client
- Finnhub client
- LLM clients (OpenAI, Claude)

### 6. **Quantitative Layer** (Python)
- Greeks calculation
- Probability analysis
- Backtesting engine
- Strategy optimization

## 📊 Entidades Principais

```typescript
// User
interface User {
  id: UUID
  email: string
  profile: UserProfile
  preferences: UserPreferences
  portfolio: Portfolio
  createdAt: Date
}

// Asset (Ativo)
interface Asset {
  id: UUID
  symbol: string
  name: string
  market: 'BR' | 'US'
  type: 'stock' | 'etf'
  price: number
  volatility: number
  lastUpdate: Date
}

// Option
interface Option {
  id: UUID
  assetId: UUID
  symbol: string
  strikePrice: number
  expirationDate: Date
  type: 'call' | 'put'
  bid: number
  ask: number
  volume: number
  openInterest: number
  impliedVolatility: number
  delta: number
  gamma: number
  theta: number
  vega: number
  rho: number
  lastUpdate: Date
}

// Strategy
interface Strategy {
  id: UUID
  name: string
  type: 'bullish' | 'bearish' | 'neutral' | 'volatility'
  legs: StrategyLeg[]
  maxProfit: number
  maxLoss: number
  breakEven: number
  probabilityOfProfit: number
}

// Opportunity
interface Opportunity {
  id: UUID
  strategy: Strategy
  asset: Asset
  score: number
  reasoning: string
  recommendation: string
  timestamp: Date
}

// Portfolio
interface Portfolio {
  id: UUID
  userId: UUID
  positions: Position[]
  totalValue: number
  riskMetrics: RiskMetrics
}
```

## 🔐 Segurança

- **Autenticação**: JWT + OAuth2
- **Autorização**: RBAC (Role-Based Access Control)
- **Criptografia**: HTTPS + encryption em repouso
- **Rate Limiting**: Per-user e per-endpoint
- **Validação**: Input sanitization com `class-validator`
- **Secrets**: Gerenciamento via `.env` seguro

## 🚀 Performance

- **Caching**: Redis para dados frequentes
- **Async Processing**: Background jobs com RabbitMQ
- **Database Indexing**: Índices estratégicos no PostgreSQL
- **API Pagination**: Resultados paginados
- **GraphQL Optional**: Para queries complexas

## 🚀 Escalabilidade

- **Horizontal Scaling**: Stateless design
- **Load Balancer**: Nginx/HAProxy
- **Database Replication**: PostgreSQL replicas
- **Message Queue**: Desacoplamento de serviços
- **CDN**: Para assets estáticos
- **Microservices Ready**: Arquitetura preparada

## 🧪 Testing

```
- Unit Tests: Jest
- Integration Tests: Supertest
- E2E Tests: Cypress/Playwright
- Load Testing: k6 ou Artillery
```

## 🔄 CI/CD Pipeline

```
Commit → Lint → Test → Build → Deploy Staging → Deploy Production
```

## 📚 Próximos Passos

1. Configurar banco de dados com migrations
2. Implementar autenticação
3. Integrar primeira fonte de dados (BRAPI)
4. Criar módulo de ativos
5. Implementar cadeia de opções
6. Construir motor de estratégias

---

Para mais detalhes, veja:
- [API Documentation](./API.md)
- [Development Guide](./DEVELOPMENT.md)
- [Data Sources](./DATA_SOURCES.md)

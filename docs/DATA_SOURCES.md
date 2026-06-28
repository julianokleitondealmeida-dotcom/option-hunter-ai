# Data Sources - Option Hunter AI

## 📊 Fonte de Dados Integradas

### Brasil (B3)

#### 1. **BRAPI** ⭐ Principal

**URL**: [https://brapi.dev](https://brapi.dev)

**Cobertura**:
- Todas as ações B3
- Todos os ETFs B3
- Opções listadas
- Fundos imobiliários

**Endpoints**:
```bash
# Cotação em tempo real
GET /api/quote/{symbol}

# Opções
GET /api/options/{symbol}

# Histórico
GET /api/quote/{symbol}/history

# Dividendos
GET /api/quote/{symbol}/dividends
```

**Autenticação**: API Key (gratuita com limite)

#### 2. **B3 Oficial**

**URL**: [https://www.b3.com.br](https://www.b3.com.br)

**Dados**:
- Cotações oficiais
- Calendário corporativo
- Índices
- Dados de exercício de opções

**Acesso**: Web scraping controlado + dados públicos

#### 3. **OPLAB**

**URL**: [https://www.oplab.com.br](https://www.oplab.com.br)

**Especialidade**: Análise de opções brasileiras

**Dados**:
- Volatilidade implícita
- Gregas
- Análise técnica de opções

### Estados Unidos

#### 1. **Polygon.io** ⭐ Principal

**URL**: [https://polygon.io](https://polygon.io)

**Cobertura**:
- NYSE, NASDAQ, AMEX
- ETFs americanos
- Forex, Crypto
- Opções

**Endpoints**:
```bash
# Quotes em tempo real (WebSocket)
WS: wss://socket.polygon.io/options

# Histórico
GET /v1/aggs/ticker/{symbol}/range/{multiplier}/{timespan}/{from}/{to}

# Opções
GET /v3/snapshot/options/{underlyingSymbol}/{optionSymbol}
```

**Autenticação**: API Key

**Planos**:
- Free: Dados atrasados 15 min
- Starter: Dados em tempo real
- Professional: Multi-ticker

#### 2. **Tradier** 🎯 Especializado em Opções

**URL**: [https://www.tradier.com](https://www.tradier.com)

**Especialidade**: Opções americanas

**Endpoints**:
```bash
# Cadeia de opções
GET /v1/markets/options/chains

# Grego
GET /v1/markets/options/lookup

# Quotes
GET /v1/markets/quotes
```

**Dados**:
- IV Rank
- IV Percentile
- Gregas precisas
- Open Interest
- Volume

#### 3. **Finnhub**

**URL**: [https://finnhub.io](https://finnhub.io)

**Dados**:
- Fundamental data
- Earnings calendar
- Notícias em tempo real
- Economic calendar

```bash
GET /api/v1/quote?symbol=AAPL
GET /api/v1/company-news?symbol=AAPL
GET /api/v1/calendar/earnings
```

#### 4. **Alpha Vantage**

**URL**: [https://www.alphavantage.co](https://www.alphavantage.co)

**Dados**:
- Séries temporais (OHLC)
- Indicadores técnicos
- Forex
- Crypto

```bash
GET /query?function=TIME_SERIES_DAILY&symbol=AAPL
GET /query?function=RSI&symbol=AAPL
```

### Fontes Complementares

#### 1. **Investidor10**

**URL**: [https://investidor10.com.br](https://investidor10.com.br)

**Dados**:
- Análise fundamental completa
- Indicadores
- Ranking de ações
- Conteúdo educacional

**Método**: Web scraping (permitido por TOS)

#### 2. **Venda Coberta**

**URL**: [https://www.vendacoberta.com.br](https://www.vendacoberta.com.br)

**Especialidade**: Venda coberta e renda

**Dados**:
- Oportunidades de venda coberta
- Análise de rendimento
- Estratégias de renda

**Método**: Web scraping (permitido por TOS)

#### 3. **CVM** (Brasil)

**URL**: [https://dados.cvm.gov.br](https://dados.cvm.gov.br)

**Dados**:
- Filings de companhias abertas
- Informações regulatórias
- Estrutura acionária

**Acesso**: API pública

#### 4. **SEC** (EUA)

**URL**: [https://www.sec.gov/cgi-bin/browse-edgar](https://www.sec.gov/cgi-bin/browse-edgar)

**Dados**:
- 10-K, 10-Q, 8-K
- Filings de empresas
- Informações de insiders

**Acesso**: Web scraping (permitido por TOS)

#### 5. **OCC** (Options Clearing Corporation)

**URL**: [https://www.occ.com](https://www.occ.com)

**Dados**:
- Estatísticas de opções
- Open Interest histórico
- Volume por strike

#### 6. **CBOE** (Chicago Board Options Exchange)

**URL**: [https://www.cboe.com](https://www.cboe.com)

**Dados**:
- VIX (Volatilidade do S&P 500)
- IV indices
- Market statistics

```bash
GET https://cdn.cboe.com/api/global/delayed_quotes/options/{symbol}.json
```

### Complementares (News + Context)

#### 1. **Yahoo Finance**

**URL**: [https://finance.yahoo.com](https://finance.yahoo.com)

**Dados**:
- Gráficos
- Histórico
- Análises

**Método**: yfinance (libraria Python)

#### 2. **NewsAPI**

**URL**: [https://newsapi.org](https://newsapi.org)

**Dados**:
- Notícias financeiras em tempo real
- Fontes múltiplas
- Filtro por empresa

---

## 🔄 Sistema de Fallback

### Prioridade de Fontes

```
1. Fonte Oficial (B3, SEC)
   ↓ (se indisponível)
2. API Comercial Premium (Polygon, Tradier)
   ↓ (se indisponível)
3. API Gratuita (BRAPI, Finnhub)
   ↓ (se indisponível)
4. Investidor10 / Venda Coberta (web scraping)
   ↓ (se indisponível)
5. Yahoo Finance (fallback último)
```

### Implementação

```typescript
// data-source.service.ts

import { Injectable } from '@nestjs/common';

@Injectable()
export class DataSourceService {
  constructor(
    private b3Service: B3Service,
    private brapiService: BrapiService,
    private polygonService: PolygonService,
    private tradierService: TradierService,
    private fallbackService: FallbackService,
  ) {}

  async getAssetQuote(symbol: string): Promise<AssetQuote> {
    // Tenta B3 para ativos brasileiros
    if (this.isB3Asset(symbol)) {
      try {
        return await this.b3Service.getQuote(symbol);
      } catch (error) {
        console.warn(`B3 failed for ${symbol}, trying BRAPI`);
      }
    }

    // Tenta BRAPI
    try {
      return await this.brapiService.getQuote(symbol);
    } catch (error) {
      console.warn(`BRAPI failed for ${symbol}, trying Polygon`);
    }

    // Tenta Polygon para EUA
    try {
      return await this.polygonService.getQuote(symbol);
    } catch (error) {
      console.warn(`Polygon failed for ${symbol}, trying fallback`);
    }

    // Fallback
    return await this.fallbackService.getQuote(symbol);
  }

  async getOptionsChain(symbol: string): Promise<OptionsChain> {
    // Brasil
    if (this.isB3Asset(symbol)) {
      try {
        return await this.brapiService.getOptionsChain(symbol);
      } catch (error) {
        console.warn(`BRAPI options failed, trying OPLAB`);
        return await this.oplabService.getOptionsChain(symbol);
      }
    }

    // EUA
    try {
      return await this.tradierService.getOptionsChain(symbol);
    } catch (error) {
      console.warn(`Tradier failed, trying Polygon`);
      return await this.polygonService.getOptionsChain(symbol);
    }
  }
}
```

---

## 🔐 Credenciais

### Configuração de Ambiente

```bash
# .env
BRAPI_KEY=your_key_here
POLYGON_KEY=your_key_here
FINNHUB_KEY=your_key_here
ALPHA_VANTAGE_KEY=your_key_here
TRADIER_TOKEN=your_token_here
NEWSAPI_KEY=your_key_here
```

### Obtenção de Chaves

| Serviço | URL | Custo | Limite Gratuito |
|---------|-----|-------|----------------|
| BRAPI | https://brapi.dev | Gratuito | 120 req/min |
| Polygon.io | https://polygon.io | Pago | 5 req/min |
| Tradier | https://www.tradier.com | Pago | Trial |
| Finnhub | https://finnhub.io | Gratuito | 60 req/min |
| Alpha Vantage | https://www.alphavantage.co | Gratuito | 5 req/min |
| NewsAPI | https://newsapi.org | Pago | 100 req/day |

---

## 📈 Taxa de Atualização

| Tipo de Dado | Frequência | Latência |
|--------------|-----------|----------|
| Preços | Real-time | < 100ms |
| Opções (Chain) | 1-5 seg | < 500ms |
| Gregas | 5-15 seg | < 1s |
| Notícias | Contínuo | Instantâneo |
| Dividendos | 1x/dia | N/A |
| Earnings | 1x/dia | N/A |
| IV Rank | 5 min | < 1s |

---

## 🧪 Testing com Mock Data

```typescript
// data-source.service.spec.ts
import { Test } from '@nestjs/testing';

describe('DataSourceService', () => {
  it('should return mock asset quote', async () => {
    const service = new DataSourceService(
      new MockB3Service(),
      new MockBrapiService(),
    );

    const quote = await service.getAssetQuote('BBAS3');
    expect(quote).toBeDefined();
    expect(quote.price).toBeGreaterThan(0);
  });
});
```

---

## 🚨 Tratamento de Erros

```typescript
// Erros comuns
RateLimitError    // Limite de requisições atingido
AuthenticationError // Chave inválida
NetworkError       // Conexão falhou
DataFormatError    // Resposta inesperada
```

**Estratégia**:
1. Retry com backoff exponencial
2. Cache para dados recentes
3. Fallback para outra fonte
4. Alertar usuário se crítico

---

Próximos passos: Integrar primeira fonte BRAPI no módulo de assets!

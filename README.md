# Option Hunter AI

**O assistente inteligente especializado em opções de ações e ETFs dos mercados brasileiro e americano.**

## 🎯 Objetivo

Option Hunter AI é uma plataforma profissional, moderna e escalável que atua como um **radar inteligente de oportunidades** em opções, combinando:

- 🤖 Inteligência Artificial
- 📊 Análise Quantitativa
- 📈 Dados de Mercado em Tempo Real
- 📉 Estatística Avançada
- 🎓 Educação Financeira
- ⚠️ Gestão de Risco Integrada

## 🌍 Mercados Suportados

### Brasil (B3)
- ✅ Todas as ações
- ✅ Todos os ETFs
- ✅ Todas as opções listadas

### Estados Unidos
- ✅ NYSE, NASDAQ, AMEX
- ✅ ETFs americanos
- ✅ Todas as opções listadas

## 🚀 Funcionalidades Principais

### 1. Pesquisa Inteligente de Ativos
- Busca por código, nome da empresa ou ETF
- Cotações em tempo real
- Gráficos interativos
- Análise fundamental completa

### 2. Motor de Detecção de Oportunidades
- Monitora automaticamente milhares de contratos
- Ranking quantitativo (0-100)
- Identificação de operações estatisticamente favoráveis
- Filtro por perfil e expectativa do usuário

### 3. Estratégias Automatizadas
- **Altistas**: Long Call, Bull Call Spread, Bull Put Spread, Covered Call, Cash Secured Put
- **Baixistas**: Long Put, Bear Put Spread, Bear Call Spread
- **Neutras**: Iron Condor, Iron Butterfly, Calendar Spread, Diagonal Spread
- **Volatilidade**: Long Straddle, Long Strangle, Short Straddle, Short Strangle

### 4. Simulador Profissional
- Payoff diagrams
- Greeks (Delta, Gamma, Theta, Vega, Rho)
- Probabilidade de lucro
- Análise de cenários
- Backtesting histórico

### 5. Gestão de Portfólio
- Integração de carteira
- Sugestões de Covered Calls
- Proteções com Puts
- Análise de exposição ao risco

### 6. Assistente IA Especializado
- Explicações em linguagem simples
- Recomendações de execução
- Sugestões de ajuste
- Análise de riscos específicos

## 📋 Stack Técnico

### Backend
- **Runtime**: Node.js + TypeScript
- **API**: NestJS
- **Banco de Dados**: PostgreSQL + Redis
- **Processamento**: Python FastAPI (quantitativa + ML)
- **Fila**: RabbitMQ ou Kafka

### Frontend
- **Web**: React + TypeScript + Vite
- **Mobile**: React Native / Flutter
- **UI**: Tailwind CSS + Shadcn/ui
- **Gráficos**: TradingView Lightweight Charts

### Infraestrutura
- **Cloud**: AWS / GCP / Azure
- **Containerização**: Docker + Kubernetes
- **CI/CD**: GitHub Actions

## 🔌 Integrações de Dados

### Fontes Primárias
- **Brasil**: B3, OPLAB, BRAPI
- **EUA**: Polygon.io, Tradier, Finnhub, Alpha Vantage

### Fontes Complementares
- Investidor10
- Venda Coberta
- CVM, SEC, OCC, CBOE

### Sistema de Fallback Automático
1. Fonte Oficial
2. API Comercial
3. Investidor10
4. Venda Coberta
5. Yahoo Finance

## 📁 Estrutura do Projeto

```
option-hunter-ai/
├── apps/
│   ├── api/                    # Backend NestJS
│   ├── web/                    # Frontend React
│   ├── mobile/                 # React Native
│   └── ml/                     # Python FastAPI (quantitativa)
├── packages/
│   ├── shared/                 # Código compartilhado
│   ├── types/                  # TypeScript types
│   └── utils/                  # Utilitários
├── docs/                       # Documentação
├── docker-compose.yml
├── pnpm-workspace.yaml
└── README.md
```

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- Docker + Docker Compose
- pnpm (gerenciador de pacotes)

### Instalação

```bash
# Clone o repositório
git clone https://github.com/julianokleitondealmeida-dotcom/option-hunter-ai.git
cd option-hunter-ai

# Instale as dependências
pnpm install

# Configure as variáveis de ambiente
cp .env.example .env

# Inicie os serviços com Docker
docker-compose up -d

# Execute as migrações
pnpm db:migrate

# Inicie o desenvolvimento
pnpm dev
```

## 🗺️ Roadmap de Desenvolvimento

### Fase 1: MVP (4-6 semanas)
- [x] Setup do repositório
- [ ] Integração BRAPI + Polygon.io
- [ ] Pesquisa de ativos
- [ ] Cadeia de opções
- [ ] Estratégias básicas
- [ ] UI responsiva

### Fase 2: Core Features (6-8 semanas)
- [ ] Motor de detecção
- [ ] Ranking quantitativo
- [ ] Simulador profissional
- [ ] Greeks
- [ ] Assistente IA

### Fase 3: Advanced (8-10 semanas)
- [ ] Backtesting
- [ ] Portfólio integrado
- [ ] Multi-source fallback
- [ ] Web scraping
- [ ] Educacional

### Fase 4: Polish & Scale (4-6 semanas)
- [ ] Otimizações
- [ ] Mobile apps
- [ ] Testes
- [ ] Documentação
- [ ] Deploy

## 📋 Perfil do Usuário

O sistema coleta:
- **Expectativa de Mercado**: Muito Altista → Muito Baixista
- **Expectativa de Volatilidade**: Aumentar, Estável, Diminuir
- **Horizonte**: Curto, Médio, Longo Prazo
- **Perfil de Risco**: Conservador, Moderado, Agressivo

## 🎓 Funcionalidades Educacionais

- Explicação de cada estratégia
- Como cada operação funciona
- Quando ganha e quando perde
- Casos de exercício antecipado
- Como ajustar posições
- Melhores práticas de risco

## 📈 Métricas de Scoring

Cada operação recebe score 0-100 baseado em:
- Probabilidade de lucro
- Retorno esperado
- Risco máximo
- Liquidez e Volume
- IV Rank / IV Percentile
- Spread Bid-Ask
- Valor Esperado
- Kelly Criterion
- Sharpe Ajustado

## 🔐 Segurança

- Autenticação OAuth2 + JWT
- Criptografia de dados sensíveis
- Rate limiting
- Validação de entrada
- HTTPS obrigatório
- Conformidade com LGPD/GDPR

## 📞 Suporte

Para dúvidas, sugestões ou bug reports, abra uma issue no repositório.

## 📄 Licença

MIT

---

**Option Hunter AI** - Transformando análise de opções em inteligência prática.

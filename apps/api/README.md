# Option Hunter AI - Backend API

Backend NestJS application para Option Hunter AI.

## 🚀 Setup Rápido

### Pré-requisitos
- Node.js 18+
- PostgreSQL 14+
- Docker + Docker Compose

### Instalação

```bash
# Instale dependências
pnpm install

# Configure variáveis de ambiente
cp .env.example .env.local

# Crie as tabelas do banco
pnpm db:migrate

# Popule dados de exemplo
pnpm db:seed

# Inicie o servidor
pnpm start:dev
```

## 📚 Documentação da API

Accesse `http://localhost:3000/api` para ver o Swagger.

## 🧪 Testes

```bash
# Unit tests
pnpm test

# Coverage
pnpm test:cov

# E2E tests
pnpm test:e2e
```

## 📁 Estrutura

```
src/
├── modules/           # Módulos do aplicativo
│   ├── auth/         # Autenticação
│   ├── assets/       # Ativos
│   ├── options/      # Opções
│   ├── strategies/   # Estratégias
│   ├── portfolio/    # Portfólio
│   ├── alerts/       # Alertas
│   ├── analytics/    # Análise
│   └── ai/           # IA
├── database/         # Prisma
├── common/           # Utilitários comuns
├── config/           # Configurações
├── main.ts           # Entry point
└── app.module.ts     # App module
```

## 🔐 Autenticação

Use JWT Bearer token no header:

```bash
Authorization: Bearer <your_token>
```

## 🛠️ Comandos Úteis

```bash
# Desenvolvimento
pnpm start:dev      # Watch mode
pnpm start:debug    # Debug mode
pnpm build          # Build para produção

# Banco de Dados
pnpm db:migrate     # Executar migrações
pnpm db:seed        # Seed dados
pnpm db:studio      # Prisma Studio

# Testes e Lint
pnpm test           # Executar testes
pnpm lint           # Lint com fix
pnpm format         # Formatar código
```

## 📖 Recursos

- [NestJS Docs](https://docs.nestjs.com)
- [Prisma Docs](https://www.prisma.io/docs)
- [JWT Documentation](https://jwt.io)

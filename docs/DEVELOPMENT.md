# Guia de Desenvolvimento - Option Hunter AI

## 🚀 Quick Start

### Pré-requisitos
- Node.js 18+
- Docker + Docker Compose
- pnpm 8+
- Python 3.10+ (para ML)
- Git

### Setup Inicial

```bash
# 1. Clone o repositório
git clone https://github.com/julianokleitondealmeida-dotcom/option-hunter-ai.git
cd option-hunter-ai

# 2. Instale dependências
pnpm install

# 3. Configure variáveis de ambiente
cp .env.example .env
# Edite .env com suas chaves de API

# 4. Inicie os serviços
docker-compose up -d

# 5. Rode migrações de banco
pnpm db:migrate

# 6. Inicie o desenvolvimento
pnpm dev
```

## 📁 Criando um Novo Módulo

### Backend (NestJS)

```bash
# Gere um novo módulo
cd apps/api
nest generate module modules/my-feature
nest generate service modules/my-feature
nest generate controller modules/my-feature
```

Estrutura típica:

```typescript
// my-feature.module.ts
import { Module } from '@nestjs/common';
import { MyFeatureService } from './my-feature.service';
import { MyFeatureController } from './my-feature.controller';

@Module({
  providers: [MyFeatureService],
  controllers: [MyFeatureController],
  exports: [MyFeatureService],
})
export class MyFeatureModule {}
```

### Frontend (React)

```bash
# Crie a estrutura
mkdir -p apps/web/src/components/my-feature
touch apps/web/src/components/my-feature/MyFeature.tsx
touch apps/web/src/components/my-feature/MyFeature.module.css
touch apps/web/src/hooks/useMyFeature.ts
touch apps/web/src/services/myFeatureService.ts
```

## 🗄️ Database

### Criar uma Migration

```bash
cd apps/api
npm run db:migration:create -- create_users_table
```

### Executar Migrations

```bash
pnpm db:migrate
```

### Reverter Migration

```bash
pnpm db:migrate:down
```

## 🧪 Testing

### Unit Tests

```bash
# Executar testes
pnpm test

# Com coverage
pnpm test:coverage

# Watch mode
pnpm test:watch
```

### Exemplo de teste

```typescript
// my-feature.service.spec.ts
import { Test, TestingModule } from '@nestjs/testing';
import { MyFeatureService } from './my-feature.service';

describe('MyFeatureService', () => {
  let service: MyFeatureService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MyFeatureService],
    }).compile();

    service = module.get<MyFeatureService>(MyFeatureService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return data', async () => {
    const result = await service.getData();
    expect(result).toBeDefined();
  });
});
```

## 📝 Padrões de Código

### TypeScript

- Use tipos explícitos sempre
- Interfaces para contracts públicos
- Enums para constantes
- Strict mode ativado

```typescript
// ✅ Bom
interface User {
  id: string;
  email: string;
  role: UserRole;
}

enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

class UserService {
  async getUser(id: string): Promise<User> {
    // implementação
  }
}

// ❌ Ruim
const user: any = {};
function getUser(id) {
  // sem tipos
}
```

### NestJS Conventions

```typescript
// ✅ Controllers
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get(':id')
  async getUser(@Param('id') id: string): Promise<UserDto> {
    return this.usersService.getUser(id);
  }
}

// ✅ Services
@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getUser(id: string): Promise<User> {
    return this.usersRepository.findOne({ where: { id } });
  }
}

// ✅ DTOs
export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
```

### React Conventions

```typescript
// ✅ Functional Components
import { FC, useState } from 'react';

interface MyComponentProps {
  title: string;
  onClick?: () => void;
}

const MyComponent: FC<MyComponentProps> = ({ title, onClick }) => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>{title}</h1>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>
      {onClick && <button onClick={onClick}>Action</button>}
    </div>
  );
};

export default MyComponent;

// ✅ Custom Hooks
const useMyFeature = (initialValue: string) => {
  const [value, setValue] = useState(initialValue);

  const reset = () => setValue(initialValue);

  return { value, setValue, reset };
};
```

## 🔄 Git Workflow

### Branch Strategy

```
main (produção)
├── develop (staging)
│   ├── feature/user-authentication
│   ├── feature/asset-search
│   ├── bugfix/options-chain
│   └── chore/update-dependencies
```

### Commit Messages

```
feat: add user authentication module
fix: resolve options chain parsing error
docs: update API documentation
refactor: simplify strategy scoring logic
test: add coverage for Greeks calculation
chore: update dependencies
```

### Pull Request Process

1. Create feature branch from `develop`
2. Make changes with meaningful commits
3. Push and open PR to `develop`
4. Request reviews (minimum 2)
5. Pass all CI checks
6. Merge with squash for clean history
7. Delete branch

## 🐛 Debugging

### Backend

```bash
# Start with debugger
node --inspect-brk dist/main.js

# Chrome DevTools
chrome://inspect
```

### Frontend

```bash
# Vite Dev Server logs
DEBUG=* pnpm dev

# Browser DevTools
F12 → Console/Network/Sources
```

### Database

```bash
# Connect to PostgreSQL
pnpm db:shell

# Useful queries
SELECT * FROM users;
SELECT * FROM options WHERE asset_id = 'xxx';
```

## 📦 Building

```bash
# Build all apps
pnpm build

# Build specific app
cd apps/api && npm run build

# Build Docker images
docker-compose build
```

## 🚀 Deployment

### Local Testing

```bash
# Build and run locally
docker-compose -f docker-compose.yml -f docker-compose.prod.yml up
```

### Staging

```bash
# Merge to develop and push
git push origin develop

# GitHub Actions deploys automatically
```

### Production

```bash
# Merge PR to main
git merge develop

# Tag release
git tag -a v0.1.0 -m "Release version 0.1.0"
git push origin v0.1.0

# GitHub Actions deploys automatically
```

## 🛠️ Useful Commands

```bash
# Start development
pnpm dev

# Run tests
pnpm test

# Lint code
pnpm lint

# Format code
pnpm format

# Build production
pnpm build

# Check dependencies
pnpm outdated

# Update dependencies
pnpm update

# Clean everything
pnpm clean
```

## 📚 Resources

- [NestJS Documentation](https://docs.nestjs.com)
- [React Documentation](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [PostgreSQL Docs](https://www.postgresql.org/docs)
- [Redis Docs](https://redis.io/documentation)

## ❓ FAQs

### Q: Como adicionar uma nova API key?
A: Adicione em `.env.example` e `.env`, depois use `process.env.MY_NEW_KEY`

### Q: Como conectar a um novo banco de dados?
A: Modifique `DATABASE_URL` no `.env` e rode `pnpm db:migrate`

### Q: Como fazer debug no VS Code?
A: Abra `launch.json` e use a configuração de debugging pré-definida

---

Para dúvidas, abra uma issue no repositório!

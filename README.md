# Projeto de Estudo NestJS com Princípios SOLID

## Descrição
Este é um projeto de estudo desenvolvido com NestJS, implementando um CRUD de usuários com foco na aplicação dos princípios SOLID e boas práticas de desenvolvimento.

## Tecnologias Utilizadas
- NestJS
- Drizzle ORM
- PostgreSQL
- Swagger
- Jest (Testes)

## Estrutura do Projeto
```plaintext
src/
├── base/
│   ├── base.module.ts
│   ├── base.repository.ts
│   └── base.service.ts
├── database/
│   ├── drizzle.ts
│   └── schemas/
├── modules/
│   └── user/
│       ├── dto/
│       ├── use-cases/
│       ├── user.controller.ts
│       ├── user.service.ts
│       └── user.module.ts
└── main.ts
```

### Princípios SOLID Aplicados

1. **Single Responsibility Principle (SRP)**
   - **Base Repository**: Responsável apenas pela comunicação com o banco de dados.
   - **Use Cases**: Cada caso de uso em arquivo separado com responsabilidade única.

2. **Open/Closed Principle (OCP)**
   - **Base Classes**: Estrutura extensível através de classes base.
   - **DTOs**: Sistema de DTOs extensível usando herança.
   - **Decorators**: Uso de decoradores para adicionar funcionalidades sem modificar código existente.

3. **Liskov Substitution Principle (LSP)**
   - **Repository Pattern**: Implementação consistente através de classes base.
   - **Service Layer**: Serviços seguem contratos bem definidos.
   - **DTOs**: Hierarquia de DTOs respeitando o princípio LSP.

4. **Interface Segregation Principle (ISP)**
   - **DTOs Específicos**: DTOs separados para cada operação.
   - **Controllers**: Endpoints específicos para cada operação.

5. **Dependency Inversion Principle (DIP)**
   - **Injeção de Dependências**: Uso do sistema de DI do NestJS.
   - **Módulos**: Configuração de providers através de módulos.

### Arquitetura

#### Container e Injeção de Dependências
- Configuração centralizada de dependências.
- Uso de providers com factory functions.
- Singleton pattern para conexão com banco de dados.

#### Camadas da Aplicação
1. **Controllers**: Manipulação de requisições HTTP.
2. **Use Cases**: Lógica de negócio isolada.
3. **Services**: Serviços reutilizáveis.
4. **Repositories**: Acesso a dados.

### Testes
- Testes unitários implementados.
- Mocks para dependências externas.
- Cobertura de casos de sucesso e erro.

### Documentação API
- Swagger implementado.
- Decoradores para documentação.
- Descrições de endpoints e DTOs.

## Instalação e Execução
```plaintext
# Instalação
npm install

# Desenvolvimento
npm run start:dev

# Produção
npm run start:prod

# Testes
npm run test
```
### Boas Práticas
- **Error Handling**: Tratamento consistente de erros.
- **Validação**: Uso de `class-validator`.
- **Logging**: Sistema de logs estruturado.
- **Configuração**: Variáveis de ambiente.
- **Formatação**: ESLint e Prettier configurados.

### Autor
Laura Moraes - <a href="https://www.linkedin.com/in/laura-moraes-20912114b/">LinkedIn</a>

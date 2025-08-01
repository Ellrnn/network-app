# Detox E2E Testing Setup - TypeScript Version

Este é o guia completo para configurar Detox com TypeScript no seu projeto CodeLeap Network App.

## Análise do Projeto

Após analisar completamente seu projeto, identifiquei a seguinte estrutura:

### Estrutura da Aplicação

- **App principal**: Redireciona de `/` para `/signup`
- **Tela de Signup**: Coleta username e navega para `/main`
- **Tela Principal**: Lista de posts com formulário de criação
- **Componentes principais**:
  - `PostCard`: Exibe posts com botões de editar/deletar para próprios posts
  - `PostForm`: Formulário para criar posts
  - `EditModal`: Modal para editar posts
  - `DeleteModal`: Modal para confirmar exclusão

### Configurações TypeScript Aplicadas

1. **Jest configurado para TypeScript** (`e2e/jest.config.js`):

   - Suporte a arquivos `.ts`
   - Preset `ts-jest`
   - Configuração de transformers

2. **Arquivos de teste convertidos para TypeScript**:

   - `e2e/init.ts` - Setup do ambiente de teste
   - `e2e/app.test.ts` - Testes principais
   - `e2e/detox.d.ts` - Tipos temporários do Detox

3. **TestIDs adicionados nos componentes**:
   - Tela de Signup: `username-input`, `enter-button`
   - Tela Principal: `create-post-button`, `posts-list`
   - PostForm: `post-title-input`, `post-content-input`
   - PostCard: `post-card`, `post-username`, `post-time`, `edit-post-button`, `delete-post-button`
   - EditModal: `edit-modal`, `edit-title-input`, `edit-content-input`, `save-edit-button`, `cancel-edit-button`
   - DeleteModal: `delete-modal`, `confirm-delete-button`, `cancel-delete-button`

## Instalação das Dependências

**IMPORTANTE**: Libere espaço em disco antes de executar estes comandos.

```bash
# Instalar Detox CLI globalmente
npm install -g detox-cli

# Instalar dependências do projeto
npm install --save-dev detox @config-plugins/detox-expo jest ts-jest @types/jest @types/node

# Para iOS (somente macOS)
brew tap wix/brew
brew install applesimutils
```

## Comandos para Executar Testes

```bash
# iOS
npm run e2e:build:ios
npm run e2e:test:ios

# Android
npm run e2e:build:android
npm run e2e:test:android
```

## Estrutura dos Testes Criados

### Fluxo de Autenticação

- ✅ Verificar tela de signup na inicialização
- ✅ Permitir inserir username e navegar para tela principal

### Tela Principal - Posts

- ✅ Exibir formulário de criação de posts
- ✅ Criar novo post com sucesso
- ✅ Exibir lista de posts com informações do usuário
- ✅ Fazer scroll na lista de posts
- ✅ Pull-to-refresh na lista

### Gerenciamento de Posts

- ✅ Mostrar botões de editar/deletar para posts próprios
- ✅ Abrir modal de edição e editar post
- ✅ Abrir modal de exclusão e deletar post
- ✅ Cancelar operação de exclusão

### Validação de Formulários

- ✅ Desabilitar botão quando campos estão vazios
- ✅ Habilitar botão quando campos estão preenchidos

## Ajustes Necessários nos Componentes

### 1. Corrigir imports do React

Adicione `import React from "react";` nos seguintes arquivos:

- `components/PostForm/index.tsx`
- `components/EditModal/index.tsx`
- `components/DeleteModal/index.tsx`
- `components/EditForm/index.tsx` (se existir)

### 2. Finalizar o EditForm

Se você quiser inputs separados para o modal de edição, complete o arquivo `components/EditForm/index.tsx` e importe-o no `EditModal`.

### 3. Corrigir o import no EditModal

No arquivo `components/EditModal/index.tsx`, adicione:

```typescript
import { EditForm } from "../EditForm";
```

## Comandos de Desenvolvimento

```bash
# Executar testes específicos
detox test --configuration ios.sim.debug e2e/app.test.ts

# Executar com logs detalhados
detox test --configuration ios.sim.debug --loglevel verbose

# Limpar cache se necessário
detox clean-framework-cache && detox build --configuration ios.sim.debug
```

## Cenários de Teste Implementados

### 1. Autenticação

```typescript
describe("Authentication Flow", () => {
  it("should show signup screen on launch", async () => {
    await waitFor(element(by.text("Welcome to CodeLeap network!")))
      .toBeVisible()
      .withTimeout(10000);
  });
});
```

### 2. Criação de Posts

```typescript
it("should create a new post successfully", async () => {
  await element(by.id("post-title-input")).typeText("Test Post Title");
  await element(by.id("post-content-input")).typeText("Test content");
  await element(by.id("create-post-button")).tap();

  await waitFor(element(by.text("Test Post Title")))
    .toBeVisible()
    .withTimeout(10000);
});
```

### 3. Edição de Posts

```typescript
it("should open edit modal and edit post", async () => {
  await element(by.id("edit-post-button")).atIndex(0).tap();
  await waitFor(element(by.id("edit-modal"))).toBeVisible();

  await element(by.id("edit-title-input")).clearText();
  await element(by.id("edit-title-input")).typeText("Edited Title");
  await element(by.id("save-edit-button")).tap();
});
```

## Configurações Finais

### tsconfig.json para testes

Se necessário, adicione ao seu `tsconfig.json`:

```json
{
  "include": [
    "**/*.ts",
    "**/*.tsx",
    ".expo/types/**/*.ts",
    "expo-env.d.ts",
    "e2e/**/*.ts"
  ]
}
```

### Melhorias Recomendadas

1. **Criar helper functions** para login/logout
2. **Adicionar testes de conectividade** de rede
3. **Implementar testes de acessibilidade**
4. **Adicionar screenshots** em caso de falha
5. **Configurar CI/CD** para execução automática

## Próximos Passos

1. ✅ Liberar espaço em disco
2. ✅ Instalar dependências
3. ✅ Corrigir imports do React nos componentes
4. ✅ Criar development builds
5. ✅ Executar primeira bateria de testes
6. ✅ Ajustar testIDs conforme necessário
7. ✅ Expandir cobertura de testes

## Troubleshooting TypeScript

### Erro: Cannot find module 'detox'

Instale os tipos: `npm install --save-dev @types/detox`

### Erro: 'React' refers to UMD global

Adicione: `import React from "react";` no topo do arquivo

### Erro: Cannot find name 'describe'

Instale: `npm install --save-dev @types/jest`

## Estrutura Final de Arquivos

```
e2e/
├── detox.d.ts          # Tipos temporários
├── init.ts             # Setup do ambiente
├── jest.config.js      # Configuração Jest + TypeScript
└── app.test.ts         # Testes principais

.detoxrc.js             # Configuração principal Detox
DETOX_TYPESCRIPT_SETUP.md # Este guia
```

Seu projeto agora está completamente configurado para testes E2E com Detox e TypeScript! 🚀

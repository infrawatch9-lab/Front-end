# Sistema de Monitoramento de Serviços

## 🚀 Funcionalidades Implementadas

### ✅ **Cadastramento Dinâmico de Serviços**
- **Modais Dinâmicos**: Formulários específicos baseados no tipo de serviço
- **4 Tipos de Serviços Suportados**:
  - 🖥️ **PING** - Monitoramento de servidores via ping
  - ⚡ **HTTP** - Monitoramento de APIs e endpoints HTTP/HTTPS
  - 🌐 **SNMP** - Monitoramento de dispositivos de rede
  - 🔗 **WEBHOOK** - Configuração de webhooks para notificações

### ✅ **Interface Completa de CRUD**
- **Criar**: Modal com 3 etapas (Tipo → Básico → Específico)
- **Editar**: Mesmo modal preenchido com dados existentes
- **Deletar**: Confirmação antes de deletar
- **Visualizar**: Clique na linha para navegar para dashboard específico

### ✅ **Sistema de Cache Inteligente**
- **Cache de 1 hora**: Reduz requisições desnecessárias
- **Atualização manual**: Botão de refresh dedicado
- **Invalidação automática**: Cache atualizado após criar/editar/deletar

### ✅ **Filtros e Busca Avançada**
- **Filtro por tipo**: Dropdown com tipos únicos do banco
- **Busca em tempo real**: Por nome, descrição, tipo
- **Indicadores visuais**: Bolinha azul quando filtro ativo

### ✅ **Paginação Otimizada**
- **11 serviços por página**: Tamanho fixo otimizado
- **Navegação fixa**: Paginação sempre visível na parte inferior
- **Reset automático**: Volta para página 1 ao filtrar/buscar

## 🎯 **DTOs Implementados**

### **Base Service DTO**
```typescript
interface BaseServiceDto {
  name: string;
  description: string;
  teamId?: number;
  usersToNotify: string[];
  rules?: CreateAlertRuleDto[];
  monitoringConfig: MonitoringConfigDto;
}
```

### **Tipos Específicos**

#### **PING Service**
```typescript
interface CreatePingServiceDto extends BaseServiceDto {
  type: 'PING';
  pingConfig: {
    ipAddress: string;
    interval?: number;
    timeout?: number;
    webhookUrl?: string;
    packetSize?: number;
    ttl?: number;
  };
}
```

#### **HTTP Service**
```typescript
interface HttpDto extends BaseServiceDto {
  type: 'HTTP';
  httpConfig: {
    endpoint: string;
    method?: string;
    headers?: Record<string, string>;
    body?: Record<string, any>;
    authType?: "bearer" | "basic" | "none";
    authValue?: string;
    validateSSL?: boolean;
    followRedirects?: boolean;
    expectedStatus?: number;
    expectedBodyIncludes?: string;
    expectedResponseTimeMs?: number;
  };
}
```

#### **SNMP Service**
```typescript
interface SnmpDto extends BaseServiceDto {
  type: 'SNMP';
  snmpConfig: {
    host: string;
    version: 'v1' | 'v2c' | 'v3';
    community?: string;
    username?: string;
    authProtocol?: string;
    authPassword?: string;
    privProtocol?: string;
    privPassword?: string;
    oid: string;
    monitoringMode: 'cron' | 'interval';
    cronExpression?: string;
    timezone?: string;
    // ... mais campos
  };
}
```

#### **WEBHOOK Service**
```typescript
interface WebhookDto extends BaseServiceDto {
  type: 'WEBHOOK';
  webhookConfig: {
    endpoint: string;
    method: "GET" | "POST" | "PUT" | "DELETE";
    secret?: string;
    headers?: Record<string, string>;
  };
}
```

## 🔧 **Como Usar**

### **Criar Novo Serviço**
1. Clique no botão **+** no topo da página
2. **Etapa 1**: Selecione o tipo de serviço
3. **Etapa 2**: Preencha informações básicas e configuração de monitoramento
4. **Etapa 3**: Configure parâmetros específicos do tipo escolhido
5. Clique em **"Criar Serviço"**

### **Editar Serviço**
1. Clique no ícone de **editar** (✏️) na linha do serviço
2. Modal abre preenchido com dados existentes
3. Modifique os campos necessários
4. Clique em **"Salvar"**

### **Deletar Serviço**
1. Clique no ícone de **lixeira** (🗑️) na linha do serviço
2. Confirme a ação no popup
3. Serviço será removido e lista atualizada

### **Filtrar e Buscar**
- **Busca**: Digite no campo de pesquisa (busca por nome, tipo, descrição)
- **Filtro**: Clique no ícone de filtro para filtrar por tipo específico
- **Atualizar**: Clique no ícone de refresh para buscar dados mais recentes

## 📡 **API Endpoints**

```javascript
// Listar serviços
GET /api/services

// Criar serviço
POST /api/services
Body: ServiceDto (baseado no tipo)

// Atualizar serviço
PUT /api/services/:id
Body: ServiceDto (baseado no tipo)

// Deletar serviço
DELETE /api/services/:id

// Obter serviço específico
GET /api/services/:id
```

## 🎨 **Interface**

### **Tabela de Serviços**
- **Nome**: Nome do serviço
- **Limite**: SLA definido
- **Medido**: Performance atual
- **Status**: Badge colorido (Verde/Amarelo/Vermelho)
- **Tipo**: Tipo do serviço
- **Ações**: Editar e Deletar

### **Indicadores Visuais**
- **Filtro Ativo**: Bolinha azul no ícone de filtro
- **Loading**: Spinner durante carregamento
- **Cache**: Logs no console indicando uso de cache vs. API
- **Paginação**: Navegação sempre fixa na parte inferior

## 🔄 **Performance**

### **Cache System**
- **Duração**: 1 hora por padrão
- **Invalidação**: Automática após CRUD operations
- **Fallback**: API chamada se cache expirado
- **Indicadores**: Console logs mostram uso de cache

### **Otimizações**
- **Paginação**: Apenas 11 itens renderizados por vez
- **Filtros Client-side**: Busca e filtros não fazem nova requisição
- **Lazy Loading**: Componentes carregados sob demanda
- **Debounce**: Busca em tempo real otimizada

## 🛠️ **Tecnologias**

- **React 18** com Hooks
- **Tailwind CSS** para styling
- **Lucide React** para ícones
- **React Router** para navegação
- **React i18next** para internacionalização
- **Axios** para chamadas de API

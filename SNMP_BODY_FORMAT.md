# Formato do Body SNMP - Documentação

## 📋 Formato Esperado pelo Backend

O backend espera receber o seguinte formato JSON para criar um serviço SNMP:

```json
{
  "name": "Router Teste",
  "host": "10.0.1.1",
  "oid": "1.3.6.1.2.1.1.3.0",
  "version": "v2c",
  "community": "public"
}
```

### Campos Obrigatórios

| Campo | Tipo | Descrição | Exemplo |
|-------|------|-----------|---------|
| `name` | string | Nome do serviço/host | "Router Teste" |
| `host` | string | IP ou hostname do dispositivo | "10.0.1.1" ou "router.exemplo.com" |
| `oid` | string | Object Identifier SNMP | "1.3.6.1.2.1.1.3.0" |
| `version` | string | Versão SNMP | "v1", "v2c", "v3" |

### Campos por Versão SNMP

#### Para v1 e v2c:
```json
{
  "name": "Switch Principal",
  "host": "192.168.1.10",
  "oid": "1.3.6.1.2.1.1.1.0",
  "version": "v2c",
  "community": "public"
}
```

#### Para v3:
```json
{
  "name": "Servidor SNMP",
  "host": "172.16.0.5",
  "oid": "1.3.6.1.2.1.1.3.0",
  "version": "v3",
  "username": "snmpuser",
  "auth_protocol": "SHA",
  "auth_password": "authpass123",
  "priv_protocol": "AES",
  "priv_password": "privpass123"
}
```

### Campos Opcionais

| Campo | Tipo | Padrão | Descrição |
|-------|------|--------|-----------|
| `port` | number | 161 | Porta SNMP |
| `timeout` | number | 5000 | Timeout em ms |
| `monitoring_interval` | number | 300 | Intervalo de monitoramento em segundos |

## 🔄 Mapeamento Frontend → Backend

### Entrada do Frontend (SnmpServiceForm):
```javascript
{
  name: "Router Teste",
  snmpConfig: {
    host: "10.0.1.1",
    version: "v2c",
    oid: "1.3.6.1.2.1.1.3.0",
    community: "public",
    port: 161,
    timeout: 5000,
    interval: 300
  }
}
```

### Saída para Backend (após mapeamento):
```javascript
{
  "name": "Router Teste",
  "host": "10.0.1.1",
  "oid": "1.3.6.1.2.1.1.3.0",
  "version": "v2c",
  "community": "public",
  "port": 161,
  "timeout": 5000,
  "monitoring_interval": 300
}
```

## 🧪 Testando o Formato

### Via Interface de Debug:
1. Acesse a página **Monitor**
2. Procure pela seção "Debug SNMP API" (amarela)
3. Clique em **"Testar Formato"**
4. Verifique o console para ver o body gerado

### Via Console do Navegador:
```javascript
import { testServiceBodyFormat } from './src/api/services/snmp';

const serviceData = {
  name: 'Teste Router',
  snmpConfig: {
    host: '192.168.1.1',
    version: 'v2c',
    oid: '1.3.6.1.2.1.1.3.0',
    community: 'public'
  }
};

const result = testServiceBodyFormat(serviceData);
console.log('Body para backend:', result.bodyString);
```

## ⚠️ Problemas Comuns

### 1. **Campos Ausentes**
**Erro**: `Campos obrigatórios ausentes: oid`
**Solução**: Verificar se todos os campos obrigatórios estão preenchidos

### 2. **Versão Incorreta**
**Erro**: Versão não reconhecida
**Solução**: Usar apenas "v1", "v2c" ou "v3"

### 3. **OID Inválido**
**Erro**: Formato de OID inválido
**Solução**: Usar formato numérico separado por pontos (ex: 1.3.6.1.2.1.1.3.0)

### 4. **Community Ausente (v1/v2c)**
**Erro**: Community string necessária
**Solução**: Adicionar campo `community` (padrão: "public")

## 📝 Exemplos Completos

### Router Cisco:
```json
{
  "name": "Router Cisco 2900",
  "host": "10.0.1.1",
  "oid": "1.3.6.1.2.1.1.3.0",
  "version": "v2c",
  "community": "cisco123",
  "port": 161,
  "timeout": 5000
}
```

### Switch HP com SNMP v3:
```json
{
  "name": "Switch HP 2530",
  "host": "192.168.10.20",
  "oid": "1.3.6.1.2.1.1.1.0",
  "version": "v3",
  "username": "netadmin",
  "auth_protocol": "SHA",
  "auth_password": "secure123",
  "priv_protocol": "AES",
  "priv_password": "private456"
}
```

### Servidor Linux:
```json
{
  "name": "Servidor Web",
  "host": "linux-server.local",
  "oid": "1.3.6.1.4.1.2021.10.1.3.1",
  "version": "v2c",
  "community": "public",
  "monitoring_interval": 60
}
```

## 🔍 Validação

A função `mapServiceConfigToSnmpHost()` realiza as seguintes validações:

1. ✅ **Campos obrigatórios** presentes
2. ✅ **Versão SNMP** válida
3. ✅ **Community** para v1/v2c
4. ✅ **Credenciais** para v3
5. ✅ **Tipos de dados** corretos
6. ✅ **Valores padrão** aplicados

## 🚀 Debugging

Para debug detalhado, use:
```javascript
// Teste completo da API SNMP
debugSnmpApi();

// Teste específico de formato
testServiceBodyFormat(seuServiceData);

// Verificar mapeamento
console.log(mapServiceConfigToSnmpHost(seuServiceData));
```

Os logs aparecerão no console com prefixos:
- `[SNMP]` - Operações gerais
- `[SNMP DEBUG]` - Testes de debug
- `[SNMP FORMAT TEST]` - Testes de formato

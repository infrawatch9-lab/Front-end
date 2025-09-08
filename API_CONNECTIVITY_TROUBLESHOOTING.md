# Troubleshooting de Conectividade - API Principal

## 🚨 Erro: ERR_NAME_NOT_RESOLVED

Este erro indica que o domínio `infra42luanda.duckdns.org` não está sendo resolvido pelo DNS.

### Soluções Rápidas

#### 1. **Usar Interface de Configuração**
Na página Monitor, clique no ícone ⚙️ próximo aos indicadores de status para:
- Ver status atual das APIs
- Testar conectividade
- Alterar URL da API
- Usar presets predefinidos

#### 2. **Configurar via Console do Navegador**
```javascript
// Alterar para API local
import { useApiPreset } from './src/api/confg';
useApiPreset('local');

// Ou configurar URL personalizada
import { setApiUrl } from './src/api/confg';
setApiUrl('http://192.168.1.100:3000/api'); // Substitua pelo IP correto

// Testar conectividade
import { testApiConnectivity } from './src/api/confg';
testApiConnectivity();
```

#### 3. **Usar Variáveis de Ambiente**
Crie um arquivo `.env` na raiz do projeto:
```bash
VITE_API_URL=http://localhost:3000/api
```

### Presets Disponíveis

| Preset | URL | Quando Usar |
|--------|-----|-------------|
| `local` | `http://localhost:3000/api` | Desenvolvimento local |
| `development` | `http://localhost:8000/api` | Servidor de desenvolvimento |
| `production` | `https://infra42luanda.duckdns.org/api` | Produção (se domínio funcionar) |

### Diagnóstico Passo a Passo

#### 1. **Verificar Conectividade de Rede**
```bash
# Testar se o domínio resolve
nslookup infra42luanda.duckdns.org

# Testar ping
ping infra42luanda.duckdns.org

# Testar porta específica
telnet infra42luanda.duckdns.org 80
```

#### 2. **Verificar API Local**
```bash
# Se tiver API rodando localmente
curl http://localhost:3000/api/health

# Ou na porta 8000
curl http://localhost:8000/api/health
```

#### 3. **Usar IP Direto**
Se souber o IP do servidor:
```javascript
setApiUrl('http://IP_DO_SERVIDOR:PORTA/api');
```

### Configuração Automática

O sistema tenta automaticamente na seguinte ordem:
1. **Variável de ambiente** (`VITE_API_URL`)
2. **LocalStorage** (configuração salva)
3. **URL padrão** (`https://infra42luanda.duckdns.org/api`)

### Logs de Debug

Verifique o console do navegador para logs como:
```
[API Config] Using environment URL: http://localhost:3000/api
[API Config] Final API URL: http://localhost:3000/api
[API Config] DNS resolution failed for: https://infra42luanda.duckdns.org/api
```

### Configuração Persistente

A configuração é salva no localStorage e permanece entre sessões. Para limpar:
```javascript
localStorage.removeItem('api_url');
```

### Testando Diferentes URLs

Use a interface de configuração para testar diferentes URLs:
1. Clique no ícone ⚙️ no cabeçalho
2. Selecione um preset ou digite uma URL personalizada
3. Clique em "Testar" para verificar conectividade
4. A configuração é salva automaticamente

### Problemas Comuns

#### CORS (Cross-Origin Resource Sharing)
Se a API estiver rodando em porta diferente:
```
Access to XMLHttpRequest at 'http://localhost:3000' from origin 'http://localhost:5173' has been blocked by CORS policy
```

**Solução**: Configure CORS no servidor da API.

#### Timeout
Se a API for lenta:
```javascript
// O timeout padrão é 30 segundos, configurado em confg.ts
```

#### Certificado SSL
Para HTTPS com certificado inválido, o navegador pode bloquear.

### Debug Avançado

Para debug detalhado, abra o console e execute:
```javascript
// Verificar configuração atual
import { getCurrentApiUrl, testApiConnectivity } from './src/api/confg';
console.log('URL atual:', getCurrentApiUrl());

// Testar todas as opções
const presets = ['local', 'development', 'production'];
for (const preset of presets) {
  const url = API_PRESETS[preset];
  const test = await testApiConnectivity(url);
  console.log(`${preset}: ${test.success ? '✅' : '❌'}`, test);
}
```

### Configuração de Produção

Para deploy em produção:
1. Configure a variável `VITE_API_URL` no seu ambiente de deploy
2. Ou use a interface de configuração para definir a URL correta
3. Teste a conectividade antes de usar o sistema

### Suporte

Se nenhuma solução funcionar:
1. Verifique se o servidor da API está rodando
2. Confirme o IP e porta corretos
3. Teste conectividade de rede
4. Verifique configurações de firewall/proxy

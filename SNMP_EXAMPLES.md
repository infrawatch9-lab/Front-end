# Exemplos de Configuração SNMP

## Configurações Comuns de Dispositivos

### Switch Cisco

```json
{
  "host": "192.168.1.10",
  "port": 161,
  "version": "v2c",
  "community": "public",
  "oid": "1.3.6.1.2.1.1.3.0",
  "timeout": 5000,
  "interval": 300,
  "retries": 3
}
```

**OIDs Úteis para Switches:**
- `1.3.6.1.2.1.1.3.0` - Uptime do sistema
- `1.3.6.1.2.1.1.1.0` - Descrição do sistema
- `1.3.6.1.2.1.2.2.1.10.1` - Bytes recebidos na interface 1
- `1.3.6.1.2.1.2.2.1.16.1` - Bytes enviados na interface 1

### Servidor Linux (com snmpd)

```json
{
  "host": "servidor.exemplo.com",
  "port": 161,
  "version": "v2c",
  "community": "public",
  "oid": "1.3.6.1.4.1.2021.10.1.3.1",
  "timeout": 3000,
  "interval": 180,
  "retries": 2
}
```

**OIDs Úteis para Servidores Linux:**
- `1.3.6.1.4.1.2021.10.1.3.1` - CPU Load 1 minuto
- `1.3.6.1.4.1.2021.4.5.0` - Memória total
- `1.3.6.1.4.1.2021.4.6.0` - Memória disponível
- `1.3.6.1.4.1.2021.9.1.9.1` - Espaço usado em disco (/)

### Router MikroTik

```json
{
  "host": "192.168.1.1",
  "port": 161,
  "version": "v2c",
  "community": "private",
  "oid": "1.3.6.1.2.1.1.3.0",
  "timeout": 10000,
  "interval": 600,
  "retries": 5
}
```

### Dispositivo com SNMP v3 (Seguro)

```json
{
  "host": "192.168.1.50",
  "port": 161,
  "version": "v3",
  "username": "monitor_user",
  "authProtocol": "SHA",
  "authPassword": "senha_auth_123",
  "privProtocol": "AES",
  "privPassword": "senha_priv_456",
  "oid": "1.3.6.1.2.1.1.3.0",
  "timeout": 8000,
  "interval": 300,
  "retries": 3
}
```

## OIDs Padrão por Categoria

### Sistema (1.3.6.1.2.1.1)
- `1.3.6.1.2.1.1.1.0` - sysDescr (Descrição do sistema)
- `1.3.6.1.2.1.1.2.0` - sysObjectID (Identificador do objeto)
- `1.3.6.1.2.1.1.3.0` - sysUpTime (Tempo de atividade)
- `1.3.6.1.2.1.1.4.0` - sysContact (Contato do sistema)
- `1.3.6.1.2.1.1.5.0` - sysName (Nome do sistema)
- `1.3.6.1.2.1.1.6.0` - sysLocation (Localização do sistema)

### Interfaces de Rede (1.3.6.1.2.1.2)
- `1.3.6.1.2.1.2.1.0` - ifNumber (Número de interfaces)
- `1.3.6.1.2.1.2.2.1.1.X` - ifIndex (Índice da interface X)
- `1.3.6.1.2.1.2.2.1.2.X` - ifDescr (Descrição da interface X)
- `1.3.6.1.2.1.2.2.1.8.X` - ifOperStatus (Status operacional da interface X)

### CPU e Processamento
- `1.3.6.1.2.1.25.3.3.1.2` - hrProcessorLoad (Carga do processador)
- `1.3.6.1.4.1.2021.11.9.0` - ssCpuUser (% CPU usuário)
- `1.3.6.1.4.1.2021.11.10.0` - ssCpuSystem (% CPU sistema)

### Memória
- `1.3.6.1.2.1.25.2.2.0` - hrMemorySize (Tamanho da memória)
- `1.3.6.1.4.1.2021.4.5.0` - memTotalSwap (Total de swap)
- `1.3.6.1.4.1.2021.4.6.0` - memAvailSwap (Swap disponível)

## Configurações por Fabricante

### Cisco
```
Community: public/private
Porta: 161
Versões: v1, v2c, v3
OID Base: 1.3.6.1.4.1.9 (Cisco Enterprise)
```

### HP/HPE
```
Community: public
Porta: 161
Versões: v1, v2c, v3
OID Base: 1.3.6.1.4.1.11 (HP Enterprise)
```

### Dell
```
Community: public
Porta: 161
Versões: v2c, v3
OID Base: 1.3.6.1.4.1.674 (Dell Enterprise)
```

### MikroTik
```
Community: public
Porta: 161
Versões: v1, v2c
OID Base: 1.3.6.1.4.1.14988 (MikroTik Enterprise)
```

## Troubleshooting

### Problemas Comuns

1. **Timeout / Sem Resposta**
   - Verificar se SNMP está habilitado no dispositivo
   - Confirmar community string
   - Checar firewall/ACLs
   - Testar conectividade de rede

2. **Community Inválida**
   - Verificar community string no dispositivo
   - Confirmar permissões (read/write)
   - Testar com community padrão "public"

3. **OID Não Suportado**
   - Usar snmpwalk para descobrir OIDs disponíveis
   - Verificar MIB do fabricante
   - Testar OIDs básicos primeiro

### Comandos de Teste

```bash
# Testar conectividade SNMP v2c
snmpget -v2c -c public 192.168.1.10 1.3.6.1.2.1.1.1.0

# Descobrir OIDs disponíveis
snmpwalk -v2c -c public 192.168.1.10 1.3.6.1.2.1

# Testar SNMP v3
snmpget -v3 -u monitor_user -a SHA -A senha_auth_123 \
        -x AES -X senha_priv_456 192.168.1.50 1.3.6.1.2.1.1.1.0
```

## Boas Práticas

### Segurança
- Use SNMP v3 sempre que possível
- Altere community strings padrão
- Configure ACLs/firewalls apropriados
- Use senhas fortes para v3

### Performance
- Configure timeouts apropriados (3-10 segundos)
- Ajuste intervalos de monitoramento conforme necessidade
- Use OIDs específicos ao invés de walks
- Limite número de tentativas

### Monitoramento
- Monitore múltiplos OIDs importantes
- Configure alertas para valores críticos
- Mantenha histórico de dados
- Documente configurações de dispositivos

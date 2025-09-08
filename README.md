# InfraWatch Front-End

Este repositório contém o módulo Front-End da aplicação web de monitoramento de infraestrutura, serviços e usuários, chamada InfraWatch. Ele foi desenvolvido com foco em gestão, automação e visualização de dados críticos de ambientes de TI, utilizando tecnologias modernas como React, TailwindCSS e integração com APIs.

---

## Sumário

- [Visão Geral](#visão-geral)
- [Recursos Principais](#recursos-principais)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Instalação](#instalação)
- [Configuração](#configuração)
- [Uso](#uso)
- [Estrutura de Diretórios](#estrutura-de-diretórios)
- [Internacionalização](#internacionalização)
- [Contribuição](#contribuição)
- [Equipe](#equipe)
- [Licença](#licença)
- [Contato](#contato)

---

## Visão Geral

InfraWatch foi projetado para equipes de TI que precisam monitorar, gerenciar e automatizar ambientes críticos, garantindo alta disponibilidade, segurança e controle sobre ativos de infraestrutura. A plataforma integra diversos tipos de monitoramento (HTTP, SNMP, PING, WEBHOOK), gestão de usuários, relatórios de SLA e visualização geográfica, tudo em uma interface responsiva e intuitiva.

---

## Recursos Principais

- **Dashboards Interativos:** Visualização em tempo real do status de APIs, servidores, redes e webhooks, com gráficos, tabelas e indicadores de performance.
- **Monitoramento de Serviços:** Cadastro, edição e exclusão de serviços monitorados, configuração personalizada e acompanhamento de eventos.
- **Gestão de Usuários:** Controle de permissões, criação/edição de usuários, histórico de atividades e gerenciamento de acesso.
- **Relatórios de SLA:** Geração de relatórios detalhados sobre disponibilidade, falhas e desempenho dos sistemas monitorados.
- **Alertas e Notificações:** Painéis de alertas ativos, escalação de incidentes, histórico de eventos e logs detalhados.
- **Mapas Interativos:** Visualização geográfica da infraestrutura monitorada.
- **Internacionalização:** Suporte a múltiplos idiomas via `react-i18next`.
- **Temas Personalizáveis:** Interface responsiva com opção de tema claro/escuro.
- **Autenticação Segura:** Rotas protegidas e gerenciamento de sessão.
- **Interface Responsiva:** Compatível com dispositivos móveis e desktop.

---

## Tecnologias Utilizadas

- **React** (Vite)
- **TailwindCSS**
- **React Router**
- **Lucide-react** (ícones)
- **Axios** (requisições HTTP)
- **Docker** (containerização)
- **ESLint/PostCSS** (qualidade de código e CSS)
- **react-i18next** (internacionalização)

---

## Instalação

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/infrawatch-frontend.git
   cd infrawatch-frontend
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute o projeto:**
   ```bash
   npm run dev
   ```

4. **(Opcional) Execute via Docker:**
   ```bash
   docker build -t infrawatch-frontend .
   docker run -p 3000:80 infrawatch-frontend
   ```

---

## Configuração

- **Variáveis de ambiente:** Configure as URLs das APIs, chaves de mapas e outros parâmetros no arquivo `.env`.
- **Permissões de usuário:** Defina perfis e permissões no painel administrativo.
- **Idiomas:** Adicione traduções em `src/locales/`.

---

## Uso

1. Acesse `http://localhost:3000` no navegador.
2. Faça login com suas credenciais.
3. Navegue pelos dashboards, monitore serviços, visualize mapas e gerencie usuários.
4. Gere relatórios de SLA e acompanhe alertas em tempo real.

---

## Estrutura de Diretórios

```
src/
├── admin_pages/         # Páginas administrativas (Dashboard, Monitoramento, Histórico, Usuários, Configurações)
│   ├── dashboard/       # Dashboards de APIs, servidores, redes, webhooks
│   ├── monitor/         # Monitoramento de serviços
│   ├── history/         # Histórico de eventos e logs
│   ├── users/           # Gestão de usuários
│   └── settings/        # Configurações do sistema
├── api/                 # Integração com APIs
├── components/          # Componentes reutilizáveis (autenticação, botões, modais, tabelas, loaders)
├── contexts/            # Contextos globais (tema, autenticação)
├── hooks/               # Hooks customizados
├── landing_page/        # Página inicial e apresentação da equipe
├── login/               # Fluxo de autenticação
├── pages/               # Páginas públicas e institucionais (Política de Privacidade, SLA, Relatórios)
├── services/            # Lógica de monitoramento dos serviços
├── styles/              # Estilos customizados (Tailwind, CSS)
├── router.jsx           # Definição de rotas
└── main.jsx             # Ponto de entrada da aplicação
```

---

## Internacionalização

- O projeto utiliza `react-i18next` para tradução.
- Para adicionar um novo idioma, edite os arquivos em `src/locales/`.
- Os componentes de seleção de idioma estão disponíveis na interface.

---

## Contribuição

1. Fork este repositório.
2. Crie uma branch (`git checkout -b feature/nova-funcionalidade`).
3. Faça commit das suas alterações.
4. Envie um pull request.

---

## Equipe

O projeto foi desenvolvido por uma equipe multidisciplinar, incluindo:

- Desenvolvedores Frontend
- Desenvolvedores Backend
- Full Stack
- Designers UI/UX
- Especialista Devops

A apresentação detalhada da equipe está disponível na landing page do sistema.

---

## Licença

Este projeto foi desenvolvido no âmbito do Hackathon Infrawatch.
Todos os direitos pertencem à empresa RCS. É proibido o uso, modificação ou redistribuição sem a devida autorização.

---

## Contato

- Email: infrawatch9@gmail.com
- Site: [https://appinfrawatch.duckdns.org](https://appinfrawatch.duckdns.org)

---

**InfraWatch** — Monitoramento inteligente para ambientes críticos de TI.
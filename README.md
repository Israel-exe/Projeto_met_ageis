# 🏨 Solaris Residence - Projeto Métodos Ágeis

Sistema completo de gestão hoteleira com interface web para reservas, administração e gerenciamento de funcionários.

## 📋 Sobre o Projeto

A proposta é construir um hotsite simples e eficaz para apresentar um empreendimento imobiliário e captar leads, ou seja, potenciais clientes para o time comercial.

O Solaris Residence é um hotsite moderno e funcional desenvolvido para gerenciar reservas de hotel com três níveis de acesso: clientes, administradores e funcionários. O sistema oferece uma experiência completa desde a visualização de quartos até o gerenciamento administrativo.

## ✨ Funcionalidades

### Para Clientes
- 🏠 Visualização de quartos disponíveis com fotos e descrições
- 🛒 Sistema de carrinho de reservas
- 📅 Seleção de datas de check-in e check-out
- 💳 Finalização de reservas com comprovante
- 👤 Dashboard pessoal para gerenciar reservas
- ❌ Cancelamento de reservas

### Para Administradores
- 📊 Dashboard com estatísticas de receita mensal
- 📈 Visualização total de reservas ativas
- 👥 Gerenciamento completo de todas as reservas
- ❌ Cancelamento de reservas de clientes
- 💰 Controle financeiro do hotel

### Para Funcionários
- 📋 Visualização de reservas ativas do dia
- 👤 Informações dos hóspedes
- 📞 Contatos para comunicação
- 📆 Datas de check-in e check-out

## 🚀 Como Usar

### Instalação

1. Clone ou baixe este repositório
2. Abra o projeto em seu editor de código (recomendamos VSCode)
3. Instale a extensão "Live Server" no VSCode (ou use qualquer servidor local)
4. Clique com botão direito no arquivo `index.html` e selecione "Open with Live Server"

### Navegação

- **Página Inicial**: `index.html` - Landing page do hotel
- **Quartos**: `produtos.html` - Catálogo de quartos disponíveis
- **Sobre**: `sobre.html` - Informações sobre o hotel
- **Contato**: `contato.html` - Formulário de contato
- **Carrinho**: `carrinho.html` - Gerenciamento do carrinho de reservas
- **Login Cliente**: `login.html` - Acesso para clientes
- **Login Admin**: `admin-login.html` - Acesso administrativo
- **Login Funcionários**: `funcionarios-login.html` - Acesso para funcionários

## 🔐 Credenciais de Acesso

### Administradores
\`\`\`
Usuário: admin
Senha: admin123
\`\`\`

### Funcionários
\`\`\`
Usuário: funcionario
Senha: func123
\`\`\`

### Clientes
Os clientes são criados automaticamente ao fazer uma reserva. Use o email cadastrado para fazer login.

## 🎨 Tecnologias Utilizadas

- **HTML5**: Estrutura semântica das páginas
- **CSS3**: Estilização com variáveis CSS e design responsivo
- **JavaScript**: Lógica de negócio e interatividade
- **LocalStorage**: Armazenamento local de dados (simula banco de dados)

## 🎨 Design

O sistema utiliza uma paleta de cores elegante:
- **Azul Principal**: `#1e3a8a` - Confiança e profissionalismo
- **Dourado**: `#f59e0b` - Luxo e sofisticação
- **Amarelo**: `#fbbf24` - Energia e otimismo
- **Tons de Cinza**: Para neutralidade e legibilidade

### Tipografia
- **Fonte Principal**: Inter - Para textos gerais
- **Fonte Secundária**: Georgia - Para títulos elegantes

## 📦 Estrutura de Arquivos

\`\`\`
solaris-residence/
│
├── index.html                    # Página inicial
├── produtos.html                 # Catálogo de quartos
├── sobre.html                    # Sobre o hotel
├── contato.html                  # Contato
├── carrinho.html                 # Carrinho de reservas
├── comprovante.html              # Comprovante de reserva
├── login.html                    # Login de clientes
├── admin-login.html              # Login administrativo
├── admin-dashboard.html          # Dashboard admin
├── cliente-dashboard.html        # Dashboard do cliente
├── funcionarios-login.html       # Login de funcionários
├── funcionarios-dashboard.html   # Dashboard de funcionários
├── styles.css                    # Estilos globais
├── script.js                     # JavaScript principal
└── README.md                     # Este arquivo
\`\`\`

## 💾 Armazenamento de Dados

O sistema utiliza o **LocalStorage** do navegador para armazenar:
- Carrinho de compras
- Reservas realizadas
- Sessões de usuários
- Dados de clientes

**Nota**: Os dados são armazenados localmente no navegador. Para limpar os dados, abra o Console do navegador (F12) e execute: `localStorage.clear()`

## 🔧 Funcionalidades Técnicas

### Sistema de Autenticação
- Login separado para clientes, admin e funcionários
- Sessão armazenada no LocalStorage
- Proteção de rotas por tipo de usuário

### Sistema de Reservas
- Adição de múltiplos quartos ao carrinho
- Cálculo automático de diárias
- Geração de código único de reserva
- Sistema de status (ativa/cancelada)

### Dashboard Administrativo
- Estatísticas em tempo real
- Receita mensal calculada automaticamente
- Tabela completa de reservas
- Ações de gerenciamento

## 📱 Responsividade

O sistema é totalmente responsivo e funciona em:
- 💻 Desktops
- 📱 Tablets
- 📱 Smartphones

## 🤝 Contribuindo

Este é um projeto educacional. Sinta-se livre para:
- Reportar bugs
- Sugerir melhorias
- Fazer fork do projeto
- Enviar pull requests

## 📄 Licença

Este projeto é de código aberto e está disponível para uso educacional.

## 📞 Suporte

Para dúvidas ou suporte:
- Email: contato@solarisresidence.com
- Telefone: (11) 3456-7890
- WhatsApp: (11) 98765-4321

---

**Desenvolvido com ❤️ para o Solaris Residence**

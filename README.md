# 🚀 DevOrbit

**DevOrbit** é uma plataforma de rede social open source criada e mantida por **Aldo frota**, com o objetivo de servir como projeto de portfólio profissional. A plataforma simula uma rede social moderna e modular, com recursos como:

- Login e registro de usuários
- Feed global e pessoal
- Perfis de usuários
- Sistema de seguidores/seguindo
- Publicações com comentários e curtidas

O foco do projeto é exercitar e demonstrar habilidades em arquitetura frontend moderna, testes automatizados, organização por domínio, GraphQL e simulação de backend com MirageJS.

---

## ✨ Tecnologias utilizadas

![React](https://img.shields.io/badge/-React-333333?style=flat&logo=react)
![Vite](https://img.shields.io/badge/-Vite-333333?style=flat&logo=vite)
![TypeScript](https://img.shields.io/badge/-TypeScript-333333?style=flat&logo=typescript)
![React Router](https://img.shields.io/badge/-React%20Router-333333?style=flat&logo=reactrouter)
![GraphQL](https://img.shields.io/badge/-GraphQL-333333?style=flat&logo=graphql)
![Apollo Client](https://img.shields.io/badge/-Apollo%20Client-333333?style=flat&logo=apollo-graphql)
![MirageJS](https://img.shields.io/badge/-MirageJS-333333?style=flat&logo=javascript)
![Faker](https://img.shields.io/badge/-Faker-333333?style=flat&logo=javascript)
![TailwindCSS](https://img.shields.io/badge/-TailwindCSS-333333?style=flat&logo=tailwindcss)
![Zustand](https://img.shields.io/badge/-Zustand-333333?style=flat&logo=zotero)
![Jest](https://img.shields.io/badge/-Jest-333333?style=flat&logo=jest)
![Testing Library](https://img.shields.io/badge/-Testing%20Library-333333?style=flat&logo=testing-library)

---

## 📁 Estrutura do projeto

```
src/
├── app/                    # Configuração principal do app (rotas, tema, providers)
│   ├── router.tsx
│   └── App.tsx
│   └── layout/
│       ├── Layout.tsx
│       ├── Sidebar.tsx
│       ├── Navbar.tsx
│       ├── Topbar.tsx
│       ├── Footer.tsx
│       ├── index.ts
│       └── __tests__/
│
├── components/             # Componentes reutilizáveis
│   └── index.ts
│   └── __tests__/
│
├── features/               # Funcionalidades/domínios do app
│   ├── auth/
│   │   ├── components/
│   │   ├── graphql/
│   │   │   ├── login.ts
│   │   │   ├── register.ts
│   │   │   └── index.ts
│   │   ├── hooks/
│   │   │   ├── useLogin.ts
│   │   │   ├── useLogin.test.ts
│   │   │   └── index.ts
│   │   ├── services/
│   │   │   ├── authService.ts
│   │   │   ├── authService.test.ts
│   │   │   └── index.ts
│   │   ├── pages/
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   │   └── index.ts
│   │   ├── types.ts
│   │   └── index.ts
│   ├── post/
│   ├── profile/
│   └── feed/
│
├── graphql/                # Fragments globais, queries e mutations
│   ├── fragments/
│   ├── queries/
│   ├── mutations/
│   └── index.ts
│
├── lib/                    # Funções utilitárias
│   ├── auth.ts
│   └── index.ts
│
├── mocks/                  # MirageJS + Faker
│   ├── handlers/
│   ├── server.ts
│   └── data/
│
├── providers/              # Contextos globais
│   ├── AuthProvider.tsx
│   ├── ThemeProvider.tsx
│   └── index.ts
│
├── store/                  # Zustand store (se necessário)
│   └── index.ts
│
├── styles/                 # Tailwind, resets, global.css
│   ├── globals.css
│   ├── index.ts
│   └── tailwind.config.js
│
├── tests/                  # Setup e utilitários de teste
│   ├── setupTests.ts
│   ├── test-utils.ts
│   └── index.ts
│
└── index.tsx               # Ponto de entrada
```

---

## 🧪 Testes

O projeto inclui testes de:

- Hooks e services (localizados junto aos arquivos)
- Componentes globais (`components/__tests__`)
- Layout principal (`app/layout/__tests__`)
- Utilitários de teste (`tests/`)

Frameworks: **Jest + Testing Library**

---

## 🛑 Licença

Este projeto está licenciado sob a licença **Creative Commons Attribution-NonCommercial 4.0 International**.

Você **pode estudar, modificar e usar para fins educacionais ou pessoais**, mas **o uso comercial ou monetização é estritamente proibido** sem autorização explícita.

🔗 [Ver licença completa](https://creativecommons.org/licenses/by-nc/4.0/)

```
© 2025 Aldo Frota. Todos os direitos reservados.
```

---

## 💬 Contribuições

Contribuições são bem-vindas! Abra uma issue ou envie um PR — respeitando os termos da licença e o propósito educacional deste projeto.

---

## 📦 Instalação (em breve...)

> Este projeto está em fase inicial de desenvolvimento. Em breve serão adicionadas instruções para instalação, desenvolvimento e deploy.

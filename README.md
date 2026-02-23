#  Hook & Yarn — Fullstack Application

Aplicação fullstack desenvolvida para compartilhamento de padrões de crochê criados por usuários cadastrados na plataforma.

Projeto desenvolvido por Julia Bermond para fins educacionais e consolidação de conhecimentos em JavaScript, arquitetura de APIs e integração frontend/backend.

---

# Estrutura do Projeto

O projeto é dividido em duas aplicações:

- **Backend (API REST)**
- **Frontend (SPA React)**

---

# Backend — API REST

API construída com Node.js + Express, responsável pelas regras de negócio, autenticação e persistência de dados.

## Funcionalidades

- Autenticação via JWT armazenado em cookies HTTP-only
- Rotas protegidas por middleware
- Criação de User
- Criação e exclusão de posts
- Upload de imagens
- Armazenamento em nuvem
- Validação de dados
- Tratamento centralizado de erros

---

## Tecnologias Utilizadas (Backend)

- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JSON Web Token (JWT)  
- Bcrypt  
- Multer  
- Cloudinary  
- Cookie-parser  
- CORS  
- Validator  
- Dotenv  
- Nodemon  

---

#  Frontend — SPA

Interface desenvolvida com React + Vite, responsável pelo consumo da API e experiência do usuário.

## Funcionalidades

- Autenticação integrada via cookies
- Proteção de rotas privadas
- Criação, exclusão e listagem de posts
- Upload de imagens
- Validação de formulários
- Gerenciamento de estado assíncrono
- Feedback visual e animações

---

## Tecnologias Utilizadas (Frontend)

- React 19  
- Vite  
- React Router DOM  
- React Hook Form  
- Zod  
- TanStack React Query  
- Framer Motion  

---


# Arquitetura

- Backend desacoplado do frontend
- Autenticação baseada em JWT via cookies
- API REST estruturada em camadas
- Cache com React Query
- Upload de arquivos com armazenamento externo (Cloudinary)

---

# Objetivo do Projeto

Este projeto foi desenvolvido para praticar:

- Arquitetura de APIs REST
- Autenticação segura com JWT
- Integração frontend/backend
- Gerenciamento de estado assíncrono
- Upload e manipulação de arquivos
- Organização e boas práticas em projetos fullstack

---

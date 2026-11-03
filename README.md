# MEDQUERY

Agendamento de consultas médicas com pré-triagem online. O paciente escolhe a clínica,
informa a especialidade e os sintomas e reserva um horário livre. A equipe administrativa
gerencia clínicas, funcionários e a agenda em um painel com indicadores.

Projeto original desenvolvido como Trabalho de Conclusão de Curso (2021) e reescrito em 2026.
O código de 2021 está preservado na tag [`tcc-2021-original`](../../tree/tcc-2021-original).

## Funcionalidades

**Paciente**
- Cadastro e login (senha com hash bcrypt, sessão em cookie httpOnly)
- Agendamento em quatro etapas: clínica → especialidade e sintomas → dia e horário → confirmação
- Só aparecem horários realmente livres; dois pacientes não conseguem reservar o mesmo horário
- Lista de próximas consultas, histórico e cancelamento

**Administrador**
- Visão geral com totais, consultas por clínica e por especialidade e próximos atendimentos
- Cadastro, edição e exclusão de clínicas (CNPJ validado, inclusive o novo formato alfanumérico)
- Cadastro de funcionários por clínica e cargo (CPF validado)
- Agenda de todas as clínicas com a pré-triagem de cada paciente; marcar como realizada ou cancelar
- Filtros e buscas na URL (dá para compartilhar o link de uma busca)

## Stack

| Camada | Tecnologia |
|---|---|
| Framework | [Next.js 16](https://nextjs.org) (App Router, Server Components, Server Actions, Cache Components) |
| Linguagem | TypeScript |
| UI | Tailwind CSS v4 + [shadcn/ui](https://ui.shadcn.com) (Radix) + Lucide |
| Banco | MongoDB ([Atlas](https://www.mongodb.com/atlas), plano gratuito M0) via Mongoose |
| Validação | Zod |
| Autenticação | bcryptjs + JWT assinado com [jose](https://github.com/panva/jose) |
| Deploy | [Vercel](https://vercel.com) (plano Hobby) |

## Rodando localmente

Pré-requisito: Node.js 20.12 ou mais recente.

```bash
npm install
cp .env.example .env.local      # depois preencha SESSION_SECRET (veja abaixo)
npm run db:dev                  # sobe um MongoDB local em outro terminal
npm run seed                    # cria clínicas, funcionários, pacientes e consultas de exemplo
npm run dev                     # http://localhost:3000
```

O `npm run db:dev` usa o [mongodb-memory-server](https://github.com/typegoose/mongodb-memory-server)
para baixar e rodar um `mongod` sem instalar nada no sistema. Os dados ficam em `.mongo-data/`.
Se preferir, aponte `MONGODB_URI` para um cluster do Atlas ou para um MongoDB próprio.

Para gerar o `SESSION_SECRET`:

```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

Usuários criados pelo seed:

| Perfil | Login | Senha |
|---|---|---|
| Administrador | `admin` | `admin123` |
| Paciente | `paciente` | `paciente123` |

As senhas podem ser trocadas com `SEED_ADMIN_SENHA` e `SEED_PACIENTE_SENHA`. O seed só roda com
o banco vazio; para recriar tudo, use `npm run seed -- --force`.

### Scripts

| Comando | O que faz |
|---|---|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` / `npm start` | Build e servidor de produção |
| `npm run lint` | ESLint |
| `npm run db:dev` | MongoDB local para desenvolvimento |
| `npm run seed` | Dados de exemplo (`-- --force` apaga e recria) |

## Deploy (Vercel + MongoDB Atlas)

1. **Banco:** crie um cluster gratuito **M0** no [MongoDB Atlas](https://cloud.mongodb.com).
   Escolha a região `sa-east-1` (São Paulo) para ficar perto dos usuários.
   - Em *Database Access*, crie um usuário com permissão de leitura e escrita.
   - Em *Network Access*, libere `0.0.0.0/0`. As funções da Vercel não têm IP fixo; o acesso
     continua protegido pelo usuário e pela senha.
   - Copie a connection string (`mongodb+srv://...`) e acrescente o nome do banco: `.../medquery?retryWrites=true&w=majority`.
2. **Dados iniciais:** coloque essa URI em `MONGODB_URI` no `.env.local` e rode `npm run seed`.
   Defina senhas fortes em `SEED_ADMIN_SENHA`, porque o painel vai ficar público.
3. **Vercel:** importe o repositório em [vercel.com/new](https://vercel.com/new). O framework é
   detectado automaticamente. Em *Environment Variables*, cadastre:
   - `MONGODB_URI`: a URI do Atlas
   - `SESSION_SECRET`: um segredo novo, diferente do local
4. Opcional: em *Settings → Functions*, escolha a região `gru1` (São Paulo), a mesma do banco.

Cada push na branch de produção gera um novo deploy.

## Estrutura

```
src/
├── actions/          Server Actions (mutações): auth, clínicas, funcionários, consultas
├── app/
│   ├── (auth)/       login e cadastro
│   ├── admin/        painel administrativo
│   ├── paciente/     área do paciente e fluxo de agendamento
│   └── api/horarios  horários livres de uma clínica em um dia (GET)
├── components/       componentes compartilhados (ui/ = shadcn)
├── lib/
│   ├── auth/         sessão (JWT em cookie) e DAL com as checagens de permissão
│   ├── data/         consultas ao banco, sempre passando pela DAL
│   ├── models/       schemas Mongoose
│   ├── schemas.ts    validação com Zod
│   └── datas.ts      datas sempre no horário de Brasília
└── proxy.ts          redirecionamento rápido por perfil (antigo middleware)
scripts/              db:dev e seed
```

### Decisões de segurança

- Senhas guardadas só como hash bcrypt; o campo nunca sai do banco sem pedido explícito.
- A sessão é um JWT assinado em cookie `httpOnly`, `secure` e `sameSite=lax`.
- Toda leitura e toda mutação conferem o perfil do usuário no servidor (`lib/auth/dal.ts`),
  com o papel lido do banco, não do token. O `proxy.ts` só antecipa redirecionamentos.
- Entradas validadas com Zod antes de chegar ao banco; buscas escapam caracteres de regex.
- Um índice único parcial (`clinica + data` com status `agendada`) impede dois agendamentos no
  mesmo horário, mesmo com requisições simultâneas.

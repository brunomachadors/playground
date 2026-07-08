# Análise de Cobertura de Testes — Automation Test Playground

> Perspectiva: QA Engineer / Playwright. Apenas análise — nenhum teste foi criado ou alterado.
> Data: 2026-07-06

## 1. Estado atual

**Stack:** Next.js 14 + Playwright 1.61 (TypeScript), 3 browsers (chromium, firefox, webkit), `baseURL` apontando para o deploy Vercel, reporter HTML, trace on-first-retry.

**Arquitetura de testes:** POM bem estruturada em 4 camadas (`data/`, `fixtures/`, `pages/`, `specs/`), com convenções fortes documentadas em `.claude/skills/playground-conventions` (prefixos S/H/N/T/F, tags página → @regression → categoria, `test.step()` em todas as actions/assertions, locators por `#id`).

**Ecossistema de agentes (`.claude/`):** o projeto define um workflow claro que deve ser seguido para cada nova página:

`reference-doc-writer` → `scenario-designer` → `playground-scaffold` (skill) → `test-code-reviewer` (+ `bug-reporter` e `accessibility-test-designer` como apoio).

### Cobertura existente

| Página | Spec | Testes | Reference doc | POM |
|--------|------|--------|---------------|-----|
| `/login` | `login.spec.ts` | 20 (S4, H3, N5, T3, F5) | ✅ `docs/login-page-test-reference.md` | `LoginPage` |
| `/form` (+ `/submittedform`) | `form.spec.ts` | ~18 (S3, H6, N7, T2) | ✅ `docs/form-page-test-reference.md` | `FormPage` |
| `/` (desktop + mobile) | `home.spec.ts` | 13 (S1, H12, N1) | ✅ `docs/home-page-test-reference.md` | `HomePage` |
| `/dashboard` | indireta (via login) | 2 assertions | ❌ | `DashboardPage` |

Qualidade do que existe: alta. Specs finas, dados nomeados por intenção, assertions de mensagem com visibilidade + texto exato, casos de estado (bloqueio temporário) e comportamento de campo bem cobertos.

## 2. Gaps de cobertura (páginas sem testes)

### 🔴 `/tasks` — To-do list (prioridade 1)
Estado rico e zero cobertura: adicionar tarefa (com trim; entrada vazia/whitespace ignorada), completar, editar inline, reordenar por **drag-and-drop** (prioridade = posição), lista de concluídas separada. Possui `id`s e `data-testid` prontos. Sem dependências externas → testes determinísticos e baratos.

Cenários-chave: S (página/input visíveis, listas ausentes quando vazias), H (add/complete/edit), N (submit vazio, edit para vazio), T (reorder via `dragTo`, prioridade recalculada, ordem da lista de concluídas), F (trim de input).

### 🔴 `/store` — Mini-loja SPA (prioridade 2)
Maior superfície do app: 6 tabs (Home, Inventory, Catalog, Cart, Payments, Orders) com estado compartilhado via `ProductContext`. Excelente instrumentação com `data-testid` em tudo. Permite o único **user journey E2E completo** do projeto: criar produto no Inventory → Catalog → Cart (totais) → Payment (métodos, confirmação) → Orders.

Recomendação: um POM por tab + spec por tab, mais um `store-journey.spec.ts` para o fluxo ponta a ponta. Cobrir também: inventário vazio, incremento/decremento de quantidade, carrinho vazio, cálculo de totais (item e geral), seleção de método de pagamento obrigatória.

### 🟠 `/table` — Tabela de personagens (prioridade 3)
Consome API externa (`hp-api.onrender.com`) e **embaralha** os 10 primeiros resultados. Testar contra a API real = flakiness garantida (rede + ordem aleatória). Requisito técnico: **mock de rede com `page.route()`** e fixture JSON, transformando a página no exercício de determinismo do projeto. Cobrir também o layout responsivo (cards mobile vs. tabela desktop) e IDs derivados do nome (`characterName-<id>`).

### 🟠 `/accessibility` — prioridade 4
Página com bugs de acessibilidade **intencionais**, tabs e deep-link via query param `?bug=N`. Já existe um agente dedicado (`accessibility-test-designer`) que espera `@axe-core/playwright` — **a dependência ainda não está instalada**. Cenários com prefixo `A`, bugs conhecidos documentados com `test.fail()`, além de testes funcionais das tabs e do query param.

### 🟡 `/dashboard` e `/about` — prioridade 5
Dashboard: só é verificado como destino do login. Falta: acesso direto sem autenticação (existe guarda? redirect?), conteúdo do `UserProfile`. About: sem cobertura; smoke simples basta.

## 3. Riscos e melhorias de infraestrutura

1. **Sem `webServer` no config** — os testes só rodam contra produção (Vercel). Adicionar `webServer: { command: 'npm run dev', url: 'http://localhost:3000' }` permitiria validar mudanças locais antes do deploy.
2. **Sem CI** — o config referencia `process.env.CI`, mas não há workflow (ex.: GitHub Actions). Sem CI, as tags `@smoke`/`@regression` não são exploradas.
3. **Sem scripts por tag** — sugerir `test:smoke` (`playwright test --grep @smoke`) e afins para aproveitar o sistema de tags.
4. **Fixture vazia** — `fixtures/test.ts` só re-exporta. Está preparada para evoluir (ex.: fixture de POMs instanciados ou de rede mockada para `/table`).
5. **Mobile só na Home** — viewport mobile via `test.use` num único describe. Considerar um project `mobile-chrome` no config quando /tasks e /store ganharem cobertura (ambos têm layout mobile próprio).
6. **Redundância em `form.spec.ts`** — H2 e H4 executam exatamente o mesmo cenário (`april`); H4 deveria usar um perfil próprio ou ser removido.
7. **Reference docs em falta** — `/tasks`, `/store`, `/table` e `/accessibility` não têm `*-test-reference.md`. Pelo workflow do projeto, o doc de referência é o primeiro passo antes de cenários e código.
8. **`@axe-core/playwright` não instalado** — bloqueia o trabalho do agente de acessibilidade.

## 4. Roadmap sugerido

| Fase | Entrega | Esforço | Valor |
|------|---------|---------|-------|
| 1 | Reference doc + cenários + testes de `/tasks` (incl. drag-and-drop) | Médio | Alto |
| 2 | `/store`: POMs por tab, specs por tab + journey E2E | Alto | Muito alto |
| 3 | `/table` com mock de rede (`page.route`) + responsividade | Médio | Alto (elimina flakiness por design) |
| 4 | `/accessibility`: instalar axe-core, suite `A*` com `test.fail()` nos bugs intencionais | Médio | Alto |
| 5 | `/dashboard` (acesso direto) + `/about` smoke; limpeza H4 do form | Baixo | Médio |
| Infra | `webServer` local, CI com `@smoke` no PR e `@regression` agendada, scripts por tag | Baixo | Alto |

Para cada fase, seguir o pipeline de agentes do projeto: **reference-doc-writer → scenario-designer → playground-scaffold → test-code-reviewer**.

# McBugs: QA Portfolio

> **Credit:** the system under test is a fork of the [mcbugs](https://github.com/TBCodeBase/mcbugs) project, created by [Fernando Papito](https://github.com/testbeyond) for the [Testing the Méqui Kiosk with AI](https://testbeyond.com/) course. This repository documents the QA work performed on that system.

## Language / Idioma

- **English** (current section)
- [Español](#mcbugs-portafolio-de-qa)

## About me

**Fabiano Oliveira Silva** — QA Junior, focused on test design and E2E automation.<br>
[LinkedIn](https://www.linkedin.com/in/fabiano-silva-oliveira/) · [GitHub](https://github.com/Fabianooliveirasilva)

## What I tested

The scope covers the ordering journey of a self-service restaurant kiosk, from selecting the order type through payment confirmation:

- **Agent-assisted execution (Playwright MCP):** complete order journeys, payment combinations, validations, persistence, cancellation, empty state, and invalid-data recovery (CT001, CT003 to CT011).
- **Automated E2E tests:** 11 cases in Chromium, implemented with Playwright and TypeScript (CT001–CT011).

| Case | Type | Recorded result |
|---|---|---|
| CT001 | Assisted (Playwright MCP) + E2E | PASS |
| CT002 | E2E | PASS |
| CT003–CT011 | Assisted (Playwright MCP) + E2E | PASS* |

\* CT011 passed with a console parse-error observation. Details and evidence are available in the [reports](#results).

Current out of scope: Firefox, WebKit, and mobile devices; automated accessibility; performance; security/RLS; network or Supabase failures; and other negative scenarios not described in the reports.

No test cases were executed manually by a person, and no formal exploratory sessions were conducted in this cycle.

## QA tools and stack

- [Playwright Test](https://playwright.dev/) 1.63.0 for E2E automation.
- TypeScript for scenario implementation.
- Chromium (the only project currently enabled in the configuration).
- Playwright MCP to execute scenarios with agent assistance before automation.
- Supabase as the backend tested in the assisted order-creation and order-query flow.
- Vite/React as the web application under test.

## Results

- **Total automated tests:** 11 real tests in `playwright/e2e/`, covering CT001 to CT011.
- **Last recorded execution:** 2026-10-17 — **11 passed, 0 failed** in Chromium.
- **Recorded assisted-execution result:** CT001 passed with no functional defects identified.

Full reports:

- [Assisted execution report](./Docs/reports/manual-testing-report.md)
- [Automated testing report](./Docs/reports/automation-testing-report.md)

## How to run the tests

From the repository root:

```bash
npm install
npm run dev
```

The local server runs at [http://localhost:3000](http://localhost:3000). To run the E2E suite, Playwright starts or reuses this server automatically:

```bash
npx playwright test --reporter=line
```

Available project commands:

```bash
npm run build
npm run lint
npm run preview
```

## About the system under test

McBugs simulates a self-service restaurant kiosk. The application uses:

- React 18, TypeScript, and Vite 5;
- Supabase/PostgreSQL for order persistence;
- React Router, Tailwind CSS, and Radix UI components.

Suggestions and issues can be submitted through the [repository issues](https://github.com/Fabianooliveirasilva/QA.mcbugs/issues):
[Report a Bug](https://github.com/Fabianooliveirasilva/QA.mcbugs/issues) · [Request a Feature](https://github.com/Fabianooliveirasilva/QA.mcbugs/issues)

### Prerequisites

- Node.js 18 or later;
- npm;
- Git;
- A [Supabase](https://supabase.com) account and project.

### Installation and Supabase configuration

```bash
git clone https://github.com/Fabianooliveirasilva/QA.mcbugs.git
cd QA.mcbugs
npm install
```

Create `.env.local` in the project root:

```env
VITE_SUPABASE_URL=https://your-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=your-public-key
VITE_SUPABASE_PROJECT_ID=your-project-ref
```

In Supabase, create a project and obtain the URL, public key, and project ID under **Settings > API**. Then apply the migrations through the SQL Editor, in this order:

1. `supabase/migrations/20251209002507_9a9f0129-cc6b-4721-bcbc-5f53568415f9.sql`
2. `supabase/migrations/20251209010000_add_sequential_order_number.sql`

You can also use the CLI:

```bash
npx supabase login
npx supabase link --project-ref your-project-ref
npx supabase db push
```

## Credits and license

Credit to [Fernando Papito](https://github.com/testbeyond), author of the original system and the [Testing the Méqui Kiosk with AI](https://testbeyond.com/) course.

This fork retains the [MIT](https://opensource.org/licenses/MIT) license and the reference to [COPYRIGHT.md](./COPYRIGHT.md).

---

# McBugs: Portafolio de QA

> **Crédito:** el sistema bajo prueba es un fork del proyecto [mcbugs](https://github.com/TBCodeBase/mcbugs), creado por [Fernando Papito](https://github.com/testbeyond) para el curso [Probando el Tótem de Méqui con IA](https://testbeyond.com/). Este repositorio documenta el trabajo de QA realizado sobre ese sistema.

## Idioma

- [English](#mcbugs-qa-portfolio)
- **Español** (sección actual)

## Sobre mí

**Fabiano Oliveira Silva** — QA Junior, con enfoque en diseño de pruebas y automatización E2E.<br>
[LinkedIn](https://www.linkedin.com/in/fabiano-silva-oliveira/) · [GitHub](https://github.com/Fabianooliveirasilva)

## Qué probé

El alcance cubre el flujo de compra de un tótem de autoservicio, desde la selección del tipo de pedido hasta la confirmación del pago:

- **Ejecución asistida por agente (Playwright MCP):** jornadas completas de pedido, combinaciones de pago, validaciones, persistencia, cancelación, estado vacío y recuperación de datos inválidos (CT001, CT003 a CT011).
- **Pruebas E2E automatizadas:** 11 casos en Chromium, implementados con Playwright y TypeScript (CT001–CT011).

| Caso | Tipo | Resultado registrado |
|---|---|---|
| CT001 | Asistido (Playwright MCP) + E2E | PASS |
| CT002 | E2E | PASS |
| CT003–CT011 | Asistido (Playwright MCP) + E2E | PASS* |

\* CT011 pasó con una observación de error de parseo en la consola. Los detalles y evidencias están disponibles en los [informes](#resultados-1).

Fuera del alcance actual: Firefox, WebKit y dispositivos móviles; accesibilidad automatizada; rendimiento; seguridad/RLS; fallos de red o de Supabase; y otros escenarios negativos no descritos en los informes.

No se realizaron ejecuciones manuales por una persona ni sesiones exploratorias formales en este ciclo.

## Herramientas y stack de QA

- [Playwright Test](https://playwright.dev/) 1.63.0 para automatización E2E.
- TypeScript para la implementación de los escenarios.
- Chromium (único proyecto habilitado actualmente en la configuración).
- Playwright MCP para ejecutar los escenarios con apoyo de un agente antes de automatizarlos.
- Supabase como backend probado en el flujo asistido de creación y consulta del pedido.
- Vite/React como aplicación web bajo prueba.

## Resultados

- **Total de pruebas automatizadas:** 11 pruebas reales en `playwright/e2e/`, cubriendo CT001 a CT011.
- **Última ejecución registrada:** 17/10/2026 — **11 passed, 0 failed** en Chromium.
- **Resultado registrado de la ejecución asistida:** CT001 pasó sin defectos funcionales identificados.

Informes completos:

- [Informe de ejecución asistida](./Docs/reports/manual-testing-report.md)
- [Informe de pruebas automatizadas](./Docs/reports/automation-testing-report.md)

## Cómo ejecutar las pruebas

Desde la raíz del repositorio:

```bash
npm install
npm run dev
```

El servidor local se ejecuta en [http://localhost:3000](http://localhost:3000). Para ejecutar la suite E2E, Playwright inicia o reutiliza este servidor automáticamente:

```bash
npx playwright test --reporter=line
```

Comandos disponibles:

```bash
npm run build
npm run lint
npm run preview
```

## Sobre el sistema bajo prueba

McBugs simula un tótem de autoservicio para restaurantes. La aplicación utiliza:

- React 18, TypeScript y Vite 5;
- Supabase/PostgreSQL para la persistencia de los pedidos;
- React Router, Tailwind CSS y componentes Radix UI.

Las sugerencias y los problemas pueden registrarse en las [issues del repositorio](https://github.com/Fabianooliveirasilva/QA.mcbugs/issues):
[Reportar un bug](https://github.com/Fabianooliveirasilva/QA.mcbugs/issues) · [Solicitar una funcionalidad](https://github.com/Fabianooliveirasilva/QA.mcbugs/issues)

### Requisitos previos

- Node.js 18 o superior;
- npm;
- Git;
- una cuenta y un proyecto en [Supabase](https://supabase.com).

### Instalación y configuración de Supabase

```bash
git clone https://github.com/Fabianooliveirasilva/QA.mcbugs.git
cd QA.mcbugs
npm install
```

Crea `.env.local` en la raíz del proyecto:

```env
VITE_SUPABASE_URL=https://tu-project-ref.supabase.co
VITE_SUPABASE_PUBLISHABLE_DEFAULT_KEY=tu-clave-publica
VITE_SUPABASE_PROJECT_ID=tu-project-ref
```

En Supabase, crea un proyecto y obtén la URL, la clave pública y el project ID en **Settings > API**. Después, aplica las migrations mediante el SQL Editor, en este orden:

1. `supabase/migrations/20251209002507_9a9f0129-cc6b-4721-bcbc-5f53568415f9.sql`
2. `supabase/migrations/20251209010000_add_sequential_order_number.sql`

También puedes utilizar la CLI:

```bash
npx supabase login
npx supabase link --project-ref tu-project-ref
npx supabase db push
```

## Créditos y licencia

Crédito a [Fernando Papito](https://github.com/testbeyond), autor del sistema original y del curso [Probando el Tótem de Méqui con IA](https://testbeyond.com/).

Este fork mantiene la licencia [MIT](https://opensource.org/licenses/MIT) y la referencia a [COPYRIGHT.md](./COPYRIGHT.md).

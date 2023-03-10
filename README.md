# Github repositories explorer

## Get started

### Prerequisites

1. Node >= v18.13.0
1. pnpm >= 7.5.2

### Installation

1. Clone this repository

```bash
  git clone git@github.com:romadryud/gh-react-reatom-fsd.git
```

2. Install dependencies

```bash
  pnpm i
```

3. Rename `.env.example` to `.env` and provide your own.

   Creating a personal access token classic [link](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/)

4. Start dev server

```bash
  pnpm dev
```

## Technologies

- React + TypeScript
- Reatom - managing state
- ChakraUI - component library
- Playwright - e2e tests
- vitest - unit tests

## Structure

Feature-Sliced Design

## CI&CD

Each pull request to main has a following flow:

```mermaid
flowchart TB
    subgraph test [Test]
    Lint --> UnitTest["Unit tests"] --> E2ETests["E2E tests"]
    end
    E2ETests --> Preview
```

Each merge to main has a following flow:

```mermaid
flowchart TB
    subgraph test [Test]
    Lint --> UnitTest["Unit tests"] --> E2ETests["E2E tests"]
    end
    E2ETests --> Deploy
```

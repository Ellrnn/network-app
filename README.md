# Network App

A React Native app built with Expo and Expo Router.

## Prerequisites

- Node.js 18+ (recommended)
- npm
- Expo Go app (optional, for device testing)

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npx expo start
```

## Lint

Run ESLint for `app` and `src`:

```bash
npm run lint
```

## Tests

Run Jest in watch mode:

```bash
npm run test
```

To run tests once (without watch mode):

```bash
npx jest --watchAll=false
```

## Implemented Assessment Requirements

- The project uses **Expo + React Native** (with Expo Router)
- Server-state management uses **TanStack Query**
- HTTP requests use **Axios** (integrated with the provided API)
- The app implements **likes**
- The app implements **comments**
- The app implements **mentions**
- The app implements **sorting and filtering options**
- The app implements **pagination/infinite scroll**
- The app includes a **persistent login/logout solution**
- The app includes **animations/transitions**

# Full Stack Open

Exercises and solutions for the [Full Stack Open](https://fullstackopen.com) course.

---

## 📘 Part 1: Introduction to React

**Exercises:**

- [`courseinfo`](./part1/courseinfo) — _1.1 to 1.5_
- [`unicafe`](./part1/unicafe) — _1.6 to 1.11_
- [`anecdotes`](./part1/anecdotes) — _1.12 to 1.14_

---

## 📗 Part 2: Communicating with Server

**Exercises:**

- [`courseinfo-advanced`](./part2/courseinfo-advanced) — _2.1 to 2.5_
- [`phonebook`](./part2/phonebook) — _2.6 to 2.17_
- [`countries`](./part2/countries) — _2.18 to 2.20_

---

Each project includes its own README and screenshot preview.

---

## 📙 Part 3 – Node.js and Express Backend

The backend for the Phonebook app, built with Node.js, Express, and MongoDB (Mongoose), is located in a separate repository:  
[phonebook-backend](https://github.com/Akiz-Ivanov/phonebook-backend)

This part covers creating a REST API, connecting to a cloud database, deploying the backend, and serving the frontend production build.

Live demo: https://phonebook-backend-j8qc.onrender.com

---

## 📒 Part 4 – Bloglist Backend & Authentication

This part focuses on building a **full-featured backend** for the Bloglist application using **Node.js**, **Express**, and **MongoDB**, with a strong emphasis on **testing** and **authentication**.

The implementation is located in a separate repository:

**Repository:**  
[bloglist-backend](https://github.com/Akiz-Ivanov/bloglist-backend)

This part covers:

- Structuring an Express + MongoDB backend
- Writing backend tests with **Jest** and **Supertest**
- User authentication with **bcrypt** and **JWT**
- Protecting routes and handling authorization
- Middleware, error handling, and environment configs

---

## 📕 Part 5 – Testing React Apps

**Exercises:**

- [`bloglist-frontend`](./part5/bloglist-frontend) — _5.1 to 5.16_
- [`bloglist-backend`](./part5/bloglist-backend) — _Backend code from earlier parts, no new backend tests here_
- [`bloglist-e2e-testing`](./part5/bloglist-e2e-testing) — _5.17 to 5.23 - End-to-end tests with Playwright_

---

## 📓 Part 6 – State Management

This part focuses on advanced state management patterns in React, including **Redux**, **Redux Toolkit**, **React Context**, and **React Query**.

**Exercises:**

- [`unicafe-redux`](./part6/unicafe-redux) — _6.1 to 6.2_
- [`redux-anecdotes`](./part6/redux-anecdotes) — _6.3 to 6.19_
- [`query-anecdotes`](./part6/query-anecdotes) — _6.20 to 6.24_

The exercises cover reducer-based state management, asynchronous actions, query caching and invalidation, custom hooks, and separating application logic from UI components.

---

## 📔 Part 7 – React Router, Custom Hooks, and Advanced State Management

This part explores **React Router** for navigation, creating **custom hooks**, and applying advanced state management techniques in a larger application context.

**Exercises:**

- [`routed-anecdotes`](./part7/routed-anecdotes) — _7.1 to 7.6 - React Router for navigation and URL parameters_
- [`country-hook`](./part7/country-hook) — _7.7 - Custom hook for fetching country data_
- [`ultimate-hooks`](./part7/ultimate-hooks) — _7.8 - Reusable custom hooks for resources_
- [`blog-list-redux`](./part7/blog-list-redux) — _7.9 to 7.21 - Extended Bloglist with Redux state management, styled with Material-UI_
- [`blog-list-query`](./part7/blog-list-query) — _7.9 to 7.21 - Extended Bloglist with React Query and Context, styled with Bootstrap_

**Note:** For exercises 7.9-7.21, both Redux and React Query versions were completed to maximize learning. The Redux version uses **Material-UI** for styling, while the React Query version uses **Bootstrap**.

This part covers:

- Client-side routing with React Router
- Navigation, URL parameters, and programmatic navigation
- Creating reusable custom hooks
- Advanced Redux patterns and best practices
- React Query with Context for server state
- Styling with UI libraries (Material-UI and Bootstrap)
- Notifications, user management, and complex state flows

---

## 🔗 Part 8 – GraphQL

This part introduces **GraphQL** as an alternative to REST for building APIs, covering both server and client-side implementation.

**Exercises:**

- [`library-backend`](./part8/library-backend) — _8.1 to 8.26 - GraphQL server with Apollo Server, Express, and MongoDB_
- [`library-frontend`](./part8/library-frontend) — _8.17 to 8.26 - React client with Apollo Client_

This part covers:

- Designing a GraphQL schema with types, queries, mutations, and subscriptions
- Building a GraphQL server with Apollo Server and Express
- Connecting to MongoDB with Mongoose
- JWT authentication in GraphQL context
- Apollo Client setup with authentication link
- Querying and mutating data with Apollo Client hooks
- Real-time updates with GraphQL subscriptions over WebSockets
- Apollo cache management and manual cache updates
- Solving the n+1 problem

---

## 🔷 Part 9 – TypeScript

This part introduces **TypeScript** as a superset of JavaScript, covering type safety across both backend and frontend development.

**Exercises:**

- [`ts-calculators`](./part9/ts-calculators) — _9.1 to 9.7 - TypeScript basics, type guards, and utility scripts_
- [`ts-frontend`](./part9/ts-frontend) — _9.14 to 9.16 - Typed React components with discriminated unions_
- [`flight-diary`](./part9/flight-diary) — _9.17 to 9.20 - Full stack flight diary app with typed Express backend and React frontend_
- [`patientor`](./part9/patientor) — _9.21 to 9.30 - Full stack medical records app with advanced TypeScript patterns_

This part covers:

- TypeScript configuration, compilation, and ESLint integration
- Type inference, type guards, and utility types (`Omit`, `Pick`, `Partial`)
- Discriminated unions and exhaustive type checking with `assertNever`
- Generics and indexed access types
- Typing Express routes and request/response objects
- Runtime validation with **Zod** including discriminated union schemas
- Enums vs union types and when to use each
- Typing React components, hooks, and event handlers
- Sharing types between frontend and backend

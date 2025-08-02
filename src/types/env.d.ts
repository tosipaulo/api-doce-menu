// types/env.d.ts
declare namespace NodeJS {
  interface ProcessEnv {
    AUTH_SECRET: string | null;
  }
}
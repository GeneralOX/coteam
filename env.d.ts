declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: string;
      DATABASE_URI: string;
      DATABASE_NAME: string;
      JWT_KEY: string;
    }
  }
}

export {}

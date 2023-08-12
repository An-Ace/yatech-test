import jwt from "jsonwebtoken";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ACCESS_SECRET: jwt.Secret;
      ACCESS_EXP: string;
      REFRESH_SECRET: jwt.Secret;
      REFRESH_EXP: string;
      NODE_ENV: 'development' | 'production';
      DATABASE_URL: string;
    }
  }
}
// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {}
import { Request as DefaultRequest } from "express";
export interface Request extends DefaultRequest {
  session: DefaultRequest & { id: number, email: string, role: string };
  cookies: DefaultRequest & { access_token: string };
  body: { data: any, config?: any }
}
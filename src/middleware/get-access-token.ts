import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import {prisma} from "../utils/prisma";
import { generateAccessToken, generateRefreshToken } from "./jwt";

export default async function getAccessToken(req: Request, res: Response) {
  const getRefreshToken = req.body.data.refreshToken;

  if (!getRefreshToken) {
    return res.status(401).json({ message: 'Unauthorized' });
  }
  
  try {
    const decoded: any = jwt.verify(getRefreshToken, process.env.REFRESH_SECRET ?? "");

    const user = await prisma.user.findUnique({ where: { id: decoded.id } });

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Send access token in response headers
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie('access-token', accessToken, { sameSite: 'lax' })
    res.json({ data: { accessToken, refreshToken, loginOn: Date.now(), user: { id: user?.id, username: user?.username, role: user?.role } } });
  } catch (err) {
    res.status(401).json({ message: 'Unauthorized' });
  }
}
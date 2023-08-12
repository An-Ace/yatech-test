import { Response, Request } from "express"
// import type { Request } from "../../types/session"
import { prisma } from "../utils/prisma"
import bcrypt from "bcrypt"
import { generateAccessToken, generateRefreshToken } from '../middleware/jwt'

async function Register (req: Request, res: Response) {
  const data = req.body.data;
  try {
    // Check if user exists
    const user = await prisma.user.create({data, include: { profile: true }});
    
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const tokenData = { id: user.id, email: user.email, role: user.role }
    // Create and sign JWT token
    const accessToken = generateAccessToken(tokenData);
    const refreshToken = generateRefreshToken(tokenData);
    // Set Authorization header
    res.set('Authorization', `Bearer ${accessToken}`);
    res.cookie('access-token', accessToken, { sameSite: 'lax' })

    res.json({
      data: { accessToken, refreshToken, loginOn: Date.now(), user: { id: user?.id, username: user?.username, role: user?.role } }
    });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}

export default Register
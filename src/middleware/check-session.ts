import { NextFunction, Response, Request } from "express";
import jwt from "jsonwebtoken";
// import { Request } from "../../types/session";

function checkSession(req: Request, res: Response, next: NextFunction) {
  // @ts-ignore
  // Get token dari header
  
  const token = req.headers.authorization?.split(' ')[1] ?? req.cookies["access-token"];
  // Check token ada?
  if (!token) {
    return res.status(401).json({ msg: 'Token Tidak ada, Login Terlebih Dahulu' });
  }

  try {
    // Verify token
    const SECRET: jwt.Secret = process.env.ACCESS_SECRET ?? ""
    const decoded = jwt.verify(token, SECRET);
    // @ts-ignore
    req.session = {...decoded, id: parseInt(decoded.id)};
    
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token Tidak Valid' });
  }
}
  
export default checkSession;
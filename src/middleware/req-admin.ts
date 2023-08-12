import { NextFunction, Response, Request } from "express";
// import { Request } from "../../types/session";

const reqAdmin = (req: Request, res: Response, next: NextFunction) => {
  // @ts-ignore
  if (req.session.role == 'admin') {
    return next();
  } else {
    return res.status(401).json({ msg: 'Halaman Admin: Hanya admin yang bisa melihat!' });
  }
}
  
export default reqAdmin;
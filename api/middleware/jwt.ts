import jwt from "jsonwebtoken";

export function generateAccessToken (user: any) {
  return jwt.sign(user,
    process.env.ACCESS_SECRET ?? "", { expiresIn: process.env.ACCESS_EXP });
};

export function generateRefreshToken (user: any) {
  return jwt.sign(user,
    process.env.REFRESH_SECRET ?? "", { expiresIn: process.env.REFRESH_EXP });
};

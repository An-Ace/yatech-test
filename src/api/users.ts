import { Response, Request } from "express"
// import type { Request } from "../../types/session"
import { prisma } from "../utils/prisma"
import { DefaultShow } from "../../types/data"
import { User } from "@prisma/client"

export const getUsers = async (req: Request, res: Response) => {
  const users = await prisma.user.findMany({ select: DefaultShow.user })
  return res.send({data: users})
}

export const getUser = async (req: Request, res: Response) => {
  // @ts-ignore
  const user = await prisma.user.findFirst({ where: { id: req.session.id }, select: {...DefaultShow.user, posts: true} })
  return res.json({data: user})
}

export const updateUser = async (req: Request, res: Response) => {
  const userUser: User = req.body.data
  const user = await prisma.user.update({
    data: {
      ...userUser
    },
    // @ts-ignore
    where: { id: req.session.id }
  })
  return res.send(user)
}

export const createUser = async (req: Request, res: Response) => {
  const userUser: User = req.body?.data
  const user = await prisma.user.create({
    data: {
      ...userUser
    },
  })
  return res.send(user)
}

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params
  const user = await prisma.user.delete({ where: { id: parseInt(id) } })
	return res.json(user)
}

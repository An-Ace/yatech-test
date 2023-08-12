import { Response, Request } from "express"
// import type { Request } from "../../types/session"
import { prisma } from "../utils/prisma"
import { Profile } from "@prisma/client"
import { DefaultShow } from "../../types/data"

export const getProfiles = async (req: Request, res: Response) => {
  const profiles = await prisma.profile.findMany({ select: DefaultShow.profile })
  return res.send({data: profiles})
}

export const getProfile = async (req: Request, res: Response) => {
  // @ts-ignore
  const profile = await prisma.profile.findFirst({ where: { id: (req.session.id) }, select: DefaultShow.profile })
  return res.json({data: profile})
}

export const updateProfile = async (req: Request, res: Response) => {
  const userProfile: Profile = req.body.data
  const profile = await prisma.profile.update({
    data: {
      ...userProfile
    },
    // @ts-ignore
    where: { id: req.session.id }
  })
  return res.send(profile)
}

export const createProfile = async (req: Request, res: Response) => {
  // @ts-ignore
  if (req.session.role == 'admin') {
    const userProfile: Profile = req.body?.data
    const profile = await prisma.profile.create({
      data: {
        ...userProfile
      },
    })
    return res.send(profile)
  } else {
    return res.json({ msg: "Harus Admin!" })
  }
  
}

export const deleteProfile = async (req: Request, res: Response) => {
  // @ts-ignore
  if (req.session.role == 'admin') {
    const { id } = req.params
    const profile = await prisma.profile.delete({ where: { id: parseInt(id) } })
    return res.json(profile)
  } else {
    return res.json({ msg: "Harus Admin!" })
  }
}

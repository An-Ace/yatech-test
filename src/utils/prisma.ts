import { PrismaClient } from "@prisma/client"

export type {User, Profile, Post} from '@prisma/client' 

export const prisma = new PrismaClient()

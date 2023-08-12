export interface User {
  id: number
  username: string
  email: string
  password: string
  role: string
  createdAt: Date
  updatedAt: Date
  profile: Profile
}

export interface Profile {
  id: number
  fullName: string
  bio: string
  userId: number
  user: User
}

export interface Post {
  id: number
  title: string
  content: string
  createdAt: Date
  updatedAt: Date
  author: string
  authorId: number
}

export const DefaultShow = {
  user: {
    id: true,
    username: true,
    email: true,
    role: true,
    password: false,
    createdAt: true,
    updatedAt: true,
    profile: true
  },
  profile: {
    id: true,
    fullName: true,
    bio: true,
    userId: false,
    user: false
  },
  post: {
    id: true,
    title: true,
    content: true,
    createdAt: true,
    updatedAt: true,
    author: true,
    authorId: false
  }
}
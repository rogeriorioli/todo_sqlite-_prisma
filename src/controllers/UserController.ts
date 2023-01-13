import { Request, Response } from 'express'
import axios from 'axios'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export default class UserController {

  public async getUser(req: Request, res: Response) {
    const { username } = req.body
    const userExist = await prisma.user.findFirst({
      where: {
        username: username
      }
    })
    if (userExist) {
      return res.status(200).json(userExist)
    }
     res.status(401).json({message : 'usuario não existe'})
  }

  public async createUser(req: Request, res: Response) {
    const { username }  = req.body
    const userExist = await prisma.user.findFirst({
      where: {
        username: username
      }
    })
    if (userExist) {
      return res.status(200).json({ messages: ['usuario ja cadastrado', 'usuário autenticado'],  ...userExist })
    }
    await axios.get(`https://api.github.com/users/${username}`)
    .then(async success => {
      const {data} = success
        const newUser = await prisma.user.create({
          data: {
            name: data.name,
            username: username,
            avatar:data.avatar_url
          }
        })
        return res.status(200).json(newUser)
    })
    .catch(() =>  res.status(401).json({message : 'usuario não encontrado na api do github'}))
  }
}
import { Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()


export default class TaskController {

  public async getUsersTasks(req: Request, res: Response) {
    const { userid } = req.headers
    const getUser = await prisma.user.findUnique({
      where: {
        id: userid?.toString(),
      },
      include: {
        taks: true,
      },
    })
    if (getUser) {
      return res.status(200).json(getUser)
    }
    return res.status(400).json({ message: 'algo de errado' })
  }

  public async createTask(req: Request, res: Response) {
    const { title, userid } = req.body
    const newtask = await prisma.task.create({
      data: {
        title,
        userid
      }
    })
    if (newtask) {
      return res.status(200).json({ newtask, message: `task ${title} criada com sucesso` })
    }
    return res.status(401).json({ mesage: 'algo de errado aconteceu' })
  }

  public async updateTask(req: Request, res: Response) {
    const { isdone } = req.body
    const { id } = req.params
    const task = await prisma.task.update({
      where: {
        id: id
      },
      data: {
        isdone
      }
    }).then(() => res.status(200).json({ message: `task ${id} atulizado com sucesso` }))
      .catch(err => res.status(400).json(err))
  }
  public async deleteTask(req: Request, res: Response) {
    const { id } = req.params
    const task = await prisma.task.delete({
      where: {
        id: id
      }
    }).then(() => res.status(200).json({ message: `task ${id} deletado com sucesso` }))
      .catch(err => res.status(400).json(err))
  }
}
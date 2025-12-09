import { Request, Response } from "express"
import { UserRole } from "@prisma/client"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { hash } from "bcrypt"
import { z } from "zod"

class UsersController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z.string().trim().min(2),
      email: z.string().email().toLowerCase(),
      password: z.string().min(6),
      role: z
        .enum([UserRole.employee, UserRole.manager])
        .default(UserRole.employee),
    })

    const { name, email, password, role } = bodySchema.parse(req.body)

    const userWithSameEmail = await prisma.user.findFirst({ where: { email } })

    if (userWithSameEmail) {
      throw new AppError("Já existe um usuário cadastrado com esse e-mail")
    }

    const hashedPassword = await hash(password, 8)

    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    })

    return res.status(201).json()
  }
}

export { UsersController }

import { Request, Response } from "express"
import { AppError } from "@/utils/AppError"
import { prisma } from "@/database/prisma"
import { z } from "zod"

const CategoryEnum = z.enum([
  "food",
  "others",
  "services",
  "transport",
  "accommodation",
])

class RefundsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      name: z
        .string()
        .trim()
        .min(1, { message: "Informe o nome da solicitação" }),
      category: CategoryEnum,
      amount: z.number().positive({ message: "O valor deve ser positivo" }),
      filename: z.string().min(20),
    })

    const { name, category, amount, filename } = bodySchema.parse(req.body)

    if (!req.user?.id) {
      throw new AppError("Unauthorized", 401)
    }

    const refund = await prisma.refunds.create({
      data: {
        name,
        category,
        amount,
        filename,
        userId: req.user?.id,
      },
    })
    return res.status(201).json(refund)
  }

  async index(req: Request, res: Response) {
    const querySchema = z.object({
      name: z.string().optional().default(""),
      page: z.coerce.number().optional().default(1),
      perPage: z.coerce.number().optional().default(10),
    })

    const { name, page, perPage } = querySchema.parse(req.query)

    const skip = (page - 1) * perPage

    const refunds = await prisma.refunds.findMany({
      skip,
      take: perPage,
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
      include: { user: true },
    })

    const totalRecords = await prisma.refunds.count({
      where: {
        user: {
          name: {
            contains: name.trim(),
          },
        },
      },
    })

    const totalPages = Math.ceil(totalRecords / perPage)

    res.json({
      refunds,
      pagination: {
        page,
        perPage,
        totalRecords,
        totalPages: totalPages > 0 ? totalPages : 1,
      },
    })
    return res.status(200).json({ refunds })
  }

  async show(req: Request, res: Response) {
    const paramsSchema = z.object({
      id: z.string().uuid(),
    })

    const { id } = paramsSchema.parse(req.params)

    const refund = await prisma.refunds.findUnique({
      where: { id },
      include: { user: true },
    })

    return res.status(200).json(refund)
  }
}
export { RefundsController }

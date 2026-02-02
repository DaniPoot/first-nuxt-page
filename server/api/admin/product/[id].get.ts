import { Product } from "~/generated/prisma/client";

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') as string

  if (id === 'new') {
    return {
      id: 0,
      slug: '',
      name: '',
      description: '',
      price: 0,
      images: [],
      tags: [],
      updateAt: new Date(),
      createdAt: new Date()
    } as Product
  }

  const product = await prisma.product.findUnique({
    where: {
      id: Number(id)
    }
  })


  if (!product) {
    throw createError({
      statusCode: 404,
      statusMessage: 'Not Found',
      message: `Product with id: ${id} not found`,
      data: {
        id,
        state: process.env.STAGE
      },
      stack: process.env.STAGE !== 'prod' ? new Error().stack : ''
    })
  }

  return product
})
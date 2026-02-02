import { z } from 'zod'
// Form multipart
// {
//   data: {...product},
//   files: [File, File 2, File 3]
// }
const bodySchema = z.object({
  slug: z.string().min(1),
  name: z.string().min(1),
  description: z.string().min(1),
  price: z.number().min(0),
  images: z.array(z.string()),
  tags: z.array(z.string())
})

export default defineEventHandler(async (event) => {
  const id = getRouterParam(event, 'id') as string

  const formData = await readMultipartFormData(event)
  // const body = new FormData(formData)

  if (!formData || formData.length === 0) {
    throw createError({
      status: 400,
      statusMessage: 'Bad request',
      message: 'There is not data inside the body'
    })
  }

  let dataString = ''
  for (const part of formData) {
    if (part.name === 'data' && part.data) {
      dataString = part.data.toString('utf-8')
      console.log({ dataString })
    }
  }

  // const body = bodySchema.safeParse(JSON.parse(dataString))
  const body = bodySchema.safeParse(JSON.parse(dataString))

  if (!body.success) {
    throw createError({
      status: 400,
      statusMessage: 'Bad request',
      message: 'Check the body of the request',
      data: body.error
    })
  }

  const product = await prisma.product.findUnique({
    where: {
      id: +id,
    },
  })

  if (!product) {
    throw createError({
      status: 404,
      statusMessage: 'Product not found',
    })
  }

  const updatedProduct = await prisma.product.update({
    where: {
      id: +id
    },
    data: body.data
  })

  // if (id === 'new') {
  // }


  return {
    message: 'Product updated',
    product: updatedProduct,
    files: []
  }
})
import z from 'zod'

const bodySchema = z.object({
  rating: z.number().min(1).max(5),
  review: z.string(),
  userTitle: z.string()
})


export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  const body = await readValidatedBody(event, bodySchema.parse)
  const slug = getRouterParam(event, 'slug')
  const user = session.user;
  console.log({ user: user })


  if (!user) {
    throw createError({
      status: 400,
      message: 'Bad request'
    })
  }

  const product = await prisma.product.findFirst({
    where: {
      slug
    }
  })

  if (!product) {
    throw createError({
      status: 404,
      message: `Prodcut with slug: ${slug} doesn't exist`
    })
  }

  const existingReview = await prisma.productReview.findFirst({
    where: {
      product: {
        id: product.id
      },
      userId: Number(user.id)
    }
  })

  if (existingReview) {
    throw createError({
      status: 400,
      statusMessage: 'You have already post a review for this post'
    })
  }

  const review = prisma.productReview.create({
    data: {
      ...body,
      userId: Number(user.id),
      name: user.name || '',
      productId: product.id
    }
  })

  return review
})
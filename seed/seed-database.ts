import { prisma } from '../server/utils/db';
import { siteReviews } from './site-reviews.seed.ts';
import { products } from './products.seed';
import { users } from './users.seed';
import bcrypt from 'bcryptjs'

async function seedDatabase() {
  await prisma.siteReview.deleteMany()
  await prisma.product.deleteMany()
  await prisma.user.deleteMany()

  const usersWithHashPassword = users.map(user => ({
    ...user,
    password: bcrypt.hashSync(user.password, bcrypt.genSaltSync(10))
  }))

  await prisma.siteReview.createMany({
    data: siteReviews
  })

  await prisma.product.createMany({
    data: products
  })

  await prisma.user.createMany({
    data: usersWithHashPassword
  })

  console.log('Database seede successfully')
}

seedDatabase()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
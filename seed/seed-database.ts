import { prisma } from '../server/utils/db';
import { siteReviews } from './site-reviews.seed.ts';
import { products } from './products.seed';

async function seedDatabase() {
  await prisma.siteReview.deleteMany()
  await prisma.product.deleteMany()

  await prisma.siteReview.createMany({
    data: siteReviews
  })

  await prisma.product.createMany({
    data: products
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
import { PrismaClient } from '@prisma/client';

// Initialize PrismaClient directly (without global caching)
const prisma = new PrismaClient();

process.on('unhandledRejection', (error) => {
  console.error('Unhandled promise rejection:', error);
});

// Only connect to the database in production environments
if (process.env.NODE_ENV === 'production') {
  prisma.$connect().catch((error) => {
    console.error('Error connecting to the database:', error);
  });
}

export default prisma;

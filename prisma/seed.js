const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()
const bcrypt = require('bcrypt')

async function main() {
  console.log(`Start seeding ...`);

  const result = await prisma.User.create({
    data: {
      email: 'admin@demo.com',
      username: 'admin',
      password: bcrypt.hashSync('test123', 4),
      role: 'admin',
      posts: {
        create: [
          { title: 'Hallo World', content: "Hallo Dunia" },
          { title: 'Hallo World 2', content: "Hallo Dunia 2" },
        ],
      },
      profile: {
        create: { fullName: 'Muhammad Nasrulloh', bio: "Freelance Web Devoloper" },
      },
    },
    include: {
      posts: true, // Include all posts in the returned object
      profile: true, // Include all posts in the returned object
    },
  })

  const result2 = await prisma.User.create({
    data: {
      email: 'user@demo.com',
      username: 'user',
      password: bcrypt.hashSync('test123', 4),
      role: 'user',
      posts: {
        create: [
          { title: 'Hallo World', content: "Hallo Dunia" },
          { title: 'Hallo World 2', content: "Hallo Dunia 2" },
        ],
      },
      profile: {
        create: { fullName: 'Heru Adi', bio: "Freelance Web Devoloper" },
      },
    },
    include: {
      posts: true, // Include all posts in the returned object
      profile: true, // Include all posts in the returned object
    },
  })

  console.log(result);

  console.log(`Seeding finished.`);
}
main()
  .catch((e) => {
  console.error(e);
  process.exit(1);
})
  .finally(async () => {
  await prisma.$disconnect();
});

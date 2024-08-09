// Script to seed the database with initial data
const sequelize = require('../config/connection');
const { User, Post, Comment } = require('../models');

const userData = [
  {
    name: 'John Doe',
    email: 'johndoe@example.com',
    password: 'password123'
  },
  {
    name: 'Jane Smith',
    email: 'janesmith@example.com',
    password: 'password123'
  },
  {
    name: 'Alice Johnson',
    email: 'alicejohnson@example.com',
    password: 'password123'
  }
];

const postData = [
  {
    title: 'Understanding JavaScript Closures',
    content: 'Closures are a fundamental concept in JavaScript that every developer should understand...',
    user_id: 1
  },
  {
    title: 'Getting Started with React',
    content: 'React is a powerful library for building user interfaces. In this post, we will cover the basics...',
    user_id: 2
  },
  {
    title: 'How to Use Sequelize with PostgreSQL',
    content: 'Sequelize is a powerful ORM that can be used to manage data in a PostgreSQL database...',
    user_id: 3
  }
];

const commentData = [
  {
    content: 'Great explanation, thank you!',
    user_id: 2,
    post_id: 1
  },
  {
    content: 'This helped me understand closures much better.',
    user_id: 3,
    post_id: 1
  },
  {
    content: 'Looking forward to trying this out in my project.',
    user_id: 1,
    post_id: 2
  }
];

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  await Post.bulkCreate(postData);

  await Comment.bulkCreate(commentData);

  console.log('Database seeded successfully!');
  process.exit(0);
};

seedDatabase();

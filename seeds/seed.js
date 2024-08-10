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
  },
  {
    name: 'Michael Brown',
    email: 'michaelbrown@example.com',
    password: 'password123'
  },
  {
    name: 'Emily Davis',
    email: 'emilydavis@example.com',
    password: 'password123'
  },
  {
    name: 'Chris Wilson',
    email: 'chriswilson@example.com',
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
  },
  {
    title: 'The Basics of CSS Flexbox',
    content: 'CSS Flexbox makes it easy to design flexible and responsive layout structures. Let’s dive into how it works...',
    user_id: 4
  },
  {
    title: 'Async/Await in JavaScript',
    content: 'Async/Await is a powerful feature in JavaScript for handling asynchronous operations. Learn how to use it effectively...',
    user_id: 5
  },
  {
    title: 'Introduction to GraphQL',
    content: 'GraphQL is a query language for APIs and a runtime for executing those queries. Explore the benefits and how to get started...',
    user_id: 6
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
  },
  {
    content: 'CSS Flexbox is really powerful once you understand the basics.',
    user_id: 5,
    post_id: 4
  },
  {
    content: 'Async/Await has simplified my code a lot!',
    user_id: 4,
    post_id: 5
  },
  {
    content: 'GraphQL looks interesting, I will give it a try.',
    user_id: 3,
    post_id: 6
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

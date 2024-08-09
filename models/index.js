// Sequelize initialization and associations
const Sequelize = require('sequelize');
const sequelize = require('../config/connection');

const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

// user has many posts
User.hasMany(Post, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

// post belongs to one user
Post.belongsTo(User, {
    foreignKey: 'user_id',
});

// post has many comment
Post.hasMany(Comment, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

// comment belongs to one user
Comment.belongsTo(User, {
    foreignKey: 'user_id',
});

// user has many comments
User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});

module.exports = { User, Post, Comment };
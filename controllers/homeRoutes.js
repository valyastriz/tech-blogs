// Routes related to the homepage and general navigation
const router = require('express').Router();
const { Post, Comment, User } = require('../models');

// Route to render the homepage
router.get('/', async (req, res) => {
    try {
        // Fetch all posts from the database
        const postData = await Post.findAll({
            include: [{ model: User, attributes: ['name'] }] // Include author details in posts
        });

        // Serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // Pass posts and jumbotron flag to the homepage template
        res.render('home', {
            posts,
            showJumbotron: true, // Flag to show the jumbotron on this page
            logged_in: req.session.logged_in,
            user: req.session.user // pass user info to the template
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to get a single post page to display once a blog post is clicked
router.get('/post/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User, // Include author details in the post
                    attributes: ['name']
                },
                {
                    model: Comment,
                    include: [{ model: User, attributes: ['name'] }] // Include author details in comments
                }
            ]
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id' });
            return;
        }

        const post = postData.get({ plain: true });

        res.render('post', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('login');
});

// route to render signup page
router.get('/signup', (req, res) => {
    // check if user is already logged in, if so, just redirect them to the home page
    if (req.session.logged_in) {
        res.redirect('/');
        return;
    }

    res.render('signup');
});

router.get('/new-post', (req, res) => {
    console.log('New Post route hit');
    if(!req.session.logged_in) {
        res.redirect('/login');
        return;
    } 

    res.render('new-post', {
        loggin_in: req.session.logged_in
    });
});

// Post model
Post.hasMany(Comment, { foreignKey: 'post_id' });
Post.belongsTo(User, { foreignKey: 'user_id' });

// Comment model
Comment.belongsTo(Post, { foreignKey: 'post_id' });
Comment.belongsTo(User, { foreignKey: 'user_id' });

// User model
User.hasMany(Post, { foreignKey: 'user_id' });
User.hasMany(Comment, { foreignKey: 'user_id' });



module.exports = router;

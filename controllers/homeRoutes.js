// Routes related to the homepage and general navigation
const router = require('express').Router();
const { Post } = require('../models');

// Route to render the homepage
router.get('/', async (req, res) => {
    try {
        // fetch all posts from the database
        const postData = await Post.findAll();

        // serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        console.log({ posts, showJumbotron: true });

        // pass posts and jumbotron flag to the homepage template
        res.render('home', {
            posts,
            showJumbotron: true, // Flag to show the jumbotron on this page
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;

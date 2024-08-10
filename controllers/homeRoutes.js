// Routes related to the homepage and general navigation
const router = require('express').Router();

// Route to render the homepage
router.get('/', async (req, res) => {
    try {
        // fetch all posts from the database
        const postData = await Post.findAll();

        // serialize data so the template can read it
        const posts = postData.map((post) => post.get({ plain: true }));

        // pass posts to the homepage template
        res.render('home', { posts });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
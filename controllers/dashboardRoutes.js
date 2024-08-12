const router = require('express').Router();
const { Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
        const postData = await Post.findAll({
            where: { user_id: req.session.user_id },
            attributes: ['id', 'title', 'content'],
            order: [['created_at', 'DESC']],
        });

        const posts = postData.map(post => post.get({ plain: true }));
        console.log(posts); 
        
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        console.error(err); 
        res.status(500).json(err);
    }
});

module.exports = router;

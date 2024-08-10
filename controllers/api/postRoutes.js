// Routes related to blog posts 
const express = require('express');
const router = require('express').Router();
const { Post } = require('../../models');

// get all posts
router.get('/', async (req, res) => {
    try {
        const posts = await Post.findAll();
        res.json(posts);

    } catch (err) {
        res.status(500).json(err);
    }
});

// get a comment by id
router.get('/:id', async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);

        if (!post) {
            return res.status(404).json({ message: 'No post found with this id' });
        }

        res.json(post);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new comment
router.post('/', async (req, res) => {
    try {
        const postData = await Post.create(req.body);

        req.session.save(() => {
            // req.session.user_id = userData.id;
            // req.session.logged_in = true;

            res.status(200).json(postData);
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

// update a comment by id
router.put('/:id', async (req, res) => {
    try {
        const updatedPost = await Post.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (!updatedPost[0]) { //checking if any rows were affected
            res.status(404).json({ message: 'No post found with this id '});
            return;
        }

        res.status(200).json(updatedPost);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete comment by id
router.delete('/:id', async (req, res) => {
    try {

        const deletedPost = await Post.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deletedPost) {
            res.status(404).json({ message: 'No post found with this id '});
            return;
        }

        res.status(200).json({ message: 'Post deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;

//Routes related to comments on posts

const express = require('express');
const router = require('express').Router();
const { Comment } = require('../../models');

// get all comments
router.get('/', async (req, res) => {
    try {
        const comments = await Comment.findAll();
        res.json(comments);

    } catch (err) {
        res.status(500).json(err);
    }
});

// get a comment by id
router.get('/:id', async (req, res) => {
    try {
        const comment = await Comment.findByPk(req.params.id);

        if (!comment) {
            return res.status(404).json({ message: 'No comment found with this id' });
        }

        res.json(comment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new comment
router.post('/', async (req, res) => {
    try {
        const commentData = await Comment.create({
            content: req.body.content,
            post_id: req.body.post_id,
            user_id: req.session.user_id,
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// update a comment by id
router.put('/:id', async (req, res) => {
    try {
        const updatedComment = await Comment.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (!updatedComment[0]) { //checking if any rows were affected
            res.status(404).json({ message: 'No comment found with this id '});
            return;
        }

        res.status(200).json(updatedComment);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete comment by id
router.delete('/:id', async (req, res) => {
    try {

        const deletedComment = await Comment.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deletedComment) {
            res.status(404).json({ message: 'No comment found with this id '});
            return;
        }

        res.status(200).json({ message: 'Comment deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});


module.exports = router;

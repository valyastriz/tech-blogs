// Routes related to user management (signup, login, etc.)
const express = require('express');
const router = require('express').Router();
const { User, Comment, Post } = require('../../models');

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);

    } catch (err) {
        res.status(500).json(err);
    }
});

// get a user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await User.findByPk(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'No user found with this id' });
        }

        res.json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

// create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        });

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

// update a user by id
router.put('/:id', async (req, res) => {
    try {
        const updatedUser = await User.update(req.body, {
            where: {
                id: req.params.id
            }
        });

        if (!updatedUser[0]) { //checking if any rows were affected
            res.status(404).json({ message: 'No user found with this id '});
            return;
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json(err);
    }
});

// delete user by id
router.delete('/:id', async (req, res) => {
    try {
        // find unk user to replace the username iwth on existing comments and blogs
        const unknownUser = await User.findOne({ where: { name: 'Unknown' }});

        if (!unknownUser) {
            return res.status(500).json({ message: 'Unknown user not found. Please create it first.' });
        }

        // reassign comments to "unknown" user
        await Comment.update(
            { user_id: unknownUser.id },
            { where: { user_id: req.params.id }}
        );

        // reassign posts to "unknown" user
        await Post.update(
            { user_id: unknownUser.id },
            { where: { user_id: req.params.id }}
        );

        const deletedUser = await User.destroy({
            where: {
                id: req.params.id
            }
        });

        if (!deletedUser) {
            res.status(404).json({ message: 'No user found with this id '});
            return;
        }

        res.status(200).json({ message: 'User deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// Login route
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { name: req.body.name } });

        if (!userData) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.json({ user: userData, message: 'You are now logged in!' });
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;

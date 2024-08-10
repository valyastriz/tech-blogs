// Routes related to user management (signup, login, etc.)
const express = require('express');
const router = require('express').Router();
const { User } = require('../../models');

// get all users
router.get('/', async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);

    } catch (error) {
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
        const userData = await User.create(req.body);

        req.session.save(() => {
            // req.session.user_id = userData.id;
            // req.session.logged_in = true;

            res.status(200).json(userData);
        });
    } catch (err) {
        res.status(400).json(err);
    }
});




module.exports = router;

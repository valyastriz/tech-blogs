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
        res.status(500).json(err);
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


module.exports = router;

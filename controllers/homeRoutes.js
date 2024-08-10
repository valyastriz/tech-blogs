// Routes related to the homepage and general navigation
const router = require('express').Router();

// Route to render the homepage
router.get('/', (req, res) => {
    res.render('home'); // 'home' corresponds to 'home.handlebars' in your views folder
});

module.exports = router;
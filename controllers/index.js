const router = require('express').Router();
const homeRoutes = require('./homeRoutes');
const dashboardRoutes = require('./dashboardRoutes');
const apiRoutes = require('./api');

console.log(typeof homeRoutes);  // Should output 'function'
console.log(typeof dashboardRoutes);  // Should output 'function'
console.log(typeof apiRoutes);  // Should output 'function'
router.use('/', homeRoutes);
router.use('/dashboard', dashboardRoutes);
router.use('/api', apiRoutes);

module.exports = router;
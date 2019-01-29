const router = require('express').Router();
const { postNewRecord, getScoreboard, deleteScoreboard } = require('./controller');

// Create
// console.log(' -------------------------- ', typeof controller.postNewRecord);
router.post('/scoreboard', postNewRecord);

// Read
router.get('/scoreboard', getScoreboard);

// Update

// Delete
router.delete('/scoreboard', deleteScoreboard);

module.exports = router;
var express = require('express');
var router = express.Router();

var studentsRouter = require('./students');

router.use('/students', studentsRouter);

module.exports = router;
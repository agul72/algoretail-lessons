const {Router} = require('express');
const {check, validationResult} = require('express-validator');

const router = Router();

const db = require('../services/db.service');

router.get('/all', [],
    async (req, res) => {
        console.log('router /api/class/all');
        const classes = await db.getAllClasses();
        res.send(classes);
    }
);

router.get('/issue', [],
    async (req, res) => {
        console.log('router /api/class/issue');
        const classes = await db.get2TeachersIssue();
        res.send(classes);
    }
);

router.post('/add', [],
    async (req, res) => {
        const newClass = req.body;
        // console.log(newClass)
        await db.addClass(newClass);
        res.end();
    }
);

router.delete('/:id', [],
    async (req, res) => {
        const id = req.params.id;
        await db.removeClass(id);
        res.end();
    }
);

module.exports = router;
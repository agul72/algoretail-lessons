const {Router} = require('express');
const {check, validationResult} = require('express-validator');

const router = Router();

const db = require('../services/db.service');

router.get('/all', [],
    async (req, res) => {
        console.log('router /api/subject/all');
        const subjects = await db.getAllSubjects();
        res.send(subjects);
    }
);

router.post('/add', [],
    async (req, res) => {
        const {subject} = req.body;
        await db.addSubject(subject);
        res.end();
    }
);

router.delete('/:id', [],
    async (req, res) => {
        const id = req.params.id;
        await db.removeSubject(id);
        res.end();
    }
);

module.exports = router;
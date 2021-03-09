const {Router} = require('express');
const {check, validationResult} = require('express-validator');

const router = Router();

const db = require('../services/db.service');

router.get('/all', [],
    async (req, res) => {
        // console.log('router /api/teacher/all');
        const teachers = await db.getAllTeachers();
        // console.log('router /api/teacher/all result:', teachers);
        res.send(teachers);
    }
);

router.post('/add', [],
    async (req, res) => {
        const {name} = req.body;
        console.log(name);
        await db.addTeacher(name);
        res.end();
    }
);

router.delete('/:id', [],
    async (req, res) => {
        const id = req.params.id;
        await db.removeTeacher(id);
        res.end();
    }
);

module.exports = router;
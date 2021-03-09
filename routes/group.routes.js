const {Router} = require('express');
const {check, validationResult} = require('express-validator');

const router = Router();

const db = require('../services/db.service');

router.get('/all', [],
    async (req, res) => {
        console.log('router /api/group/all');
        const groups = await db.getAllGroups();
        res.send(groups);
    }
);

router.post('/add', [],
    async (req, res) => {
        const {name} = req.body;
        await db.addGroup(name);
        res.end();
    }
);

router.delete('/:id', [],
    async (req, res) => {
        const id = req.params.id;
        await db.removeGroup(id);
        res.end();
    }
);

module.exports = router;
const express = require('express');
const dbService = require('./services/db.service')


const app = express();
const PORT = 3000;

app.use(express.json());
app.use('/api/teacher', require('./routes/teacher.routes'));
app.use('/api/class', require('./routes/class.routes'));
app.use('/api/subject', require('./routes/subject.routes'));
app.use('/api/group', require('./routes/group.routes'));

app.listen(3000, () => console.log('Server has been started on port: ', PORT));







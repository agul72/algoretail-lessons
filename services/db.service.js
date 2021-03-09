const db = require('mysql');

const connection = db.createConnection({
    host: "localhost",
    user: "root",
    database: "lessons",
    password: "a50e101"
});

/*function startConnection() {
    connection.connect((err) => {
        if (err) {
            return console.error("Connection Error: " + err.message);
        } else {
            console.log("MySQL server connected");
        }
    });
};

function endConnection() {
    connection.end((err) => {
        if (err) {
            return console.log("Close connection Error: " + err.message);
        }
        console.log("Connection closed");
    });
};*/

async function fetchQuery(sql) {
    try {
        // startConnection();
        return new Promise((resolve, reject) => connection.query(sql, (err, res) => {
            if (err) reject (err);
            console.log('fetchQuery:', res);
            resolve (res);
        }));
    } catch (e) {
        console.log(e.message);
        return null;
    } finally {
        // endConnection();
    }
}

DBService = {

    getAllTeachers: async () => {
        const sql = 'SELECT * FROM teachers';
        const result = await fetchQuery(sql);
        // console.log('getAllTeachers result:', result);
        return result;
    },

    getAllGroups: async () => {
        const sql = 'SELECT * FROM st_groups';
        return await fetchQuery(sql);
    },

    getAllSubjects: async () => {
        const sql = 'SELECT * FROM subjects';
        return await fetchQuery(sql);
    },

    getAllClasses: async () => {
        const sql = `SELECT g.name_group, s.name_subject, t.name_teacher
FROM classes cl
 JOIN st_groups g ON cl.group_id = g.id_group
  JOIN subjects s ON cl.subject_id = s.id_subject
   JOIN teachers t ON cl.teacher_id = t.id_teacher`
         ;
        return await fetchQuery(sql);
    },

    addTeacher: async (name) => {
        const sql = `INSERT INTO teachers (name_teacher) VALUES ("${name}")`;
        return await fetchQuery(sql);
    },

    addGroup: async (name) => {
        const sql = `INSERT INTO st_groups (name_group) VALUES ("${name}")`;
        return await fetchQuery(sql);
    },

    addSubject: async (name) => {
        const sql = `INSERT INTO subjects (name_subject) VALUES ("${name}")`;
        return await fetchQuery(sql);
    },

    addClass: async (newClass) => {
        console.log(newClass);
        const {teacher_id, group_id, subject_id} = newClass;
        const sql = `INSERT INTO classes (teacher_id, group_id, subject_id) 
        VALUES ("${teacher_id}", "${group_id}", "${subject_id}")`;
        return await fetchQuery(sql);
    },

    removeTeacher: async (id) => {
        const sql = `DELETE FROM teachers WHERE id_teacher = ${id}`;
        return await fetchQuery(sql);
    },

    removeSubject: async (id) => {
        const sql = `DELETE FROM subjects WHERE id_subject = ${id}`;
        return await fetchQuery(sql);
    },

    removeGroup: async (id) => {
        const sql = `DELETE FROM groups WHERE id_group = ${id}`;
        return await fetchQuery(sql);
    },

    removeClass: (id) => {
        const sql = `DELETE FROM classes WHERE id_class = ${id}`;
        return fetchQuery(sql);
    },

    get2TeachersIssue: async () => {
        const sql = `SELECT
 g.name_group,
 s.name_subject,
 COUNT(cl.teacher_id) count_teachers
FROM classes cl
 JOIN st_groups g ON cl.group_id = g.id_group
  JOIN subjects s ON cl.subject_id = s.id_subject
   JOIN teachers t ON cl.teacher_id = t.id_teacher
GROUP BY cl.group_id, cl.subject_id
HAVING count_teachers > 1`;
        return await fetchQuery(sql);

    }
}

module.exports = DBService;

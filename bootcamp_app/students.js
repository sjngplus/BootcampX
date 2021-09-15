const { Pool } = require('pg');

const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'bootcampx'
});

const userInput = process.argv.splice(2);

pool.query(`
SELECT students.id, students.name, cohorts.name
FROM students
JOIN cohorts ON students.cohort_id = cohorts.id
WHERE cohorts.name LIKE $1
LIMIT $2;
`, [`%${userInput[0]}%`, userInput[1]])
.then(res => {
  console.log(res.rows);
})
.catch(err => console.error('##-->Query Error', err.stack));

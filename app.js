const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const { Pool } = require('pg'); 
const router = require('./routes');

const app = new Koa();
const PORT = 4000;

app.pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'recruiting',
    password: 'your_password',
    port: 5432,
});

app
    .use(bodyParser())
    .use(router());

app.listen(PORT, () => {
    console.log(`Server running on: http://localhost:${PORT}`);
});
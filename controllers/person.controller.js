const { JwtService, EncryptionService } = require('../services');

module.exports = {
    async getAllPersons(ctx) {
        try {
            const { rows } = await ctx.app.pool.query(`SELECT * FROM person`);
            ctx.body = rows;
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async getPersonById(ctx) {
        try {
            const { rows } = await ctx.app.pool.query(`SELECT * FROM person WHERE id = ${ctx.params.id}`);
            ctx.body = rows;   
        } catch (err) {
            ctx.throw(500, err);
        } 
    },
    
    async createPerson(ctx) {
        try {
            if (!ctx.request.body.first_name) {
                ctx.throw(400, 'First name is required.');
            }
            if (!ctx.request.body.last_name) {
                ctx.throw(400, 'Last name is required.');
            }
            if (!ctx.request.body.email) {
                ctx.throw(400, 'Email id is required.');
            }
            if (!ctx.request.body.birth_date) {
                ctx.throw(400, 'Birth date is required.');
            }
            const {rows } = await ctx.app.pool.query(
                `INSERT INTO person (id, first_name, last_name, email, birth_date) 
                VALUES (default, '${ctx.request.body.first_name}', '${ctx.request.body.last_name}', '${ctx.request.body.email}', '${ctx.request.body.birth_date}') 
                RETURNING *`);
            ctx.response.status = 201;
            ctx.body = rows;
        } catch (err) {
            ctx.throw(500, err);
        }
    },
    
    async updatePerson(ctx) {
        try {
            if (!ctx.request.body.first_name) {
                ctx.throw(400, 'First name is required.');
            }
            if (!ctx.request.body.last_name) {
                ctx.throw(400, 'Last name is required.');
            }
            if (!ctx.request.body.email) {
                ctx.throw(400, 'Email id is required.');
            }
            if (!ctx.request.body.birth_date) {
                ctx.throw(400, 'Birth date is required.');
            }
            await ctx.app.pool.query(
                `UPDATE person 
                SET 
                    first_name = '${ctx.request.body.first_name}', 
                    last_name = '${ctx.request.body.last_name}', 
                    email = '${ctx.request.body.email}',
                    birth_date = '${ctx.request.body.birth_date}'
                WHERE id = ${ctx.params.id}`);
            ctx.status = 204;
        }  catch (err) {
            ctx.throw(500, err);
        }
    },
    
    async deletePerson(ctx) {
        try {
            await ctx.app.pool.query(`DELETE FROM person WHERE id = ${ctx.params.id}`);
            ctx.status = 204;
        } catch (err) {
            ctx.throw(500, err);
        } 
    }
};
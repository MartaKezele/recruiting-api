module.exports = {
    async getAllApplicationsForJob(ctx) {
        try {
            const { rows } = await ctx.app.pool.query(`SELECT * FROM application WHERE job_id = ${ctx.params.job_id}`);
            ctx.body = rows;
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async getAllApplicationsForPerson(ctx) {
        try {
            const { rows } = await ctx.app.pool.query(`SELECT * FROM application WHERE person_id = ${ctx.params.person_id}`);
            ctx.body = rows;   
        } catch (err) {
            ctx.throw(500, err);
        } 
    },
    
    async createApplication(ctx) {
        try {
            if (!ctx.request.body.job_id) {
                ctx.throw(400, 'Job id is required.');
            }
            if (!ctx.request.body.person_id) {
                ctx.throw(400, 'Person id is required.');
            }
            const {rows } = await ctx.app.pool.query(`
                INSERT INTO application (id, job_id, person_id) 
                VALUES (default, ${ctx.request.body.job_id}, ${ctx.request.body.person_id}) 
                RETURNING *
            `);
            ctx.response.status = 201;
            ctx.body = rows;
        } catch (err) {
            ctx.throw(500, err);
        }
    },
    
    async updateApplication(ctx) {
        try {
            if (!ctx.request.body.job_id) {
                ctx.throw(400, 'Job id is required.');
            }
            if (!ctx.request.body.person_id) {
                ctx.throw(400, 'Person id is required.');
            }
            await ctx.app.pool.query(`
                UPDATE application 
                SET 
                    job_id = '${ctx.request.body.job_id}', 
                    person_id = '${ctx.request.body.person_id}'
                WHERE id = ${ctx.params.id}
            `);
            ctx.status = 204;
        }  catch (err) {
            ctx.throw(500, err);
        }
    },
    
    async deleteApplication(ctx) {
        try {
            await ctx.app.pool.query(`DELETE FROM application WHERE id = ${ctx.params.id}`);
            ctx.status = 204;
        } catch (err) {
            ctx.throw(500, err);
        } 
    }
};
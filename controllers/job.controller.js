module.exports = {
    async getAllJobs(ctx) {
        try {
            const { rows } = await ctx.app.pool.query(`SELECT * FROM job`);
            ctx.body = rows;
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async getJobById(ctx) {
        try {
            const { rows } = await ctx.app.pool.query(`SELECT * FROM job WHERE id = ${ctx.params.id}`);
            ctx.body = rows;   
        } catch (err) {
            ctx.throw(500, err);
        } 
    },

    async getAllJobsForCompany (ctx) {
        try {
            const { rows } = await ctx.app.pool.query(`SELECT * FROM job WHERE company_id = ${ctx.params.company_id}`);
            ctx.body = rows; 
        } catch (err) {
            ctx.throw(500, err);
        }
    },
    
    async createJob(ctx) {
        try {
            if (!ctx.request.body.title) {
                ctx.throw(400, 'Title is required.');
            }
            if (!ctx.request.body.description) {
                ctx.throw(400, 'Description is required.');
            }
            if (!ctx.request.body.company_id) {
                ctx.throw(400, 'Company id is required.');
            }
            const {rows } = await ctx.app.pool.query(`
                INSERT INTO job (id, title, description, company_id) 
                VALUES (default, '${ctx.request.body.title}', '${ctx.request.body.description}', ${ctx.request.body.company_id}) 
                RETURNING *
            `);
            ctx.response.status = 201;
            ctx.body = rows;
        } catch (err) {
            ctx.throw(500, err);
        }
    },
    
    async updateJob(ctx) {
        try {
            if (!ctx.request.body.title) {
                ctx.throw(400, 'Title is required.');
            }
            if (!ctx.request.body.description) {
                ctx.throw(400, 'Description is required.');
            }
            await ctx.app.pool.query(`
                UPDATE job 
                SET 
                    title = '${ctx.request.body.title}', 
                    description = '${ctx.request.body.description}', 
                    company_id = ${ctx.request.body.company_id}
                WHERE id = ${ctx.params.id}
            `);
            ctx.status = 204;
        }  catch (err) {
            ctx.throw(500, err);
        }
    },
    
    async deleteJob(ctx) {
        try {
            await ctx.app.pool.query(`DELETE FROM job WHERE id = ${ctx.params.id}`);
            ctx.status = 204;
        } catch (err) {
            ctx.throw(500, err);
        } 
    }
};
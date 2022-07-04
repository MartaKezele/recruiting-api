module.exports = {
    async getAllCompanies(ctx) {
        try {
            const { rows } = await ctx.app.pool.query(`SELECT * FROM company`);
            ctx.body = rows;
        } catch (err) {
            ctx.throw(500, err);
        }
    },

    async getCompanyById(ctx) {
        try {
            const { rows } = await ctx.app.pool.query(`SELECT * FROM company WHERE id = ${ctx.params.id}`);
            ctx.body = rows; 
        } catch (err) {
            ctx.throw(500, err);
        }   
    },
    
    async createCompany(ctx) {
        try {
            if (!ctx.request.body.title) {
                ctx.throw(400, 'Title is required.');
            }
            if (!ctx.request.body.description) {
                ctx.throw(400, 'Description is required.');
            }
            const {rows } = await ctx.app.pool.query(`
                INSERT INTO company (id, title, description) 
                VALUES (default, '${ctx.request.body.title}', '${ctx.request.body.description}') 
                RETURNING *
            `);
            ctx.response.status = 201;
            ctx.body = rows;
        } catch (err) {
            ctx.throw(500, err);
        }
    },
    
    async updateCompany(ctx) {
        try {
            if (!ctx.request.body.title) {
                ctx.throw(400, 'Title is required.');
            }
            if (!ctx.request.body.description) {
                ctx.throw(400, 'Description is required.');
            }
            await ctx.app.pool.query(`
                UPDATE company 
                SET 
                    title = '${ctx.request.body.title}', 
                    description = '${ctx.request.body.description}'
                WHERE id = ${ctx.params.id}
            `);
            ctx.status = 204;
        } catch (err) {
            ctx.throw(500, err);
        }
    },
    
    async deleteCompany(ctx) {
        try {
            await ctx.app.pool.query(`DELETE FROM company WHERE id = ${ctx.params.id}`);
            ctx.status = 204;
        } catch (err) {
            ctx.throw(500, err);
        } 
    }
};
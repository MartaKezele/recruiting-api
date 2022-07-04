const CombineRouter = require('koa-combine-routers');
const companyRouter = require('./company');
const jobRouter = require('./job');
const personRouter = require('./person');
const applicationRouter = require('./application');

const router = CombineRouter(
    companyRouter,
    jobRouter,
    personRouter,
    applicationRouter
);

module.exports = router;
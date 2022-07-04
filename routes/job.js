const Router = require('koa-router');
const { JobController } = require('../controllers');

const router = new Router({ prefix: '/api/job' });

router.get('/', JobController.getAllJobs);
router.get('/:id', JobController.getJobById);
router.get('/company/:company_id', JobController.getAllJobsForCompany);
router.post('/', JobController.createJob);
router.put('/:id', JobController.updateJob);
router.delete('/:id', JobController.deleteJob);

module.exports = router;
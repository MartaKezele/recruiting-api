const Router = require('koa-router');
const { ApplicationController } = require('../controllers');

const router = new Router({ prefix: '/api/application' });

router.get('/job/:job_id', ApplicationController.getAllApplicationsForJob);
router.get('/person/:person_id', ApplicationController.getAllApplicationsForPerson);
router.post('/', ApplicationController.createApplication);
router.put('/:id', ApplicationController.updateApplication);
router.delete('/:id', ApplicationController.deleteApplication);

module.exports = router;
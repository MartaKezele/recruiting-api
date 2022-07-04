const Router = require('koa-router');
const { PersonController } = require('../controllers');

const router = new Router({ prefix: '/api/person' });

router.get('/', PersonController.getAllPersons);
router.get('/:id', PersonController.getPersonById);
router.post('/', PersonController.createPerson);
router.put('/:id', PersonController.updatePerson);
router.delete('/:id', PersonController.deletePerson);

module.exports = router;
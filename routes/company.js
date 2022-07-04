const Router = require('koa-router');
const { CompanyController } = require('../controllers');

const router = new Router({ prefix: '/api/company' });

router.get('/', CompanyController.getAllCompanies);
router.get('/:id', CompanyController.getCompanyById);
router.post('/', CompanyController.createCompany);
router.put('/:id', CompanyController.updateCompany);
router.delete('/:id', CompanyController.deleteCompany);

module.exports = router;
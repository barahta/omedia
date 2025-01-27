const {Router} = require('express')
const router = Router()
const CompanyController = require('../controllers/company.controller')
const authMiddlewere = require('../middlewere/auth.middlewere')

router.post('/create',authMiddlewere,CompanyController.createCompany)



module.exports = router
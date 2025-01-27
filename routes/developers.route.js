const {Router} = require('express')
const router = Router()
const DevelopersController = require('../controllers/developers.controller')
const authMiddlewere = require('../middlewere/auth.middlewere')

router.post('/get',authMiddlewere,DevelopersController.getDevelopers)
router.post('/remove',authMiddlewere,DevelopersController.removeDevelopers)
router.post('/change',authMiddlewere,DevelopersController.changeDevelopers)
router.post('/create',authMiddlewere,DevelopersController.createDevelopers)
router.post('/getskills',authMiddlewere,DevelopersController.getConnections)



module.exports = router
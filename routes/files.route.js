const {Router} = require('express')
const router = Router()
const FilesController = require('../controllers/files.controller')
const authMiddlewere = require('../middlewere/auth.middlewere')

router.get('/getstatements',authMiddlewere,FilesController.getStatements)

router.post('/downloadstatement',authMiddlewere,FilesController.downloadStatement)
router.post('/get',authMiddlewere,FilesController.getFiles)
router.post('/getall',authMiddlewere,FilesController.getAllFiles)
router.post('/upload',authMiddlewere,FilesController.uploadFile)
router.post('/dir',authMiddlewere,FilesController.createDir)
router.post('/getpath',authMiddlewere,FilesController.getPath)
router.post('/loadimg',authMiddlewere,FilesController.loadImg)
router.post('/loadpollsimg',authMiddlewere,FilesController.loadPollsImg)
router.post('/uploadfile',authMiddlewere,FilesController.uploadFileDefault)
router.post('/deletefile',authMiddlewere,FilesController.deleteFileDefault)

module.exports = router
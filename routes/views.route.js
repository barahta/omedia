const {Router} = require('express')
const router = Router()
const NewsController = require('../controllers/views.controller')
const authMiddlewere = require("../middlewere/auth.middlewere");
const SkillController = require("../controllers/skill.controller");

router.get('/news',NewsController.getNews)
router.post('/createpost',NewsController.createPost)
router.post('/plusaup',NewsController.plusAUP)
router.post('/updatemanaup',NewsController.updateManAUP)
router.get('/getaup',NewsController.getAUP)
router.post('/delman',NewsController.delMan)
router.post('/plusvideo',NewsController.plusVideo)
router.post('/pluscomvak',NewsController.plusComVak)
router.get('/getcomvak',NewsController.getComVak)
router.post('/delcomvak',NewsController.delComVak)
router.post('/createvak',NewsController.createVak)
router.get('/getvakansii',NewsController.getVakansii)
router.post('/editvak',NewsController.editVak)
router.post('/deltisvak',NewsController.delTisVak)
router.post('/getabout',NewsController.getAbout)
router.post('/saveabout',NewsController.saveAbout)
router.post('/pluscompany',NewsController.plusCompany)
router.get('/getgroupcompanyes',NewsController.getGroupCompanyes)
router.post('/delcomgroup',NewsController.delComGroup)
router.post('/editcomgroup',NewsController.editСomGroup)
router.post('/updateposcomgroup',NewsController.updatePosComGroup)
router.post('/getplaces',NewsController.getPlaces)
router.post('/plusplaces',NewsController.plusPlaces)
router.post('/delplace',NewsController.delPlace)
router.post('/createPack',NewsController.createpack)
router.post('/getallpacks',NewsController.getAllPacks)
router.post('/editpriorypack',NewsController.editPrioryPack)
router.post('/updatepack',NewsController.updatePack)
router.post('/createimggallery',NewsController.createImgGallery)
router.post('/getgalleryimgs',NewsController.getGalleryImgs)
router.post('/getcities',NewsController.getCities)
router.post('/createcity',NewsController.createCity)
router.post('/uploadstaticcontact',NewsController.uploadStaticContact)
router.post('/pluscontactparam',NewsController.plusContactParam)
router.post('/sendmail',NewsController.sendMail)
router.post('/emailmess', NewsController.sendContactMessage)
router.post('/emailresume', NewsController.sendResumeMessage);




module.exports = router
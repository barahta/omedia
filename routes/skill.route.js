const {Router} = require('express')
const router = Router()
const SkillController = require('../controllers/skill.controller')
const authMiddlewere = require('../middlewere/auth.middlewere')

router.get('/getdev',authMiddlewere,SkillController.getDevelopers)
router.get('/fetchskils',authMiddlewere,SkillController.getSkills)
router.post('/create',authMiddlewere,SkillController.createSkill)
router.post('/loadskill',authMiddlewere,SkillController.loadSkill)
router.post('/fetchskilscms',authMiddlewere,SkillController.getSkillsCms)
router.post('/removeskill',authMiddlewere,SkillController.removeSkill)

module.exports = router
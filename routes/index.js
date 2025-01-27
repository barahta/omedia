const Router = require('express')
const router = new Router()

const viewsRouter = require('./views.route')
const authRouter = require('./users.route')
const filesRouter = require('./files.route')
const skillRouter = require('./skill.route')
const developersRouter = require('./developers.route')
const companyRouter = require('./company.route')
router.use('/auth',authRouter)
router.use('/files',filesRouter)
router.use('/skill',skillRouter)
router.use('/developers',developersRouter)
router.use('/views',viewsRouter)
router.use('/company',companyRouter)

module.exports = router
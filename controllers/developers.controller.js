const DevelopersService = require('../services/developers.service')

class DevelopersController {
    async getDevelopers(req, res, next) {
        try {
            const {sort,direct} = req.body
            const developers = await DevelopersService.getDevelopers(sort,direct)
            return res.status(200).json(developers)
        } catch (e) {
            next(e)
        }
    }
    async removeDevelopers(req, res, next) {
        try {
            const {id} = req.body
            const isSet = await DevelopersService.isSetOnUser(id)
            if(isSet.length) return res.status(200).json({err:true,isSet})
            else{
                const deleted = await DevelopersService.removeDev(id)
                return res.status(200).json({err:false,deleted})
            }
        } catch (e) {
            next(e)
        }
    }
    async changeDevelopers(req, res, next) {
        try {
            const {id,name,skills} = req.body
            const developers = await DevelopersService.changeDevelopers(id,name,skills)
            return res.status(200).json(developers)
        } catch (e) {
            next(e)
        }
    }
    async createDevelopers(req, res, next) {
        try {
            const {name,skills} = req.body
            const developer = await DevelopersService.createDevelopers(name,skills)
            return res.status(200).json(developer)
        } catch (e) {
            next(e)
        }
    }

    async getConnections(req, res, next) {
        const connections = await DevelopersService.getConnections(req.body.id)
        return res.status(200).json(connections)
    }

}
module.exports = new DevelopersController()
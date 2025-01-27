const CompanyService = require('../services/company.service')

class CompanyController {
    async createCompany(req, res, next) {
        try {
            const com = req.body
            const developers = await CompanyService.createCompany(com)
            return res.status(200).json(developers)
        } catch (e) {
            next(e)
        }
    }

}
module.exports = new CompanyController()
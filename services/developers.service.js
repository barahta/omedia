const {Developers, User, Skills} = require('../models/models')
const {Sequelize} = require('sequelize')
const ApiError = require("../exceptions/api.error");
class DevelopersService {
    async getDevelopers(sort = 'abc',direct = true){
        const sortingOptions = {
            'abc': [['name', direct ? 'ASC' : 'DESC']],
            'num': [['id', direct ? 'ASC' : 'DESC']],
            'date': [['createdAt', direct ? 'ASC' : 'DESC']]
        }
        const order = sortingOptions[sort] || [['name', direct ? 'ASC' : 'DESC']]

        return await Developers.findAll({order})
    }

    async isSetOnUser(id){
        return await User.findAll({where:{developer_id:id}})
    }
    async removeDev(id){
        const deleted = await Developers.findByPk(id)
        return await deleted.destroy()
    }
    async getConnections(id){
        const developer = await Developers.findByPk(id, { include: 'skills' })
        return await developer.getSkills()
    }
    async changeDevelopers(id,name,skills){
        const developer = await Developers.findByPk(id)
        developer.name = name
        const ids = skills.map(item => (item.id))
        await developer.setSkills(ids)
        await developer.save()
        return developer
    }
    async createDevelopers(name,skills){
        const ifExist = await Developers.findOne({where:{name: name }})
        if(ifExist) return {err:true}
        const developer = await Developers.create({name: name })
        const ids = skills.map(item => (item.id))
        developer.setSkills(ids)
        await developer.save()
        return developer
    }

}

//     const skill = await Skills.create({ name: 'JavaScript', days: '7', info: 'Frontend development' });
//     const developer = await Developers.create({ name: 'John Doe' });
//
// // Добавление связи между навыком и разработчиком
//     await skill.addDevelopers(developer);

//     // Получение всех разработчиков, связанных с определенным навыком
//     const developers = await skill.getDevelopers();
//
// // Получение всех навыков, связанных с определенным разработчиком
//     const skills = await developer.getSkills();

module.exports = new DevelopersService()

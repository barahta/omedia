const {Developers, User, Skills, Sites} = require('../models/models')
const {Sequelize} = require('sequelize')
const ApiError = require("../exceptions/api.error");
class CompanyService {

    async createCompany(com){
        console.log(com)
        const img = com.com.imgpage
        const name = com.com.name
        const site = await Sites.create({name: name, desc: '', image: img })
        // const ifExist = await Developers.findOne({where:{name: name }})
        // if(ifExist) return {err:true}
        // const developer = await Developers.create({name: name })
        // const ids = skills.map(item => (item.id))
        // developer.setSkills(ids)
        // await developer.save()
        // return developer
        return site
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

module.exports = new CompanyService()
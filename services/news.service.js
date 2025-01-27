
const config = require('config')
const {News, Developers, AUPs, VakCompanies, Vakansii, About, GroupsComs, Activities, PacksKids, GalleryImages,
    ContactsPage
} = require('../models/models')
const ApiError = require("../exceptions/api.error");
const {Sequelize} = require('sequelize')
class NewsService {
    async getNews() {
        try {
            const news = await News.findAll({
                order: [['createdAt', 'DESC']]
            });
            return news;
        } catch (e) {
            console.log(e);
        }
    }

    async createPost(post){
        const name = post.post.name
        const desc = post.post.desc
        const text = post.post.text
        const image = post.post.image
        const publ = post.post.public
        try{
            const post = await News.create({title: name, desc: desc, image: image, public: publ, text: text })
            return post
        }catch(e){
            console.log(e)
        }


    }

    async getAUP(){
        try{
            const mans = await AUPs.findAll({
                order: [['id', 'ASC']] // сортировка по возрастанию id
            })
            return mans
        }catch(e){
            console.log(e)
        }

    }
    async plusAUP(plus){
        const firstname = plus.post.firstname
        const secondname = plus.post.secondname
        const lastname = plus.post.lastname
        const developer = plus.post.developer
        const email = plus.post.email
        const image = plus.post.image
        try{
            const man = await AUPs.create({firstname: firstname, secondname: secondname, lastname: lastname, developers: developer, email: email, image: image })
            return man
        }catch(e){
            console.log(e)
        }
        return ''

    }
    async updateManAUP(man){
        const id = man.man.id
        try{
            const thisman = await AUPs.findByPk(id)
            thisman.image = man.man.image
            thisman.firstname = man.man.firstname
            thisman.secondname = man.man.secondname
            thisman.lastname = man.man.lastname
            thisman.developers = man.man.developers
            thisman.email = man.man.email
            await thisman.save()
            return thisman
        }catch(e){
            console.log(e)
        }

        return ''

    }
    async delMan(man){
        const idman = +man.man.id
        const deleted = await AUPs.findByPk(idman)
        return await deleted.destroy()
    }
    async plusVideo(video){
        return ''
    }

    async plusComVak(com){
        const name = com.com.name
        const category = com.com.category
        try{
            const comvak = await VakCompanies.create({name: name, category: category})
            return comvak
        }catch(e){
            console.log(e)
        }

    }
    async getComVak(){
        try{
            const coms = await VakCompanies.findAll()
            return coms
        }catch(e){
            console.log(e)
        }

    }
    async delComVak(com){
        const idcom = +com.com.com.id
        const deleted = await VakCompanies.findByPk(idcom)
        return await deleted.destroy()
    }
    async createVak(vak){
        const name = vak.vak.name
        const respon = vak.vak.respon
        const requierments = vak.vak.requierments
        const conditions = vak.vak.conditions
        const keyskills = vak.vak.keyskills
        const company = vak.vak.company
        const email = vak.vak.email
        try{
            const itog = await Vakansii.create({name: name, respon:respon,requierments:requierments,conditions:conditions,keyskills:keyskills,company:company,email:email})
            return itog
        }catch(e){
            console.log(e)
        }

    }
    async getVakansii(){
        try{
            const vaks = await Vakansii.findAll()
            return vaks
        }catch(e){
            console.log(e)
        }
    }
    async editVak(vak){
        const vak_id = vak.vak.id
        const name = vak.vak.name
        const respon = vak.vak.respon
        const requierments = vak.vak.requierments
        const conditions = vak.vak.conditions
        const keyskills = vak.vak.keyskills
        const company = vak.vak.company
        const email = vak.vak.email
        try{
            const thisvak = await Vakansii.findByPk(vak_id)
            thisvak.name = name
            thisvak.respon = respon
            thisvak.requierments = requierments
            thisvak.conditions = conditions
            thisvak.keyskills = keyskills
            thisvak.company = company
            thisvak.email = email
            await thisvak.save()
            return thisvak
        }catch(e){
            console.log(e)
        }

    }
    async delTisVak(vak){
        const id = vak.id
        const deleted = await Vakansii.findByPk(id)
        return await deleted.destroy()
    }
    async getAbout(com){

        try{
            const search = await About.findOne({where: {company: com.com.company}})
            console.log(search)
            if(search){
                return search
            }else{
                const itog = await About.create({text: '', company:com.com.company})
                return itog
            }
        }catch(e){

        }
    }
    async saveAbout(about){
        try{
            const search = await About.findOne({where: {company: about.about.company}})
            search.text = about.about.text
            await search.save()
            return search
        }catch(e){

        }
    }
    async plusCompany(com){
        const name = com.com.name
        const desc = com.com.desc
        const contacts = com.com.contacts
        const site = com.com.site
        const logo = com.com.logo
        const image = com.com.img
        const number = com.com.num
        try{
            const itog = await GroupsComs.create({name,desc,contacts,site,logo,image,number:+number})
            return itog
        }catch(e){
            console.log(e)
        }
    }
    async getGroupCompanyes(){
        try{
            const coms = await GroupsComs.findAll()
            return coms
        }catch(e){
            console.log(e)
        }
    }

    async delComGroup(com){
        const id = com.com.delIDcom
        const deleted = await GroupsComs.findByPk(id)
        return await deleted.destroy()
    }

    async editСomGroup(com){
        const id = com.com.id
        const name = com.com.name
        const desc = com.com.desc
        const contacts = com.com.contacts
        const site = com.com.site
        const logo = com.com.logo
        const image = com.com.img
        const number = com.com.number
        try{
            const thiscom = await GroupsComs.findByPk(id)
            thiscom.name = name
            thiscom.desc = desc
            thiscom.contacts = contacts
            thiscom.site = site
            thiscom.logo = logo
            thiscom.image = image
            thiscom.number = +number
            await thiscom.save()
            return thiscom
        }catch(e){
            console.log(e)
        }

    }
    async updatePosComGroup(com){
        const id = com.com.id
        const number = com.com.number
        try{
            const thiscom = await GroupsComs.findByPk(id)
            thiscom.number = +number
            await thiscom.save()
            return thiscom
        }catch(e){
            console.log(e)
        }

    }

    async getPlaces(act){
        const line = act.act.act
        try{
            const places = await Activities.findAll({where: {line: line}})
            return places
        }catch(e){
            console.log(e)
        }
    }



    async plusPlaces(place){

        const name = place.place.name
        const desc = place.place.desc
        const url = place.place.url
        const line = place.place.line
        try{
            const itog = await Activities.create({name,desc,url,line})
            return itog
        }catch(e){
            console.log(e)
        }
    }

    async delPlace(idline){
        const id = idline.id
        const deleted = await Activities.findByPk(id)
        return await deleted.destroy()
    }

    async createpack(pack){
        const capter = pack.capter
        const name = pack.name
        const time = pack.time
        const desc = pack.desc
        const price = pack.price
        const image = pack.image
        const priory = +pack.priory
        try{
            const newpack = await PacksKids.create({capter, name, time, desc, price, priory, image})
            return newpack
        }catch(e){
            console.log(e)
        }
    }

    async getAllPacks(com){
        const capter = com.capter
        try{
            const places = await PacksKids.findAll({
                where: { capter: capter },
                order: [['id', 'ASC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }

    async editPrioryPack(priory){

        console.log(priory)
        const id = priory.id
        const value = priory.priory
        try{
            const pack = await PacksKids.findByPk(id)
            pack.priory = +value
            await pack.save()
            return pack
        }catch(e){
            console.log(e)
        }
    }
    async updatePack(pack){

        console.log(pack)
        const id = pack.id
        try{
            const itogy = await PacksKids.findByPk(id)
            itogy.capter = pack.capter
            itogy.name = pack.name
            itogy.time = pack.time
            itogy.desc = pack.desc
            itogy.price = pack.price
            itogy.image = pack.image
            itogy.priory = +pack.priory
            await itogy.save()
            return itogy
        }catch(e){
            console.log(e)
        }
    }
    async createImgGallery(img){
        const capter = img.capter
        const image = img.image
        try{
            const upimg = await GalleryImages.create({capter, image})
            return upimg
        }catch(e){
            console.log(e)
        }
    }

    async getGalleryImgs(capter){

        console.log(capter)
        const com = capter.capter
        console.log(com)
        try{
            const places = await GalleryImages.findAll({
                where: { capter: com },
                order: [['id', 'ASC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }
    async getCities(capter){

        const com = capter.capter
        try{
            const places = await ContactsPage.findAll({
                where: { capter: com },
                order: [['id', 'ASC']] // сортировка по возрастанию id
            });
            return places
        }catch(e){
            console.log(e)
        }
    }
    async createCity(contact){
        const capter = contact.capter
        const city = contact.city
        try{
            const search = await ContactsPage.findOne({where: {capter: capter, city: city}})
            if(search){
                return 'exists'
            }else{
                const createdcity = await ContactsPage.create({capter, city})
                return createdcity
            }
        }catch(e){
            console.log(e)
        }
    }
    async uploadStaticContact(contact){
        const capter = contact.capter
        const city = contact.city
        const category = contact.category
        const value = contact.value
        try{
            const search = await ContactsPage.findOne({where: {capter: capter, city: city}})
            if(search){
                if(category === 'vk')search.vk = value
                if(category === 'ok')search.ok = value
                if(category === 'instagram')search.instagram = value
                if(category === 'telegram')search.telegram = value
                if(category === 'youtube')search.youtube = value
                if(category === 'mapw')search.mapw = value
                if(category === 'maph')search.maph = value
                await search.save()
                return search
            }
        }catch(e){
            console.log(e)
        }
    }
    async plusContactParam(contact){
        const capter = contact.capter
        const city = contact.city
        const category = contact.category
        const value = contact.value
        try{
            const search = await ContactsPage.findOne({where: {capter: capter, city: city}})
            if(search){
                if(category === 'phone')search.phone = value
                if(category === 'adress')search.adress = value
                if(category === 'email')search.email = value
                await search.save()
                return search
            }
        }catch(e){
            console.log(e)
        }
    }
}
module.exports = new NewsService()

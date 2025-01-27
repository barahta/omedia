const fs = require('fs');
const config = require('config')
const {Files, StatementsSimples} = require('../models/models')
const ApiError = require("../exceptions/api.error");
const {Sequelize} = require('sequelize')
const PATH = require('path');

class FilesService {
    async get(id,parent) {
        const dirs = await Files.findAll({where: {user_id:id,parent_id:parent,type:'dir'}})
        const files = await Files.findAll({where: {user_id:id,parent_id:parent,type: { [Sequelize.Op.not]: 'dir' }}})
        const list = [...dirs,...files]
        if (!list) throw ApiError.BadRequest('База с файлами пуста')
        return list
    }
    async getAll(id){
        const files = await Files.findAll({where: {user_id:id}})
        if (!files) throw ApiError.BadRequest('База с файлами пуста')
        return files
    }

    async getStatements() {
        return await StatementsSimples.findAll()
    }
    async createPath(parent,path = []){
        const file = await Files.findOne({where: {id:parent}})
        const allPath = [{parent:parent,name:file.name},...path]
        if(!file.parent_id) return allPath
        else{
            return this.createPath(file.parent_id,allPath)
        }
    }

    async compressResizeAndSaveImage(filePath,quality, width, height) {
        try {
            const buffer = await sharp(filePath).resize({ width, height, position: 'center' }).jpeg({ quality }).toBuffer()
            fs.writeFileSync(filePath, buffer, (err) => {
                if (err) {
                    console.error('Ошибка при сохранении файла:', err);
                    return
                }
                sharp.cache(false)
                console.log('Изображение успешно сохранено.')
            })
        } catch (error) {
            console.error('Ошибка при сжатии, изменении размера и перезаписи изображения:', error)
        }
    }
    async compressProportionalImage(filePath, quality, maxWidth, maxHeight) {
        try {
            const image = sharp(filePath)
            const metadata = await image.metadata()
            const { width, height } = metadata

            let resizeOptions = {}
            if (width > height) {
                resizeOptions = { width: maxWidth }
            } else {
                resizeOptions = { height: maxHeight }
            }

            const buffer = await image.rotate().resize(resizeOptions).jpeg({ quality }).toBuffer()
            fs.writeFileSync(filePath, buffer, (err) => {
                if (err) {
                    console.error('Ошибка при сохранении файла:', err)
                    return;
                }
                sharp.cache(false)
                console.log('Изображение успешно сохранено.')
            });
        } catch (error) {
            console.error('Ошибка при сжатии, изменении размера и перезаписи изображения:', error);
        }
    }
    createDir(file){
        //const filePath = `${config.get('file_path')}\\${file.user_id}\\${file.path}`
        //const userPath = `${config.get('file_path')}\\${file.user_id}`

        const filePath = PATH.join(`${config.get('file_path')},${file.user_id},${file.path}`)
        const userPath = PATH.join(`${config.get('file_path')},${file.user_id}`)

        return new Promise(((resolve,reject) => {
            try{
                if(!fs.existsSync(userPath)) fs.mkdirSync(userPath)
                if(!fs.existsSync(filePath)) {
                    fs.mkdirSync(filePath)
                    console.log('Файл успешно добавлен')
                    return resolve({message:'Файл успешно добавлен'})
                }else reject({message: 'Файл уже существует'})
            }catch (e) {
                console.log('Ошибка создания директории...')
                return reject({messsage: 'Ошибка создания директории...'})
            }
        }))
    }
    createSkill(skill,files){
        const folderPath = PATH.join(`${config.get('file_path')}`,`${skill}`)

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }
        files.map(item => {
            const filePath = PATH.join(`${config.get('file_path')}`,'temp',`${item.name}`);
            const destPath = PATH.join(`${folderPath}`,`${skill}_${item.name}`);
            if (fs.existsSync(filePath)) {
                fs.renameSync(filePath, destPath);
            } else {
                console.log(`Файл ${item.name} не найден`);
            }
        })
    }
    removeSkill(skill,files){
        const folderPath = PATH.join(`${config.get('file_path')}`,`${skill}`)

        files.forEach(item => {
            const filePath = PATH.join(folderPath, `${skill}_${item.name}`);
            try {
                fs.unlinkSync(filePath);
                console.log(`Файл ${filePath} успешно удален`);
            } catch (err) {
                console.error(`Ошибка при удалении файла ${filePath}:`, err);
            }
        })
    }
    async createPathTask(path){
        //const taskPath = `${config.get('file_path')}\\tasks\\${path}`
        const taskPath = PATH.join(`${config.get('file_path')},'tasks',${path}`)

        if(!fs.existsSync(taskPath)){
            await fs.mkdir(taskPath, (err) => {
                if (err) {
                    console.error('Ошибка при создании папки:', err);
                    return;
                }
                console.log('Папка успешно создана.');
            })
        }
    }
    generateRandomFileName() {
        const timestamp = new Date().getTime();
        const randomNumber = Math.floor(Math.random() * 10000);
        return `${timestamp}_${randomNumber}`;
    }
}
module.exports = new FilesService()
const {User, Developers} = require('../models/models')
const bcrypt = require('bcrypt')
const UserDto = require('../dtos/usersDto')
const tokenService = require('./token.service')
const ApiError = require('../exceptions/api.error')
class UsersService{
    async registration(tn,name,login,email,password) {

        console.log(login)
        const candidate = await User.findOne({where: {login:login.login}})
        if(candidate) throw ApiError.BadRequest(`Пользователь с логином ${login.login} уже существует`)
        const hashPassword = await bcrypt.hash(login.password,15)
        const user = await User.create({tn:login.tn,name:login.name,login: login.login,email:login.email,password:hashPassword,admin:false,unit:0})
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens,user: userDto}
    }
    async createUser(login,password,tn,name,email,dev) {
        const candidate = await User.findOne({where: {login:login}})
        if(candidate) throw ApiError.BadRequest(`Пользователь с логином ${login} уже существует`)
        const hashPassword = await bcrypt.hash(password,15)
        const user = await User.create({tn,name,login,email,password:hashPassword,developer_id:dev,admin:false,unit:0})
        return new UserDto(user)
    }
    async changeUser(id,login,tn,name,mail,dev){
        const candidate = await User.findByPk(id)
        if(!candidate) throw ApiError.BadRequest(`Пользователь не существует`)
        candidate.login = login
        candidate.tn = tn
        candidate.email = mail
        candidate.name = name
        candidate.developer_id = dev
        await candidate.save()
        return new UserDto(candidate)
    }


    async removeUser(id) {
        const candidate = await User.findByPk(id)
        if(!candidate) throw ApiError.BadRequest(`Пользователь не существует`)
        return await candidate.destroy()
    }
    async login(login,password) {
        const user = await User.findOne({ where:{login:login} })
        if(!user) throw ApiError.BadRequest('Пользователя с таким именем не существует')
        const isPassEquals = await bcrypt.compare(password,user.password)
        if(!isPassEquals) throw ApiError.BadRequest('Неверный пароль')
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens,user: userDto}
    }

    async changePassword(id,oldPass,newPass){
        const user = await User.findOne({where: {id:id}})
        if(!user) return {err:true,message:'Пользователя с таким именем не существует'}
        const isPassEquals = await bcrypt.compare(oldPass,user.password)
        if(!isPassEquals) return {err:true,message:'Неверный пароль'}
        user.password = await bcrypt.hash(newPass,15)
        await user.save()
        return {err:false,message:'Пароль успешно изменен'}
    }
    async logout(refreshToken){
        return await tokenService.removeToken(refreshToken)
    }
    async refresh(refreshToken){
        if(!refreshToken) throw ApiError.UnauthorizedError()
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if(!userData || !tokenFromDb) throw ApiError.UnauthorizedError()
        const user = await User.findOne({ where:{id:userData.id} })
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)
        return {...tokens,user: userDto}
    }
    async getusers(sort = 'abc',direct = true) {
        const sortingOptions = {
            'abc': [['name', direct ? 'ASC' : 'DESC']],
            'dev': [['developer', direct ? 'ASC' : 'DESC']],
            'date': [['createdAt', direct ? 'ASC' : 'DESC']]
        }
        const order = sortingOptions[sort] || [['name', direct ? 'ASC' : 'DESC']]
        const users = await User.findAll({where:{admin:false},order,  include: [{model: Developers, as: 'developers'}]})
        if(!users) throw ApiError.BadRequest('Ошибка получения списка пользователей')
        return {users}
    }
}
module.exports = new UsersService()
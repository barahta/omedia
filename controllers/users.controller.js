const userService = require('../services/users.service')
const {validationResult} = require('express-validator')
const ApiError = require('../exceptions/api.error')
const config = require("config")
const fs = require("fs")
const {User} = require("../models/models");
const PATH = require("path");

class UsersController {
    async registration(req,res,next) {
        try{
            console.log('/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-')
            console.log('/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-')
            console.log('/-/-/-/-/-/-/-/- н а ч а л о -/-/-/-/-/-/-/-/-')
            const errors = validationResult(req)
            if(!errors.isEmpty()) next(ApiError.BadRequest('Ошибка при валидации',errors.array()))
            const {tn,name,login,email,password} = req.body
            const userData = await userService.registration(tn,name,login,email,password)
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000*1000,httpOnly:true})
            console.log('/-/-/-/-/-/-/-/- к о н е ц -/-/-/-/-/-/-/-/-/-')
            console.log('/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-')
            console.log('/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-/-')
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }
    async login(req,res,next) {
        try{
            const {login,password} = req.body
            const userData = await userService.login(login,password)
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000*1000,httpOnly:true})
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }
    async logout(req,res,next) {
        try{
            const refreshToken = req.cookies['refreshToken']
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        }catch (e){
            next(e)
        }
    }

    async changePassword(req,res,next) {
        try{
            const {oldPass,newPass} = req.body
            const result = await userService.changePassword(req.user.id,oldPass,newPass)
            return res.status(200).json(result)
        }catch (e){
            next(e)
        }
    }

    async refresh(req,res,next) {
        try{
            const refreshToken = req.cookies['refreshToken']
            const userData = await userService.refresh(refreshToken)
            res.cookie('refreshToken',userData.refreshToken,{maxAge:30*24*60*60*1000*1000,httpOnly:true}) // sameSite:'None',secure:true
            return res.json(userData)
        }catch (e){
            next(e)
        }
    }
    async getusers(req,res,next){
        try{
            const usersData = await userService.getusers(req.body.sort,req.body.direct)
            return res.status(200).json(usersData)
        }catch (e){
            next(e)
        }
    }
    async createUser(req,res,next){
        try{
            const {login,pass,tn,name,mail,dev} = req.body
            const usersData = await userService.createUser(login,pass,tn,name,mail,dev)
            return res.status(200).json(usersData)
        }catch (e){
            next(e)
        }
    }
    async removeUser(req,res,next){
        try{
            const {id} = req.body
            const destroy = await userService.removeUser(id)
            return res.status(200).json(destroy)
        }catch (e){
            next(e)
        }
    }
    async changeUser(req,res,next){
        try{
            const {id,login,tn,name,mail,dev} = req.body
            const change = await userService.changeUser(id,login,tn,name,mail,dev)
            return res.status(200).json(change)
        }catch (e){
            next(e)
        }
    }

}

module.exports = new UsersController()
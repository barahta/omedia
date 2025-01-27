const SkillService = require('../services/skill.service')
const {Files, Developers} = require('../models/models')
const fs = require('fs');
const FileDto = require('../dtos/fileDto')
const config = require('config')
const PATH = require('path')
const DevelopersService = require("../services/developers.service");

class SkillController {
    async getDevelopers(req, res, next) {
        try {
            const developers = await SkillService.getDevelopers()
            return res.status(200).json(developers)
        } catch (e) {
            next(e)
        }
    }
    async createSkill(req, res, next) {
        try {
            const { name,days,info,files,group } = req.body
            console.log(name,days,info,files)
            const skill = await SkillService.createSkill(name,days,info,files,req.user.id,group)
            return res.status(200).json(skill)
        } catch (e) {
            next(e)
        }
    }
    async getSkills(req, res, next) {
        try {
            const skills = await SkillService.getSkills()
            return res.status(200).json(skills)
        } catch (e) {
            next(e)
        }
    }
    async removeSkill(req, res, next) {
        try {
            const {id} = req.body
            console.log(id)
            const isSet = await SkillService.isSetOnDev(id)
            if(isSet.length) return res.status(200).json({err:true,isSet})
            // else{
            //     const deleted = await DevelopersService.removeDev(id)
            //     return res.status(200).json({err:false,deleted})
            // }
        } catch (e) {
            next(e)
        }
    }
    async getSkillsCms(req, res, next) {
        try {
            const {sort,sortDirection} = req.body
            const skills = await SkillService.getSkillsCms(sort,sortDirection)
            return res.status(200).json(skills)
        } catch (e) {
            next(e)
        }
    }

    async loadSkill(req, res, next) {
        try {
            const {skill_id} = req.body
            const {skill,files} = await SkillService.loadSkill(skill_id)
            console.log(files)
            return res.status(200).json({skill,files})
        } catch (e) {
            next(e)
        }
    }

}

module.exports = new SkillController()
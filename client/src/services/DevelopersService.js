import $api from "../http"

export default class DevelopersService{
    static fetchDevelopers(sort,direct){
        return $api.post('/developers/get',{sort,direct})
    }
    static removeDev(id){
        return $api.post('/developers/remove',{id})
    }
    static changeDev(id,name,skills){
        return $api.post('/developers/change',{id,name,skills})
    }
    static createDev(name,skills){
        return $api.post('/developers/create',{name,skills})
    }
    static getConnections(id){
        return $api.post('/developers/getskills',{id})
    }

}

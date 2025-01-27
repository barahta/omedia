import $api from "../http"

export default class CompanyService{
    static createCompany(com){
        return $api.post('/company/create',{ com })
    }


}
import $api from "../http"

export default class NewsService{
    static viewPost(){
        return $api.get('/views/news')
    }
    static createPost(post){
        return $api.post('/views/createpost', {post})
    }
    static getAUP(){
        return $api.get('/views/getaup')
    }
    static plusAUP(post){
        return $api.post('/views/plusaup', {post})
    }
    static updateManAUP(man){
        return $api.post('/views/updatemanaup', {man})
    }
    static delMan(man){
        return $api.post('/views/delman', {man})
    }
    static plusVideo(video){
        return $api.post('/views/plusvideo', {video})
    }
    static plusComVak(com){
        return $api.post('/views/pluscomvak', {com})
    }
    static getComVak(){
        return $api.get('/views/getcomvak')
    }
    static delComVak(com){
        return $api.post('/views/delcomvak', {com})
    }
    static createVak(vak){
        return $api.post('/views/createvak', {vak})
    }
    static getVakansii(){
        return $api.get('/views/getvakansii')
    }
    static editVak(vak){

        console.log(vak)
        return $api.post('/views/editvak', {vak})
    }
    static delTisVak(vak){

        console.log(vak)
        return $api.post('/views/deltisvak', vak)
    }


    static getAbout(com){
        return $api.post('/views/getabout', {com})
    }
    static saveAbout(about){
        return $api.post('/views/saveabout', {about})
    }
    static plusCompany(com){
        return $api.post('/views/pluscompany', {com})
    }
    static getGroupCompanyes(){
        return $api.get('/views/getgroupcompanyes')
    }
    static delComGroup(com){
        return $api.post('/views/delcomgroup', {com})
    }
    static editСomGroup(com){
        return $api.post('/views/editcomgroup', {com})
    }
    static updatePosComGroup(com){
        return $api.post('/views/updateposcomgroup', {com})
    }
    static getPlaces(act){
        return $api.post('/views/getplaces', {act})
    }
    static plusPlaces(place){
        return $api.post('/views/plusplaces', {place})
    }
    static delPlace(id){
        return $api.post('/views/delplace', id)
    }
    static createPack(pack){
        return $api.post('/views/createpack', pack)
    }
    static getAllPacks(capter){
        return $api.post('/views/getallpacks', capter)
    }
    static editPrioryPack(priory){
        return $api.post('/views/editpriorypack', priory)
    }
    static updatePack(pack){
        return $api.post('/views/updatepack', pack)
    }
    static createImgGallery(pack){
        return $api.post('/views/createimggallery', pack)
    }
    static getGalleryImgs(capter){
        return $api.post('/views/getgalleryimgs', capter)
    }
    static getCities(capter){
        return $api.post('/views/getcities', capter)
    }
    static createCity(contact){
        return $api.post('/views/createcity', contact)
    }
    static uploadStaticContact(contact){
        return $api.post('/views/uploadstaticcontact', contact)
    }
    static plusContactParam(contact){
        return $api.post('/views/pluscontactparam', contact)
    }
    static sendMail(contact){
        console.log('Здесь')
        return $api.post('/views/sendmail', contact)
    }
    static sendContactMessage(news){
        return $api.post('/views/emailmess', news)
    }
    static sendResumeMessage(formData) {
        return $api.post('/views/emailresume', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
    }
}
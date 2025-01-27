import $api from "../http"

export default class FilesService{
    static fetchFiles(user_id,parent_id){
        return $api.post('/files/get',{ user_id,parent_id })
    }
    static createDir(user_id,name,type,parent_id){
        return $api.post('/files/dir',{ user_id,name,type,parent_id })
    }
    static fetchAllFiles(user_id){
        return $api.post('/files/getall',{ user_id })
    }
    static getPath(parent){
        return $api.post('/files/getpath',{ parent })
    }

    static loadImage(file){
        if(file){
            if(this.isImage(file.name)){
                const formData = new FormData()
                formData.append('file', file)
                formData.append('filename', file.name)
                return $api.post('/files/loadimg',formData)
            }else{
                return {err:true,message:'Файл не является изображением'}
            }
        }else{
            return {err:false,message:'Файл не выбран'}
        }
    }
    static loadPollsImage(file){
        if(file){
            if(this.isImage(file.name)){
                const formData = new FormData()
                formData.append('file', file)
                formData.append('filename', file.name)
                return $api.post('/files/loadpollsimg',formData)
            }else{
                return {err:true,message:'Файл не является изображением'}
            }
        }else{
            return {err:false,message:'Файл не выбран'}
        }
    }
    static isImage(filename) {
        const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp']; // расширения изображений
        const extension = filename.split('.').pop().toLowerCase(); // получаем расширение файла и приводим его к нижнему регистру
        return imageExtensions.includes(extension); // возвращаем true, если расширение файла соответствует расширениям изображений
    }
    static isDocuments(filename) {
        const documentsExtensions = ['doc', 'docx', 'pdf', 'xls', 'xlsx', 'jpg', 'jpeg', 'png', 'gif', 'bmp']
        const extension = filename.split('.').pop().toLowerCase(); // получаем расширение файла и приводим его к нижнему регистру
        return documentsExtensions.includes(extension); // возвращаем true, если расширение файла соответствует расширениям изображений
    }
    static uploadFile(file,user_id,parent_id,onUploadProgress ){
        const formData = new FormData()
        formData.append('file', file)
        formData.append('parent', parent_id)
        formData.append('user', user_id)
        formData.append('filename', file.name)

        if(file.size > 2147483648) return {message: 'Слишком большой размер брат.'}

        return $api.post('/files/upload',formData,{
            onUploadProgress: onUploadProgress
        })
    }
    static uploadTaskFiles(file,onUploadProgress ){
        if(file){
            if(this.isDocuments(file.name)){
                const formData = new FormData()
                formData.append('file', file)
                formData.append('filename', file.name)
                if(file.size > 2147483648) return {message: 'Слишком большой размер брат.'}
                return $api.post('/files/uploadfile',formData,{
                    onUploadProgress: onUploadProgress
                })
            }
        }
    }
    static deleteFile(name){
        return $api.post('/files/deletefile',{name})
    }
    static fetchStatements(){
        return $api.get('/files/getstatements')
    }
    static downloadStatement(id){
        return $api.post('/files/downloadstatement',{id},{responseType:'blob'})
    }


}

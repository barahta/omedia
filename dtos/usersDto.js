module.exports = class UsersDto{
    id
    tn
    name
    login
    email
    avatar
    admin
    checked
    phone
    unit
    developer
    constructor(model) {
        this.id = model.id
        this.tn = model.tn
        this.name = model.name
        this.login = model.login
        this.email = model.email
        this.avatar = model.avatar
        this.admin = model.admin
        this.checked = model.checked
        this.phone = model.phone
        this.unit = model.unit
        this.developer = model.developer

    }
}
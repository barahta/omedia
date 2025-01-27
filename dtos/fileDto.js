module.exports = class FileDto{
    id
    name
    type
    size
    access_link
    path
    user_id
    parent_id
    child_id
    constructor(model) {
        this.id = model.id
        this.name = model.name
        this.type = model.type
        this.size = model.size
        this.access_link = model.access_link
        this.path = model.path
        this.user_id = model.user_id
        this.parent_id = model.parent_id
        this.child_id = model.child_id

        this.addChildId = function(childId) {
            if(!this.child_id) this.child_id = []
            this.child_id.push(childId);
        }

    }
}
const  mongoose = require("mongoose")

const toDoSchema = new mongoose.Schema({
    task : String,
    done : {
        type : Boolean,
        default : false
    }
})

const ToDoModel = mongoose.model("TODO-1", toDoSchema)
module.exports = ToDoModel
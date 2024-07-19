import mongoose from "mongoose"
const userSchema = mongoose.Schema({
    cedula:{
        type:String,
        required:true,
        unique:true,
    },
    nombre:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export const User = mongoose.model('User', userSchema)
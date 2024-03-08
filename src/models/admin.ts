import mongoose, { Schema } from "mongoose";

const adminSchema = new Schema({
    user:       { type:String, required:[true, 'Usuario debe ser de tipo Texto']},
    password:   { type:String, required:[true, 'Contraseña de tipo Texto']},
    name:       { type:String, required:[true, 'Nombre Completo']}
}, {
    collection: 'Admin',
    versionKey: false
})  

export const admin = mongoose.model('Admin', adminSchema);

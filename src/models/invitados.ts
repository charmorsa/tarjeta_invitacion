import mongoose, { Schema } from "mongoose";

const invSchema = new Schema({
    nombre:         { type:String, required:[true, 'Nombre']},
    apellido:       { type:String, required:[true, 'Apellido']}
}, {
    collection: 'Invitados',
    versionKey: false
})  

export const inv = mongoose.model('Invitados', invSchema);

import mongoose, { Schema } from "mongoose";

interface familiares {
    nombre: string,
    apellido: string,
    relacion: string,
    estado: boolean
}

interface invi {
    nombre:string,
    apellido:string,
    estado:boolean,
    familiar: familiares
}

const invSchema = new Schema<invi>({
    nombre:         { type:String, required:[true, 'Nombre']},
    apellido:       { type:String, required:[true, 'Apellido']},
    estado:         { type:Boolean, default:true},
    familiar:       { type:[], required:[false, 'familiares']}
}, {
    collection: 'Invitados',
    versionKey: false
})  

export const inv = mongoose.model('Invitados', invSchema);

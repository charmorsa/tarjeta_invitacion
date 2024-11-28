import mongoose, { Schema } from "mongoose";

interface familiares {
    codigo: string,
    nombre: string,
    apellido: string,
    relacion: string,
    estado: boolean
}

interface invi {
    codigo: string,
    nombre: string,
    apellido: string,
    estado: boolean,
    familiar: familiares
}

const invSchema = new Schema<invi>({
    codigo:         { type:String },
    nombre:         { type:String },
    apellido:       { type:String },
    estado:         { type:Boolean, default:false},
    familiar:       { type:[] }
}, {
    collection: 'Invitados',
    versionKey: false
})  

export const inv = mongoose.model('Invitados', invSchema);

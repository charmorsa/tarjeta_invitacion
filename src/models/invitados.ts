import mongoose, { Schema } from "mongoose";

interface familiares {
    [x: string]: any;
    findOne(arg0: (f: any) => boolean): unknown;
    nombre: string,
    apellido: string,
    relacion: string,
    estado: boolean
}

interface invi {
    codigo: string,
    nombre:string,
    apellido:string,
    estado:boolean,
    familiar: familiares
}

const invSchema = new Schema<invi>({
    codigo:         { type:String, required:[true, 'Codigo']},
    nombre:         { type:String, required:[true, 'Nombre']},
    apellido:       { type:String, required:[true, 'Apellido']},
    estado:         { type:Boolean, default:false},
    familiar:       { type:[], required:[false, 'familiares']}
}, {
    collection: 'Invitados',
    versionKey: false
})  

export const inv = mongoose.model('Invitados', invSchema);

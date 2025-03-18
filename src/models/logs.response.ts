import mongoose, { Schema } from "mongoose";

const logResSchema = new Schema({
    user:               { type:String },
    type:               { type:String },
    dateRegister:       { type:Date },
    data:               { type:Object }
}, {
    collection: 'LogsRes',
    versionKey: false
})  

export const logRes = mongoose.model('LogsRes', logResSchema);

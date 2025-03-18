import mongoose, { Schema } from "mongoose";

const logReqSchema = new Schema({
    user:               { type:String },
    type:               { type:String },
    dateRegister:       { type:Date },
    data:               { type:Object }
}, {
    collection: 'LogsReq',
    versionKey: false
})  

export const logReq = mongoose.model('LogsReq', logReqSchema);

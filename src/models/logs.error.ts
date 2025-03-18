import mongoose, { Schema } from "mongoose";

const logErrorSchema = new Schema({
    user:               { type:String },
    type:               { type:String },
    dateRegister:       { type:Date },
    data:               { type:Object }
}, {
    collection: 'LogsError',
    versionKey: false
})  

export const logError = mongoose.model('LogsError', logErrorSchema);

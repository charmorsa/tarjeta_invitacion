import mongoose from 'mongoose'

const mongo = async (url:string) => {
    mongoose.set('strictQuery', false)
    await mongoose.connect(url, { "readPreference": "secondary" } )
}

export default mongo
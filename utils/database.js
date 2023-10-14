import mongoose from "mongoose";

let isDBConnected = false

export const connectToDB = async () => {
    mongoose.set('strictQuery', true)

    if(isDBConnected){
        console.log('Mongo is active')
        return
    }
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            dbName: "share_prompt",
            useNewUrlParser: true,
            useUnifiedTopology: true
        })

        isDBConnected = true

        console.log('Mongo is connected')
    } catch (error) {
        console.log(error)
    }
}
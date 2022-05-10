import mongoose from "mongoose";



const connDb = async()=>{
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongo Db connected to = ",connection.connection.host)
        // console.log(`Coneected to Mongo = ${connection.connect.host}`)
    } catch (error) {
        console.log("error",error)
    }
}

export default connDb;
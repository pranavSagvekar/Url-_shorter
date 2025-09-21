import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionStatus = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.MONGODB_NAME}`)
        console.log("Datbase connected to the : " , process.env.MONGODB_NAME)
    } catch (error) {
        console.log("Error in connecting in mongooe db :" , error);
        process.exit(1);
    }
}

export default connectDB;
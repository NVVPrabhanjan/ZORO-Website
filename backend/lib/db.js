import mongoose from "mongoose";
const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/");
        console.log("MongoDB connected sucessfully");
    }
    catch (error){
        console.log("DataBase Connection failed ", error);
    }
}
export default connectDB;
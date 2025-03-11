import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/Easy_Solution");
        // await mongoose.connect('mongodb+srv://easysolution123:Xmv02488!!@easysolutioncluster.p53cg.mongodb.net/');
         
        console.log("Database connected....");
    } catch (error) {
        console.error("Database connection failed:", error);
        process.exit(1);
    }
};

export default connectDB;

import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://waghvansh0:eJxvnDsGLxuIPW0Y@cluster0.f0os0hv.mongodb.net/TaskFlow')
    .then(() => console.log('DB CONNECTED'));
}
import mongoose, { connect } from "mongoose";

const connectDB =async ()=> {
    try {
        mongoose.connection.on('connected',()=> console.log('DB Connected'))
        await mongoose.connect(`${process.env.MONGODB_URI}/Nuvina`)
    } catch (error) {
        console.log(error.message);
         process.exit(1);
    }
}

export default connectDB;
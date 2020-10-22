import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DATABASE, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    });
    console.log(`MongoDb connected: ${connect.connection.host}`.cyan);
  } catch (error) {
    console.error(`Error : ${error.message}`.red.bold);
    process.exit(1);
  }
};
export default connectDB;

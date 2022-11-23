import { connect } from 'mongoose';

const url = "mongodb+srv://Naeem:MongoDB123@cluster0.ksn0zz5.mongodb.net/DemoProjectDatabase";
const connectDB = async () => {
  try {
    await connect(url);
  } catch (err) {
    console.log(err.stack);
  }
}

connectDB().catch(console.dir);
export default connectDB;
import mongoose,  {connect}  from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
    try{
        const conn = await mongoose.connect(process.env.MONGO_URL);
        console.log(`Mongodb is Connected ${conn.connection.host}`.bgMagenta.white);

    } catch(error) {
      console.log(`Error in Mongodb ${error}`.bgRed.white);
    }
};

export default connectDB;
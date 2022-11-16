import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

export default async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}`);
    console.log('Successfully connected to database 🙌');
  } catch (err) {
    console.log('Database connection unsuccessful: ', err);
  }
};

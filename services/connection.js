import { connect } from 'mongoose';

async function connectToDatabase(url) {
  try {
    connect(url);
  } catch (error) {
    throw new Error(`Error while connecting to db: ${error.message}`);
  }
}

export default connectToDatabase;

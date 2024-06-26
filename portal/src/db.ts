// Importing important modules
import mongoose from 'mongoose';
import { NAME, MONGO_URI } from './config/constants';

// Connecting to MongoDB
mongoose.connect(MONGO_URI);

// MongoDB connection
const db = mongoose.connection;

// MongoDB event listeners
db.on('error', (err) => {
  console.error(`[${NAME}] MongoDB connection error: ${err}`);
});

db.once('open', () => {
  console.log(`[${NAME}] Connected to MongoDB`);
});

// Exporting the database connection
export default db;

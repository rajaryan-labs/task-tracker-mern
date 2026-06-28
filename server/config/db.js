const mongoose = require('mongoose');

const connectDB = async () => {
  const maxRetries = 5;
  let retries = 0;

  while (retries < maxRetries) {
    try {
      const conn = await mongoose.connect(process.env.MONGO_URI, {
        family: 4, // Force IPv4 to avoid DNS issues
      });
      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      return;
    } catch (error) {
      retries++;
      console.error(`❌ MongoDB Connection Attempt ${retries}/${maxRetries} Failed: ${error.message}`);
      if (retries === maxRetries) {
        console.error('❌ All connection attempts failed. Exiting...');
        process.exit(1);
      }
      // Wait before retrying (exponential backoff)
      const waitTime = Math.min(1000 * Math.pow(2, retries), 10000);
      console.log(`⏳ Retrying in ${waitTime / 1000}s...`);
      await new Promise((resolve) => setTimeout(resolve, waitTime));
    }
  }
};

module.exports = connectDB;

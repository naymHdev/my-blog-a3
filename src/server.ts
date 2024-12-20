import mongoose from 'mongoose';
import config from './app/config';
import app from './app';

async function main() {
  try {
    await mongoose.connect(config.databaseURL as string);

    app.listen(config.port, () => {
      console.log(`Server running at http://localhost:${config.port} 🏃🏼‍♀️`);
    });
  } catch (error) {
    console.log(`Database connection error: ${error} ⛑`);
  }
}

main();

// -----------------------------------

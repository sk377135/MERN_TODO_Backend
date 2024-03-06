import mongoose from "mongoose";

export const connectDB = () => {
  mongoose
    .connect(process.env.mongoURI, {
      dbName: "MERN_TODO",
    })
    .then(c => {
      console.log(`Database is connected ${c.connection.host} `);
    })
    .catch(e => {
      console.log(e);
    });
};

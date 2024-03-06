import { app } from "./app.js";
import { connectDB } from "./database/database.js";

connectDB();

app.listen(process.env.port, () => {
  console.log(
    `Server is running at port no:${process.env.port} in ${process.env.Node_ENV}mode`
  );
});

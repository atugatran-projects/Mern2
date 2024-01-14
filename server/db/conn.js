const mongoose = require("mongoose");
const DB = process.env.DATABASE;
// const DB = "mongodb://localhost:27017/mern-login";
mongoose.set("strictQuery", true);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
  })
  .then(() => {
    console.log(`connnection successful`);
  })
  .catch((err) => console.log(`no connection ` + err));

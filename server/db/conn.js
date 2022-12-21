const mongoose = require("mongoose");

const DB = "mongodb+srv://Atul:rehaan@mern.tkyqw0x.mongodb.net/Mern";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useUnifiedTopology: true,
    // useFindAndModify:false
  })
  .then(() => {
    console.log(`connnection successful`);
  })
  .catch((err) => console.log(`no connection ` + err));
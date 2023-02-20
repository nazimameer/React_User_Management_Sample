const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();
mongoose.set("strictQuery", false);
module.exports = {
    dbconnect :()=>{
        mongoose.connect("mongodb://localhost:27017/web", {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }).then(()=>{
            console.log("database connected successfully");
        }).catch((error)=>{
            console.log("error occured" + error);
        })
    }
}
  

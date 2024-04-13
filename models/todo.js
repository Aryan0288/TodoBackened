const mongoose=require("mongoose");
// this is schema
const todoSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
  }
});

module.exports=mongoose.model("todo",todoSchema);

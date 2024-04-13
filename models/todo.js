const mongoose=require("mongoose");
// this is schema
const todoSchema=new mongoose.Schema({
  title:{
    type:String,
    required:true,
  }
});

const todo=mongoose.model("todo",todoSchema);
module.export=todo;
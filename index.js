const express=require("express");
const app = express();
const cors=require("cors");
const dotenv=require('dotenv');
dotenv.config();
const port = 4000

app.use(express.json());

app.use(
  cors({
    origin:
      "https://f9e208b4-15ef-44d1-b8bb-69dfa307320c-00-2aizsyzbzjp8j.sisko.replit.dev",
    credentials: true,
  }),
);

const connection=require('./connection');
connection();

const todo=require('./models/todo');

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/fetchItems",async(req,res)=>{
  try{
    const data=await todo.find();
    return res.json({status:true,message :data});
  }catch(err){
    console.log(err.message)
    return res.json(err.message);
  }
})

app.post("/addItem", async (req, res) => {
  try {
    const title = req.body;
    const data = await todo.create(title);
    console.log(data);
    res.json({ data: data, message: "Item added successfully" });
  } catch (err) {
    console.log(err.message);
    res.json({ message: err.message });
  }
});

app.delete("/deleteItem",async(req,res)=>{
  try{
    const id=req.body.id; 
    const data=await todo.findByIdAndDelete({_id:id}); 
    console.log("delete successfully");
    return res.json({status:true,message:"Item deleted successfully"});
  }catch(err){
    console.log(err.message);
    return res.json({message:err.message});
  }
})
app.put("/updateItem",async(req,res)=>{
  try{
    const id=req.body.data.id;
    const title=req.body.title;
    // console.log(id,title);
    const data=await todo.findByIdAndUpdate({_id:id},{title:title}); 
    console.log("update successfully");
    return res.json({status:true,message:"Item update successfully"});
  }catch(err){
    console.log(err.message);
    return res.json({message:err.message});
  }
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

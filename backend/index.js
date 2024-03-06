const express = require('express');
const app = express();
const port = 3002;
const mongoose = require('mongoose');
const cors = require('cors');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

mongoose.connect("mongodb://localhost:27017/SpecialTopics");

const specialSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },
    university:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
})

const specialModel = mongoose.model("Thyroid ",specialSchema );

app.post("/create", async(req, res) =>{
    try{
        const specialObject = new specialModel({
            name:req.body.name,
            email:req.body.email,
            address:req.body.address,
            university:req.body.university,
            password:req.body.password,
    
        });
        const pData= await specialObject.save();
        res.send(pData);
      
    

    }catch(error){
        console.log(error.message);
    }

})


app.get("/read", async(req, res) => {
    try{
        const rData = await specialModel.find();
        res.send(rData);

    }catch(error){
        console.log(error.message);
    }
})

app.delete("/delete/:id", async(req, res) => {
    try{
        const userId= req.params.id;
        await specialModel.findByIdAndDelete(userId);
        res.send({success: true});

    }catch(error){
        console.log(error.message);
    }

})

app.put("/update/:id", async(req, res) => {
    try{
        const userId= req.params.id;
        await specialModel.findByIdAndUpdate(userId);
        res.send({success: true});

    }catch(error){
        console.log(error.message);
    }
})


 




app.listen(port, ()=>{
    console.log(` server at running http://localhost:${port}`);
});
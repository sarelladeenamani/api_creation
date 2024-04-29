import mongoose from "mongoose";

function connecTodb(){
    mongoose.connect("mongodb+srv://sarelladeenamani:Sa0XxrZrDh3PqyF0@cluster0.yq8oaun.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
}

mongoose.connection.once('connected',()=>{
    console.log("database is connected")
})


mongoose.connection.on("error",(err)=>{
    console.log("an error is occured:",err)
})

mongoose.connection.on('disconnected',()=>{
    console.log("DB is disconnected");
})


export default connecTodb;
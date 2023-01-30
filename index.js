const express=require('express');
const app=express();
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const authRoute=require('./routes/auth');
const userRoute=require("./routes/users");
const movieRoute=require('./routes/movies');
const listRoute=require('./routes/lists')
const cors=require('cors')
const path=require('path')

dotenv.config();
mongoose.set("strictQuery", false);
mongoose
    .connect(process.env.MONGO_URI,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
        })
    .then(()=>console.log("DB Connection Successfull!"))
    .catch(err=>console.log(err));


app.use(cors())
app.use(express.json())
app.use("/api/auth",authRoute);
app.use("/api/users",userRoute);
app.use("/api/movies",movieRoute);
app.use("/api/lists",listRoute);

//static files
app.use(express.static(path.join(__dirname,'./client/build')))
app.get("*",function(req,res){
    res.sendFile(path.join(__dirname,'./client/build/index.html'))

})




app.listen(8800,()=>{
    console.log("Backend server is running!")
})
const router=require('express').Router();
const Movie=require('../models/Movie');
const CryptoJS=require('crypto-js');
const verify=require('../verifyToken')


//CREATE
router.post("/",verify,async(req,res)=>{
    if(req.user.isAdmin){   
        const newMovie=new Movie(req.body);
        try {
            const savedMovie=await newMovie.save();
            res.status(201).json(savedMovie);
            
        } catch (error) {
            res.status(500).json(error)
            
        }
    
    }else{
        res.status(403).json("You can create only your account!")
    }

})

//UPDATE
router.put("/:id",verify,async(req,res)=>{
    if(req.user.isAdmin){
        const updatedMovie=await Movie.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true});
        try {
            const savedMovie=await newMovie.save();
            res.status(201).json(updatedMovie);
            
        } catch (error) {
            res.status(500).json(error)
            
        }
        

    }else{
        res.status(403).json("You can update only your account!")
    }

})
//DELETE
router.delete("/:id",verify,async(req,res)=>{
    if(req.user.isAdmin){
        
        try {
            await Movie.findByIdAndDelete(req.params.id);
            res.status(201).json("The movie has been deleted!");
            
        } catch (error) {
            res.status(500).json(error)
            
        }
        

    }else{
        res.status(403).json("You can update only your account!")
    }

})
//GET
router.get("/find/:id",verify,async(req,res)=>{
   
    try {
        const movie=await Movie.findById(req.params.id);
        res.status(201).json(movie);
        
    } catch (error) {
        res.status(500).json(error)
        
    }

})
//GET RANDOM
router.get("/random",verify,async(req,res)=>{
   
    const type=req.query.type;
    let movie;
    try {
        if (type==="series"){
            movie=await Movie.aggregate([
                {$match:{isSeries:true}},
                {$sample:{size:1}},
            ])

        }else{
            movie=await Movie.aggregate([
                {$match:{isSeries:false}},
                {$sample:{size:1}},
            ])

        }
        res.status(200).json(movie)
        
    } catch (error) {
        res.status(500).json(error)
        
    }

})
//GET ALL
router.get("/",verify,async(req,res)=>{
    if(req.user.isAdmin){
        
        try {
            const movies=await Movie.find();
            res.status(201).json(movies.reverse());
            
        } catch (error) {
            res.status(500).json(error)
            
        }
        

    }else{
        res.status(403).json("You can update only your account!")
    }

})




module.exports=router
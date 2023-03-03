const express=require("express");
const mongoose=require("mongoose");
const router=express.Router();

const app=express();


//connect to MongoDB Atlas

mongoose
.connect("mongodb+srv://<username>:<password>@cluster0.mongodb.net/fooddb?retryWrites=true&w=majority",
{useNewUrlParser:true,useUnifiedToPology: true})
.then(()=>console.log("connected to mongoDB Atlas"))
.catch((err)=>console.log("could not connect to MongoDB Atlas",err))


//Food Schema

const foodSchema=new mongoose.Schema({
    dish_name:{type:String,required:true},
    price:{type:Number,required:true},
    cuisine:{type:String,required:true},
    rating:{type:Number,required:true}

},{versionkey:false}
)


//Food Model

const Food = mongoose.model("Food",foodSchema);

//fieldsAnalyzerMiddleware

const validateFoodData=(req,res,next)=>{
    const {dish_name,price,cuisine,rating}=req.body;

    if(!dish_name || !price || !cuisine || !rating){
        return res.status(400).json({
            err:"Few Fields are missing,cannot process the request"
        });
    }
    next();
};

//A POST route to post the food data to the database.


router.post("/",(req,res)=>{
    const newFood=new Food({
     dish_name:req.body.dish_name,
     price:req.body.price,
     cuisine:req.body.cuisine,
     rating:req.body.ratring
    });

    newFood.save((error)=>{
        if(error){
            return res.status(400).json({error});
        }
        return res.status(200).json({message:"Food add successfully"})
    })
});

// A GET route to get the data of all the food items.

router.get("/",(req,res)=>{
    const {min,max,cuisine,price}=req.query;

    let query={};
    if(min && max){
        query.rating={$gte:min , $lte:max};
    }

    if(cuisine){
        query.cuisine=cuisine
    }
    if(price){
        query.price=price
    }

    Food.find(query,(error,foods)=>{
        if(error){
            return res.status(400).json({error});
        }
        return res.status(200).json({ foods })
    })
})


// A GET route to get the details of food items with a particular id. 
router.get("/:id",(req,res)=>{
    Food.findById(req.params.id,(error,food)=>{
        if(error){
            return res.status(400).json({error});
        }
        return res.status(200).json({ food })
    })
})

//A PATCH/PUT route to update or modify the data of any particular dish.

router.patch("/:id",(req,res)=>{
    Food.findByIdAndUpdate(req.params.id,req.body,{new:true},(error,food)=>{
        if(error){
            return res.status(400).json({error});
        }
        return res.status(200).json({ food })
    })
})

//A DELETE route to delete the data of any particular dish

router.delete("/:id",(req,res)=>{
    Food.findByIdAndRemove(req.params.id,req.body,{new:true},(error,food)=>{
        if(error){
            return res.status(400).json({error});
        }
        return res.status(200).json({ food })
    })
})

const record =(req,res,next)=>{

}


app.listen(2001, (req,res)=>{
    res.send("Nikita chavan port is on")
    console.log("Nikita chavan port is on")
})